import { useState } from "react";
import apiService from "@/services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function AccountPage() {
  const [name, setName] = useState("John Doe"); // Replace with real data from session or API
  const [email, setEmail] = useState("john.doe@example.com"); // Replace with real data from session or API
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match.");
      return;
    }

    try {
      await apiService.put("/api/account/change-password", {
        currentPassword,
        newPassword,
      });
      setMessage("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setMessage("Failed to update password. Please try again.");
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await apiService.put("/api/account/update-profile", {
        name,
        email,
      });
      setMessage("Profile updated successfully.");
    } catch (error) {
      setMessage("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Account Information</h1>

      {message && <div className="mb-4 text-sm text-red-600">{message}</div>}

      <form onSubmit={handleUpdateProfile} className="mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Update Profile
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Change Password</h2>

      <form onSubmit={handlePasswordChange}>
        <div className="mb-4 relative">
          <label className="block text-sm font-medium text-gray-700">
            Current Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
          <button
            type="button"
            className="absolute right-2 top-8 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FontAwesomeIcon icon={faEye} className="h-5" />
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} className="h-5" />
            )}
          </button>
        </div>

        <div className="mb-4 relative">
          <label className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
          <button
            type="button"
            className="absolute right-2 top-8 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FontAwesomeIcon icon={faEye} className="h-5" />
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} className="h-5" />
            )}
          </button>
        </div>

        <div className="mb-6 relative">
          <label className="block text-sm font-medium text-gray-700">
            Confirm New Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
          <button
            type="button"
            className="absolute right-2 top-8 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FontAwesomeIcon icon={faEye} className="h-5" />
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} className="h-5" />
            )}
          </button>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}
