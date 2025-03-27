// import React, { useState, useEffect } from "react";
// import Sidebar from "../layout/Sidebar"; 
// import dsIcon from "../assets/ds.svg";
// import custIcon from "../assets/cust.svg"; 
// import orderIcon from "../assets/order.svg";
// import Piechart from "../components/piechart";
// import inventorylogo from "../assets/inventorylogo.svg";
// import SalesSummaryChart from "../components/SalesSummaryChart";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const config = () => {
//   const token = localStorage.getItem("token");
//   return {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
// };

// const DashboardCards = () => {
//   const navigate = useNavigate();
//   const [dashboardData, setDashboardData] = useState({
//     totalSales: 0,
//     totalVolume: 0,
//     totalCustomers: 0,
//     activeCustomers: 0,
//     inactiveCustomers: 0,
//     activeOrders: 0,
//     pendingOrders: 0,
//     completedOrders: 0,
//     allProducts: 0,
//     activeProducts: 0,
//     abandonedCart: 0,
//     abandonedCustomers: 0,
//     lowStockCount: 0,
//     expiredCount: 0,
//     recentOrders: []
//   });
//   const [inventory, setInventory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const formatDate = (dateString) => {
//     if (!dateString) return "-";
//     const date = new Date(dateString);
//     return date.toLocaleString("en-GB", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       const [salesRes, inventoryRes, productsRes, ordersRes] = await Promise.all([
//         axios.get("http://localhost:3000/api/sales", config()),
//         axios.get("http://localhost:3000/api/inventory", config()),
//         axios.get("http://localhost:3000/products", config()),
//         axios.get("http://localhost:3000/orders/recent", config()) // Updated endpoint
//       ]);
      
//       const activeProducts = productsRes.data.filter(
//         product => product.status === "Publish"
//       ).length;

//       const salesData = salesRes.data || {};
      
//       setDashboardData({
//         totalSales: salesData.totalSales || 0,
//         totalVolume: salesData.totalVolume || 0,
//         totalCustomers: salesData.totalCustomers || 0,
//         activeCustomers: salesData.activeCustomers || 0,
//         inactiveCustomers: (salesData.totalCustomers || 0) - (salesData.activeCustomers || 0),
//         activeOrders: salesData.activeOrders || 0,
//         pendingOrders: salesData.pendingOrders || 0,
//         completedOrders: salesData.completedOrders || 0,
//         abandonedCart: salesData.abandonedCart || 0,
//         abandonedCustomers: salesData.abandonedCustomers || 0,
//         allProducts: productsRes.data?.length || 0,
//         activeProducts,
//         lowStockCount: inventoryRes.data?.lowStockCount || 0,
//         expiredCount: inventoryRes.data?.expiredCount || 0,
//         recentOrders: ordersRes.data || []
//       });
      
//       setInventory(productsRes.data || []);
//       setError(null);
//     } catch (err) {
//       console.error("Error fetching dashboard data:", err);
//       setError("Failed to load dashboard data. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDashboardData();
    
//     const interval = setInterval(fetchDashboardData, 30000); // Refresh every 30 seconds
    
//     return () => clearInterval(interval);
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex">
//         <Sidebar title={"Dashboard"} />
//         <div className="flex flex-wrap gap-4 p-20 pl-60 w-full justify-center items-center">
//           <div className="text-center">Loading dashboard data...</div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex">
//         <Sidebar title={"Dashboard"} />
//         <div className="flex flex-wrap gap-4 p-20 pl-60 w-full justify-center items-center">
//           <div className="text-red-500">{error}</div>
//           <button 
//             onClick={fetchDashboardData}
//             className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex">
//       <Sidebar title={"Dashboard"} />
      
//       <div className="flex flex-wrap gap-4 p-20 pl-60 w-full">
//         {/* Sales Card */}
//         <div className="shadow-lg rounded-xl p-5 w-93 ml-12">
//           <div className="flex justify-between items-center mb-2">
//             <img src={dsIcon} alt="Sales Icon" className="w-6 h-6" />
//             <span className="text-gray-400 text-sm">This Week</span>
//           </div>
//           <div className="flex justify-between items-center">
//             <div>
//               <p className="text-gray-500 text-sm">Sales</p>
//               <p className="text-lg font-semibold">${dashboardData.totalSales.toFixed(2)}</p>
//             </div>
//             <div>
//               <p className="text-gray-500 text-sm mr-20">Volume</p>
//               <p className="text-lg font-semibold">{dashboardData.totalVolume}</p>
//             </div>
//           </div>
//         </div>

