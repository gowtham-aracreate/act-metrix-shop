// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Table from "../components/Table";
// import { AiOutlineClose } from "react-icons/ai";
// import Sidebar from "../layout/Sidebar";
// import Cust from "../assets/cust.svg";
// import Order from "../assets/order.svg";

// const CustomerSummary = ({ customers }) => {
//   const totalCustomers = customers.length;
//   const activeCustomers = customers.filter((customer) => customer.status === "Active").length;
//   const inactiveCustomers = customers.filter((customer) => customer.status === "Inactive").length;
//   const newCustomers = customers.filter((customer) => {
//     const customerDate = new Date(customer.since);
//     const oneWeekAgo = new Date();
//     oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
//     return customerDate >= oneWeekAgo;
//   }).length;

//   const totalOrders = customers.reduce((sum, customer) => sum + (customer.orders || 0), 0);
//   const abandonedCarts = customers.filter((customer) => customer.abandonedCarts > 0).length;

//   return (
//     <div className="flex flex-wrap gap-6 mb-6">
//       {[
//         {
//           img: Cust,
//           title: "Customers",
//           stats: [
//             { label: "All Customers", value: totalCustomers, change: "+15.30%", color: "text-green-500" },
//             { label: "Active", value: activeCustomers, change: "+8%", color: "text-green-500" },
//             { label: "Inactive", value: inactiveCustomers, change: "-10%", color: "text-red-500" },
//           ],
//         },
//         {
//           img: Order,
//           title: "Orders",
//           stats: [
//             { label: "New Customers", value: newCustomers, change: "-20%", color: "text-red-500" },
//             { label: "Purchasing", value: totalOrders },
//             { label: "Abandoned Carts", value: abandonedCarts },
//           ],
//         },
//       ].map(({ img, title, stats }, index) => (
//         <div key={index} className="bg-white shadow-lg rounded-xl p-6 w-full md:w-[calc(50%-12px)] lg:w-[calc(50%-12px)]">
//           <div className="flex items-center gap-2 mb-4">
//             <img src={img} alt={`${title} icon`} className="w-8 h-8" />
//             <span className="text-gray-400 text-sm ml-auto">This Week</span>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {stats.map(({ label, value, change, color }, i) => (
//               <div key={i}>
//                 <p className="text-gray-500 text-sm">{label}</p>
//                 <p className="text-xl font-semibold">{value}</p>
//                 {change && <p className={`${color} text-xs`}>{change}</p>}
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

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
//   const [searchQuery, setSearchQuery] = useState("");

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

//   const resetForm = () => {
//     setNewCustomer({
//       name: "",
//       email: "",
//       phoneCode: "+234",
//       phone: "",
//       address: "",
//       city: "",
//       state: "",
//       country: "",
//     });
//   };

//   const filteredCustomers = customers.filter((customer) =>
//     customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     customer.phone.includes(searchQuery) ||
//     customer.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     customer.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     customer.country.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleAddCustomer = async () => {
//     try {
//       const response = await axios.post("http://localhost:3000/customers", newCustomer);

//       if (response.status === 201) {
//         await fetchCustomers(); 
//         setIsModalOpen(false); 
//         resetForm(); 
//       }
//     } 
//     catch (error) {
//       console.error("Error adding customer:", error);
//     }
//   };

//   const handleCustomerClick = (customer) => {
//     navigate("/custorder", { state: { customer } });
//   };

//   return (
//     <div className="flex relative">
//       <Sidebar className="h-screen fixed" />
//       <div className={`w-full ml-0 md:ml-[15%] p-4 pt-20 bg-gray-100 transition-all ${isModalOpen ? "blur-sm" : ""}`}>
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-semibold">Customers</h2>
//           <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white flex items-center px-4 py-2 rounded-lg hover:bg-blue-600">
//             + Add Customer
//           </button>
//         </div>

//         <CustomerSummary customers={customers} />

