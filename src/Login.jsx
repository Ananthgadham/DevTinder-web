import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react"; // For toggling password visibility
import { addUser } from "./utils/userSlice";
import BaseUrl from "./utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null); // Profile picture file (only for signup)
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle file selection for profile picture
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Upload image to Cloudinary and return the secure URL
  const uploadImageToCloudinary = async () => {
    if (!image) return "";
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "devtinder_present");
    formData.append("folder", "devtinder");
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dbowf4gl7/image/upload",
        formData
      );
      console.log("Image uploaded:", response.data.secure_url);
      return response.data.secure_url;
    } catch (err) {
      console.error("Error uploading image:", err);
      return "";
    }
  };

  // Handler for login (without profile picture)
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BaseUrl + "login",
        { email, password },
        { withCredentials: true }
      );
      console.log(res.data);
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      console.log(err.response.data);
      setError(err.response.data.error);
    }
  };

  // Handler for signup including profile picture upload
  const handleSignup = async () => {
    try {
      // Upload profile picture if selected
      const uploadedImageUrl = await uploadImageToCloudinary();
      const res = await axios.post(
        BaseUrl + "signup",
        { email, password, firstName, lastName, profilePic: uploadedImageUrl },
        { withCredentials: true }
      );
      console.log(res.data);
      dispatch(addUser(res.data.saveduser));
      navigate("/profile");
    } catch (err) {
      console.log(err.response.data);
      setError(err.response.data.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-y-auto bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Signup"}
        </h2>
        <div className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="block text-gray-700 font-medium">
                  First Name
                </label>
                <input
                  type="text"
                  className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  Profile Picture
                </label>
                <input
                  type="file"
                  className="input input-bordered w-full max-w-xs"
                  onChange={handleFileChange}
                />
              </div>
            </>
          )}
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="mt-1 w-full border border-gray-300 rounded-md p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="w-5 h-5 text-gray-600" />
                ) : (
                  <EyeIcon className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="mt-4">
            <button
              onClick={isLogin ? handleLogin : handleSignup}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              {isLogin ? "Login" : "Signup"}
            </button>
          </div>
          <p
            className="text-center mt-4 text-blue-600 cursor-pointer hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "New User? Signup" : "Existing user? Login"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
