import React, { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GrUpdate } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
function Profile() {
  const [userData, setUser] = useState(null);
  const userDataId = localStorage.getItem("UserDataID");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/userData/${userDataId}`
        );
        const data = await response.json();
        if (response.ok) {
          setUser(data.userData);
        } else {
          alert(data.message || "Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("An error occurred while fetching user data");
      }
    };

    if (userDataId) {
      fetchUserData();
    } else {
      alert("User not logged in");
      window.location.href = "/login";
    }
  }, [userDataId]);

  const handleDelete = async () => {
    // Ask for confirmation before deleting the account
    const isConfirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    // Proceed only if the user confirms
    if (isConfirmed) {
      try {
        const response = await fetch(
          `http://localhost:8081/userData/${userDataId}`,
          {
            method: "DELETE",
          }
        );
        const data = await response.json();

        if (response.ok) {
          alert("Account deleted successfully");
          localStorage.removeItem("UserDataID");
          window.location.href = "/";
        } else {
          alert(data.message || "Failed to delete user");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("An error occurred while deleting user");
      }
    } else {
      // User canceled the deletion
      alert("Account deletion canceled.");
    }
  };

  const handleUpdate = () => {
    window.location.href = `/updateProfile/${userDataId}`;
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <div className="max-w-[800px] w-full mx-auto p-4 border border-blue-500 rounded-lg shadow-md">
          <div className="bg-blue-600 p-6 text-white rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-500 p-3 rounded-full">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold uppercase">{userData.fullName}</h1>
                <p className="text-blue-100">{userData.email}</p>
              </div>
            </div>
          </div>
          {/* Profile Content */}
          <div className="p-6 space-y-6">
            {/* Contact Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Contact Information
              </h2>

              <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg dark:bg-gray-700">
                <MdEmail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Email
                  </p>
                  <p className="text-gray-900 dark:text-white">
                    {userData.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg dark:bg-gray-700">
                <FaPhoneAlt className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Phone
                  </p>
                  <p className="text-gray-900 dark:text-white">
                    {userData.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg dark:bg-gray-700">
                <FaLocationDot className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Address
                  </p>
                  <p className="text-gray-900 dark:text-white">
                    {userData.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <button
                onClick={handleUpdate}
                className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition cursor-pointer"
              >
                <GrUpdate className="w-4 h-4" />
                <span>Update Profile</span>
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition cursor-pointer"
              >
                <MdDelete className="w-4 h-4" />
                <span>Delete Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