//         <div className="bg-white p-2 shadow-md rounded-lg overflow-x-auto">
//           <Table
//             title="Customers"
//             heading={["Name", "Email", "Phone", "Orders", "Total", "Since", "Status"]}
//             tableContent={filteredCustomers.map((cust) => ({
//               name: (
//                 <button onClick={() => handleCustomerClick(cust)} className="text-blue-500 hover:underline">
//                   {cust.name || "N/A"}
//                 </button>
//               ),
//               email: cust.email || "N/A",
//               phone: cust.phone || "N/A",
//               orders: cust.orders || 0,
//               total: cust.total || "$0.00",
//               since: cust.since || "12 Aug 2022 - 12:25 am",
//               status: cust.status || "Inactive",
//             }))}
//             compact 
//           />
//         </div>
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-4 rounded-lg shadow-lg w-full md:w-[400px] mx-4 relative z-20">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold">Add Customer</h2>
//               <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-black">
//                 <AiOutlineClose size={24} />
//               </button>
//             </div>

//             <div className="space-y-2">
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

//             <div className="flex justify-between mt-4">
//               <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-200">Cancel</button>
//               <button onClick={handleAddCustomer} className="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600">Add</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomersPage;



import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Table from "../components/Table";
import { AiOutlineClose } from "react-icons/ai";
import Sidebar from "../layout/Sidebar";
import Cust from "../assets/cust.svg";
import Order from "../assets/order.svg";

