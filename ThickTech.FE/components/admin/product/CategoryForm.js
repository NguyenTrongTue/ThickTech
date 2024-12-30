import React, { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css"; // Giao diện mặc định
import apiService from "@/services/api";
import Input from "@/components/input/InputText";
import Button from "@/components/button/Button";
import { toast } from "react-hot-toast";
import { TextField } from "@mui/material";

export default function CategoryForm({
  category: editCategory,
  onClose,
  onSave,
}) {
  const [category, setCategory] = useState(
    editCategory || {
      category_name: "",
    }
  );
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChanges = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors = {};
    if (!category.category_name.trim()) {
      errors.category_name = "Category name is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    if (editCategory) setCategory(editCategory);
  }, [editCategory]);

  const saveCategory = async (ev) => {
    ev.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (category._id) {
        await apiService.put(`/api/categories/${category._id}`, {
          category_name: category.category_name,
        }); // Update
      } else {
        await apiService.post("/api/categories", {
          category_name: category.category_name,
        }); // Create
      }
      toast.success("Category saved successfully");
      onSave();
      onClose();
    } catch (error) {
      toast.error(error.message || "Failed to save category");
      console.error("Error saving category:", error);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={saveCategory} className="space-y-4">
      <TextField
        label="Category Name"
        name="category_name"
        value={category.category_name}
        onChange={handleChanges}
        error={!!errors.category_name}
        helperText={errors.category_name}
        fullWidth
        size="small"
        variant="outlined"
      />

      <div className="text-right">
        <Button
          type="submit"
          className="px-6 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
}
