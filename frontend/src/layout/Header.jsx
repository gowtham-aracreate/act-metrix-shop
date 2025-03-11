import React, { useState } from "react";
import notification from "../assets/notification.svg";
import profile from "../assets/profile.svg";
import Dropdown from "../components/dropdown";

const Header = ({children}) => {
  return (
    <div className=" absolute left-64 bg-white fixed top-0 border-t border-b border-gray-300 pt-4 pb-4 flex justify-between items-center">
      <h3 className="text-lg pl-3 font-semibold">Dashboard</h3>
      <div className="relative">
        <div className=" flex justify-between pl-235">
          <Dropdown
            dropdownButtonStyle="bg-[#FFCC9133] border-none justify-center pr-5 w-[173px] h-[32px] rounded-md "
            dropdownMenuStyle="bg-white"
            dropdownButtonText="Nanny's Shop"
          />
        </div>
      </div>
      <div className="flex r-0">
        <img src={notification} alt="Notification" className="h-6 w-6 mr-1" />
        <img src={profile} alt="Profile" className="h-6 w-6 mr-1" />
      </div>
      {children}
    </div>
  );
};

export default Header;





