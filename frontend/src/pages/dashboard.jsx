import React, { useState, useEffect } from "react";
import Sidebar from "../layout/Sidebar"; 
import dsIcon from "../assets/ds.svg";
import custIcon from "../assets/cust.svg"; 
import orderIcon from "../assets/order.svg";
import Piechart from "../components/piechart";
import inventorylogo from "../assets/inventorylogo.svg";
import SalesSummaryChart from "../components/SalesSummaryChart";
import axios from "axios";

const config = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const DashboardCards = () => {
  const [dashboardData, setDashboardData] = useState({
    totalSales: 0,
    totalVolume: 0,
    totalCustomers: 0,
    activeCustomers: 0,
    activeOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    allProducts: 0,
    activeProducts: 0,
    abandonedCart: 0,
    abandonedCustomers: 0,
    lowStockCount: 0,
    expiredCount: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [salesRes, inventoryRes, productsRes] = await Promise.all([
        axios.get("http://localhost:3000/api/sales", config()),
        axios.get("http://localhost:3000/api/inventory", config()),
        axios.get("http://localhost:3000/products", config())
      ]);
      
      const activeProducts = productsRes.data.filter(
        product => product.status === "Publish"
      ).length;

      setDashboardData({
        ...salesRes.data,
        allProducts: productsRes.data.length,
        activeProducts,
        lowStockCount: inventoryRes.data.lowStockCount,
        expiredCount: inventoryRes.data.expiredCount
      });
      setError(null);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    
    // Set up polling for real-time updates
    const interval = setInterval(fetchDashboardData, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex">
        <Sidebar title={"Dashboard"} />
        <div className="flex flex-wrap gap-4 p-20 pl-60 w-full justify-center items-center">
          <div className="text-center">Loading dashboard data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex">
        <Sidebar title={"Dashboard"} />
        <div className="flex flex-wrap gap-4 p-20 pl-60 w-full justify-center items-center">
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar title={"Dashboard"} />
      
      <div className="flex flex-wrap gap-4 p-20 pl-60 w-full">
        {/* Sales Card */}
      <div className=" shadow-lg rounded-xl p-5 w-93 ml-12">
          <div className="flex justify-between items-center mb-2">
            <img src={dsIcon} alt="Sales Icon" className="w-6 h-6" />
            <span className="text-gray-400 text-sm">This Week</span>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Sales</p>
              <p className="text-lg font-semibold">${dashboardData.totalSales.toFixed(2)}</p>
              <p className="text-green-500 text-xs">+0.00%</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mr-20">Volume</p>
              <p className="text-lg font-semibold">{dashboardData.totalVolume}</p>
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
              <p className="text-lg font-semibold">{dashboardData.totalCustomers}</p>
              <p className="text-green-500 text-xs">+0.00%</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm mr-20">Active</p>
              <p className="text-lg font-semibold">{dashboardData.activeCustomers}</p>
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
                <p className="text-lg font-semibold">{dashboardData.activeOrders}</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-gray-500 text-sm">Pending</p>
                <p className="text-lg font-semibold">{dashboardData.pendingOrders}</p>
              </div>
              <div className="flex flex-col items-center mr-20">
                <p className="text-gray-500 text-sm">Completed</p>
                <p className="text-lg font-semibold">{dashboardData.completedOrders}</p>
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
            <div className="bg-blue-500 text-white shadow-md rounded-xl p-5 w-100 h-43 ml-3">
  <div className="flex justify-between items-center mb-2">
    <img src={inventorylogo} alt="Inventory Icon" className="w-6 h-6" />
  </div>
  <div className="flex justify-between text-center w-full mt-7">
    <div className="flex-1 ">
      <p className="text-sm">All Products</p>
      <p className="text-lg font-semibold">{dashboardData.allProducts}</p>
      
    </div>
    <div className="flex-1">
      <p className="text-sm">Published</p>
      <p className="text-lg font-semibold">{dashboardData.activeProducts}</p>
      
    </div>
    <div className="flex-1">
      <p className="text-sm">Unpublished</p>
      <p className="text-lg font-semibold">
        {dashboardData.allProducts - dashboardData.activeProducts}
      </p>
      {/* <p className="text-xs">+0.00%</p> */}
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
                  <p className="text-lg font-semibold">{dashboardData.abandonedCart}%</p>
                  <p className="text-green-500 text-xs">+0.00%</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Customers</p>
                  <p className="text-lg font-semibold">{dashboardData.abandonedCustomers}</p>
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
          <button 
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            onClick={() => window.location.href = "/NewInventory"}
          >
            + New Product
          </button>
        </div>

        {/* Sales Summary Chart */}
        <div className="-mt-80 w-210 ml-12">
          <SalesSummaryChart salesData={dashboardData} />
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;


