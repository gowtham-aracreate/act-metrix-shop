// import React from "react";
// import profileIcon from "../assets/profile.svg";
// import locationIcon from "../assets/location.svg";
// import ordericon from "../assets/ordericon.svg";
// import orderstatus from "../assets/orderstatus.svg";
// import cart from "../assets/cart.svg";
// import Table from "../components/Table";
// import Header from "../layout/Header";
// import Sidebar from "../layout/Sidebar";

// const OrderPage = () => {
//   const tableContent = [
//     {
//       orderDate: "12 Aug 2022 - 12:25 am",
//       orderType: "Home Delivery",
//       trackingID: "9348fj73",
//       orderTotal: "25,000.00",
//       action: "Completed",
//       status: "Completed",
//     },
//     {
//       orderDate: "12 Aug 2022 - 12:25 am",
//       orderType: "Home Delivery",
//       trackingID: "9348fj73",
//       orderTotal: "25,000.00",
//       action: "In-Progress",
//       status: "In-Progress",
//     },
//     {
//       orderDate: "12 Aug 2022 - 12:25 am",
//       orderType: "Pick Up",
//       trackingID: "9348fj73",
//       orderTotal: "25,000.00",
//       action: "Pending",
//       status: "Pending",
//     },
//   ];

//   const heading = ["Order Date", "Order Type", "Tracking ID", "Order Total", "Action", "Status"];

//   return (
//     <div className="flex h-screen">
//       <div className="fixed w-65">
//         <Sidebar />
//       </div>
//       <div className="flex-1 ml-64">
//         <Header />
//         <div className="p-4">
//           <div className="flex justify-between items-center mt-20">
//             <h2 className="text-lg font-bold">Order Number #743648</h2>
//             <div className="flex gap-2">
//               <button className="px-3 py-1 bg-gray-200 rounded text-sm">Edit Customer</button>
//               <button className="px-3 py-1 bg-red-500 text-white rounded text-sm">Suspend Customer</button>
//             </div>
//           </div>
//           <div className="grid grid-cols-3 gap-4">
//             <div className="bg-white shadow-sm rounded-lg p-3 w-full">
//               <div className="flex items-center gap-2">
//                 <div className="p-1 rounded-md bg-orange-100">
//                   <img src={profileIcon} alt="Profile" className="h-4 w-4" />
//                 </div>
//                 <div>
//                   <p className="text-gray-800 text-sm font-semibold">Janet Adebayo</p>
//                   <p className="text-gray-400 text-xs">
//                     Last Order <span className="text-gray-800 font-medium">12 Sept 2022</span>
//                   </p>
//                 </div>
//                 <button className="ml-auto px-2 py-1 text-green-600 bg-green-100 rounded-md text-xs">
//                   Active
//                 </button>
//               </div>
//               <div className="grid grid-cols-2 gap-2 mt-2">
//                 <div>
//                   <p className="text-gray-500 text-xs">Phone</p>
//                   <p className="text-gray-800 font-semibold text-sm">+2348065650633</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-500 text-xs">Email</p>
//                   <p className="text-gray-800 font-semibold text-sm">janet.adebayo@gmail.com</p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white shadow-sm rounded-lg p-3 w-full">
//               <div className="flex items-center mb-1">
//                 <div className="p-1 rounded-md bg-orange-100 flex items-center justify-center">
//                   <img src={locationIcon} alt="Location" className="h-4 w-4" />
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-2">
//                 <div>
//                   <p className="text-gray-500 text-xs">Home Address</p>
//                   <p className="text-gray-800 font-semibold text-sm">
//                     No. 15 Adekunle Street, Yaba, Lagos State
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-gray-500 text-xs">Billing Address</p>
//                   <p className="text-gray-800 font-semibold text-sm">
//                     No. 15 Adekunle Street, Yaba, Lagos State
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white shadow-sm rounded-lg p-3 w-full">
//               <div className="flex justify-between items-center">
//                 <div className="p-1 rounded-md bg-blue-100">
//                   <img src={ordericon} alt="Order Icon" className="h-4 w-4" />
//                 </div>
//                 <p className="text-gray-400 text-xs">All-time</p>
//               </div>
//               <p className="text-gray-500 text-xs mt-2">Total Orders</p>
//               <p className="text-sm font-bold text-gray-600">₦25,000.00</p>
//             </div>
//           </div>
//           <div className="grid grid-cols-3 gap-4 mt-4">
//             <div className="bg-white shadow-sm rounded-lg p-3 w-full">
//               <div className="flex justify-between items-center">
//                 <div className="p-1 rounded-md bg-orange-100">
//                   <img src={ordericon} alt="Order Icon" className="h-4 w-4" />
//                 </div>
//                 <p className="text-gray-400 text-xs">All-time</p>
//               </div>
//               <div className="mt-2 flex justify-around">
//                 <div className="flex flex-col items-center">
//                   <p className="text-gray-400 text-xs">All Orders</p>
//                   <p className="text-sm font-bold text-gray-600">10</p>
//                 </div>
//                 <div className="flex flex-col items-center">
//                   <p className="text-gray-400 text-xs">Pending</p>
//                   <p className="text-sm font-bold text-gray-600">2</p>
//                 </div>
//                 <div className="flex flex-col items-center">
//                   <p className="text-gray-400 text-xs">Completed</p>
//                   <p className="text-sm font-bold text-gray-600">8</p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white shadow-sm rounded-lg p-3 w-full">
//               <div className="flex justify-between items-center">
//                 <div className="p-1 rounded-md bg-orange-100">
//                   <img src={orderstatus} alt="Order Status" className="h-4 w-4" />
//                 </div>
//                 <p className="text-gray-400 text-xs">All-time</p>
//               </div>
//               <div className="mt-2 flex justify-around">
//                 <div className="flex flex-col items-center">
//                   <p className="text-gray-400 text-xs">Canceled</p>
//                   <p className="text-sm font-bold text-gray-600">0</p>
//                 </div>
//                 <div className="flex flex-col items-center">
//                   <p className="text-gray-400 text-xs">Returned</p>
//                   <p className="text-sm font-bold text-gray-600">0</p>
//                 </div>
//                 <div className="flex flex-col items-center">
//                   <p className="text-gray-400 text-xs">Damaged</p>
//                   <p className="text-sm font-bold text-gray-600">0</p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white shadow-sm rounded-lg p-3 w-full flex flex-col justify-start items-start">
//               <img src={cart} alt="cart" className="h-6 w-6 mb-1" />
//               <p className="text-red-600 text-xs mb-1">Abandoned Cart</p>
//               <p className="text-sm font-bold text-gray-600">2</p>
//             </div>
//           </div>
//           <div className="mt-6">
//             <Table title="Janet's Orders" tableContent={tableContent} heading={heading} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderPage;




