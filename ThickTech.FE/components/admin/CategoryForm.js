import React, { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css"; // Giao diện mặc định
import apiService from "@/services/api";
import Input from "@/components/input/InputText";
import Button from "@/components/button/Button";
import { toast } from "react-hot-toast";
export default function CategoryForm({
  _id,
  category_name: existingCategory,
  category_slug: existingCategory_slug,
  onClose,
  onSave,
}) {
  const [categpry, setCategpry] = useState(existingCategory || "");
  const [category_slug, setCategory_slug] = useState(
    existingCategory_slug || ""
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCategpry(existingCategory || "");
    setCategory_slug(existingCategory_slug || "");
  }, [existingCategory, existingCategory_slug]);

  const saveCategory = async (ev) => {
    ev.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("category_name", categpry);
    formData.append("category_slug", category_slug);

    try {
      if (_id) {
        await apiService.postWithFile(`/api/categories/${_id}`, formData); // Update
      } else {
        await apiService.postWithFile("/api/categories", formData); // Create
      }
      toast.success("Category saved successfully");
      onSave();
      onClose(); // Đóng modal
    } catch (error) {
      toast.error(error.message);
      console.error("Error saving category:", error);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={saveCategory} className="space-y-4">
      <Input
        required
        type="text"
        label="Category Name"
        placeholder="Enter category name"
        value={categpry}
        onChange={(ev) => setCategpry(ev.target.value)}
      />
      <Input
        required
        type="text"
        label="Category Slug"
        placeholder="Enter category slug"
        value={category_slug}
        onChange={(ev) => setCategory_slug(ev.target.value)}
      />
      <div className="text-right">
        <Button
          type="submit"
          className="px-6 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          loading={loading}
        >
          Save
        </Button>
      </div>
    </form>
  );
}
