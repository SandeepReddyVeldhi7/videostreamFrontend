import React from 'react'
import { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from 'react-router-dom';


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);


  const closeSidebar = () => {
    setIsOpen(false);
 }
  
  const toggleSidebar = () => {
   console.log("Toggling sidebar");
  setIsOpen(!isOpen)
};

  const menuItems = [
    { name: "Home", icon: "🏠", link: "/" },
    { name: "Liked Videos", icon: "👍", link: "/likedVideos" },
    { name: "History", icon: "📜", link: "/user-WatchHistory" },
    { name: "My Channel", icon: "📺", link: "/user-Dashboard" },
    { name: "My Studio", icon: "🎥", link: "/user-Upload" },
    { name: "Support", icon: "❓", link: "/user-Help" },
    { name: "Settings", icon: "⚙️", link: "/user-details" },
  ];

  return (
    <div
      className={` hidden sm:block text-white h-screen p-5 absoulte z-50 my-6 fixed ${
        isOpen ? "w-64 bg-black fixed" : "w-0 fixed "
      } duration-300  lg:absolute `}
    >
      <button
        className="absolute -top-1 left-0   bg-purple-700 p-1 rounded-md focus:outline-none"
        onClick={toggleSidebar}
      >
        <GiHamburgerMenu className="h-5 w-5 cursor-pointer mx-4 " />
      </button>
      <ul className="mt-10 space-y-4">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`flex items-center cursor-pointer p-2 hover:bg-gray-700 ${
              isOpen ? "hover:bg-gray-700" : "hover:bg-gray-200"
            }  rounded-md`}
          >
            <Link
              to={item.link}
              className="flex items-center w-full"
              onClick={closeSidebar} // Close the sidebar on click
            >
              <span className={`ml-4 ${isOpen ? "block" : "hidden"}`}>
                {item.icon}
              </span>
              <span className={`ml-4 ${isOpen ? "block" : "hidden"}`}>
                {item.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;