// import React from "react";
// import profileIcon from "../assets/profile.svg";
// import locationIcon from "../assets/location.svg";
// import ordericon from "../assets/ordericon.svg";
// import orderstatus from "../assets/orderstatus.svg";
// import cart from "../assets/cart.svg";
// import Table from "../components/Table";
// import Header from "../layout/Header";
// import Sidebar from "../layout/Sidebar";

// const OrderPage = () => {
//   const tableContent = [
//     {
//       orderDate: "12 Aug 2022 - 12:25 am",
//       orderType: "Home Delivery",
//       trackingID: "9348fj73",
//       orderTotal: "25,000.00",
//       action: "Completed",
//       status: "Completed",
//     },
//     {
//       orderDate: "12 Aug 2022 - 12:25 am",
//       orderType: "Home Delivery",
//       trackingID: "9348fj73",
//       orderTotal: "25,000.00",
//       action: "In-Progress",
//       status: "In-Progress",
//     },
//     {
//       orderDate: "12 Aug 2022 - 12:25 am",
//       orderType: "Pick Up",
//       trackingID: "9348fj73",
//       orderTotal: "25,000.00",
//       action: "Pending",
//       status: "Pending",
//     },
//   ];

//   const heading = ["Order Date", "Order Type", "Tracking ID", "Order Total", "Action", "Status"];

