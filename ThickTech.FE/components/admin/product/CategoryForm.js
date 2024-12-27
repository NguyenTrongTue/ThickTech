import React, { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css"; // Giao diện mặc định
import apiService from "@/services/api";
import Input from "@/components/input/InputText";
import Button from "@/components/button/Button";
import { toast } from "react-hot-toast";
import { TextField } from "@mui/material";

export default function CategoryForm({
  _id,
  category_name: existingCategory,
  onClose,
  onSave,
}) {
  const [categpry, setCategpry] = useState(existingCategory || "");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};
    if (!categpry) newErrors.categpry = "Category Name is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  useEffect(() => {
    setCategpry(existingCategory || "");
  }, [existingCategory]);

  const saveCategory = async (ev) => {
    ev.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("category_name", categpry);

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
      <TextField
        label="Category Name"
        value={categpry}
        onChange={(ev) => setCategpry(ev.target.value)}
        error={!!errors.categpry}
        helperText={errors.categpry}
        fullWidth
        size="small"
        variant="outlined"
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
