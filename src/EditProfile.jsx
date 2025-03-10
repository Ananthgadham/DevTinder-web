import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Baseurl from './utils/constants';
import { addUser } from './utils/userSlice';

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [phoneno, setPhoneno] = useState(user.phoneno);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);
  // State for profile picture file and its URL
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState(user.profilePic || "");

  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = await axios.post(
        Baseurl + "profile/update",
        { firstName, lastName, phoneno, gender, about },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.user));
      setToast(true);
      setTimeout(() => setToast(false), 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  const updateProfilePicture = async (file) => {
    if (!file) {
      setError("Please select an image to update.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "devtinder_present");
    formData.append("folder", "devtinder");
    try {
      const cloudinaryRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dbowf4gl7/image/upload",
        formData
      );
      const newProfilePicUrl = cloudinaryRes.data.secure_url;
      setProfilePicUrl(newProfilePicUrl);
      const res = await axios.post(
        Baseurl + "profile/updateProfilePic",
        { profilePic: newProfilePicUrl },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.user));
      setToast(true);
      setTimeout(() => setToast(false), 3000);
    } catch (err) {
      setError("Failed to update profile picture.");
    }
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicFile(file);
      updateProfilePicture(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 overflow-y-auto">
      <div className="bg-white shadow-2xl rounded-xl w-full max-w-md p-8 mx-auto">
        <div className="flex flex-col items-center">
          {/* Profile Picture with Pencil Icon Overlay */}
          <div className="relative w-24 h-24 overflow-hidden rounded-full">
            <img
              src={profilePicUrl || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
            />
            <label
              htmlFor="profilePicInput"
              className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L7 21H3v-4L16.732 3.732z" />
              </svg>
            </label>
            <input
              type="file"
              id="profilePicInput"
              className="hidden"
              onChange={handleProfilePicChange}
            />
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-gray-800">Edit Profile</h2>
        </div>
        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">First Name</label>
            <input
              type="text"
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Last Name</label>
            <input
              type="text"
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Phone No</label>
            <input
              type="text"
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={phoneno}
              onChange={(e) => setPhoneno(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Gender</label>
            <input
              type="text"
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">About</label>
            <input
              type="text"
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>
        </div>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            onClick={saveProfile}
          >
            Update Profile Details
          </button>
        </div>
      </div>
      {toast && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white py-2 px-6 rounded-lg shadow-lg">
          Updated successfully.
        </div>
      )}
    </div>
  );
};
export default EditProfile;