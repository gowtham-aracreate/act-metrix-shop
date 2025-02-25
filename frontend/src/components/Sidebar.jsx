import React from "react";
import { Link } from "react-router-dom";
import { SlArrowRight } from "react-icons/sl";
import { IoLogOut } from "react-icons/io5";
import metrixlogo from "../assets/metrixlogo.svg";
import Category from "../assets/Category.svg";
import orderlogo from "../assets/orderlogo.svg";
import customerlogo from "../assets/customerslogo.svg";
import inventorylogo from "../assets/inventorylogo.svg";
import conversationslogo from "../assets/conversationslogo.svg";
import settingslogo from "../assets/settingslogo.svg";
import contactlogo from "../assets/contactlogo.svg";
import giftlogo from "../assets/giftlogo.svg";
const Sidebar = () => {
  return (
    <div className="w-64 text-black-500 p-6 fixed left-0 top-0 shadow-md">
      
      <div className="flex items-center mb-6">
        <img src={metrixlogo} alt="Logo" className="h-8 w-8 mr-2" />
        <h2 className="text-lg font-bold text-gray-900">Metrix</h2>
      </div>

      
      <ul className="space-y-2">
      
        <li className="p-3 bg-blue-400 text-black-600 font-semibold rounded-md flex items-center">
        <img src={Category} alt="Category" className="h-6 w-6 mr-2" />
          Dashboard
          </li>
        <li className="p-3 flex items-center hover:bg-gray-200 rounded-md">
          <img src={orderlogo} alt="Orders" className="h-6 w-6 mr-2" />
          Orders
        </li>
        <li className="p-3 flex items-center hover:bg-gray-200 rounded-md">
          <img src={customerlogo} alt="Customers" className="h-6 w-6 mr-2" />
          Customers
        </li>
        <li className="p-3 flex items-center hover:bg-gray-200 rounded-md">
          <img src={inventorylogo} alt="Inventory" className="h-6 w-6 mr-2" />
          Inventory
        </li>
        <li className="p-3 flex items-center hover:bg-gray-200 rounded-md">
          <img src={conversationslogo} alt="Conversations" className="h-6 w-6 mr-2" />
          Conversations
        </li>
        <li className="p-3 flex items-center hover:bg-gray-200 rounded-md">
          <img src={settingslogo} alt="Settings" className="h-6 w-6 mr-2" />
          Settings
        </li>

        
        <li className="mt-25 p-3 flex items-center bg-gray-100 rounded-md">
          <img src={contactlogo} alt="Contact" className="h-6 w-6 mr-2" />
          Contact Support
        </li>

        
        <li className="mt-6 p-4 flex items-center rounded-lg" style={{backgroundColor: "#FFCC9133"}}>
  <img src={giftlogo} alt="Gift" className="h-6 w-6 mr-3" />
  <div className=" flex-col ">
  <p className="text-black text-md font-semibold w-50">Free Gift Awaits You!</p>
  <p className="text-sm text-gray-600">Upgrade your account</p>  </div>
  <SlArrowRight className="h-4 w-4 text-gray-500" />
</li>

      </ul>

      
      <div className="mt-6">
        <div className="p-3 flex items-center text-red-500 hover:bg-red-100 rounded-md cursor-pointer">
          <IoLogOut className="h-5 w-5 mr-2" />
          Logout
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
