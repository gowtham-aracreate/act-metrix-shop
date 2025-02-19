import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg"; 
import logo1 from "../assets/logo1.svg";
import logo2 from "../assets/logo2.svg";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white text-black-400 p-6 min-h-screen flex flex-col justify-between">
      <div>
        <div className="flex items-center mb-6">
          <img src={logo} alt="Logo" className="h-8 w-8 mr-2" />
          <h2 className="text-lg text-black-500 font-bold">Metrix</h2>
        </div>
        <ul className="space-y-2">
          <li>
          <div className="flex items-center p-3 hover:bg-gray-200 rounded-md text-black-500 ">
  Dashboard
</div>
<div className="flex items-center p-3 hover:bg-gray-200 rounded-md text-black-500 ">
<img src={logo1} alt="Logo" className="h-6 w-6 mr-2" />
  Orders
  </div>
  <div className="flex items-center p-3 hover:bg-gray-200 rounded-md text-black-500 ">
    <img src={logo2} alt="Logo" className="h-6 w-6 mr-2" />
  Customers
</div>
<div className="flex items-center p-3 hover:bg-gray-200 rounded-md text-black-500 ">
Inventory
</div>
<div className="flex items-center p-3 hover:bg-gray-200 rounded-md text-black-500 ">
Conversations
</div>
<div className="flex items-center p-3 hover:bg-gray-200 rounded-md text-black-500 ">
Settings
</div>
          </li>
          
        </ul>
      </div>
  
    </div>
  );
};

export default Sidebar;