//   return (
//     <div className="flex h-screen">
//       <div className="fixed w-65">
//         <Sidebar />
//       </div>
//       <div className="flex-1 ml-64">
//         <Header />
//         <div className="p-4">
//           <div className="flex justify-between items-center mt-20">
//             <h2 className="text-lg font-bold">Order Number #743648</h2>
//             <div className="flex gap-2">
//               <button className="px-3 py-1 bg-gray-200 rounded text-sm">Edit Customer</button>
//               <button className="px-3 py-1 bg-red-500 text-white rounded text-sm">Suspend Customer</button>
//             </div>
//           </div>
//           <div className="grid grid-cols-3 gap-4">
//             <div className="bg-white shadow-sm rounded-lg p-3 w-full">
//               <div className="flex items-center gap-2">
//                 <div className="p-1 rounded-md bg-orange-100">
//                   <img src={profileIcon} alt="Profile" className="h-4 w-4" />
//                 </div>
//                 <div>
//                   <p className="text-gray-800 text-sm font-semibold">Janet Adebayo</p>
//                   <p className="text-gray-400 text-xs">
//                     Last Order <span className="text-gray-800 font-medium">12 Sept 2022</span>
//                   </p>
//                 </div>
//                 <button className="ml-auto px-2 py-1 text-green-600 bg-green-100 rounded-md text-xs">
//                   Active
//                 </button>
//               </div>
//               <div className="grid grid-cols-2 gap-2 mt-2">
//                 <div>
//                   <p className="text-gray-500 text-xs">Phone</p>
//                   <p className="text-gray-800 font-semibold text-sm">+2348065650633</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-500 text-xs">Email</p>
//                   <p className="text-gray-800 font-semibold text-sm">janet.adebayo@gmail.com</p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white shadow-sm rounded-lg p-3 w-full">
//               <div className="flex items-center mb-1">
//                 <div className="p-1 rounded-md bg-orange-100 flex items-center justify-center">
//                   <img src={locationIcon} alt="Location" className="h-4 w-4" />
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-2">
//                 <div>
//                   <p className="text-gray-500 text-xs">Home Address</p>
//                   <p className="text-gray-800 font-semibold text-sm">
//                     No. 15 Adekunle Street, Yaba, Lagos State
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-gray-500 text-xs">Billing Address</p>
//                   <p className="text-gray-800 font-semibold text-sm">
//                     No. 15 Adekunle Street, Yaba, Lagos State
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white shadow-sm rounded-lg p-3 w-full">
//               <div className="flex justify-between items-center">
//                 <div className="p-1 rounded-md bg-blue-100">
//                   <img src={ordericon} alt="Order Icon" className="h-4 w-4" />
//                 </div>
//                 <p className="text-gray-400 text-xs">All-time</p>
//               </div>
//               <p className="text-gray-500 text-xs mt-2">Total Orders</p>
//               <p className="text-sm font-bold text-gray-600">₦25,000.00</p>
//             </div>
//           </div>
//           <div className="grid grid-cols-3 gap-4 mt-4">
//             <div className="bg-white shadow-sm rounded-lg p-3 w-full">
//               <div className="flex justify-between items-center">
//                 <div className="p-1 rounded-md bg-orange-100">
//                   <img src={ordericon} alt="Order Icon" className="h-4 w-4" />
//                 </div>
//                 <p className="text-gray-400 text-xs">All-time</p>
//               </div>
//               <div className="mt-2 flex justify-around">
//                 <div className="flex flex-col items-center">
//                   <p className="text-gray-400 text-xs">All Orders</p>
//                   <p className="text-sm font-bold text-gray-600">10</p>
//                 </div>
//                 <div className="flex flex-col items-center">
//                   <p className="text-gray-400 text-xs">Pending</p>
//                   <p className="text-sm font-bold text-gray-600">2</p>
//                 </div>
//                 <div className="flex flex-col items-center">
//                   <p className="text-gray-400 text-xs">Completed</p>
//                   <p className="text-sm font-bold text-gray-600">8</p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white shadow-sm rounded-lg p-3 w-full">
//               <div className="flex justify-between items-center">
//                 <div className="p-1 rounded-md bg-orange-100">
//                   <img src={orderstatus} alt="Order Status" className="h-4 w-4" />
//                 </div>
//                 <p className="text-gray-400 text-xs">All-time</p>
//               </div>
//               <div className="mt-2 flex justify-around">
//                 <div className="flex flex-col items-center">
//                   <p className="text-gray-400 text-xs">Canceled</p>
//                   <p className="text-sm font-bold text-gray-600">0</p>
//                 </div>
//                 <div className="flex flex-col items-center">
//                   <p className="text-gray-400 text-xs">Returned</p>
//                   <p className="text-sm font-bold text-gray-600">0</p>
//                 </div>
//                 <div className="flex flex-col items-center">
//                   <p className="text-gray-400 text-xs">Damaged</p>
//                   <p className="text-sm font-bold text-gray-600">0</p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white shadow-sm rounded-lg p-3 w-full flex flex-col justify-start items-start">
//               <img src={cart} alt="cart" className="h-6 w-6 mb-1" />
//               <p className="text-red-600 text-xs mb-1">Abandoned Cart</p>
//               <p className="text-sm font-bold text-gray-600">2</p>
//             </div>
//           </div>
//           <div className="mt-6">
//             <Table title="Janet's Orders" tableContent={tableContent} heading={heading} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderPage;