//         {/* Customers Card */}
//         <div className="bg-white shadow-lg rounded-xl p-5 w-93">
//           <div className="flex justify-between items-center mb-2">
//             <img src={custIcon} alt="Customers Icon" className="w-6 h-6" />
//             <span className="text-gray-400 text-sm">This Week</span>
//           </div>
//           <div className="flex justify-between items-center">
//             <div className="text-center">
//               <p className="text-gray-500 text-sm">Total</p>
//               <p className="text-lg font-semibold">{dashboardData.totalCustomers}</p>
//             </div>
//             <div className="text-center">
//               <p className="text-gray-500 text-sm">Active</p>
//               <p className="text-lg font-semibold">{dashboardData.activeCustomers}</p>
//             </div>
//             <div className="text-center">
//               <p className="text-gray-500 text-sm">Inactive</p>
//               <p className="text-lg font-semibold">{dashboardData.inactiveCustomers}</p>
//             </div>
//           </div>
//         </div>

//         {/* Orders Card */}
//         <div className="bg-white shadow-lg rounded-xl p-5 w-93">
//           <div className="flex justify-between items-center mb-2">
//             <img src={orderIcon} alt="Orders Icon" className="w-6 h-6" />
//             <span className="text-gray-400 text-sm">This Week</span>
//           </div>
//           <div className="flex justify-between">
//             <div className="flex justify-between w-full text-center">
//               <div className="flex flex-col items-center">
//                 <p className="text-gray-500 text-sm">All orders</p>
//                 <p className="text-lg font-semibold">{dashboardData.activeOrders}</p>
//               </div>
//               <div className="flex flex-col items-center">
//                 <p className="text-gray-500 text-sm">In Progress</p>
//                 <p className="text-lg font-semibold">{dashboardData.pendingOrders}</p>
//               </div>
//               <div className="flex flex-col items-center">
//                 <p className="text-gray-500 text-sm">Completed</p>
//                 <p className="text-lg font-semibold">{dashboardData.completedOrders}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Pie Chart and Inventory Cards */}
//         <div className="flex gap-4 ml-12">
//           {/* Pie Chart */}
//           <div className="flex gap-4 ml-2">
//             <Piechart 
//               lowStockCount={dashboardData.lowStockCount}
//               expiredCount={dashboardData.expiredCount}
//               inStockCount={dashboardData.allProducts - dashboardData.lowStockCount - dashboardData.expiredCount}
//             />
//           </div>

//           <div className="flex flex-col gap-4">
//             {/* Inventory Card */}
//             <div className="bg-blue-500 text-white shadow-md rounded-xl p-5 w-100 h-43 ml-3">
//               <div className="flex justify-between items-center mb-2">
//                 <img src={inventorylogo} alt="Inventory Icon" className="w-6 h-6" />
//               </div>
//               <div className="flex justify-between text-center w-full mt-7">
//                 <div className="flex-1">
//                   <p className="text-sm">All Products</p>
//                   <p className="text-lg font-semibold">{dashboardData.allProducts}</p>
//                 </div>
//                 <div className="flex-1">
//                   <p className="text-sm">Published</p>
//                   <p className="text-lg font-semibold">{dashboardData.activeProducts}</p>
//                 </div>
//                 <div className="flex-1">
//                   <p className="text-sm">Unpublished</p>
//                   <p className="text-lg font-semibold">
//                     {dashboardData.allProducts - dashboardData.activeProducts}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Abandoned Cart Card */}
//             <div className="bg-white shadow-md rounded-xl p-5 w-90 h-43 ml-3">
//               <div className="flex justify-between items-center mb-2">
//                 <img src={custIcon} alt="Cart Icon" className="w-6 h-6" />
//                 <span className="text-gray-400 text-sm">This Week</span>
//               </div>
//               <div className="flex justify-between">
//                 <div>
//                   <p className="text-red-500 text-sm">Abandoned Cart</p>
//                   <p className="text-lg font-semibold">{dashboardData.abandonedCart}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-500 text-sm">Customers</p>
//                   <p className="text-lg font-semibold">{dashboardData.totalCustomers}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Recent Orders Card */}
//         <div className="bg-white shadow-md rounded-xl p-5 w-[450px] h-auto ml-[400px] mt-4 ">
//           <p className="text-gray-500 text-lg font-semibold mb-4">Recent Orders</p>

