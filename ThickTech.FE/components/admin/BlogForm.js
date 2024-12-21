import React, { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css"; // Giao diện mặc định
import { useRouter } from "next/router";
import { ReactSortable } from "react-sortablejs";
import apiService from "@/services/api";
import Input from "@/components/input/Input";
import Notification from "@/components/Notification";
import ContextForm from "@/components/admin/Description";
import ActionBtn from "../button/Button";
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
  const [isEditing, setIsEditing] = useState(true);
  const router = useRouter();
  const [notification, setNotification] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTitle(existingTitle || "");
    setContent(existingContent || "Write your blog here...");
    setAuthor(existingAuthor || "");
    setImages(existingImages || []);
  }, [existingTitle, existingContent, existingAuthor, existingImages]);

  function toggleEditing() {
    setIsEditing(!isEditing);
  }

  // Hàm lưu nội dung vào server
  const saveBlog = async (ev) => {
    ev.preventDefault();
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
      console.log(title, content, author, images);

      if (_id) {
        await apiService.postWithFile(`/api/blogs/${_id}`, formData);
      } else {
        await apiService.postWithFile("/api/blogs", formData);
      }

      setNotification({
        type: "success",
        message: "Product saved successfully!",
      });

      setTimeout(() => router.push("/admin/blogs"), 4000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "An unexpected error occurred";
      setNotification({
        type: "error",
        message: errorMessage,
      });
      console.error("Error saving product:", errorMessage);
    }
    setLoading(false);
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
      {notification.message && (
        <Notification type={notification.type} message={notification.message} />
      )}
      <h1 className="text-2xl mb-2 w-ful uppercase">{headerTitle}</h1>
      <div className="space-y-4 p-4 bg-white rounded-lg shadow-md flex flex-col flex-1">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Author
          </label>
          <Input
            type="text"
            placeholder="Enter author name"
            value={author}
            onChange={(ev) => setAuthor(ev.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <Input
            type="text"
            placeholder="Enter blog title"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Photos
          </label>
          <div className="mt-2 flex flex-wrap gap-4">
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
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex flex-row justify-between place-items-end">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <ActionBtn
              onClick={toggleEditing}
              className="p-2 text-sm mb-2 bg-slate-500 text-white rounded-md"
            >
              {isEditing ? "Edit" : "View"}
            </ActionBtn>
          </div>
          {isEditing ? (
            <>
              {/* Trình chỉnh sửa nội dung */}
              <ContextForm value={content} onChange={setContent} />
            </>
          ) : (
            <>
              {/* Hiển thị nội dung blog */}
              <div
                className="border rounded-md p-4 max-w-full"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </>
          )}
        </div>
        <div className="text-right">
          <button
            type="submit"
            onClick={saveBlog}
            className={`px-6 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
