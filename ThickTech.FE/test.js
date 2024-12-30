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
import Spinner from "@/components/Spinner";
import {
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  original_price: existingOriginalPrice,
  selling_price: existingSellingPrice,
  images: existingImages,
  product_category: existingProductCategory,
  is_featured: existingIsFeatured,
  quantity: existingQuantity,
  headerTitle,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [original_price, setOriginalPrice] = useState(
    existingOriginalPrice || ""
  );
  const [selling_price, setSellingPrice] = useState(existingSellingPrice || "");
  const [product_category, setProductCategory] = useState(
    existingProductCategory || ""
  );
  const [is_featured, setIsFeatured] = useState(existingIsFeatured || false);
  const [images, setImages] = useState(existingImages || []);
  const [quantity, setQuantity] = useState(existingQuantity || 0);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState({});

  const router = useRouter();

  useEffect(() => {
    setTitle(existingTitle || "");
    setDescription(existingDescription || "");
    setOriginalPrice(existingOriginalPrice || "");
    setSellingPrice(existingSellingPrice || "");
    setProductCategory(existingProductCategory || "");
    setIsFeatured(existingIsFeatured || false);
    setImages(existingImages || []);
    setQuantity(existingQuantity || "");
  }, [
    existingTitle,
    existingDescription,
    existingOriginalPrice,
    existingProductCategory,
    existingIsFeatured,
    existingSellingPrice,
    existingImages,
    existingQuantity,
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

  const validate = () => {
    const errors = {};
    if (!title) {
      errors.title = "Product name is required";
    }
    if (!description) {
      errors.description = "Description is required";
    }
    if (!original_price) {
      errors.original_price = "Original price is required";
    }
    if (!selling_price) {
      errors.selling_price = "Selling price is required";
    }
    if (!product_category) {
      errors.product_category = "Product category is required";
    }
    if (!images.length) {
      errors.images = "At least one image is required";
    }
    if (!quantity) {
      errors.quantity = "Quantity is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  async function saveProduct(ev) {
    ev.preventDefault();
    setLoading(true);
    const data = {
      title,
      description,
      original_price,
      selling_price,
      product_category,
      is_featured,
      images,
      quantity,
    };

    if (!validate()) {
      setLoading(false);
      return;
    }

    try {
      if (_id) {
        // update
        await apiService.post(`/api/products/${_id}`, ...data);
      } else {
        // create
        await apiService.post("/api/products", data);
      }
      console.log(data);

      toast.success("Product saved successfully");
      // router.push("/admin/products");
    } catch (error) {
      toast.error(error);

      console.error("Error saving product:", error);
    }
    setLoading(false);
  }

  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      //  thêm từng file vào FormData
      for (const file of files) {
        data.append("images", file);
      }
      data.append("type", "product");
      try {
        const res = await apiService.postWithFile("/api/upload", data);
        // Giả sử API trả về danh sách URL ảnh
        setImages((oldImages) => {
          return [...oldImages, ...res.data.file_urls]; // Sử dụng đúng key của API
        });
        console.log(images);

        toast.success("Images uploaded successfully");
      } catch (error) {
        toast.error("Error uploading images");
        console.error("Error uploading images:", error);
      }
      setIsUploading(false);
    }
  }

  async function deleteImage(imageUrl) {
    toast.loading("Deleting image...");
    try {
      await apiService.post("/api/delete_image", { file_url: imageUrl });
      setImages((oldImages) => oldImages.filter((img) => img !== imageUrl)); // Loại bỏ ảnh đã xóa
    } catch (error) {
      toast.error("Error deleting image");
      console.error("Error deleting image:", error);
    }
    toast.dismiss();
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
            <div className="space-y-6 border-2 p-4 rounded-md flex-1 flex flex-col">
              <TextField
                label="Product name *"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                size="small"
                multiline
                error={!!errors.title}
                helperText={errors.title}
                variant="outlined"
              />

              <FormControl
                fullWidth
                error={!!errors?.product_category}
                size="small"
              >
                <InputLabel id="product-category">
                  Product Category *
                </InputLabel>
                <Select
                  labelId="product-category"
                  value={product_category}
                  onChange={(e) => setProductCategory(e.target.value)}
                  label="Product Category *"
                >
                  <MenuItem value="">Uncategorized</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.category_name}
                    </MenuItem>
                  ))}
                </Select>
                {errors?.product_category && (
                  <FormHelperText>{errors.product_category}</FormHelperText>
                )}
              </FormControl>

              <TextField
                required
                type="number"
                label="Original price (VND)"
                placeholder="Enter original price"
                value={original_price}
                onChange={(ev) => setOriginalPrice(ev.target.value)}
                error={!!errors.original_price}
                helperText={errors.original_price}
                fullWidth
                size="small"
                variant="outlined"
              />

              <TextField
                required
                type="number"
                label="Selling price (VND)"
                placeholder="Enter selling price"
                value={selling_price}
                onChange={(ev) => setSellingPrice(ev.target.value)}
                error={!!errors.selling_price}
                helperText={errors.selling_price}
                fullWidth
                size="small"
                variant="outlined"
              />
              {/* sô lượng sản phẩm nhập khokho */}
              <TextField
                required
                type="number"
                label="Quantity"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(ev) => setQuantity(ev.target.value)}
                error={!!errors.quantity}
                helperText={errors.quantity}
                fullWidth
                size="small"
                variant="outlined"
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
                        className="relative w-24 h-24 bg-gray-100 rounded-lg shadow-inner overflow-hidden"
                      >
                        <img
                          src={img}
                          alt="Preview"
                          className="object-cover w-full h-full"
                        />
                        <button
                          type="button"
                          className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                          onClick={() => deleteImage(img)}
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
                {isUploading && (
                  <div className="relative w-24 h-24 bg-gray-100 rounded-lg shadow-inner overflow-hidden flex items-center justify-center">
                    <Spinner />
                  </div>
                )}

                <label className="w-24 h-24 cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:bg-slate-300 text-slate-500 rounded-lg">
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
              {errors.images && (
                <Typography variant="caption" color="error">
                  {errors.images}
                </Typography>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <Description
                  value={description || ""}
                  onChange={setDescription}
                />
                {errors.description && (
                  <Typography variant="caption" color="error">
                    {errors.description}
                  </Typography>
                )}
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