// import React from "react";
// import { useLocation } from "react-router-dom";
// import profileIcon from "../assets/profile.svg";
// import locationIcon from "../assets/location.svg";
// import ordericon from "../assets/ordericon.svg";
// import orderstatus from "../assets/orderstatus.svg";
// import cart from "../assets/cart.svg";
// import Table from "../components/Table";
// import Header from "../layout/Header";
// import Sidebar from "../layout/Sidebar";

// const CustOrderPage = () => {
//   const location = useLocation();
//   const { customer } = location.state;

//   const tableContent = [
//     {
//       orderDate: "12 Aug 2022 - 12:25 am",
//       orderType: "Home Delivery",
//       trackingID: "9348fj73",
//       orderTotal: "25,000.00",
//       action: "Completed",
//       status: "Completed",
//     },
//     {
//       orderDate: "12 Aug 2022 - 12:25 am",
//       orderType: "Home Delivery",
//       trackingID: "9348fj73",
//       orderTotal: "25,000.00",
//       action: "In-Progress",
//       status: "In-Progress",
//     },
//     {
//       orderDate: "12 Aug 2022 - 12:25 am",
//       orderType: "Pick Up",
//       trackingID: "9348fj73",
//       orderTotal: "25,000.00",
//       action: "Pending",
//       status: "Pending",
//     },
    
//     {
//       orderDate: "N/A",
//       orderType: "N/A",
//       trackingID: "N/A",
//       orderTotal: "N/A",
//       action: "N/A",
//       status: customer.status || "Active", 
//     },
//   ];

//   const heading = ["Order Date", "Order Type", "Tracking ID", "Order Total", "Action", "Status"];

