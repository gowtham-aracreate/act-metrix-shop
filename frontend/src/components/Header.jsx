import React from "react";
//profile pic as logo4
import logo4 from "../assets/logo4.svg";
//notification pic as logo5
import logo5 from "../assets/logo5.svg";


const Header = () => {
  return (
    <div className="bg-white w-full border-t border-b border-gray-100 p-4 flex justify-between items-center">
      <h3 className="text-lg font-bold">Dashboard</h3>
      <div className="text-gray-700 ml-150 rounded-lg bg-yellow-100 p-2 w-37">
        Nanny's Shop
      </div>
      <img src={logo5} alt="Notification" className="h-6 w-6 mr-1" />
      <img src={logo4} alt="Profile" className="h-6 w-6 mr-1" />
       
    </div>
  );
};

export default Header;