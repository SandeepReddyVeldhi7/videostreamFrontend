import React, { useState, useEffect } from "react";
import { useLogout } from "../../hooks/auth.hook";
import { useDispatch, useSelector } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiSearch } from "react-icons/fi"; // Import search icon
import { toogleMenu } from "../../features/uiSlice";
import { setUser } from "../../features/authSlice";
import { setSearchQuery } from "../../features/searchSlice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast"; // Import toast

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((store) => store.auth.user);
  const searchQuery = useSelector((state) => state.search.query);
  const { mutateAsync: logout } = useLogout();

  const [searchText, setSearchText] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false); // State to toggle search input on small devices

  useEffect(() => {
    if (searchQuery) {
      // Update URL when searchQuery changes
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  }, [searchQuery, navigate]);

  const handleClickToogle = () => {
    dispatch(toogleMenu());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchQuery(searchText));
    toast.success(`Searching for: ${searchText}`); // Toast for search action
  };

  const handleLogout = async () => {
    try {
      const session = await logout();
      if (session) {
        dispatch(setUser(null));
        toast.success("Successfully logged out!"); // Success toast for logout
      }
    } catch (error) {
      toast.error("Failed to logout. Please try again!"); // Error toast for logout failure
    }
  };

  const toggleSearchInput = () => {
    setShowSearchInput((prev) => !prev);
  };

  return (
    <div className="bg-black header flex items-center justify-between p-4 fixed w-full z-50">
      <Link to="/" className="flex items-center gap-2">
        <img
          alt="logo"
          className="w-16 h-14 sm:w-12 sm:h-10 object-cover rounded-xl cursor-pointer"
          src="../../../assests/images.png"
        />
        <h1 className="text-2xl font-bold text-white hidden sm:block">
          Show 🔥
        </h1>
      </Link>

      <div className="flex items-center gap-4">
        <div className="flex items-center ">
          <form
            onSubmit={handleSubmit}
            className={` flex items-center absolute left-0 right-0 z-50 ${
              showSearchInput ? "block" : "hidden"
            } sm:relative sm:flex sm:z-auto`}
          >
            <h1 className="bg-white mx-2 p-2 sm:hidden" onClick={toggleSearchInput}>
              ⬅️
            </h1>
            <input
              type="search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full sm:w-96 rounded-l-3xl border border-slate-400 text-black px-4 py-2"
              placeholder=" 🔍 Search"
            />
            <button
              type="submit"
              className="bg-purple-700 px-4 py-2.5 rounded-r-3xl"
            >
              Search
            </button>
          </form>
          {!showSearchInput && (
            <h1 className="text-2xl font-bold text-white block sm:hidden">
              Show 🔥
            </h1>
          )}
          <FiSearch
            className="text-white sm:hidden w-6 h-6 ml-2 cursor-pointer"
            onClick={toggleSearchInput}
          />
        </div>

        <GiHamburgerMenu
          onClick={handleClickToogle}
          className="sm:hidden w-8 h-8 text-white cursor-pointer"
        />
      </div>

      <div className="flex items-center gap-4">
        {authStatus ? (
          <>
            <button
              className="bg-gray-500 hover:bg-slate-400 px-4 py-1 rounded-lg text-white"
              onClick={handleLogout}
            >
              Logout
            </button>
            <Link to="/user-details" className="flex items-center">
              <img
                src={authStatus?.avatar}
                alt={authStatus?.username}
                className="h-10 w-10 border border-black rounded-full"
              />
            </Link>
          </>
        ) : (
          <Link
            to="/login"
            className="text-white font-bold bg-purple-500 px-4 py-1 rounded-lg"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
