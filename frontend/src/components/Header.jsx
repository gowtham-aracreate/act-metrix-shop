import React, { useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import notification from "../assets/notification.svg";
import profile from "../assets/profile.svg";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  return (
    <div className=" fixed top-0 border-t border-b border-gray-100 p-6 flex justify-between items-center">
      <h3 className="text-lg font-semibold">Dashboard</h3>
      <div className="relative">
        <div className="flex items-center text-gray-700 ml-190 rounded-lg p-2 w-37 cursor-pointer r-0"
          style={{ backgroundColor: "#FFCC9133" }}
          >
          Nanny's Shop
          <HiChevronDown className="h-5 w-5 ml-2" />
        </div>
        
          
      </div>
      <div className="flex r-0">
        <img src={notification} alt="Notification" className="h-6 w-6 mr-1" />
        <img src={profile} alt="Profile" className="h-6 w-6 mr-1" />
      </div>
    </div>
  );
};

export default Header;