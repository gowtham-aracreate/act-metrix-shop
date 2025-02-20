import React from "react";
import { Link } from "react-router-dom";

import logo from "../assets/logo.svg"; 
import logo1 from "../assets/logo1.svg";
import logo2 from "../assets/logo2.svg";
import logo6 from "../assets/logo6.svg";
import logo7 from "../assets/logo7.svg";
import logo8 from "../assets/logo8.svg";
//contact logo
import logo9 from "../assets/logo9.svg";
//upgrade gift box logo
import logo10 from "../assets/logo10.svg";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white text-black-400 p-6 min-h-screen">
      <div>
        <div className="flex items-center mb-6">
          <img src={logo} alt="Logo" className="h-8 w-8 mr-2" />
          <h2 className="text-lg text-black-500 font-bold">Metrix</h2>
        </div>
        <ul className="space-y-2">
          <li>
            <div className="flex items-center p-3 hover:bg-gray-200 rounded-md text-black-500">
              Dashboard
            </div>
          </li>
          <li>
            <div className="flex items-center p-3 hover:bg-gray-200 rounded-md text-black-500">
              <img src={logo1} alt="Logo" className="h-6 w-6 mr-2" />
              Orders
            </div>
          </li>
          <li>
            <div className="flex items-center p-3 hover:bg-gray-200 rounded-md text-black-500">
              <img src={logo2} alt="Logo" className="h-6 w-6 mr-2" />
              Customers
            </div>
          </li>
          <li>
            <div className="flex items-center p-3 hover:bg-gray-200 rounded-md text-black-500">
              <img src={logo6} alt="Logo" className="h-6 w-6 mr-2" />
              Inventory
            </div>
          </li>
          <li>
            <div className="flex items-center p-3 hover:bg-gray-200 rounded-md text-black-500">
              <img src={logo7} alt="Logo" className="h-6 w-6 mr-2" />
              Conversations
            </div>
          </li>
          <li>
            <div className="flex items-center p-3 hover:bg-gray-200 rounded-md text-black-500">
              <img src={logo8} alt="Logo" className="h-6 w-6 mr-2" />
              Settings
            </div>
          </li>
          <li className="mt-4">
            <div className="flex items-center p-3 hover:bg-gray-200 rounded-lg text-black-500" style={{ backgroundColor: '#5E63661A' }}>
              <img src={logo9} alt="Logo" className="h-6 w-6 mr-2" />
              Contact support
            </div>
          </li>
          <li>
            <div className="flex items-center mt-4 p-4 bg-yellow-100 rounded-lg cursor-pointer">
              <img src={logo10} alt="Logo" className="h-6 w-6 mr-3" />
              <div>
                <p className="text-black font-medium">Free Gift Awaits You!</p>
                <p className="text-sm">Upgrade your account</p>
              </div>
            </div>
          </li>
        </ul>
        <div className="mt-4">
          <div className="w-full p-3 text-red-500 rounded-lg hover:bg-red-100">
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;