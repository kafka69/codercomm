import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { Box, Stack, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { FormProvider, FTextField, FUploadImage } from "../../components/form";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import { alpha } from '@mui/material/styles';

const yupSchema = Yup.object().shape({
  content: Yup.string().required("Content is required"),
})

export default function EditForm({ openEdit, onCloseEdit, onConfirmEdit, post }) {
  const defaultValues = {
    content: post?.content || "",
    image: post?.image || null,
  }

  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setValue,
    formState: {isSubmitting},
  } = methods;

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setValue(
        "image",
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
    }
  };  
  const onSubmit = (data) => {
    onConfirmEdit(data); 
  };
  return (
    <Dialog open={openEdit} onClose={onCloseEdit} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Post</DialogTitle>
      <DialogContent>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <FTextField
              name="content"
              multiline
              fullWidth
              rows={4}
              placeholder="Edit your content here..."
              sx={{
                "& fieldset": {
                  borderWidth: `1px !important`,
                  borderColor: alpha("#919EAB", 0.32),
                },
              }}
            />
            <FUploadImage
              name="image"
              accept="image/*"
              maxSize={3145728}
              onDrop={handleDrop}
            />
          </Stack>
        </FormProvider>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          onClick={onCloseEdit}
          variant="outlined"
          size="small"
        >
          Cancel
        </LoadingButton>
        <LoadingButton
          type="submit"
          variant="contained"
          size="small"
          loading={isSubmitting}
          onClick={handleSubmit(onSubmit)}
        >
          Confirm
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}
