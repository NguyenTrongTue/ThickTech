import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ReactSortable } from "react-sortablejs";
import apiService from "@/services/api";
import Input from "@/components/client/input/InputText";
import Notification from "@/components/Notification";
import ContextForm from "@/components/admin/ContextForm";
import ActionBtn from "../client/button/ActionBtn";
export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  original_price: existingOriginalPrice,
  selling_price: existingSellingPrice,
  images: existingImages,
  headerTitle,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [original_price, setOriginalPrice] = useState(
    existingOriginalPrice || ""
  );
  const [selling_price, setSellingPrice] = useState(existingSellingPrice || "");
  const [images, setImages] = useState(existingImages || []);
  const [notification, setNotification] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const [isEditing, setIsEditing] = useState(true);
  const router = useRouter();
  function toggleEditing() {
    setIsEditing(!isEditing);
  }
  useEffect(() => {
    setTitle(existingTitle || "");
    setDescription(existingDescription || "Write your blog here...");
    setOriginalPrice(existingOriginalPrice || "");
    setSellingPrice(existingSellingPrice || "");
    setImages(existingImages || []);
  }, [
    existingTitle,
    existingDescription,
    existingOriginalPrice,
    existingSellingPrice,
    existingImages,
  ]);

  async function saveProduct(ev) {
    ev.preventDefault();
    setLoading(true);
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("original_price", original_price);
    formData.append("selling_price", selling_price);

    // Thêm hình ảnh cũ (URL)
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
      console.log(title, description, original_price, selling_price, images);

      if (_id) {
        await apiService.postWithFile(`/api/products/${_id}`, formData);
      } else {
        await apiService.postWithFile("/api/products", formData);
      }

      setNotification({
        type: "success",
        message: "Product saved successfully!",
      });

      setTimeout(() => router.push("/admin/products"), 4000);
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
  }

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

      <form className="space-y-4 p-4 bg-white rounded-lg shadow-md flex flex-col flex-1">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product name
          </label>
          <Input
            type="text"
            placeholder="Enter product name"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 md:grid-cols-2 xl:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Original price (in VND)
            </label>
            <Input
              type="number"
              placeholder="Enter price"
              value={original_price}
              onChange={(ev) => setOriginalPrice(ev.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Selling price (in VND)
            </label>
            <Input
              type="number"
              placeholder="Enter price"
              value={selling_price}
              onChange={(ev) => setSellingPrice(ev.target.value)}
            />
          </div>
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
            <ActionBtn onClick={toggleEditing} className="p-2 text-sm mb-2">
              {isEditing ? "View" : "Edit"}
            </ActionBtn>
          </div>
          {isEditing ? (
            <ContextForm value={description} onChange={setDescription} />
          ) : (
            <>
              <div
                className="p-4 bg-gray-100 rounded-lg shadow-inner"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </>
          )}
        </div>

        <div className="text-right">
          <button
            type="submit"
            onClick={saveProduct}
            className={`px-6 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
