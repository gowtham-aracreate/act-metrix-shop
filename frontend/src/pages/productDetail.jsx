import React from "react";
import view from "../assets/view.svg";
import sales from "../assets/sales.svg";
import order from "../assets/order.svg";
import Table from "../components/Table";
import upload from "../assets/Upload.svg"
// import Header from "../layout/Header";
// import Sidebar from "../layout/Sidebar"

const ProductPage = () => {
  const tableContent = [
    {
      orderDate: "12 Aug 2022 - 12:25 am",
      orderType: "Home Delivery",
      trackingID: "9348fj73",
      orderTotal: "u20A6 25,000.00",
      action: "Completed",
      status: "Completed",
    },
    {
      orderDate: "12 Aug 2022 - 12:25 am",
      orderType: "Home Delivery",
      trackingID: "9348fj73",
      orderTotal: "u20A6 25,000.00",
      action: "In-Progress",
      status: "In-Progress",
    },
    {
      orderDate: "12 Aug 2022 - 12:25 am",
      orderType: "Pick Up",
      trackingID: "9348fj73",
      orderTotal: "u20A6 25,000.00",
      action: "Pending",
      status: "Pending",
    },
  ];

  const heading = [
    "Order Date",
    "Order Type",
    "Tracking ID",
    "Order Total",
    "Action",
    "Status",
  ];

  return (
    // <div className="flex h-screen">
    //   <Sidebar/>
    //   <div className="flex flex-col flex-1">
    //     <Header/>

    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Order Number #743648</h2>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-gray-800 text-white rounded">
            Edit product
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded">
            Suspend Customer
          </button>
        </div>
      </div>

      <div className="flex gap-4">
        <img src={upload} alt="" className="w-[186px] h-[145px]"/>
        <div className="bg-white shadow-sm rounded-lg p-4 w-full">
          <div className="flex items-center">
            <div className="p-2 rounded-md bg-orange-100">
              <img src={view} alt="Profile" className="h-5 w-5" />
            </div>
            <div>
              <p className="text-gray-800 text-md font-semibold">
                Janet Adebayo
              </p>
              <p className="text-gray-400 text-sm">
                Last Order{" "}
                <span className="text-gray-800 font-medium">12 Sept 2022</span>
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
              <p className="text-gray-800 font-semibold">
                janet.adebayo@gmail.com
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-4 w-full">
          <div className="flex items-center mb-2">
            <div className="p-2 rounded-md bg-orange-100 flex items-center justify-center">
              <img src={view} alt="Location" className="h-6 w-6" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 text-sm">Home Address</p>
              <p className="text-gray-800 font-semibold">
                No. 15 Adekunle Street, Yaba, Lagos State
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Billing Address</p>
              <p className="text-gray-800 font-semibold">
                No. 15 Adekunle Street, Yaba, Lagos State
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-sm rounded-lg p-4 w-full">
          <div className="flex justify-between items-center">
            <div className="p-2 rounded-md bg-blue-100">
              <img src={view} alt="Order Icon" className="h-5 w-5" />
            </div>
            <p className="text-gray-400 text-xs">All-time</p>
          </div>
          <p className="text-gray-500 text-sm mt-4">Total Orders</p>
          <p className="text-md font-bold text-gray-600">₦25,000.00</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8 mt-6">
        <div className="bg-white shadow-sm rounded-lg p-4 w-full">
          <div className="flex justify-between items-center">
            <div className="p-2 rounded-md bg-orange-100">
              <img src={view} alt="Order Icon" className="h-5 w-5" />
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

        <div className="bg-white shadow-sm rounded-lg p-4 w-full">
          <div className="flex justify-between items-center">
            <div className="p-2 rounded-md bg-orange-100">
              <img src={view} alt="Order Status" className="h-5 w-5" />
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
        <div className="bg-white shadow-sm rounded-lg p-4 w-full flex flex-col justify-start items-start">
          <img src={view} alt="cart" className="h-8 w-10 mb-2" />
          <p className="text-red-600 text-md mb-2">Abandoned Cart</p>
          <p className="text-md font-bold text-gray-600">2</p>
        </div>
      </div>
      <div className="mt-8">
        <Table
          title="Janet's Orders"
          tableContent={tableContent}
          heading={heading}
        />
      </div>
    </div>
  );
};
export default ProductPage;
