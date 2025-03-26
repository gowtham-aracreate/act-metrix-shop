import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import profileIcon from "../assets/profile.svg";
import locationIcon from "../assets/location.svg";
import ordericon from "../assets/ordericon.svg";
import orderstatus from "../assets/orderstatus.svg";
import cart from "../assets/cart.svg";
import Table from "../components/Table";
import Sidebar from "../layout/Sidebar";
import Cards from "../components/Cards";

const config = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const CustOrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [customer, setCustomer] = useState(location.state?.customer || {});
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [salesData, setSalesData] = useState({});


  useEffect(() => {
    if (!location.state?.customer) {
      fetch(`http://localhost:3000/api/customers/${id}`,config())
        .then(response => response.json())
        .then(data => {
          setCustomer(data);
        })
        .catch(error => {
          console.error('Error fetching customer data:', error);
        });
    } 
  }, [id, location.state]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, customersRes] = await Promise.all([
          axios.get("http://localhost:3000/api/orders", config()),
          axios.get("http://localhost:3000/api/customers", config()),
        ]);

        const customersWithLastOrder = customersRes.data.map((customer) => {
          const customerOrders = ordersRes.data.filter(
            (order) => order.customerId === customer._id
          );
          const lastOrderDate = customerOrders.length
            ? new Date(
                Math.max(...customerOrders.map((order) => new Date(order.orderDate)))
              ).toLocaleString()
            : "No Orders";

          return { ...customer, lastOrderDate };
        });

        setOrders(ordersRes.data);
        setCustomers(customersWithLastOrder);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  const handleEditCustomer = () => {
    navigate("/customer", { state: { customer } });
  };

  const heading = [
    "Order Date",
    "Order Type",
    "Tracking ID",
    "Order Total",
    "Action",
    "Status",
  ];

  const fields = [
    {
      icon: locationIcon,
      alt: "Sales",
      cardStyle: "bg-white rounded-lg w-[430px] h-[150px]",
      maintitleStyle: "px-2 justify-between",
      titleStyle: "text-gray-800 font-semibold ",
      subtitleStyle: "text-gray-500",
      title1: "Home Address",
      subTitle1: `${customer?.address || "N/A"}, ${customer?.state || "N/A"}`,
      title2: "Billing Address",
      subTitle2: `${customer?.address || "N/A"}, ${customer?.state || "N/A"}`,
      showDropdown: false,
    },
    {
      icon: ordericon,
      alt: "Orders",
      cardStyle: "bg-white rounded-lg w-[320px] h-[150px]",
      maintitleStyle: "px-3 justify-between",
      titleStyle: "text-gray-800 font-semibold ",
      subtitleStyle: "text-gray-500",
      title1: "Total Orders",
      subTitle1: salesData?.totalOrders ?? 0,
      showDropdown: false,
    },
  ];

  const fields2 = [
    {
      icon: ordericon,
      alt: "Sales",
      cardStyle: "bg-white rounded-lg w-[430px] h-[150px]",
      maintitleStyle: "px-2 justify-between",
      titleStyle: "text-gray-800 font-semibold ",
      subtitleStyle: "text-gray-500",
      title1: "All Orders",
      subTitle1: salesData?.totalOrders ?? 0,
      title2: "In-Progress",
      subTitle2: salesData?.inProgress ?? 0,
      title3: "Completed",
      subTitle3: salesData?.completed ?? 0,
      showDropdown: false,
    },
    {
      icon: orderstatus,
      alt: "Orders",
      cardStyle: "bg-white rounded-lg w-[430px] h-[150px]",
      maintitleStyle: "px-3 justify-between",
      titleStyle: "text-gray-800 font-semibold ",
      subtitleStyle: "text-gray-500",
      title1: "Home Delivery",
      subTitle1: salesData?.totalSales ?? 0,
      title2: "Pickup",
      subTitle2: salesData?.totalVolume ?? 0,
      showDropdown: false,
    },
    {
      icon: cart,
      alt: "Orders",
      cardStyle: "bg-white rounded-lg w-[320px] h-[150px]",
      maintitleStyle: "px-3 justify-between",
      titleStyle: "text-gray-800 font-semibold ",
      subtitleStyle: "text-gray-500",
      title1: "Abandoned Cart",
      subTitle1: salesData?.abandonedCart ?? 0,
      showDropdown: false,
    },
  ];

  return (
    <div>
      <Sidebar title="Orders" />
      <div className="ml-64 mt-15 bg-[#5E636614] h-screen p-4">
        <div className="flex justify-between pb-4">
          <div className="flex">
            <h2 className="">Customer Number</h2>
            <p className="pl-1">#1</p>
          </div>
          <div className="flex items-end">
            <button onClick={handleEditCustomer} className="px-6 py-3 bg-gray-400 rounded-lg ">
              Edit Customer
            </button>
            <button className="px-6 py-3 bg-red-500 text-white rounded-lg ml-2">
              Suspend Customer
            </button>
          </div>
        </div>
        <div className="flex pb-4">
          <div className="bg-white p-4 w-[430px] h-[150px] mr-5 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-md bg-orange-100">
                <img src={profileIcon} alt="Profile" className="h-8 w-8" />
              </div>
              <div>
                <p className="text-gray-800 font-semibold">{customer.name}</p>
                <p className="text-gray-400 text-xs">
                  Last Order <span className="text-gray-800 font-medium">12 Sept 2022</span>
                </p>
              </div>
              <button className="ml-auto px-2 py-1 text-green-600 bg-green-100 rounded-md text-xs">
                Active
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-8">
              <div>
                <p className="text-gray-800 font-semibold">Phone</p>
                <p className="text-gray-500">{customer.phoneCode} {customer.phone}</p>
              </div>
              <div>
                <p className="text-gray-800 font-semibold">Email</p>
                <p className="text-gray-500">{customer.email}</p>
              </div>
            </div>
          </div>
          <Cards fields={fields} cardplace="flex flex-row gap-4 pr-5" />
        </div>
        <div>
          <Cards fields={fields2} cardplace="flex flex-row gap-4 pr-5" />
        </div>
        <div className="mt-6">
        <Table title={`${customer.name}'s Orders`} 
            tableContent={orders.map(order => ({
              orderDate: order.orderDate || "N/A",
              orderType: order.orderType || "N/A",
              trackingID: order.trackingID || "N/A",
              orderTotal: order.total || "N/A",
              action: "View Details",
              status: order.status || "Pending",
            }))} 
            heading={["Order Date", "Order Type", "Tracking ID", "Order Total", "Action", "Status"]} 
          />        </div>
      </div>
    </div>
  );
};

export default CustOrderPage;