//           {dashboardData.recentOrders.length === 0 ? (
//             <div className="flex flex-col items-center justify-center h-full">
//               <img src={orderIcon} alt="No Orders" className="w-20 h-20" />
//               <h4 className="text-gray-400 mt-2">No Orders Yet?</h4>
//               <p className="text-center text-gray-500">
//                 Add products to your store and start selling to see orders here.
//               </p>
//               <button
//                 className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
//                 onClick={() => navigate("/NewInventory")}
//               >
//                 + New Product
//               </button>
//             </div>
//           ) : (
//             <div className="overflow-y-auto max-h-[350px]">
//               <table className="w-full">
//                 <tbody>
//                   {dashboardData.recentOrders.flatMap(order => 
//                     order.items?.map((item, index) => (
//                       <tr
//                         key={`${order._id}-${index}`}
//                         className="hover:bg-gray-50 cursor-pointer"
//                         onClick={() => navigate(`/orders/${order._id}`)}
//                       >
//                         <td className="py-3 flex items-center gap-3">
//                           <div>
//                             <div className="text-gray-600 font-medium">
//                               {item.productName || "Unknown Product"}
//                             </div>
//                             <div className="text-gray-500 text-sm">
//                               ₦{item.price?.toFixed(2)} × {item.quantity}
//                             </div>
//                           </div>
//                         </td>
//                         <td className="py-3 text-gray-600 text-right">
//                           <div className="text-sm text-gray-400">
//                             {formatDate(order.orderDate)}
//                           </div>
//                           <span
//                             className={`px-4 py-1 rounded-full text-xs font-medium ${
//                               order.status === "Completed"
//                                 ? "bg-green-100 text-green-800"
//                                 : order.status === "Pending"
//                                 ? "bg-red-100 text-red-800"
//                                 : "bg-yellow-100 text-yellow-800"
//                             }`}
//                           >
//                             {order.status || "Pending"}
//                           </span>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//         {/* Sales Summary Chart */}
//         <div className="mt-4 w-full ml-14">
//           <SalesSummaryChart salesData={dashboardData} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardCards;



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