//   return (
//     <div className="flex h-screen">
//       <div className="fixed w-65">
//         <Sidebar />
//       </div>
//       <div className="flex-1 ml-64">
//         <Header />
//         <div className="p-4">
//           <div className="flex justify-between items-center mt-20">
//             <h2 className="text-lg font-bold">Order Number #743648</h2>
//             <div className="flex gap-2">
//               <button className="px-3 py-1 bg-gray-200 rounded text-sm">Edit Customer</button>
//               <button className="px-3 py-1 bg-red-500 text-white rounded text-sm">Suspend Customer</button>
//             </div>
//           </div>
//           <div className="grid grid-cols-3 gap-4">
//             <div className="bg-white shadow-sm rounded-lg p-3 w-full">
//               <div className="flex items-center gap-2">
//                 <div className="p-1 rounded-md bg-orange-100">
//                   <img src={profileIcon} alt="Profile" className="h-4 w-4" />
//                 </div>
//                 <div>
//                   <p className="text-gray-800 text-sm font-semibold">{customer.name}</p>
//                   <p className="text-gray-400 text-xs">
//                     Last Order <span className="text-gray-800 font-medium">12 Sept 2022</span>
//                   </p>
//                 </div>
//                 <button className="ml-auto px-2 py-1 text-green-600 bg-green-100 rounded-md text-xs">
//                   Active
//                 </button>
//               </div>
//               <div className="grid grid-cols-2 gap-2 mt-2">
//                 <div>
//                   <p className="text-gray-500 text-xs">Phone</p>
//                   <p className="text-gray-800 font-semibold text-sm">{customer.phoneCode} {customer.phone}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-500 text-xs">Email</p>
//                   <p className="text-gray-800 font-semibold text-sm">{customer.email}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white shadow-sm rounded-lg p-3 w-full">
//               <div className="flex items-center mb-1">
//                 <div className="p-1 rounded-md bg-orange-100 flex items-center justify-center">
//                   <img src={locationIcon} alt="Location" className="h-4 w-4" />
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-2">
//                 <div>
//                   <p className="text-gray-500 text-xs">Home Address</p>
//                   <p className="text-gray-800 font-semibold text-sm">
//                     {customer.address}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-gray-500 text-xs">Billing Address</p>
//                   <p className="text-gray-800 font-semibold text-sm">
//                     {customer.address}
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white shadow-sm rounded-lg p-3 w-full">
//               <div className="flex justify-between items-center">
//                 <div className="p-1 rounded-md bg-blue-100">
//                   <img src={ordericon} alt="Order Icon" className="h-4 w-4" />
//                 </div>
//                 <p className="text-gray-400 text-xs">All-time</p>
//               </div>
//               <p className="text-gray-500 text-xs mt-2">Total Orders</p>
//               <p className="text-sm font-bold text-gray-600">₦25,000.00</p>
//             </div>
//           </div>
//           <div className="grid grid-cols-3 gap-4 mt-4">
//             <div className="bg-white shadow-sm rounded-lg p-3 w-full">
//               <div className="flex justify-between items-center">
//                 <div className="p-1 rounded-md bg-orange-100">
//                   <img src={ordericon} alt="Order Icon" className="h-4 w-4" />
//                 </div>
//                 <p className="text-gray-400 text-xs">All-time</p>
//               </div>
//               <div className="mt-2 flex justify-around">
//                 <div className="flex flex-col items-center">
//                   <p className="text-gray-400 text-xs">All Orders</p>
//                   <p className="text-sm font-bold text-gray-600">10</p>
//                 </div>
//                 <div className="flex flex-col items-center">
//                   <p className="text-gray-400 text-xs">Pending</p>
//                   <p className="text-sm font-bold text-gray-600">2</p>
//                 </div>
//                 <div className="flex flex-col items-center">
//                   <p className="text-gray-400 text-xs">Completed</p>
//                   <p className="text-sm font-bold text-gray-600">8</p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white shadow-sm rounded-lg p-3 w-full">
//               <div className="flex justify-between items-center">
//                 <div className="p-1 rounded-md bg-orange-100">
//                   <img src={orderstatus} alt="Order Status" className="h-4 w-4" />
//                 </div>
//                 <p className="text-gray-400 text-xs">All-time</p>
//               </div>
//               <div className="mt-2 flex justify-around">
//                 <div className="flex flex-col items-center">
//                   <p className="text-gray-400 text-xs">Canceled</p>
//                   <p className="text-sm font-bold text-gray-600">0</p>
//                 </div>
//                 <div className="flex flex-col items-center">
//                   <p className="text-gray-400 text-xs">Returned</p>
//                   <p className="text-sm font-bold text-gray-600">0</p>
//                 </div>
//                 <div className="flex flex-col items-center">
//                   <p className="text-gray-400 text-xs">Damaged</p>
//                   <p className="text-sm font-bold text-gray-600">0</p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white shadow-sm rounded-lg p-3 w-full flex flex-col justify-start items-start">
//               <img src={cart} alt="cart" className="h-6 w-6 mb-1" />
//               <p className="text-red-600 text-xs mb-1">Abandoned Cart</p>
//               <p className="text-sm font-bold text-gray-600">2</p>
//             </div>
//           </div>
//           <div className="mt-6">
//             <Table title="Janet's Orders" tableContent={tableContent} heading={heading} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustOrderPage;



import React from "react";
import { useLocation } from "react-router-dom";
import profileIcon from "../assets/profile.svg";
import locationIcon from "../assets/location.svg";
import ordericon from "../assets/ordericon.svg";
import orderstatus from "../assets/orderstatus.svg";
import cart from "../assets/cart.svg";
import Table from "../components/Table";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";

