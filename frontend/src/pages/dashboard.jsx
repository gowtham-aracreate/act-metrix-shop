
import React, { useState, useEffect } from "react";
import Sidebar from "../layout/Sidebar";
import dsIcon from "../assets/ds.svg";
import custIcon from "../assets/cust.svg";
import orderIcon from "../assets/order.svg";
import Piechart from "../components/piechart";
import inventorylogo from "../assets/inventorylogo.svg";
import SalesSummaryChart from "../components/SalesSummaryChart";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const config = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const timeRanges = [
  { value: "7", label: "Last 7 Days" },
  { value: "30", label: "Last 30 Days" },
  { value: "week", label: "Last Week" },
  { value: "month", label: "Last Month" },
  { value: "year", label: "Last Year" },
];
const getDaysFromRange = (range) => {
  switch (range) {
    case "week":
      return 7;
    case "month":
      return 30;
    case "year":
      return 365;
    default:
      return parseInt(range);
  }
};

const DashboardCards = () => {
  const navigate = useNavigate();
  
    const [dashboardData, setDashboardData] = useState({
    totals: {
      sales: 0,
      volume: 0,
      customers: 0,
      products: 0,
      orders: 0
    },
    statusCounts: {
      customers: {
        active: 0,
        inactive: 0
      },
      products: {
        active: 0,
        inactive: 0,
        lowStock: 0
      },
      orders: {
        pending: 0,
        completed: 0,
        total: 0,
        abandoned: 0,
        abandonedPercentage: 0
      }
    },
    recentOrders: []
  });

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/dashboard/summary", config());
      setDashboardData(response.data);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } 
  };

  useEffect(() => {
    fetchDashboardData("sales");
    fetchDashboardData("customers");
    fetchDashboardData("orders");
  }, []);
  return (
    <div className="">
      <Sidebar title={"Dashboard"} />

      <div className="ml-64 mt-15 bg-[#5E636614] h-screen">
        <div className="ml-6">
          {/* Sales Card */}
          <div className="flex pt-5">
            <div className="shadow-lg rounded-xl p-5 w-100 bg-white mr-4">
              <div className="flex justify-between items-center mb-2">
                <img src={dsIcon} alt="Sales Icon" className="w-8 h-8" />           
             </div>
              <div className="flex justify-between items-center pt-4">
                <div>
                  <p className="text-gray-500 text-sm">Sales</p>
                  <p className="text-lg font-semibold">$ {dashboardData.totals.sales.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mr-20">Volume</p>
                  <p className="text-lg font-semibold">{dashboardData.totals.volume}</p>
                </div>
              </div>
            </div>

            {/* Customers Card */}
            <div className="bg-white shadow-lg rounded-xl p-5 w-100 mr-4">
              <div className="flex justify-between items-center mb-2">
                <img src={custIcon} alt="Customers Icon" className="w-8 h-8" />
              </div>
              <div className="flex justify-between items-center pt-4">
                <div className="text-center">
                  <p className="text-gray-500 text-sm">Total</p>
                  <p className="text-lg font-semibold">{dashboardData.totals.customers}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-500 text-sm">Active</p>
                  <p className="text-lg font-semibold">{dashboardData.statusCounts.customers.active}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-500 text-sm">Inactive</p>
                  <p className="text-lg font-semibold">{dashboardData.statusCounts.customers.inactive}</p>
                </div>
              </div>
            </div>

            {/* Orders Card */}
            <div className="bg-white shadow-lg rounded-xl p-5 h-35 w-100 mr-4">
              <div className="flex justify-between items-center mb-2">
                <img src={orderIcon} alt="Orders Icon" className="w-8 h-8" />
              </div>
              <div className="flex justify-between pt-4">
                <div className="flex justify-between w-full text-center">
                  <div className="flex flex-col items-center">
                    <p className="text-gray-500 text-sm">All orders</p>
                    <p className="text-lg font-semibold">{dashboardData.totals.orders}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-gray-500 text-sm">Pending</p>
                    <p className="text-lg font-semibold">{dashboardData.statusCounts.orders.pending}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-gray-500 text-sm">Completed</p>
                    <p className="text-lg font-semibold">{dashboardData.statusCounts.orders.completed}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col w-full">
              <div className="flex pt-5">
                {/* Pie Chart */}
                <div className="flex">
                  <Piechart
                    lowStockCount={dashboardData.statusCounts.products.lowStock}
                    expiredCount={dashboardData.statusCounts.products.pending || 0}
                    inStockCount={dashboardData.totals.products - dashboardData.statusCounts.products.lowStock}
                  />
                </div>

                <div className="flex flex-col">
                  {/* Inventory Card */}
                  <div className="bg-blue-500 text-white shadow-md rounded-xl p-5 w-100 h-43 ml-3">
                    <div className="flex justify-between items-center mb-2">
                      <img src={inventorylogo} alt="Inventory Icon" className="w-8 h-8" />
                    </div>
                    <div className="flex justify-between text-center w-full mt-10">
                      <div className="flex flex-col">
                        <p className="text-sm">All Products</p>
                        <p className="text-lg font-semibold">{dashboardData.totals.products}</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-sm">Published</p>
                        <p className="text-lg font-semibold">{dashboardData.statusCounts.products.active}</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-sm">Unpublished</p>
                        <p className="text-lg font-semibold">
                          {dashboardData.statusCounts.products.inactive}
                        </p>
                      </div>
                    </div>
                  </div>


                  {/* Abandoned Cart Card */}
                  <div className="bg-white shadow-md rounded-xl p-5 w-100 h-43 ml-3 mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <img src={custIcon} alt="Cart Icon" className="w-10 h-10" />
                    </div>
                    <div className="flex justify-between pt-10">
                      
                      <div>
                        <p className="text-gray-500 text-sm ">Customers</p>
                        <p className="text-lg font-semibold">
                          {dashboardData.totals.customers || 0}
                        </p>
                      </div>
                      <div>
                        <p className="text-red-500 text-sm pr-25">Abandoned Cart</p>
                        <p className="text-lg font-semibold">
                          {dashboardData.statusCounts.orders.pending ||0}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-210 pt-4 ">
                <SalesSummaryChart salesData={dashboardData} />
              </div>
            </div>
            <div className=" mt-5 bg-white shadow-md rounded-xl p-5 w-[530px] h-auto mr-4">
              <p className="text-gray-500 text-lg font-semibold mb-4">Recent Orders</p>

              {dashboardData.recentOrders.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <img src={orderIcon} alt="No Orders" className="w-20 h-20" />
                  <h4 className="text-gray-400 mt-2">No Orders Yet?</h4>
                  <p className="text-center text-gray-500">
                    Add products to your store and start selling to see orders here.
                  </p>
                  <button
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    onClick={() => navigate("/NewInventory")}
                  >
                    + New Product
                  </button>
                </div>
              ) : (
                <div className="overflow-y-auto max-h-[350px]">
                  <table className="w-full">
                    <tbody>
                      {dashboardData.recentOrders.map((order) => (
                        <tr
                          key={order._id}
                          className="hover:bg-gray-50 cursor-pointer"
                          onClick={() => navigate(`/orders/${order._id}`)}
                        >
                          <td className="py-3 flex items-center">
                            <div>
                              <div className="text-gray-600 font-medium text-sm font-semibold">
                                {order.items[0]?.productName || "Unknown Product"}
                              </div>
                              <div className="text-gray-500 text-sm">
                                ${order.items[0]?.price?.toFixed(2)} × {order.items[0]?.quantity}
                              </div>
                            </div>
                          </td>
                          <td className="py-3 text-gray-600 text-right">
                            <div className="text-sm text-gray-400">
                              {formatDate(order.orderDate)}
                            </div>
                            <span
                              className={`px-4 py-1 rounded-full text-xs font-medium ${order.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Pending"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                                }`}
                            >
                              {order.status || "Pending"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;