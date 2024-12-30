import { ReactSortable } from "react-sortablejs";
import apiService from "@/services/api";
import React, { useState, useEffect } from "react";
import Description from "@/components/admin/Description";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import Spinner from "@/components/Spinner";
import ActionButton from "@/components/button/ActionBtn";

import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";

export default function BlogEditor({
  _id,
  author: existingAuthor,
  title: existingTitle,
  content: existingContent,
  images: existingImages,
  headerTitle,
}) {
  const [author, setAuthor] = useState(existingAuthor || "");
  const [title, setTitle] = useState(existingTitle || "");
  const [images, setImages] = useState(existingImages || []);
  const [content, setContent] = useState(existingContent || "");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setTitle(existingTitle || "");
    setContent(existingContent || "");
    setAuthor(existingAuthor || "");
    setImages(existingImages || []);
  }, [existingTitle, existingContent, existingAuthor, existingImages]);

  const validateForm = () => {
    const newErrors = {};
    if (!author) newErrors.author = "Author is required.";
    if (!title) newErrors.title = "Title is required.";
    if (!content) newErrors.content = "Content is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Hàm lưu nội dung vào server
  const saveBlog = async (ev) => {
    ev.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("author", author);

    const oldImages = images.filter((img) => !img.file); // Lọc URL cũ
    oldImages.forEach((url, index) => {
      formData.append(`existingImages[${index}]`, url);
    });

    // Thêm hình ảnh mới (file)
    const newImages = images.filter((img) => img.file); // Lọc file mới
    newImages.forEach((img) => {
      formData.append("images", img.file);
    });

    try {
      if (_id) {
        await apiService.postWithFile(`/api/blogs/${_id}`, formData);
      } else {
        await apiService.postWithFile("/api/blogs", formData);
      }

      toast.success("Blog saved successfully");
      router.push("/admin/blogs");
    } catch (error) {
      toast.error("Error saving blog");
      console.error("Error saving blog:", error);
    } finally {
      setLoading(false);
    }
  };

  function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      const newImages = Array.from(files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setImages((oldImages) => [...oldImages, ...newImages]);
    }
  }

  function handleRemoveImage(index) {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      const removedImage = newImages.splice(index, 1)[0];
      if (removedImage.preview) {
        URL.revokeObjectURL(removedImage.preview);
      }
      return newImages;
    });
  }
  function updateImagesOrder(images) {
    setImages(images);
  }

  return (
    <div className="min-h-full flex flex-col">
      <h1 className="text-2xl mb-2 w-full uppercase">{headerTitle}</h1>
      <Box
        className="space-y-4 p-4 bg-white rounded-lg shadow-md"
        component="form"
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          fullWidth
          size="small"
          error={!!errors.author}
          helperText={errors.author}
          variant="outlined"
        />
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          size="small"
          error={!!errors.title}
          helperText={errors.title}
          variant="outlined"
        />
        <div>
          <Typography variant="body1" className="mb-1">
            Photos
          </Typography>
          <Box className="mt-2 flex flex-wrap gap-4">
            <ReactSortable
              list={images}
              setList={updateImagesOrder}
              className="flex flex-wrap gap-4"
            >
              {!!images?.length &&
                images.map((img, index) => (
                  <div
                    key={index}
                    className="relative w-28 h-28 bg-gray-100 rounded-lg shadow-inner overflow-hidden"
                  >
                    <img
                      src={img.preview || img}
                      alt="Preview"
                      className="object-cover w-full h-full"
                    />
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
            </ReactSortable>

            <label className="w-28 h-28 cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:bg-slate-300 text-slate-500 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
              <span className="mt-1 text-sm">Add image</span>
              <input
                type="file"
                onChange={uploadImages}
                className="hidden"
                multiple
              />
            </label>
          </Box>
        </div>
        <Box className="flex-1">
          <Typography variant="body1" className="mb-1">
            Description
          </Typography>
          <Description
            value={content || ""}
            onChange={setContent}
            error={!!errors.content}
          />
          {errors.content && (
            <Typography variant="caption" color="error">
              {errors.content}
            </Typography>
          )}
        </Box>
        <Box className="text-right">
          <ActionButton
            onClick={saveBlog}
            disabled={loading}
            variant="contained"
            color="primary"
            className="px-4 py-2"
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Save"}
          </ActionButton>
        </Box>
      </Box>
    </div>
  );
}
