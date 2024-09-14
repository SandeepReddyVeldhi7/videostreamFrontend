import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import { toogleMenu } from "../../features/uiSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Sidebar1 = () => {
  const authStatus = useSelector((store) => store.auth.user);
  const avatar = authStatus?.avatar;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toogleBox = useSelector((state) => state.ui.isMenuOpen);

  const handleClick = (path) => {
    dispatch(toogleMenu()); // Close sidebar

    if (path) {
      navigate(path); // Navigate to the route if path is provided
    }
  };

  return (
    <div className="">
      {toogleBox && (
        <div
          className={`bg-black p-3 sm:hidden text-white   ml-24 mr-48 -my-0 min-h-screen top-0 left-0 absolute  transition-all duration-300 ease-in-out transform ${
            toogleBox ? "w-72 my-24 " : "w-0"
          }`}
          style={{ zIndex: 1000 }} // Add z-index style
        >
          <div className="flex justify-end">
            <button
              onClick={handleClick}
              className="text-white   text-3xl font-bold cursor-pointer"
            >
              &times;
            </button>
          </div>
          <img
            src={avatar || "https://via.placeholder.com/150?text=%F0%9F%98%91"}
            alt="avatar"
            className="w-14 h-14 mx-44 rounded-full"
          />
          <nav className="mt-2">
            <ul>
              <Link to="/">
                <li className="">
                  <button
                    onClick={() => handleClick()}
                    className="flex items-center space-x-2 text-white"
                  >
                    <span className="text-2xl ">🏠</span>
                    <span className="hover:text-green-400">Home</span>
                  </button>
                </li>
              </Link>
              <Link
                to="/likedVideos"
                onClick={() => handleClick()}
                className="mb-4 mx-4"
              >
                <button className="flex items-center space-x-2 text-white">
                  <span className="text-2xl">👍</span>
                  <span className="hover:text-green-400">Liked Videos</span>
                </button>
              </Link>
              <Link
                to="/user-Dashboard"
                onClick={() => handleClick()}
                className="mb-4 mx-4"
              >
                <li className="">
                  <button className="flex items-center space-x-2 text-white">
                    <span className="text-2xl">🎥</span>
                    <span className="hover:text-green-400">My Channel</span>
                  </button>
                </li>
              </Link>

              <Link
                to="/user-WatchHistory"
                onClick={() => handleClick()}
                className="mb-4 mx-4"
              >
                <button className="flex items-center space-x-2 text-white">
                  <span className="text-2xl">🧾</span>
                  <span className="hover:text-green-400">History</span>
                </button>
              </Link>
              <Link to="/user-Help" onClick={() => handleClick()} className="">
                <li className="">
                  <button className="flex items-center space-x-2 text-white p-2 rounded">
                    <span className="text-2xl">❓</span>
                    <span className="text-white bg-purple-500  hover:bg-green-500 hover:rounded hover:p-1">
                      Support
                    </span>
                  </button>
                </li>
              </Link>
              <Link
                to="/user-details"
                className="mb-4 mx-4"
                onClick={() => handleClick()}
              >
                <button className="flex items-center space-x-2 text-white">
                  <span className="text-2xl">⚙️</span>
                  <span className="hover:text-green-400">Settings</span>
                </button>
              </Link>
            </ul>
          </nav>

          <div className=" flex items-center space-x-3">
            <div className="mt-16">
              <Link
                to="/user-Upload"
                className="mb-4 mx-4"
                onClick={() => handleClick()}
              >
                <button className="bg-pink-500 text-white py-2 px-4 rounded">
                  Upload Video
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar1;
