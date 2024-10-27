import React, { useState } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { fDate } from "../../utils/formatTime";
import CommentReaction from "./CommentReaction";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useAuth from "../../hooks/useAuth";
import YesNoDialog from "../../components/YesNoDialog";
import { useDispatch } from "react-redux";
import { deleteComment } from "./commentSlice";

function CommentCard({ comment,postId }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  // state for delete
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedComment, setSelectedComment] = React.useState(null);
  const { user } = useAuth();
  const dispatch = useDispatch();
  // handle delete button
  const handleOnClickDel = (data) => {
    setSelectedComment(data);
    setIsDialogOpen(true);
    setAnchorEl(null);
  };
  const handleDiologClose = () => {
    setIsDialogOpen(false);
  };
  // confirm delete
  const hanldeConfirmDelete = () => {
    dispatch(deleteComment({postId: postId,commnetId: selectedComment}));
    setIsDialogOpen(false);
  };
  // handle open menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt={comment.author?.name} src={comment.author?.avatarUrl} />
      <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}>
        <Stack
          direction="row"
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 0.5 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {comment.author?.name}
          </Typography>
          <Box>
            <Typography variant="caption" sx={{ color: "text.disabled" }}>
              {fDate(comment.createdAt)}
            </Typography>
            <IconButton onClick={handleClick} size="small">
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                elevation: 0,
                sx: { "& .MuiMenuItem-root": { fontSize: 14 } },
              }}
            >
              {user?._id === comment.author._id ? (
                <MenuItem onClick={() => handleOnClickDel(comment._id)}>
                  Delete
                </MenuItem>
              ) : (
                <MenuItem>Report</MenuItem>
              )}
            </Menu>
          </Box>
          <YesNoDialog
            type={"comment"}
            open={isDialogOpen}
            onClose={handleDiologClose}
            onConfirm={hanldeConfirmDelete}
          />
        </Stack>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {comment.content}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CommentReaction comment={comment} />
        </Box>
      </Paper>
    </Stack>
  );
}

export default CommentCard;
