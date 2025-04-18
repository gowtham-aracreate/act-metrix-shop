import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Table from "../components/Table";
import { AiOutlineClose } from "react-icons/ai";
import Sidebar from "../layout/Sidebar";
import Cust from "../assets/customer2.svg";
import Order from "../assets/order.svg";
import Cards from "../components/Cards";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Dropdown from "../components/dropdown";

const config = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};


const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addAddress, setAddAddress] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [originalCustomers, setOriginalCustomers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [filters, setFilters] = useState({
  status: 'All',
  amountFrom: '',
  amountTo: '',
  timePeriod: [],
  dateRange: null,
  sortBy: '',
  sortOrder: 'asc'
});

  const [newCustomer, setNewCustomer] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
  });
  const [customerStats, setCustomerStats] = useState({
    totalCustomers: 0,
    activeCustomers: 0,
    inactiveCustomers: 0,
    totalOrders: 0,
    pendingOrders: 0,
  });


  useEffect(() => {
    fetchCustomers();
    if (location.state?.customer) {
      setNewCustomer(location.state.customer);
      setIsModalOpen(true);
      setIsEditing(true);
    }
  }, [location.state?.customer]);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/customers", config());
      if (response.status === 200) {
        setCustomers(response.data);
        setOriginalCustomers(response.data); 
        calculateCustomerStats(response.data);
      } else {
        console.error("Unexpected response format:", response);
        setCustomers([]);
        setOriginalCustomers([]); 
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
      setCustomers([]);
      setOriginalCustomers([]); 
    }
  };

  const resetForm = () => {
    setNewCustomer({
      id: "",
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      country: "",
    });
    setIsEditing(false);
  };

  const formatPhoneNumber = (phoneNumber) => {
    const cleanNumber = phoneNumber.replace(/\D/g, "");
    const countryCode = cleanNumber.slice(0, 2); 
    const phoneNumberPart = cleanNumber.slice(2);
  
    return `+${countryCode} ${phoneNumberPart}`;
  };
  

  const handleAddOrUpdateCustomer = async () => {
    try {
      const formattedPhone = formatPhoneNumber(newCustomer.phone);
      const customerData = {
        name: newCustomer.name,
        email: newCustomer.email,
        phone: formattedPhone,        address: newCustomer.address,
        city: newCustomer.city,
        state: newCustomer.state,
        country: newCustomer.country
      };

      const url = newCustomer._id
        ? `http://localhost:3000/customers/${newCustomer._id}`
        : "http://localhost:3000/customers";
      const method = newCustomer._id ? "put" : "post";

      const response = await axios[method](url, customerData, config());
      if (response.status === 200 || response.status === 201) {
        const updatedCustomer = response.data;

        setCustomers((prevCustomers) =>
          newCustomer._id
            ? prevCustomers.map((customer) =>
              customer._id === updatedCustomer._id ? updatedCustomer : customer
            )
            : [...prevCustomers, updatedCustomer]
        );

        setIsModalOpen(false);
        setNewCustomer({
          _id: "",
          name: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          state: "",
          country: "",
        });
        setIsEditing(false);
        setAddAddress(false);
      }
    } catch (error) {
      console.error("Error saving customer:", error);
    }
  };


  const handleCustomerClick = (customer) => {
    navigate(`/customer/orders/${customer._id}`, { state: { customer } });
  };

  const calculateCustomerStats = (customerList) => {
    const today = new Date();

    let totalOrders = 0;
    let pendingOrders = 0;

    const activeCustomers = customerList.filter((cust) => {
      const customerOrders = cust.orders || [];
      totalOrders += customerOrders.length;

      const recentOrders = customerOrders.filter((order) => {
        const orderDate = new Date(order.orderDate);
        return (today - orderDate) / (1000 * 60 * 60 * 24) <= 5;
      });

      const pending = customerOrders.filter((order) => order.status === "Pending");
      pendingOrders += pending.length;

      return recentOrders.length > 0;
    }).length;

    const inactiveCustomers = customerList.length - activeCustomers;


    setCustomerStats({
      totalCustomers: customerList.length,
      activeCustomers,
      inactiveCustomers,
      totalOrders,
      pendingOrders,
    });
  };

  const fields = [
    {
      icon: Cust,
      alt: "order",
      cardStyle: "bg-white rounded-lg w-[605px] h-[145px]",
      maintitleStyle: "gap-40 pl-4",
      titleStyle: "text-[#8B8D97]",
      subtitleStyle: "font-bold text-[#45464E]",
      title1: "All Customers",
      subTitle1: customerStats.totalCustomers,
      title2: "Active",
      subTitle2: customerStats.activeCustomers,
      title3: "Inactive",
      subTitle3: customerStats.inactiveCustomers,
      showDropdown: false,
    },
    {
      icon: Order,
      alt: "Sales",
      cardStyle: "bg-white rounded-lg w-[605px] h-[145px]",
      maintitleStyle: "justify-between pl-4",
      titleStyle: "text-[#8B8D97]",
      subtitleStyle: "font-bold text-[#45464E]",
      title1: "Purchasing",
      subTitle1: customerStats.totalOrders,
      title2: "Abandoned Cart",
      subTitle2: customerStats.pendingOrders,
      showDropdown: false,
    }
  ];

  const Customertable = customers.map((cust) => {
    let createdDate = cust.customerSince ? new Date(cust.customerSince) : null;

    if (!createdDate || isNaN(createdDate.getTime())) {
      createdDate = new Date();
    }

    const today = new Date();

    const customerOrders = Array.isArray(cust.orders) ? cust.orders : [];

    const recentOrders = customerOrders.filter(order => {
      const orderDate = new Date(order.orderDate);
      const orderDiffDays = (today - orderDate) / (1000 * 60 * 60 * 24);
      return orderDiffDays <= 5;
    });

    const totalOrders = customerOrders.length;
    const totalCost = customerOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    const status = recentOrders.length > 0 ? "Active" : "Inactive";
    return {
      name: (
        <span
          onDoubleClick={() => handleCustomerClick(cust)}
          className="cursor-pointer font-semibold"
        >
          {cust.name || "N/A"}
        </span>
      ),
      email: cust.email || "N/A",
      phone: cust.phone || "N/A",
      orders: totalOrders,
      total: totalCost ? `$${totalCost.toFixed(2)}` : "$0.00",
      status: (
        <span
          className={` py-1 rounded-lg text-sm font-medium px-4 ${
            status === "Active" ? "bg-green-400 text-green-800" : "bg-red-300 text-red-700"
          }`}
        >
          {status}
        </span>
      ),
    };
  });


  const handleSearch = (searchTerm) => {
    setSearchQuery(searchTerm);

    if (searchTerm) {
      const filteredCustomers = originalCustomers.filter((item) =>
        item.name?.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setCustomers(filteredCustomers);
    } else {
      setCustomers(originalCustomers);
    }
  };

  const handleSortChange = (newFilters) => {
    setFilters(newFilters);

    let sortedCustomers = [...originalCustomers];

    if (newFilters.status && newFilters.status !== "All") {
    sortedCustomers = sortedCustomers.filter((customer) =>
      customer.status?.toLowerCase() === newFilters.status.toLowerCase()
    );
  }

  // Filter by amount range
  if (newFilters.amountFrom) {
    sortedCustomers = sortedCustomers.filter(
      (customer) => parseFloat(customer.totalAmount || 0) >= parseFloat(newFilters.amountFrom)
    );
  }
  if (newFilters.amountTo) {
    sortedCustomers = sortedCustomers.filter(
      (customer) => parseFloat(customer.totalAmount || 0) <= parseFloat(newFilters.amountTo)
    );
  }

    setCustomers(sortedCustomers);
  };

  // const handleDateFilter = (filters) => {
  //   let filteredCustomers = [...originalCustomers];

  //   if (filters.timePeriod.length > 0) {
  //     filteredCustomers = filteredCustomers.filter((customer) => {
  //       const customerDate = dayjs(customer.customerSince || customer.createdAt);
  //       return filters.timePeriod.some((period) => {
  //         switch (period) {
  //           case "This Week":
  //             return customerDate.isAfter(dayjs().startOf("week"));
  //           case "Last Week":
  //             return (
  //               customerDate.isAfter(dayjs().subtract(1, "week").startOf("week")) &&
  //               customerDate.isBefore(dayjs().startOf("week"))
  //             );
  //           case "This Month":
  //             return customerDate.isAfter(dayjs().startOf("month"));
  //           case "Last Month":
  //             return (
  //               customerDate.isAfter(dayjs().subtract(1, "month").startOf("month")) &&
  //               customerDate.isBefore(dayjs().startOf("month"))
  //             );
  //           case "This Year":
  //             return productDate.isAfter(dayjs().startOf("year"));
  //           case "Last Year":
  //             return (
  //               productDate.isAfter(dayjs().subtract(1, "year").startOf("year")) &&
  //               productDate.isBefore(dayjs().startOf("year"))
  //             );
  //           default:
  //             return true;
  //         }
  //       });
  //     });
  //   }

  //   if (filters.dateRange && filters.dateRange.length === 2) {
  //     const [startDate, endDate] = filters.dateRange.map((date) => dayjs(date).startOf("day"));
  //     filteredCustomers = filteredCustomers.filter((customer) => {
  //       const customerDate = dayjs(customer.customerSince || customer.createdAt).startOf("day");
  //       return (
  //         customerDate.isAfter(startDate.subtract(1, "day")) &&
  //         customerDate.isBefore(endDate.add(1, "day"))
  //       );
  //     });
  //   }

  //   setCustomers(filteredCustomers);
  // };

  return (
    <div className="">
      <Sidebar
        title={"Customer"} />
      <div className="ml-64 mt-15 bg-[#5E636614] h-screen">
        <div className="ml-4">
          <div className="flex mb-[20px] pt-4 justify-between">
            <h2 className="text-[16px] pt-4">Customers Summary</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className=" cursor-pointer bg-[#5570F1] inline-flex w-[190px] h-[36px] justify-center rounded-lg text-[14px] mt-3 mr-4 pt-2 text-white"
            >
              + Add Customer
            </button>
          </div>
          <div>
            <Cards fields={fields} cardplace="flex flex-row gap-4" />
            <Table
              title="Customers"
              mode="customer"
              onSearch={handleSearch}
              onSortChange={handleSortChange}
              // onFilterChange={handleDateFilter}
              heading={["Name", "Email", "Phone", "Orders", "Total", "Status"]}
              tableContent={Customertable}
            />
          </div>
        </div>
      </div>
      <div>
        {/* Modal rendered outside the blurred container */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-lg" >
            <div className="bg-white p-4 rounded-lg shadow-lg w-[400px] mx-4 relative z-1">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {isEditing ? "Edit Customer" : "Add Customer"}
                </h2>
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
                  className="w-full h-12 bg-[#EFF1F999] rounded-lg p-2"
                  value={newCustomer.name}
                  onChange={(e) =>
                    setNewCustomer((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full  h-12 bg-[#EFF1F999] rounded-lg p-2"
                  value={newCustomer.email}
                  onChange={(e) =>
                    setNewCustomer((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
                <div className="flex items-center gap-2">
                  <PhoneInput
                    country={"in"}
                    enableSearch={true}
                    value={newCustomer.phone}
                    onChange={(value) =>
                      setNewCustomer((prev) => ({ ...prev, phone: value }))
                    }
                    containerClass="w-full"
                    inputClass="w-full h-12 bg-[#EFF1F999] rounded-lg p-2 pl-14" // Adjust padding for flag space
                    buttonClass="bg-[#EFF1F999] border-none"
                    dropdownClass="bg-white border-none"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-gray-600">Add Address</label>
                  <button
                    onClick={() => setAddAddress(!addAddress)}
                    className={`w-12 h-6 flex items-center rounded-full p-1 transition-all ${addAddress ? "bg-blue-500" : "bg-gray-300"
                      }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${addAddress ? "translate-x-6" : "translate-x-0"
                        }`}
                    ></div>
                  </button>
                </div>

                {addAddress && (
                  <>
                    <input
                      type="text"
                      placeholder="Address"
                      className="w-full  h-12 bg-[#EFF1F999] p-2"
                      value={newCustomer.address}
                      onChange={(e) =>
                        setNewCustomer((prev) => ({ ...prev, address: e.target.value }))
                      }
                    />
                    <input
                      type="text"
                      placeholder="City"
                      className="w-full  h-12 bg-[#EFF1F999] p-2"
                      value={newCustomer.city}
                      onChange={(e) =>
                        setNewCustomer((prev) => ({ ...prev, city: e.target.value }))
                      }
                    />
                    <input
                      type="text"
                      placeholder="State"
                      className="w-full  h-12 bg-[#EFF1F999] rounded-lg p-2"
                      value={newCustomer.state}
                      onChange={(e) =>
                        setNewCustomer((prev) => ({ ...prev, state: e.target.value }))
                      }
                    />
                    <input
                      type="text"
                      placeholder="Country"
                      className="w-full h-12 bg-[#EFF1F999] rounded-lg p-2"
                      value={newCustomer.country}
                      onChange={(e) =>
                        setNewCustomer((prev) => ({ ...prev, country: e.target.value }))
                      }
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
                  onClick={handleAddOrUpdateCustomer}
                  className="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                >
                  {isEditing ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomersPage;