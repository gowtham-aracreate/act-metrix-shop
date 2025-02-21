import React from "react";
import { Link } from "react-router-dom";
import { SlArrowRight } from "react-icons/sl";
import metrixlogo from "../assets/metrixlogo.svg"; 
import orderlogo from "../assets/orderlogo.svg";
import customerlogo from "../assets/customerslogo.svg";
import inventorylogo from "../assets/inventorylogo.svg";
import conversationslogo from "../assets/conversationslogo.svg";
import settingslogo from "../assets/settingslogo.svg";
import contactlogo from "../assets/contactlogo.svg";
import giftlogo from "../assets/giftlogo.svg";
import { IoLogOut } from "react-icons/io5";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white text-black-400 p-6 min-h-screen">
      <div>
        <div className="flex items-center mb-6">
          <img src={metrixlogo} alt="Logo" className="h-8 w-8 mr-2" />
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
              <img src={orderlogo} alt="Logo" className="h-6 w-6 mr-2" />
              Orders
            </div>
          </li>
          <li>
            <div className="flex items-center p-3 hover:bg-gray-200 rounded-md text-black-500">
              <img src={customerlogo} alt="Logo" className="h-6 w-6 mr-2" />
              Customers
            </div>
          </li>
          <li>
            <div className="flex items-center p-3 hover:bg-gray-200 rounded-md text-black-500">
              <img src={inventorylogo} alt="Logo" className="h-6 w-6 mr-2" />
              Inventory
            </div>
          </li>
          <li>
            <div className="flex items-center p-3 hover:bg-gray-200 rounded-md text-black-500">
              <img src={conversationslogo} alt="Logo" className="h-6 w-6 mr-2" />
              Conversations
            </div>
          </li>
          <li>
            <div className="flex items-center p-3 hover:bg-gray-200 rounded-md text-black-500">
              <img src={settingslogo} alt="Logo" className="h-6 w-6 mr-2" />
              Settings
            </div>
          </li>
          <li className="mt-4">
            <div className="flex items-center w-60 p-3 hover:bg-gray-200 rounded-lg text-black-500" style={{ backgroundColor: '#5E63661A' }}>
              <img src={contactlogo} alt="Logo" className="h-6 w-4 mr-2" />
              Contact support
            </div>
          </li>
          <li>
            <div className="flex items-center mt-4 p-4 w-60 bg-yellow-100 rounded-lg cursor-pointer">
              <img src={giftlogo} alt="Logo" className="h-6 w-6 mr-3" />
              <div className="flex items-center justify-between w-full">
                <div className="whitespace-nowrap">
                  <p className="text-black text-md">Free Gift Awaits You!</p>
                  <p className="text-sm">Upgrade your account</p>
                </div>
                <SlArrowRight className="h-4 w-3 ml-3 mt-7 " />
              </div>
            </div>
          </li>
        </ul>
        <div className="mt-5">
          <div className="p-4 flex items-center text-red-500 rounded-lg hover:bg-red-100 cursor-pointer">
            <IoLogOut className="h-5 w-5 mr-2" />
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;