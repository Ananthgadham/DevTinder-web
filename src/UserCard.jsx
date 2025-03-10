import React from "react";
import { removeUserFromFeed } from "./utils/feedSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import BaseUrl from "./utils/constants";
import { useSwipeable } from "react-swipeable";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, gender, about, profilePic } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status) => {
    try {
      console.log(`Sending request: ${status} for user ID: ${_id}`);
      await axios.post(`${BaseUrl}request/send/${status}/${_id}`, {}, { withCredentials: true });
      dispatch(removeUserFromFeed(_id));
    } catch (err) {
      console.error("Request failed:", err);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      console.log("Swiped Left - Ignoring user");
      handleSendRequest("ignore");
    },
    onSwipedRight: () => {
      console.log("Swiped Right - Showing Interest");
      handleSendRequest("intrest");
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div {...handlers} className="w-full max-w-md mx-auto my-4">
      <div className="card bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Adjusted image container with increased height and custom object position */}
        <figure className="overflow-hidden h-64 sm:h-72 md:h-80">
          <img
            src={profilePic}
            alt="User"
            className="object-cover w-full h-full"
            style={{ objectPosition: "center 20%" }}
          />
        </figure>
        <div className="card-body p-4">
          <h2 className="card-title text-xl font-semibold text-gray-800">
            {firstName} {lastName}
          </h2>
          <div className="mt-2 flex items-center space-x-2">
            <span className="font-medium text-gray-600">Gender:</span>
            <span className="text-gray-800">{gender}</span>
          </div>
          <div className="mt-2">
            <span className="font-medium text-gray-600">About:</span>
            <p className="text-gray-700 mt-1">{about}</p>
          </div>
          <div className="card-actions justify-center mt-4">
            <button
              onClick={() => handleSendRequest("ignore")}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-200"
            >
              Ignore
            </button>
            <button
              onClick={() => handleSendRequest("intrest")}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-200"
            >
              Interest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
