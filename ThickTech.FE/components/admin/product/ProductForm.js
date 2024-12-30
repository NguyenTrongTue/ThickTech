import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ReactSortable } from "react-sortablejs";
import apiService from "@/services/api";
import Description from "@/components/admin/Description";
import toast from "react-hot-toast";
import { Upload } from "lucide-react";
import ActionBtn from "@/components/button/ActionBtn";
import Spinner from "@/components/Spinner";
import {
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

export default function ProductForm({ product: editProduct, headerTitle }) {
  const [product, setProduct] = useState(
    editProduct || {
      title: "",
      description: "",
      original_price: "",
      selling_price: "",
      product_category: "",
      images: [],
      quantity: "",
    }
  );

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState({});

  const router = useRouter();

  useEffect(() => {
    if (editProduct) {
      setProduct(editProduct);
    }
  }, [editProduct]);

  const handleChange = (field, value) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await apiService.get("/api/categories");
        setCategories(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, []);

  const validate = () => {
    const errors = {};
    if (!product.title) errors.title = "Title is required";
    if (!product.product_category)
      errors.product_category = "Category is required";
    if (!product.original_price)
      errors.original_price = "Original price is required";
    if (!product.selling_price)
      errors.selling_price = "Selling price is required";
    if (!product.quantity) errors.quantity = "Quantity is required";
    if (product.images.length === 0)
      errors.images = "At least one image is required";
    if (!product.description) errors.description = "Description is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const saveProduct = async (ev) => {
    ev.preventDefault();
    setLoading(true);

    if (!validate()) {
      setLoading(false);
      return;
    }

    try {
      const { _id } = product;
      if (_id) {
        await apiService.put(`/api/products/${_id}`, product);
      } else {
        await apiService.post("/api/products", product);
      }
      toast.success("Product saved successfully");
      router.push("/admin/products");
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product");
    }
    setLoading(false);
  };

  const uploadImages = async (ev) => {
    const files = ev.target.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("images", file);
      }
      data.append("type", "product");
      try {
        const res = await apiService.postWithFile("/api/upload", data);
        setProduct((prev) => ({
          ...prev,
          images: [...prev.images, ...res.data.file_urls],
        }));
        toast.success("Images uploaded successfully");
      } catch (error) {
        toast.error("Error uploading images");
      }
      setIsUploading(false);
    }
  };

  const deleteImage = async (imageUrl) => {
    try {
      await apiService.post("/api/delete_image", { file_url: imageUrl });
      setProduct((prev) => ({
        ...prev,
        images: prev.images.filter((img) => img !== imageUrl),
      }));
      toast.success("Image deleted successfully");
    } catch (error) {
      toast.error("Failed to delete image");
    }
  };

  function updateImagesOrder(images) {
    setProduct((prev) => ({ ...prev, images }));
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
                placeholder="Enter product name"
                value={product.title}
                onChange={(ev) => handleChange("title", ev.target.value)}
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
                  value={product.product_category}
                  onChange={(ev) =>
                    handleChange("product_category", ev.target.value)
                  }
                  label="Product Category *"
                >
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
                value={product.original_price}
                onChange={(ev) =>
                  handleChange("original_price", ev.target.value)
                }
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
                value={product.selling_price}
                onChange={(ev) =>
                  handleChange("selling_price", ev.target.value)
                }
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
                value={product.quantity}
                onChange={(ev) => handleChange("quantity", ev.target.value)}
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
                  list={product.images}
                  setList={updateImagesOrder}
                  className="flex flex-wrap gap-4"
                >
                  {!!product.images?.length &&
                    product.images.map((img, index) => (
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
                  value={product.description || ""}
                  onChange={(value) => handleChange("description", value)}
                />
                {errors.description && (
                  <Typography variant="caption" color="error">
                    {errors.description}
                  </Typography>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <ActionBtn
              className="px-4 py-2 text-white bg-gray-500 hover:bg-gray-700 rounded-md outline-double mr-2"
              onClick={() => router.push("/admin/products")}
            >
              Cancel
            </ActionBtn>
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
