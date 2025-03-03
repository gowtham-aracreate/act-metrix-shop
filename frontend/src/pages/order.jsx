import React from "react";
import profileIcon from "../assets/profile.svg";
import locationIcon from "../assets/location.svg";
import ordericon from "../assets/ordericon.svg";
import cart from "../assets/cart.svg";
import orderstatus from "../assets/orderstatus.svg";
import Table from "../components/Table";
const OrderPage = () => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-3 gap-8">
        {/* First Card */}
        <div className="bg-white shadow-sm rounded-lg p-4 w-full">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-orange-100">
              <img src={profileIcon} alt="Profile" className="h-5 w-5" />
            </div>
            <div>
              <p className="text-gray-800 text-md font-semibold">Janet Adebayo</p>
              <p className="text-gray-400 text-sm">
                Last Order <span className="text-gray-800 font-medium">12 Sept 2022</span>
              </p>
            </div>
            <button className="ml-auto px-3 py-1 text-green-600 bg-green-100 rounded-md text-sm">
              Active
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-gray-500 text-sm">Phone</p>
              <p className="text-gray-800 font-semibold">+2348065650633</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Email</p>
              <p className="text-gray-800 font-semibold">janet.adebayo@gmail.com</p>
            </div>
          </div>
        </div>


<div className="bg-white shadow-sm rounded-lg p-4 w-full">
  {/* Flex container to align icon properly */}
  <div className="flex items-center mb-2">
    <div className="p-2 rounded-md bg-orange-100 flex items-center justify-center">
      <img src={locationIcon} alt="Location" className="h-6 w-6" />
    </div>
  </div>

  {/* Address Details */}
  <div className="flex justify-between">
    <div className="w-1/2">
      <p className="text-gray-500 text-sm">Home Address</p>
      <p className="text-gray-800 font-semibold">
        No. 15 Adekunle Street, Yaba, Lagos State
      </p>
    </div>
    <div className="w-1/2">
      <p className="text-gray-500 text-sm">Billing Address</p>
      <p className="text-gray-800 font-semibold">
        No. 15 Adekunle Street, Yaba, Lagos State
      </p>
    </div>
  </div>
</div>



        {/* Total Orders */}
        <div className="bg-white shadow-sm rounded-lg p-4 w-full">
          <div className="flex justify-between items-center">
            <div className="p-2 rounded-md bg-blue-100">
              <img src={ordericon} alt="Order Icon" className="h-5 w-5" />
            </div>
            <p className="text-gray-400 text-xs">All-time</p>
          </div>
          <p className="text-gray-500 text-sm mt-4">Total Orders</p>
          <p className="text-md font-bold text-gray-600">{"\u20A6"}25,000.00</p>
        </div>
      </div>

      {/* Dashboard Cards (2nd Row) */}
      <div className="grid grid-cols-3 gap-8 mt-6">
        {/* Orders Card */}
        <div className="bg-white shadow-sm rounded-lg p-4 w-full">
          <div className="flex justify-between items-center">
            <div className="p-2 rounded-md bg-orange-100">
              <img src={ordericon} alt="Order Icon" className="h-5 w-5" />
            </div>
            <p className="text-gray-400 text-xs">All-time</p>
          </div>
          <div className="mt-4 flex justify-around">
            <div className="flex flex-col items-center">
              <p className="text-gray-400 text-md">All Orders</p>
              <p className="text-md font-bold text-gray-600">10</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-gray-400 text-md">Pending</p>
              <p className="text-md font-bold text-gray-600">2</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-gray-400 text-md">Completed</p>
              <p className="text-md font-bold text-gray-600">8</p>
            </div>
          </div>
        </div>

        {/* Status Card */}
        <div className="bg-white shadow-sm rounded-lg p-4 w-full">
          <div className="flex justify-between items-center">
            <div className="p-2 rounded-md bg-orange-100">
              <img src={orderstatus} alt="Order Status" className="h-5 w-5" />
            </div>
            <p className="text-gray-400 text-xs">All-time</p>
          </div>
          <div className="mt-4 flex justify-around">
            <div className="flex flex-col items-center">
              <p className="text-gray-400 text-md">Canceled</p>
              <p className="text-md font-bold text-gray-600">0</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-gray-400 text-md">Returned</p>
              <p className="text-md font-bold text-gray-600">0</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-gray-400 text-md">Damaged</p>
              <p className="text-md font-bold text-gray-600">0</p>
            </div>
          </div>
        </div>

        {/* Abandoned Cart */}
        <div className="bg-white shadow-sm rounded-lg p-4 w-full">
          <div className="flex justify-between items-center">
            <div className="p-2 rounded-md bg-orange-100">
              <img src={cart} alt="Abandoned Cart" className="h-5 w-5" />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <p className="text-red-600 text-md mt-4 mr-2  ">Abandoned Cart</p>
            <p className="text-md font-bold text-gray-600 mt-4">2</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;




