import React from "react";
import Sidebar from "../layout/Sidebar"; 
import dsIcon from "../assets/ds.svg";
import custIcon from "../assets/cust.svg"; 
import orderIcon from "../assets/order.svg";
import Piechart from "../components/piechart";
import inventorylogo from "../assets/inventorylogo.svg";
import SalesSummaryChart from "../components/SalesSummaryChart";

const DashboardCards = () => {
  return (
    <div className="flex">
        <Sidebar 
        title={"Dashboard"}
        />

      <div className="flex flex-wrap gap-4 p-20 pl-60 bg-[#EFF1F999] ">
        
        {/* Sales Card */}
      <div className=" shadow-lg rounded-xl p-5 w-93 ml-12">
          <div className="flex justify-between items-center mb-2">
            <img src={dsIcon} alt="Sales Icon" className="w-6 h-6" />
            <span className="text-gray-400 text-sm">This Week </span>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Sales</p>
              <p className="text-lg font-semibold">$0.00</p>
              <p className="text-green-500 text-xs">+0.00%</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mr-20">Volume</p>
              <p className="text-lg font-semibold">0</p>
            </div>
          </div>
        </div>

        {/* Customers Card */}
        <div className="bg-white shadow-lg rounded-xl p-5 w-93">
          <div className="flex justify-between items-center mb-2">
            <img src={custIcon} alt="Customers Icon" className="w-6 h-6" />
            <span className="text-gray-400 text-sm">This Week ▼</span>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Customers</p>
              <p className="text-lg font-semibold">0</p>
              <p className="text-green-500 text-xs">+0.00%</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mr-20">Active</p>
              <p className="text-lg font-semibold">0</p>
              <p className="text-green-500 text-xs">+0.00%</p>
            </div>
          </div>
        </div>

        {/* Orders Card */}
        <div className="bg-white shadow-lg rounded-xl p-5 w-93">
          <div className="flex justify-between items-center mb-2">
            <img src={orderIcon} alt="Orders Icon" className="w-6 h-6" />
            <span className="text-gray-400 text-sm">This Week ▼</span>
          </div>
          <div className="flex justify-between">
            <div className="flex justify-between w-full text-center">
              <div className="flex flex-col items-center">
                <p className="text-gray-500 text-sm">Active</p>
                <p className="text-lg font-semibold">0</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-gray-500 text-sm">Pending</p>
                <p className="text-lg font-semibold">0</p>
              </div>
              <div className="flex flex-col items-center mr-20">
                <p className="text-gray-500 text-sm">Completed</p>
                <p className="text-lg font-semibold">0</p>
                <p className="text-green-300 text-xs">+0.00%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pie Chart and Sales Summary */}
        <div className="flex gap-4 ml-12">
          {/* Pie Chart */}
          <Piechart />

          <div className="flex flex-col gap-4">
            {/* Inventory Card */}
            <div className="bg-blue-500 text-white shadow-md rounded-xl p-5 w-70 h-43 ml-3">
              <div className="flex justify-between items-center mb-2">
                <img src={inventorylogo} alt="Inventory Icon" className="w-6 h-6" />
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="text-sm">All Products</p>
                  <p className="text-lg font-semibold">0</p>
                  <p className="text-xs">+0.00%</p>
                </div>
                <div>
                  <p className="text-sm">Active</p>
                  <p className="text-lg font-semibold">0</p>
                  <p className="text-xs">+0.00%</p>
                </div>
              </div>
            </div>

            {/* Abandoned Cart Card */}
            <div className="bg-white shadow-md rounded-xl p-5 w-70 h-43 ml-3">
              <div className="flex justify-between items-center mb-2">
                <img src={custIcon} alt="Cart Icon" className="w-6 h-6" />
                <span className="text-gray-400 text-sm">This Week ▼</span>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="text-red-500 text-sm">Abandoned Cart</p>
                  <p className="text-lg font-semibold">0%</p>
                  <p className="text-green-500 text-xs">+0.00%</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Customers</p>
                  <p className="text-lg font-semibold">0</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders Card */}
        <div className="bg-white shadow-md rounded-xl p-9 w-92 h-170 ml-10 flex flex-col items-center justify-center">
          <p className="text-gray-500 text-lg font-semibold">Recent Orders</p>
          <img src={orderIcon} alt="No Orders" className="w-20 h-20" />
          <h4 className="text-gray-400 mt-2">No Orders Yet?</h4>
          <p>Add products to your store and start selling to see orders here.</p>
          <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg">
            + New Product
          </button>
        </div>

        {/* Sales Summary Chart */}
        <div className="-mt-80 w-180 ml-12">
          <SalesSummaryChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;


