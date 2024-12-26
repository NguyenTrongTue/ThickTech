import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ReactSortable } from "react-sortablejs";
import apiService from "@/services/api";
import Input from "@/components/input/InputText";
import Description from "@/components/admin/Description";
import toast from "react-hot-toast";
import InputTextArea from "@/components/input/InputTextArea";
import { Upload } from "lucide-react";
import ActionBtn from "@/components/button/ActionBtn";
export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  original_price: existingOriginalPrice,
  selling_price: existingSellingPrice,
  images: existingImages,
  product_category: existingProductCategory,
  is_featured: existingIsFeatured,
  headerTitle,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [originalPrice, setOriginalPrice] = useState(
    existingOriginalPrice || ""
  );
  const [sellingPrice, setSellingPrice] = useState(existingSellingPrice || "");
  const [productCategory, setProductCategory] = useState(
    existingProductCategory || ""
  );
  const [isFeatured, setIsFeatured] = useState(existingIsFeatured || false);
  const [images, setImages] = useState(existingImages || []);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTitle(existingTitle || "");
    setDescription(existingDescription || "");
    setOriginalPrice(existingOriginalPrice || "");
    setSellingPrice(existingSellingPrice || "");
    setProductCategory(existingProductCategory || "");
    setIsFeatured(existingIsFeatured || false);
    setImages(existingImages || []);
  }, [
    existingTitle,
    existingDescription,
    existingOriginalPrice,
    existingProductCategory,
    existingIsFeatured,
    existingSellingPrice,
    existingImages,
  ]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await apiService.get("/api/categories");
        const data = response;
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, []);

  async function saveProduct(ev) {
    ev.preventDefault();
    setLoading(true);
    const formData = new FormData();
    // kiểm tra dữ liệu
    if (
      !title ||
      !description ||
      !originalPrice ||
      !sellingPrice ||
      !productCategory
    ) {
      toast.error("Please fill in all required fields");
      setLoading(false);
      return;
    }
    formData.append("title", title);
    formData.append("description", description);
    formData.append("original_price", originalPrice);
    formData.append("selling_price", sellingPrice);
    formData.append("product_category", productCategory);
    formData.append("is_featured", isFeatured);

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
      if (_id) {
        await apiService.postWithFile(`/api/products/${_id}`, formData);
      } else {
        await apiService.postWithFile("/api/products", formData);
      }
      toast.success("Product saved successfully");
      router.push("/admin/products");
    } catch (error) {
      toast.error(error);

      console.error("Error saving product:", error);
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
      <h1 className="text-2xl mb-2 w-full uppercase">{headerTitle}</h1>
      <div className="overflow-y-auto bg-white rounded-lg shadow-md p-4 gap-4 flex flex-col">
        <form className="flex flex-1 flex-col gap-4 h-full">
          <div className="flex flex-col md:flex-row gap-4 flex-1 ">
            <div className="space-y-4 border-2 p-4 rounded-md flex-1 flex flex-col">
              <InputTextArea
                required
                label={"Tên sản phẩm"}
                placeholder="Enter product title"
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
              />

              <div className="flex flex-col gap-1">
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="product-is-featured-product"
                >
                  Featured Product <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    required
                    checked={isFeatured === "true"}
                    onChange={(ev) =>
                      setIsFeatured(ev.target.checked ? "true" : "false")
                    }
                    className="w-4 h-4"
                  />
                  <span
                    className={`text-sm ${
                      isFeatured === "true" ? "text-green-600" : "text-gray-600"
                    }`}
                  >
                    {isFeatured === "true"
                      ? "Sản phẩm được thêm vào Featured"
                      : "Sản phẩm không thuộc Featured"}
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Category <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={productCategory}
                  onChange={(ev) => setProductCategory(ev.target.value)}
                  className="p-1.5 block w-full rounded-md border-gray-400 shadow-sm focus:outline-none focus:ring-slate-400 focus:ring-[3px] ring-1 sm:text-sm"
                >
                  <option value="">Select category</option>

                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.category_name}
                    </option>
                  ))}
                </select>
              </div>

              <Input
                required
                type="number"
                placeholder="Enter price"
                label={"Gia nhập hàng (VND)"}
                value={originalPrice}
                onChange={(ev) => setOriginalPrice(ev.target.value)}
              />

              <Input
                required
                type="number"
                label={"Gia bán (VND)"}
                placeholder="Enter price"
                value={sellingPrice}
                onChange={(ev) => setSellingPrice(ev.target.value)}
              />
            </div>
            <div className="space-y-4 border-2 p-4 rounded-md flex flex-col flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Photos <span className="text-red-500">*</span>
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
                  <Upload size={24} />
                  <span className="mt-1 text-sm">Add image</span>
                  <input
                    type="file"
                    onChange={uploadImages}
                    className="hidden"
                    multiple
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <Description value={description} onChange={setDescription} />
              </div>
            </div>
          </div>
          <div className="text-right w-full">
            <ActionBtn
              className="px-4 py-2 text-white bg-violet-500 hover:bg-violet-700 rounded-md outline-double "
              type="submit"
              onClick={saveProduct}
              loading={loading}
              disabled={loading}
            >
              Save
            </ActionBtn>
          </div>
        </form>
      </div>
    </div>
  );
}
