import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BaseUrl from './utils/constants';
import { removeUser } from './utils/userSlice';
 // Adjust the relative path if needed

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BaseUrl + "logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log("Error logging out:", err);
    }
  };

  const handleLinkUsClick = (e) => {
    if (!user) {
      e.preventDefault();
      // Instead of updating document.body, update the background of the main content container
      const mainContent = document.getElementById("mainContent");
      if (mainContent) {
        mainContent.style.backgroundImage = `url(${'https://media.istockphoto.com/id/1413735503/photo/social-media-social-media-marketing-thailand-social-media-engagement-post-structure.jpg?s=1024x1024&w=is&k=20&c=hoho5UxFMxRK4u2AmtYl2i-psyyZROlXRrqsGfx1LSw='})`;
        mainContent.style.backgroundSize = "cover";
        mainContent.style.backgroundRepeat = "no-repeat";
        mainContent.style.backgroundPosition = "center";
      }
    }
  };

  return (
    <>
      <nav
        className="navbar fixed top-0 w-full z-50 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600"
        style={{ height: '64px' }}
      >
        <div className="flex-1">
          <Link
            to="/"
            onClick={handleLinkUsClick}
            className="btn btn-ghost normal-case text-xl text-white"
          >
            LinkUs
          </Link>
        </div>
        <div className="flex-none gap-2 mx-8">
          {user ? (
            <div className="dropdown dropdown-end flex px-5">
              <p className="text-white">welcome {user.firstName}</p>
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={user.profilePic} alt="profile" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/requests">Requests</Link>
                </li>
                <li>
                  <Link to="/connections">Connection</Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            // When not logged in, no login/signup buttons are displayed
            <div className="flex-none gap-2 mx-8"></div>
          )}
        </div>
      </nav>
      {/* Spacer so that page content is not covered by the fixed nav */}
      <div style={{ height: '64px' }}></div>
    </>
  );
};

export default NavBar;
