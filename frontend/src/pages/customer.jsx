// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Table from "../components/Table";
// import { AiOutlineClose } from "react-icons/ai";
// import Sidebar from "../layout/Sidebar";
// import Cust from "../assets/cust.svg";
// import Order from "../assets/order.svg";

// const CustomerSummary = () => (
//   <div className="flex flex-wrap gap-6 mb-6">
//     {[{
//       img: Cust, title: "Customers", stats: [
//         { label: "All customer", value: 1250, change: "+15.30%", color: "text-green-500" },
//         { label: "Active", value: 1180, change: "+8%", color: "text-green-500" },
//         { label: "Inactive", value: 70, change: "-10%", color: "text-red-500" },
//       ]
//     },
//     {
//       img: Order, title: "Orders", stats: [
//         { label: "New Customers", value: 30, change: "-20%", color: "text-red-500" },
//         { label: "Purchasing", value: 657 },
//         { label: "Abandoned Carts", value: 5 },
//       ]
//     }].map(({ img, title, stats }, index) => (
//       <div key={index} className="bg-white shadow-lg rounded-xl p-5 w-155">
//         <div className="flex items-center gap-2 mb-2">
//           <img src={img} alt={`${title} icon`} className="w-6 h-6" />
//           <span className="text-gray-400 text-sm ml-auto">This Week</span>
//         </div>
//         <div className="grid grid-cols-3 gap-4">
//           {stats.map(({ label, value, change, color }, i) => (
//             <div key={i}>
//               <p className="text-gray-500 text-sm">{label}</p>
//               <p className="text-lg font-semibold">{value}</p>
//               {change && <p className={`${color} text-xs`}>{change}</p>}
//             </div>
//           ))}
//         </div>
//       </div>
//     ))}
//   </div>
// );

// const CustomersPage = () => {
//   const [customers, setCustomers] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [addAddress, setAddAddress] = useState(false);
//   const [newCustomer, setNewCustomer] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchCustomers();
//   }, []);

//   const fetchCustomers = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/customers");
//       setCustomers(Array.isArray(response.data) ? response.data : []);
//     } catch (error) {
//       console.error("Error fetching customers:", error);
//       setCustomers([]);
//     }
//   };

//   const handleAddCustomer = () => {
//     setIsModalOpen(false);
//     navigate("/custorder", { state: { customer: newCustomer } });
//   };

//   return (
//     <div className="flex relative">
//       <Sidebar className="h-screen fixed" />
//       <div className={`w-full ml-[15%] p-6 pt-20 bg-gray-100 pr-10 transition-all ${isModalOpen ? "blur-sm" : ""}`}>
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-semibold">Customers</h2>
//           <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white flex items-center px-5 py-2 rounded-lg hover:bg-blue-600">
//             + Add Customer
//           </button>
//         </div>
//         <CustomerSummary />
        