const CustomerSummary = ({ customers }) => {
    const totalCustomers = customers.length;
    const activeCustomers = customers.filter((customer) => customer.status === "Active").length;
    const inactiveCustomers = customers.filter((customer) => customer.status === "Inactive").length;
    const newCustomers = customers.filter((customer) => {
      const customerDate = new Date(customer.since);
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return customerDate >= oneWeekAgo;
    }).length;
  
    const totalOrders = customers.reduce((sum, customer) => sum + (customer.orders || 0), 0);
    const abandonedCarts = customers.filter((customer) => customer.abandonedCarts > 0).length;
  
    return (
      <div className="flex flex-wrap gap-6 mb-6">
        {[
          {
            img: Cust,
            title: "Customers",
            stats: [
              { label: "All Customers", value: totalCustomers, change: "+15.30%", color: "text-green-500" },
              { label: "Active", value: activeCustomers, change: "+8%", color: "text-green-500" },
              { label: "Inactive", value: inactiveCustomers, change: "-10%", color: "text-red-500" },
            ],
          },
          {
            img: Order,
            title: "Orders",
            stats: [
              { label: "New Customers", value: newCustomers, change: "-20%", color: "text-red-500" },
              { label: "Purchasing", value: totalOrders },
              { label: "Abandoned Carts", value: abandonedCarts },
            ],
          },
        ].map(({ img, title, stats }, index) => (
          <div key={index} className="bg-white shadow-lg rounded-xl p-6 w-full md:w-[calc(50%-12px)] lg:w-[calc(50%-12px)]">
            <div className="flex items-center gap-2 mb-4">
              <img src={img} alt={`${title} icon`} className="w-8 h-8" />
              <span className="text-gray-400 text-sm ml-auto">This Week</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.map(({ label, value, change, color }, i) => (
                <div key={i}>
                  <p className="text-gray-500 text-sm">{label}</p>
                  <p className="text-xl font-semibold">{value}</p>
                  {change && <p className={`${color} text-xs`}>{change}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };
  

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addAddress, setAddAddress] = useState(false);
  const [isEditing, setIsEditing] = useState(false); 
  const [newCustomer, setNewCustomer] = useState({
    id: "", 
    name: "",
    email: "",
    phoneCode: "+234",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchCustomers();
  
    if (location.state?.customer) {
      setNewCustomer(location.state.customer);
      setIsModalOpen(true);
      setIsEditing(true); 
    }
  }, [location.state]);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/customers");
      setCustomers(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setCustomers([]);
    }
  };

  const resetForm = () => {
    setNewCustomer({
      id: "",
      name: "",
      email: "",
      phoneCode: "+234",
      phone: "",
      address: "",
      city: "",
      state: "",
      country: "",
    });
    setIsEditing(false);
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery) ||
    customer.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCustomer = async () => {
    try {
      const response = await axios.post("http://localhost:3000/customers", newCustomer);

      if (response.status === 201) {
        await fetchCustomers();
        setIsModalOpen(false);
        resetForm();
      }
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  const handleUpdateCustomer = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/customers/${newCustomer.id}`, newCustomer);

      if (response.status === 200) {
        await fetchCustomers();
        setIsModalOpen(false);
        resetForm();
      }
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  const handleCustomerClick = (customer) => {
    navigate("/custorder", { state: { customer } });
    
  };

  return (
    <div className="flex relative">
      <Sidebar className="h-screen fixed" />
      <div className={`w-full ml-0 md:ml-[15%] p-4 pt-20 bg-gray-100 transition-all ${isModalOpen ? "blur-sm" : ""}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Customers</h2>
          <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white flex items-center px-4 py-2 rounded-lg hover:bg-blue-600">
            + Add Customer
          </button>
        </div>

        <CustomerSummary customers={customers} />

        <div className="bg-white p-2 shadow-md rounded-lg overflow-x-auto">
          <Table
            title="Customers"
            heading={["Name", "Email", "Phone", "Orders", "Total", "Since", "Status"]}
            tableContent={filteredCustomers.map((cust) => ({
              name: (
                <button onClick={() => handleCustomerClick(cust)} className="text-blue-500 hover:underline">
                  {cust.name || "N/A"}
                </button>
              ),
              email: cust.email || "N/A",
              phone: cust.phone || "N/A",
              orders: cust.orders || 0,
              total: cust.total || "$0.00",
              since: cust.since || "12 Aug 2022 - 12:25 am",
              status: cust.status || "Inactive",
            }))}
            compact
          />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-full md:w-[400px] mx-4 relative z-20">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{isEditing ? "Edit Customer" : "Add Customer"}</h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
                className="text-gray-500 hover:text-black"
              >
                <AiOutlineClose size={24} />
              </button>
            </div>

            <div className="space-y-2">
              <input
                type="text"
                placeholder="Name"
                className="w-full border rounded-lg p-2"
                value={newCustomer.name}
                onChange={(e) => setNewCustomer((prev) => ({ ...prev, name: e.target.value }))}
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border rounded-lg p-2"
                value={newCustomer.email}
                onChange={(e) => setNewCustomer((prev) => ({ ...prev, email: e.target.value }))}
              />
              <div className="flex items-center gap-2">
                <select
                  className="border rounded-lg p-2"
                  value={newCustomer.phoneCode}
                  onChange={(e) => setNewCustomer((prev) => ({ ...prev, phoneCode: e.target.value }))}
                >
                  <option>+234</option>
                  <option>+91</option>
                </select>
                <input
                  type="text"
                  placeholder="Phone"
                  className="flex-1 border rounded-lg p-2"
                  value={newCustomer.phone}
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
                  <input
                    type="text"
                    placeholder="Address"
                    className="w-full border rounded-lg p-2"
                    value={newCustomer.address}
                    onChange={(e) => setNewCustomer((prev) => ({ ...prev, address: e.target.value }))}
                  />
                  <input
                    type="text"
                    placeholder="City"
                    className="w-full border rounded-lg p-2"
                    value={newCustomer.city}
                    onChange={(e) => setNewCustomer((prev) => ({ ...prev, city: e.target.value }))}
                  />
                  <input
                    type="text"
                    placeholder="State"
                    className="w-full border rounded-lg p-2"
                    value={newCustomer.state}
                    onChange={(e) => setNewCustomer((prev) => ({ ...prev, state: e.target.value }))}
                  />
                  <input
                    type="text"
                    placeholder="Country"
                    className="w-full border rounded-lg p-2"
                    value={newCustomer.country}
                    onChange={(e) => setNewCustomer((prev) => ({ ...prev, country: e.target.value }))}
                  />
                </>
              )}
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
                className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={isEditing ? handleUpdateCustomer : handleAddCustomer}
                className="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
              >
                {isEditing ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersPage;