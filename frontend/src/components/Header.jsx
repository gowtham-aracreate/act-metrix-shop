import React, { useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import notification from "../assets/notification.svg";
import profile from "../assets/profile.svg";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="bg-white w-full border-t border-b border-gray-100 p-4 flex justify-between items-center">
      <h3 className="text-lg font-bold">Dashboard</h3>
      
        <div className="flex items-center text-gray-700 ml-150 rounded-lg bg-yellow-100 p-2 w-37 cursor-pointer">
          Nanny's Shop
          <HiChevronDown className="h-5 w-5 ml-2" />
         
        
      </div>
      <img src={notification} alt="Notification" className="h-6 w-6 mr-1" />
      <img src={profile} alt="Profile" className="h-6 w-6 mr-1" />
    </div>
  );
};

export default Header;