const config = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const DashboardCards = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    totalSales: 0,
    totalVolume: 0,
    totalCustomers: 0,
    activeCustomers: 0,
    inactiveCustomers: 0,
    activeOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    allProducts: 0,
    activeProducts: 0,
    abandonedCart: 0,
    abandonedCustomers: 0,
    lowStockCount: 0,
    expiredCount: 0,
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      setLoading(true);
      const [salesRes, inventoryRes, productsRes, ordersRes] = await Promise.all([
        axios.get("http://localhost:3000/api/sales", config()),
        axios.get("http://localhost:3000/api/inventory", config()),
        axios.get("http://localhost:3000/api/products", config()),
        axios.get("http://localhost:3000/api/orders/recent", config())
      ]);
      
      const activeProducts = productsRes.data.filter(
        product => product.status === "Publish"
      ).length;

      const salesData = salesRes.data || {};
      
      setDashboardData({
        totalSales: salesData.totalSales || 0,
        totalVolume: salesData.totalVolume || 0,
        totalCustomers: salesData.totalCustomers || 0,
        activeCustomers: salesData.activeCustomers || 0,
        inactiveCustomers: (salesData.totalCustomers || 0) - (salesData.activeCustomers || 0),
        activeOrders: salesData.activeOrders || 0,
        pendingOrders: salesData.pendingOrders || 0,
        completedOrders: salesData.completedOrders || 0,
        abandonedCart: salesData.abandonedCart || 0,
        abandonedCustomers: salesData.abandonedCustomers || 0,
        allProducts: productsRes.data?.length || 0,
        activeProducts,
        lowStockCount: inventoryRes.data?.lowStockCount || 0,
        expiredCount: inventoryRes.data?.expiredCount || 0,
        recentOrders: ordersRes.data || []
      });
      
      setError(null);
    } catch (err) {
      console.error("Error fetching dashboard data:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to load dashboard data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    
    const interval = setInterval(fetchDashboardData, 30000);
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
          <button 
            onClick={fetchDashboardData}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar title={"Dashboard"} />
      
      <div className="flex flex-wrap gap-4 p-20 pl-60 w-full">
        {/* Sales Card */}
        <div className="shadow-lg rounded-xl p-5 w-93 ml-12">
          <div className="flex justify-between items-center mb-2">
            <img src={dsIcon} alt="Sales Icon" className="w-6 h-6" />
            <span className="text-gray-400 text-sm">This Week</span>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Sales</p>
              <p className="text-lg font-semibold">${dashboardData.totalSales.toFixed(2)}</p>
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
            <span className="text-gray-400 text-sm">This Week</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-center">
              <p className="text-gray-500 text-sm">Total</p>
              <p className="text-lg font-semibold">{dashboardData.totalCustomers}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500 text-sm">Active</p>
              <p className="text-lg font-semibold">{dashboardData.activeCustomers}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500 text-sm">Inactive</p>
              <p className="text-lg font-semibold">{dashboardData.inactiveCustomers}</p>
            </div>
          </div>
        </div>

        {/* Orders Card */}
        <div className="bg-white shadow-lg rounded-xl p-5 w-93">
          <div className="flex justify-between items-center mb-2">
            <img src={orderIcon} alt="Orders Icon" className="w-6 h-6" />
            <span className="text-gray-400 text-sm">This Week</span>
          </div>
          <div className="flex justify-between">
            <div className="flex justify-between w-full text-center">
              <div className="flex flex-col items-center">
                <p className="text-gray-500 text-sm">All orders</p>
                <p className="text-lg font-semibold">{dashboardData.activeOrders}</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-gray-500 text-sm">In Progress</p>
                <p className="text-lg font-semibold">{dashboardData.pendingOrders}</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-gray-500 text-sm">Completed</p>
                <p className="text-lg font-semibold">{dashboardData.completedOrders}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pie Chart and Inventory Cards */}
        <div className="flex gap-4 ml-12">
          {/* Pie Chart */}
          <div className="flex gap-4 ml-2">
            <Piechart 
              lowStockCount={dashboardData.lowStockCount}
              expiredCount={dashboardData.expiredCount}
              inStockCount={dashboardData.allProducts - dashboardData.lowStockCount - dashboardData.expiredCount}
            />
          </div>

          <div className="flex flex-col gap-4">
            {/* Inventory Card */}
            <div className="bg-blue-500 text-white shadow-md rounded-xl p-5 w-100 h-43 ml-3">
              <div className="flex justify-between items-center mb-2">
                <img src={inventorylogo} alt="Inventory Icon" className="w-6 h-6" />
              </div>
              <div className="flex justify-between text-center w-full mt-7">
                <div className="flex-1">
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
                </div>
              </div>
            </div>

            {/* Abandoned Cart Card */}
            <div className="bg-white shadow-md rounded-xl p-5 w-90 h-43 ml-3">
              <div className="flex justify-between items-center mb-2">
                <img src={custIcon} alt="Cart Icon" className="w-6 h-6" />
                <span className="text-gray-400 text-sm">This Week</span>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="text-red-500 text-sm">Abandoned Cart</p>
                  <p className="text-lg font-semibold">{dashboardData.abandonedCart}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Customers</p>
                  <p className="text-lg font-semibold">{dashboardData.totalCustomers}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders Card */}
        <div className="bg-white shadow-md rounded-xl p-5 w-[450px] h-auto ml-[400px] mt-4 ">
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
                  {dashboardData.recentOrders.map((order, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => navigate(`/orders/${order._id}`)}
                    >
                      <td className="py-3 flex items-center gap-3">
                        <div>
                          <div className="text-gray-600 font-medium">
                            {order.items?.[0]?.productName || "Unknown Product"}
                          </div>
                          <div className="text-gray-500 text-sm">
                            ₦{order.items?.[0]?.price?.toFixed(2)} × {order.items?.[0]?.quantity}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-gray-600 text-right">
                        <div className="text-sm text-gray-400">
                          {formatDate(order.orderDate)}
                        </div>
                        <span
                          className={`px-4 py-1 rounded-full text-xs font-medium ${
                            order.status === "Completed"
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

        {/* Sales Summary Chart */}
        <div className="mt-4 w-full ml-14">
          <SalesSummaryChart salesData={dashboardData} />
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;