const CustOrderPage = () => {
  const location = useLocation();
  const { customer } = location.state;
  const tableContent = [
    {
      orderDate: "12 Aug 2022 - 12:25 am",
      orderType: "Home Delivery",
      trackingID: "9348fj73",
      orderTotal: "25,000.00",
      action: "Completed",
      status: "Completed",
    },
    {
      orderDate: "12 Aug 2022 - 12:25 am",
      orderType: "Home Delivery",
      trackingID: "9348fj73",
      orderTotal: "25,000.00",
      action: "In-Progress",
      status: "In-Progress",
    },
    {
      orderDate: "12 Aug 2022 - 12:25 am",
      orderType: "Pick Up",
      trackingID: "9348fj73",
      orderTotal: "25,000.00",
      action: "Pending",
      status: "Pending",
    },
    {
      orderDate: "N/A",
      orderType: "N/A",
      trackingID: "N/A",
      orderTotal: "N/A",
      action: "N/A",
      status: customer.status || "Active", 
    },
  ];

  const heading = ["Order Date", "Order Type", "Tracking ID", "Order Total", "Action", "Status"];

  return (
    <div className="flex h-screen">
      <div className="fixed w-65 h-20"> 
      <Sidebar />
      </div>
      <div className="flex-1 ml-64">
        <Header />
        <div className="p-4">
          <div className="flex justify-between items-center mt-20">
            <h2 className="text-lg font-bold">Order Number #743648</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-gray-200 rounded text-sm">Edit Customer</button>
              <button className="px-3 py-1 bg-red-500 text-white rounded text-sm">Suspend Customer</button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white shadow-sm rounded-lg p-3 w-full">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-md bg-orange-100">
                  <img src={profileIcon} alt="Profile" className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-gray-800 text-sm font-semibold">{customer.name}</p>
                  <p className="text-gray-400 text-xs">
                    Last Order <span className="text-gray-800 font-medium">12 Sept 2022</span>
                  </p>
                </div>
                <button className="ml-auto px-2 py-1 text-green-600 bg-green-100 rounded-md text-xs">
                  Active
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div>
                  <p className="text-gray-500 text-xs">Phone</p>
                  <p className="text-gray-800 font-semibold text-sm">{customer.phoneCode} {customer.phone}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Email</p>
                  <p className="text-gray-800 font-semibold text-sm">{customer.email}</p>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-sm rounded-lg p-3 w-full">
              <div className="flex items-center mb-1">
                <div className="p-1 rounded-md bg-orange-100 flex items-center justify-center">
                  <img src={locationIcon} alt="Location" className="h-4 w-4" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-gray-500 text-xs">Home Address</p>
                  <p className="text-gray-800 font-semibold text-sm">
                    {customer.address}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Billing Address</p>
                  <p className="text-gray-800 font-semibold text-sm">
                    {customer.address}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-sm rounded-lg p-3 w-full">
              <div className="flex justify-between items-center">
                <div className="p-1 rounded-md bg-blue-100">
                  <img src={ordericon} alt="Order Icon" className="h-4 w-4" />
                </div>
                <p className="text-gray-400 text-xs">All-time</p>
              </div>
              <p className="text-gray-500 text-xs mt-2">Total Orders</p>
              <p className="text-sm font-bold text-gray-600">₦25,000.00</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-white shadow-sm rounded-lg p-3 w-full">
              <div className="flex justify-between items-center">
                <div className="p-1 rounded-md bg-orange-100">
                  <img src={ordericon} alt="Order Icon" className="h-4 w-4" />
                </div>
                <p className="text-gray-400 text-xs">All-time</p>
              </div>
              <div className="mt-2 flex justify-around">
                <div className="flex flex-col items-center">
                  <p className="text-gray-400 text-xs">All Orders</p>
                  <p className="text-sm font-bold text-gray-600">10</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-gray-400 text-xs">Pending</p>
                  <p className="text-sm font-bold text-gray-600">2</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-gray-400 text-xs">Completed</p>
                  <p className="text-sm font-bold text-gray-600">8</p>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-sm rounded-lg p-3 w-full">
              <div className="flex justify-between items-center">
                <div className="p-1 rounded-md bg-orange-100">
                  <img src={orderstatus} alt="Order Status" className="h-4 w-4" />
                </div>
                <p className="text-gray-400 text-xs">All-time</p>
              </div>
              <div className="mt-2 flex justify-around">
                <div className="flex flex-col items-center">
                  <p className="text-gray-400 text-xs">Canceled</p>
                  <p className="text-sm font-bold text-gray-600">0</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-gray-400 text-xs">Returned</p>
                  <p className="text-sm font-bold text-gray-600">0</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-gray-400 text-xs">Damaged</p>
                  <p className="text-sm font-bold text-gray-600">0</p>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-sm rounded-lg p-3 w-full flex flex-col justify-start items-start">
              <img src={cart} alt="cart" className="h-6 w-6 mb-1" />
              <p className="text-red-600 text-xs mb-1">Abandoned Cart</p>
              <p className="text-sm font-bold text-gray-600">2</p>
            </div>
          </div>
          <div className="mt-6">
            <Table title="Janet's Orders" tableContent={tableContent} heading={heading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustOrderPage;








