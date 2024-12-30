import { ReactSortable } from "react-sortablejs";
import apiService from "@/services/api";
import React, { useState, useEffect } from "react";
import Description from "@/components/admin/Description";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { Button, TextField, IconButton, Typography, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Upload } from "lucide-react";
import Spinner from "@/components/Spinner";
export default function ClubForm({ clubData: editData, headerTitle }) {
  const [clubData, setClubData] = useState({
    club_name: "",
    club_title: "",
    club_description: "",
    club_goals: "",
    club_images: [],
    steps: [],
  });
  useEffect(() => {
    if (editData) {
      setClubData(editData);
    }
  }, [editData]);

  const handleInputChange = (field, value) => {
    setClubData((prev) => ({ ...prev, [field]: value }));
  };

  const [errors, setErrors] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();
  // Hàm lưu nội dung vào server

  const handleSubmit = async (event) => {
    event.preventDefault(); // Ngừng hành động mặc định của form (tránh reload trang)
    // Kiểm tra xem các trường cần thiết có bị thiếu hay không
    if (validateForm()) {
      try {
        const { _id } = clubData;
        console.log(clubData);
        const url = _id ? `/api/clubs/${_id}` : "/api/clubs";
        const response = await apiService.post(url, clubData);
        if (response) {
          toast.success("Club saved successfully");
          // router.push(`/admin/clubs/clublist`);
        }
        // toast.success(response.data.message);
        // router.push(`/admin/clubs/clublist`);
      } catch (error) {
        console.error("Error submitting the form:", error);
        toast.error("Something went wrong, please try again.");
      }
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!clubData.club_name) errors.club_name = "Club name is required";
    if (!clubData.club_title) errors.club_title = "Title is required";
    if (!clubData.club_description)
      errors.club_description = "Description is required";
    if (!clubData.club_goals) errors.club_goals = "Goals are required";
    if (clubData.club_images.length === 0)
      errors.club_images = "At least one image is required";
    if (clubData.steps.length === 0)
      errors.steps = "At least one step is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  async function upLoadImageClub(event) {
    const files = event.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);

      const formData = new FormData();
      for (const file of files) {
        formData.append("images", file);
      }
      formData.append("type", "club");
      try {
        const response = await apiService.postWithFile("/api/upload", formData);
        if (response.data) {
          setClubData((prev) => ({
            ...prev,
            club_images: [...prev.club_images, ...response.data.file_urls],
          }));
          toast.success("Images uploaded successfully");
        }
      } catch (error) {
        toast.error("Error uploading images");
        console.error("Error uploading images:", error);
      }
      setIsUploading(false);
    }
  }
  const updateImageStep = async (event, stepId) => {
    const file = event.target?.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("images", file);
      formData.append("type", "step");

      try {
        // Gửi ảnh lên server
        const response = await apiService.postWithFile("/api/upload", formData);

        if (response.data) {
          // Cập nhật danh sách bước với URL ảnh mới
          setClubData((prev) => ({
            ...prev,
            steps: prev.steps.map((step) =>
              step.id === stepId
                ? { ...step, image: response.data.file_urls } // Cập nhật image cho step
                : step
            ),
          }));

          toast.success("Image uploaded successfully");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Error uploading image");
      }
    }
  };

  const handleRemoveImage = async (img) => {
    toast.loading("Deleting image...");
    try {
      await apiService.delete(`/api/delete_image/${img}`);
      setClubData((prev) => ({
        ...prev,
        club_images: prev.club_images.filter((image) => image !== img),
      }));
      toast.success("Image deleted successfully");
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Error deleting image");
    } finally {
      toast.dismiss();
    }
  };

  const updateImagesOrder = (images) => {
    setClubData((prev) => ({
      ...prev,
      club_images: images,
    }));
  };

  const addStep = () => {
    setClubData((prev) => ({
      ...prev,
      steps: [
        ...prev.steps,
        { id: Date.now(), name: "", content: "", image: null },
      ],
    }));
  };

  const removeStep = (stepId) => {
    setClubData((prev) => ({
      ...prev,
      steps: prev.steps.filter((step) => step.id !== stepId),
    }));
  };
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
          required
          label="Club name"
          value={clubData.club_name}
          onChange={(e) => handleInputChange("club_name", e.target.value)}
          fullWidth
          size="small"
          error={!!errors.club_name}
          helperText={errors.club_name}
          variant="outlined"
        />
        <TextField
          required
          label="Title"
          value={clubData.club_title}
          onChange={(e) => handleInputChange("club_title", e.target.value)}
          fullWidth
          size="small"
          error={!!errors.club_title}
          helperText={errors.club_title}
          variant="outlined"
        />
        <TextField
          required
          label="Description"
          value={clubData.club_description}
          onChange={(e) =>
            handleInputChange("club_description", e.target.value)
          }
          fullWidth
          size="small"
          multiline
          error={!!errors.club_description}
          helperText={errors.club_description}
          variant="outlined"
        />
        <Box className="flex-1">
          <Typography variant="body1" className="mb-1">
            Club goals <span className="text-red-500">*</span>
          </Typography>
          <Description
            value={clubData.club_goals || ""}
            onChange={(e) => handleInputChange("club_goals", e)}
            error={!!errors.club_goals}
          />
          {errors.club_goals && (
            <Typography variant="caption" color="error">
              {errors.club_goals}
            </Typography>
          )}
        </Box>
        <div>
          <Typography variant="body1" className="mb-1">
            Club images
          </Typography>
          <Box className="mt-2 flex flex-wrap gap-4">
            <ReactSortable
              className="flex flex-wrap gap-4"
              list={clubData.club_images}
              setList={updateImagesOrder}
            >
              {clubData.club_images.map((img, index) => (
                <div
                  key={index}
                  className="relative w-24 h-24 bg-gray-100 rounded-lg shadow-lg overflow-hidden"
                >
                  <img
                    src={img}
                    alt="Club Preview"
                    className="object-cover w-full h-full"
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                    onClick={() => handleRemoveImage(img)}
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
            {isUploading && <Spinner />}
            <label className="w-24 h-24 cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:bg-slate-300 text-slate-500 rounded-lg">
              <Upload size={24} />
              <span className="mt-1 text-sm">Add image</span>
              <input
                type="file"
                onChange={upLoadImageClub}
                className="hidden"
                multiple
              />
            </label>
          </Box>
          {errors.club_images && (
            <Typography variant="caption" color="error">
              {errors.club_images}
            </Typography>
          )}
        </div>

        <Box className="mb-6">
          <Typography variant="h6" className="mb-2">
            Steps
          </Typography>
          {clubData.steps.map((step, index) => (
            <div
              key={step.id}
              className="border rounded-lg p-4 mb-4 border-gray-300 shadow-md relative space-y-4"
            >
              <div className="flex justify-between items-center">
                <h4 className="text-gray-700">Step {index + 1}</h4>
                <IconButton onClick={() => removeStep(step.id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </div>
              <TextField
                label={`Step name ${index + 1}`}
                value={step.name}
                error={!!errors.name}
                helperText={errors.name}
                onChange={(e) =>
                  setClubData((prev) => ({
                    ...prev,
                    steps: prev.steps.map((s) =>
                      s.id === step.id ? { ...s, name: e.target.value } : s
                    ),
                  }))
                }
                variant="outlined"
                fullWidth
                size="small"
                required
                className="mb-4"
              />
              <TextField
                label="Content"
                value={step.content}
                error={!!errors.content}
                helperText={errors.content}
                onChange={(e) =>
                  setClubData((prev) => ({
                    ...prev,
                    steps: prev.steps.map((s) =>
                      s.id === step.id ? { ...s, content: e.target.value } : s
                    ),
                  }))
                }
                variant="outlined"
                fullWidth
                multiline
                size="small"
                required
                className="mb-4"
              />
              <div className="flex items-center gap-4">
                {step.image && (
                  <div className="relative w-24 h-24 bg-gray-100 rounded-lg shadow-lg overflow-hidden">
                    <img
                      src={step.image}
                      alt="Step Preview"
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}

                <label className="w-24 h-24 cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:bg-slate-300 text-slate-500 rounded-lg">
                  <Upload size={24} />
                  <span className="mt-1 text-sm">Select image </span>
                  <input
                    type="file"
                    onChange={(e) => updateImageStep(e, step.id)}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          ))}

          <Button onClick={addStep} variant="contained" color="success">
            Add Step
          </Button>
        </Box>
        <Button
          type="submit"
          onClick={handleSubmit}
          variant="contained"
          color="info"
          className="items-center px-4 py-2 rounded-md"
          fullWidth
        >
          {editData ? "Update Club" : "Add Club"}
        </Button>
      </Box>
    </div>
  );
}