//         <div className="bg-white p-6 shadow-md rounded-lg">
//           <Table
//             title="Customers"
//             heading={["Name", "Email", "Phone", "Orders", "Total", "Since", "Status"]}
//             tableContent={customers.map((cust) => ({
//               name: cust.name || "N/A",
//               email: cust.email || "N/A",
//               phone: cust.phone || "N/A",
//               orders: cust.orders || 0,
//               total: cust.total || "$0.00",
//               since: cust.since || "12 Aug 2022 - 12:25 am",
//               status: cust.status || "Inactive",
//             }))}
//           />
//         </div>
//       </div>
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-customer.jsx bg-opacity-50 flex items-center justify-center z-90">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative z-20">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold">Add Customer</h2>
//               <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-black">
//                 <AiOutlineClose size={24} />
//               </button>
//             </div>
//             <div className="space-y-4">
//               <input
//                 type="text"
//                 placeholder="Name"
//                 className="w-full border rounded-lg p-2"
//                 onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
//               />
//               <input
//                 type="email"
//                 placeholder="Email"
//                 className="w-full border rounded-lg p-2"
//                 onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
//               />
//               <div className="flex items-center gap-2">
//                 <select
//                   className="border rounded-lg p-2"
//                   onChange={(e) => setNewCustomer({ ...newCustomer, phoneCode: e.target.value })}
//                 >
//                   <option>+234</option>
//                   <option>+91</option>
//                 </select>
//                 <input
//                   type="text"
//                   placeholder="Phone"
//                   className="flex-1 border rounded-lg p-2"
//                   onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
//                 />
//               </div>
//               <div className="flex items-center justify-between">
//                 <label className="text-gray-600">Add Address</label>
//                 <button onClick={() => setAddAddress(!addAddress)} className={`w-12 h-6 flex items-center rounded-full p-1 transition-all ${addAddress ? "bg-blue-500" : "bg-gray-300"}`}>
//                   <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${addAddress ? "translate-x-6" : "translate-x-0"}`}></div>
//                 </button>
//               </div>
//               {addAddress && (
//                 <>
//                   <input
//                     type="text"
//                     placeholder="Address"
//                     className="w-full border rounded-lg p-2"
//                     onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
//                   />
//                   <input
//                     type="text"
//                     placeholder="City"
//                     className="w-full border rounded-lg p-2"
//                     onChange={(e) => setNewCustomer({ ...newCustomer, city: e.target.value })}
//                   />
//                   <input
//                     type="text"
//                     placeholder="State"
//                     className="w-full border rounded-lg p-2"
//                     onChange={(e) => setNewCustomer({ ...newCustomer, state: e.target.value })}
//                   />
//                   <input
//                     type="text"
//                     placeholder="Country"
//                     className="w-full border rounded-lg p-2"
//                     onChange={(e) => setNewCustomer({ ...newCustomer, country: e.target.value })}
//                   />
//                 </>
//               )}
//             </div>
//             <div className="flex justify-between mt-6">
//               <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-200">
//                 Cancel
//               </button>
//               <button onClick={handleAddCustomer} className="px-7 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600">
//                 Add
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomersPage;



// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Table from "../components/Table";
// import { AiOutlineClose } from "react-icons/ai";

// import Sidebar from "../layout/Sidebar";
// import Cust from "../assets/cust.svg";
// import Order from "../assets/order.svg";

// const CustomerSummary = () => (
//   <div className="flex flex-wrap gap-6 mb-6">
//     {[
//       {
//         img: Cust,
//         title: "Customers",
//         stats: [
//           { label: "All Customers", value: 1250, change: "+15.30%", color: "text-green-500" },
//           { label: "Active", value: 1180, change: "+8%", color: "text-green-500" },
//           { label: "Inactive", value: 70, change: "-10%", color: "text-red-500" },
         
//         ],
//       },
//       {
//         img: Order,
//         title: "Orders",
//         stats: [
//           { label: "New Customers", value: 30, change: "-20%", color: "text-red-500" },
//           { label: "Purchasing", value: 657 },
//           { label: "Abandoned Carts", value: 5 },
//         ],
//       },
//     ].map(({ img, title, stats }, index) => (
//       <div key={index} className="bg-white shadow-lg rounded-xl p-5 w-155">
//         <div className="flex items-center gap-2 mb-2">
//           <img src={img} alt={`${title} icon`} className="w-6 h-6" />
//           <span className="text-gray-400 text-sm ml-auto">This Week</span>
//         </div>
//         <div className="grid grid-cols-3 gap-4">
//           {stats.map(({ label, value, change, color }, i) => (
//             <div key={i}>
//               <p className="text-gray-500 text-sm">{label}</p>
//               <p className="text-lg font-semibold">{value}</p>
//               {change && <p className={`${color} text-xs`}>{change}</p>}
//             </div>
//           ))}
//         </div>
//       </div>
//     ))}
//   </div>
// );

// const CustomersPage = () => {
//   const [customers, setCustomers] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [addAddress, setAddAddress] = useState(false);
//   const [newCustomer, setNewCustomer] = useState({
//     name: "",
//     email: "",
//     phoneCode: "+234",
//     phone: "",
//     address: "",
//     city: "",
//     state: "",
//     country: "",
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchCustomers();
//   }, []);

//   const fetchCustomers = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/customers");
//       setCustomers(Array.isArray(response.data) ? response.data : []);
//     } catch (error) {
//       console.error("Error fetching customers:", error);
//       setCustomers([]);
//     }
//   };

//   const handleAddCustomer = () => {
//     setIsModalOpen(false);
//     navigate("/custorder", { state: { customer: newCustomer } });
//   };

