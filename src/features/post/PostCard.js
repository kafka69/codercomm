import React, { useEffect } from "react";
import {
  Box,
  Link,
  Card,
  Stack,
  Avatar,
  Typography,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { fDate } from "../../utils/formatTime";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import PostReaction from "./PostReaction";
import CommentForm from "../comment/CommentForm";
import CommentList from "../comment/CommentList";
import { deletePost, editPost } from "./postSlice";
import { useDispatch, useSelector } from "react-redux";
import YesNoDialog from "../../components/YesNoDialog";
import { getCurrentUserProfile } from "../user/userSlice";
import useAuth from "../../hooks/useAuth";
import EditForm from "./EditForm";

function PostCard({ post }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  // state for delete
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedPostId, setSelectedPostId] = React.useState(null);
  const { user } = useAuth();
  const dispatch = useDispatch();
  // state for edit
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  
  // form submit for delete post
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  

  // edit click
  const handleOnClickEdit = (data) => {
    setSelectedPostId(data)
    setIsFormOpen(true);
    handleMenuClose();
  };
  // del click
  const handleOnClickDel = (data) => {
    setSelectedPostId(data);
    setIsDialogOpen(true);
    handleMenuClose();
  };

  // confirm edit
  const handleConfirmEdit = (data) => {
    // console.log(selectedPostId)
    // console.log(data.content,data.image)
    dispatch(editPost({
      postId: selectedPostId,
      content: data.content,
      image: data.image
    }))
    setIsFormOpen(false);
  };
  // confirm delete
  const hanldeConfirmDelete = () => {
    dispatch(deletePost(selectedPostId));
    setIsDialogOpen(false);
  };
  // close dialog
  const handleDiologClose = () => {
    setIsDialogOpen(false);
  };
  const handleFormClose = () => {
    setIsFormOpen(false);
  };
  console.log('post', post);
  
  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={
          <Avatar src={post?.author?.avatarUrl} alt={post?.author?.name} />
        }
        title={
          <Link
            variant="subtitle2"
            color="text.primary"
            component={RouterLink}
            sx={{ fontWeight: 600 }}
            to={`/user/${post.author._id}`}
          >
            {post?.author?.name}
          </Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ display: "block", color: "text.secondary" }}
          >
            {fDate(post.createdAt)}
          </Typography>
        }
        action={
          <IconButton onClick={handleMenuOpen}>
            <MoreVertIcon sx={{ fontSize: 30 }} />
          </IconButton>
        }
      />
      <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose}>
        {user?._id === post?.author?._id ? (
          <MenuItem onClick={() => handleOnClickDel(post._id)}>Delete</MenuItem>
        ) : (
          <MenuItem onClick={()=>{
            console.log(post?.author?._id)
          }}>Share</MenuItem>
        )}
        {user?._id === post?.author?._id && (
          <MenuItem onClick={() => handleOnClickEdit(post._id)}>Edit</MenuItem>
        )}
      </Menu>
      {/* open dialog for confirmation */}
      <YesNoDialog
      type={"post"}
        open={isDialogOpen}
        onClose={handleDiologClose}
        onConfirm={hanldeConfirmDelete}
      />
      {/* edit post form */}
      <EditForm
        openEdit={isFormOpen}
        onCloseEdit={handleFormClose}
        onConfirmEdit={handleConfirmEdit}
        post={post}
      />
      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography>{post.content}</Typography>

        {post.image && (
          <Box
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              height: 300,
              "& img": { objectFit: "cover", width: 1, height: 1 },
            }}
          >
            <img src={post.image} alt="post" />
          </Box>
        )}

        <PostReaction post={post} />
        <CommentList postId={post._id} />
        <CommentForm postId={post._id} />
      </Stack>
    </Card>
  );
}

export default PostCard;