//   return (
//     <div className="flex relative">
//       <Sidebar className="h-screen fixed" />
//       <div className={`w-full ml-[15%] p-6 pt-20 bg-gray-100 pr-10 transition-all ${isModalOpen ? "blur-sm" : ""}`}>
       
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-semibold">Customers</h2>
//           <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white flex items-center px-5 py-2 rounded-lg hover:bg-blue-600">
//             + Add Customer
//           </button>
//         </div>

       
//         <CustomerSummary />

        
//         <div className="bg-white p-6 shadow-md rounded-lg">
//           <Table
//             title="Customers"
//             heading={["Name", "Email", "Phone", "Orders", "Total", "Since", "Status"]}
//             tableContent={customers.map((cust) => ({
//               name: cust.name || "N/A",
//               email: cust.email || "N/A",
//               phone: cust.phone || "N/A",
//               orders: cust.orders || 0,
//               total: cust.total || "$0.00",
//               since: cust.since || "12 Aug 2022 - 12:25 am",
//               status: cust.status || "Inactive",
//             }))}
//           />
//         </div>
//       </div>

      
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative z-20">
            
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold">Add Customer</h2>
//               <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-black">
//                 <AiOutlineClose size={24} />
//               </button>
//             </div>

           
//             <div className="space-y-4">
//               <input
//                 type="text"
//                 placeholder="Name"
//                 className="w-full border rounded-lg p-2"
//                 onChange={(e) => setNewCustomer((prev) => ({ ...prev, name: e.target.value }))}
//               />
//               <input
//                 type="email"
//                 placeholder="Email"
//                 className="w-full border rounded-lg p-2"
//                 onChange={(e) => setNewCustomer((prev) => ({ ...prev, email: e.target.value }))}
//               />
//               <div className="flex items-center gap-2">
//                 <select
//                   className="border rounded-lg p-2"
//                   onChange={(e) => setNewCustomer((prev) => ({ ...prev, phoneCode: e.target.value }))}
//                 >
//                   <option>+234</option>
//                   <option>+91</option>
//                 </select>
//                 <input
//                   type="text"
//                   placeholder="Phone"
//                   className="flex-1 border rounded-lg p-2"
//                   onChange={(e) => setNewCustomer((prev) => ({ ...prev, phone: e.target.value }))}
//                 />
//               </div>

              
//               <div className="flex items-center justify-between">
//                 <label className="text-gray-600">Add Address</label>
//                 <button onClick={() => setAddAddress(!addAddress)} className={`w-12 h-6 flex items-center rounded-full p-1 transition-all ${addAddress ? "bg-blue-500" : "bg-gray-300"}`}>
//                   <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${addAddress ? "translate-x-6" : "translate-x-0"}`}></div>
//                 </button>
//               </div>

//               {addAddress && (
//                 <>
//                   <input type="text" placeholder="Address" className="w-full border rounded-lg p-2" onChange={(e) => setNewCustomer((prev) => ({ ...prev, address: e.target.value }))} />
//                   <input type="text" placeholder="City" className="w-full border rounded-lg p-2" onChange={(e) => setNewCustomer((prev) => ({ ...prev, city: e.target.value }))} />
//                   <input type="text" placeholder="State" className="w-full border rounded-lg p-2" onChange={(e) => setNewCustomer((prev) => ({ ...prev, state: e.target.value }))} />
//                   <input type="text" placeholder="Country" className="w-full border rounded-lg p-2" onChange={(e) => setNewCustomer((prev) => ({ ...prev, country: e.target.value }))} />
//                 </>
//               )}
//             </div>

           
//             <div className="flex justify-between mt-6">
//               <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-200">Cancel</button>
//               <button onClick={handleAddCustomer} className="px-7 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600">Add</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomersPage;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Table from "../components/Table";
import { AiOutlineClose } from "react-icons/ai";
import Sidebar from "../layout/Sidebar";
import Cust from "../assets/cust.svg";
import Order from "../assets/order.svg";

const CustomerSummary = () => (
  <div className="flex flex-wrap gap-6 mb-6">
    {[
      {
        img: Cust,
        title: "Customers",
        stats: [
          { label: "All Customers", value: 1250, change: "+15.30%", color: "text-green-500" },
          { label: "Active", value: 1180, change: "+8%", color: "text-green-500" },
          { label: "Inactive", value: 70, change: "-10%", color: "text-red-500" },
        ],
      },
      {
        img: Order,
        title: "Orders",
        stats: [
          { label: "New Customers", value: 30, change: "-20%", color: "text-red-500" },
          { label: "Purchasing", value: 657 },
          { label: "Abandoned Carts", value: 5 },
        ],
      },
    ].map(({ img, title, stats }, index) => (
      <div key={index} className="bg-white shadow-lg rounded-xl p-5 w-155">
        <div className="flex items-center gap-2 mb-2">
          <img src={img} alt={`${title} icon`} className="w-6 h-6" />
          <span className="text-gray-400 text-sm ml-auto">This Week</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {stats.map(({ label, value, change, color }, i) => (
            <div key={i}>
              <p className="text-gray-500 text-sm">{label}</p>
              <p className="text-lg font-semibold">{value}</p>
              {change && <p className={`${color} text-xs`}>{change}</p>}
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addAddress, setAddAddress] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null); // State to track selected customer
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phoneCode: "+234",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/customers");
      setCustomers(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setCustomers([]);
    }
  };

  const handleAddCustomer = () => {
    setIsModalOpen(false);
    navigate("/custorder", { state: { customer: newCustomer } });
  };

  const handleCheckboxClick = (customer) => {
    setSelectedCustomer(customer); // Set the selected customer
    navigate("/custorder", { state: { customer } }); // Navigate to the customer order page
  };

  return (
    <div className="flex relative">
      <Sidebar  />
      <div className={`w-full ml-[15%] p-6 pt-20 bg-gray-100 pr-10 transition-all ${isModalOpen ? "blur-sm" : ""}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Customers</h2>
          <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white flex items-center px-5 py-2 rounded-lg hover:bg-blue-600">
            + Add Customer
          </button>
        </div>

        <CustomerSummary />

        <div className="bg-white p-6 shadow-md rounded-lg">
          <Table
            title="Customers"
            mode="customer"
            heading={["Name", "Email", "Phone", "Orders", "Total", "Since", "Status"]}
            // Removed "Select" column
            tableContent={customers.map((cust) => ({
              name: cust.name || "N/A",
              email: cust.email || "N/A",
              phone: cust.phone || "N/A",
              orders: cust.orders || 0,
              total: cust.total || "$0.00",
              since: cust.since || "12 Aug 2022 - 12:25 am",
              status: cust.status || "Inactive",
            }))}
            selectedCustomer={selectedCustomer} // Pass selected customer to Table
            onCheckboxClick={handleCheckboxClick} // Pass checkbox click handler
          />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative z-20">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add Customer</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-black">
                <AiOutlineClose size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full border rounded-lg p-2"
                onChange={(e) => setNewCustomer((prev) => ({ ...prev, name: e.target.value }))}
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border rounded-lg p-2"
                onChange={(e) => setNewCustomer((prev) => ({ ...prev, email: e.target.value }))}
              />
              <div className="flex items-center gap-2">
                <select
                  className="border rounded-lg p-2"
                  onChange={(e) => setNewCustomer((prev) => ({ ...prev, phoneCode: e.target.value }))}
                >
                  <option>+234</option>
                  <option>+91</option>
                </select>
                <input
                  type="text"
                  placeholder="Phone"
                  className="flex-1 border rounded-lg p-2"
                  onChange={(e) => setNewCustomer((prev) => ({ ...prev, phone: e.target.value }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-gray-600">Add Address</label>
                <button onClick={() => setAddAddress(!addAddress)} className={`w-12 h-6 flex items-center rounded-full p-1 transition-all ${addAddress ? "bg-blue-500" : "bg-gray-300"}`}>
                  <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${addAddress ? "translate-x-6" : "translate-x-0"}`}></div>
                </button>
              </div>

              {addAddress && (
                <>
                  <input type="text" placeholder="Address" className="w-full border rounded-lg p-2" onChange={(e) => setNewCustomer((prev) => ({ ...prev, address: e.target.value }))} />
                  <input type="text" placeholder="City" className="w-full border rounded-lg p-2" onChange={(e) => setNewCustomer((prev) => ({ ...prev, city: e.target.value }))} />
                  <input type="text" placeholder="State" className="w-full border rounded-lg p-2" onChange={(e) => setNewCustomer((prev) => ({ ...prev, state: e.target.value }))} />
                  <input type="text" placeholder="Country" className="w-full border rounded-lg p-2" onChange={(e) => setNewCustomer((prev) => ({ ...prev, country: e.target.value }))} />
                </>
              )}
            </div>

            <div className="flex justify-between mt-6">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-200">Cancel</button>
              <button onClick={handleAddCustomer} className="px-7 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600">Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersPage;