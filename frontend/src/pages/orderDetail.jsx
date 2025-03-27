import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../layout/Sidebar";
import Cards from "../components/Cards";
import Table from "../components/Table";
import customerIcon from "../assets/cust.svg";
import money from "../assets/money.svg";
import locationIcon from "../assets/location.svg";
import Dropdown from "../components/dropdown";

const config = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const OrderDetail = () => {
  const { orderId } = useParams();  // Read ID from URL
  const location = useLocation();
  const [order, setOrder] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState(null);
  const [orderIndex, setOrderIndex] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const allOrdersRes = await axios.get("http://localhost:3000/orders", config());
        const allOrders = allOrdersRes.data;

        const index = allOrders.findIndex(order => order._id === orderId);
        setOrderIndex(index !== -1 ? index + 1 : "N/A");

        const orderRes = await axios.get(`http://localhost:3000/orders/${orderId}`, config());
        setOrder(orderRes.data);

        if (!location.state?.customer) {
          fetchCustomerDetails(orderRes.data.customerId);
        } else {
          setCustomer(location.state.customer);
        }
      } catch (err) {
        setError("Failed to fetch order details");
      }
    };

    const fetchCustomerDetails = async (customerId) => {
      console.log("Fetching customer details for ID:", customerId);
      try {
        const customerRes = await axios.get(`http://localhost:3000/customers/${customerId}`, config());
        setCustomer(customerRes.data);
      } catch (err) {
        console.error("Error fetching customer data:", err);
      }
    };

    fetchOrderDetails();
  }, [orderId]);


  const handleActionChange = async (itemId, selectedOption) => {
    try {
      const newStatus = selectedOption.label;
  
      // Send request to update item status
      const response = await axios.patch(
        `http://localhost:3000/orders/${orderId}/items/${itemId}`,
        { status: newStatus },
        config()
      );
  
      if (response.status === 200) {
        setOrder((prevOrder) => {
          const updatedItems = prevOrder.items.map((item) =>
            item._id === itemId ? { ...item, status: newStatus } : item
          );
  
          // Determine the overall order status
          let overallStatus = "Completed";
          if (updatedItems.some((item) => item.status === "Cancelled")) {
            overallStatus = "Cancelled";
          } else if (updatedItems.some((item) => item.status !== "Completed")) {
            overallStatus = "Pending";
          }
  
          // Update the overall order status if changed
          if (prevOrder.status !== overallStatus) {
            handleOrderStatusChange(overallStatus);
          }
  
          return { ...prevOrder, items: updatedItems };
        });
      } else {
        console.error("Failed to update order item status:", response.data);
      }
    } catch (error) {
      console.error("Error updating order item status:", error);
    }
  };
  
  
  // Function to update the overall order status
  const handleOrderStatusChange = async (newStatus) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/orders/${orderId}`, 
        { status: newStatus }, 
        config()
      );
  
      if (response.status === 200) {
        setOrder((prevOrder) => ({
          ...prevOrder,
          status: newStatus,
        }));
      } else {
        console.error("Failed to update order status:", response.data);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };
  


  const tableTitle = ["Product Name", "Unit Price", "Quantity", "Discount", "Total", "Action", "Status"];

  const orderItems =
    order?.items?.map(({ _id, productName, price, quantity, discount, total, status }) => [
      productName || "-",
      `₦ ${price ? price.toFixed(2) : "0.00"}`,
      quantity || 0,
      `₦ ${(discount ?? 0).toFixed(2)}`,
      `₦ ${total ? total.toFixed(2) : "0.00"}`,
      <Dropdown
        dropdownButtonStyle="text-gray-600 h-[23px] justify-center w-[130px] pr-10 bg-[#5E636614] text-[15px] rounded-md"
        dropdownButtonText={status || "Pending"}
        dropdownOptions={[
          { label: "Pending" },
          { label: "In-Progress" },
          { label: "Completed" },
        ]}
        onSelect={(selectedOption) => handleActionChange(_id, selectedOption)}
      />,
      status || "Pending",
    ]) || [];

  const fields = [
    {
      icon: locationIcon,
      alt: "Address",
      cardStyle: "bg-white rounded-lg w-[395px] h-[155px]",
      maintitleStyle: "px-2 justify-between",
      titleStyle: "text-black font-semibold text-[15px]",
      subtitleStyle: "text-[#45464E]",
      title1: "Home Address",
      subTitle1: `${customer?.address || "N/A"}, ${customer?.state || "N/A"}`,
      title2: "Billing Address",
      subTitle2: `${customer?.address || "N/A"}, ${customer?.state || "N/A"}`,
      showDropdown: false,
    },
    {
      icon: money,
      alt: "Payment",
      cardStyle: "bg-white rounded-lg w-[395px] h-[155px]",
      maintitleStyle: "px-3 justify-between",
      titleStyle: "text-black font-semibold text-[15px]",
      subtitleStyle: "text-[#45464E]",
      title1: "Payment Method",
      subTitle1: order?.paymentType || "N/A",
      title2: "Order Type",
      subTitle2: order?.orderType || "N/A",
      showDropdown: false,
    },
  ];

  return (
    <div>
      <Sidebar
        title="Orders" />
      <div className="ml-64 mt-15 bg-[#5E636614] h-screen p-4">
        <div className="">
          <div className="flex justify-between items-center">
            <div className="flex">
              <h1 className="font-semibold">Order Number</h1>
              <p className="pl-2">#{orderIndex || "N/A"}</p>
              <h1 className="pl-5 font-semibold">Date Added</h1>
              <p className="px-2 text-gray-600">{order?.orderDate}</p>
              <h1 className="font-semibold">Tracking ID</h1>
              <p className="px-2 text-gray-600">{order?.trackingID || "N/A"}</p>
            </div>
            <div className="flex items-end pr-5">
              <button
                className="bg-black text-white px-3 py-1 rounded-md"
                onClick={() => handleOrderStatusChange( "Completed")}
              >
                Mark as Completed
              </button>

              <button
                className="bg-red-500 text-white px-3 py-1 rounded-md ml-2"
                onClick={() =>handleOrderStatusChange("Cancelled" )}
              >
                Cancel
              </button></div>
          </div>
          <div className="flex justify-between mt-4">
            <div className="bg-white p-4 rounded-lg w-[395px] h-[155px]">
              <div className="flex justify-between items-center">
                <img src={customerIcon} alt="Customer" />
                <p className="text-gray-500 text-[14px] pr-15">
                  Customer Name: <span className="text-black">{customer?.name || "N/A"}</span>
                </p>
                <span
                  className={`px-2 py-1 rounded-full ${order?.status === "Completed"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                    }`}
                >
                  {order?.status || "Pending"}
                </span>
              </div>
              <div className="flex justify-between mt-6">
                <div>
                  <p className="text-black font-semibold text-[15px]">Phone</p>
                  <p className="text-[#8B8D97] ">{customer?.phone || "N/A"}</p>
                </div>
                <div className="pr-20">
                  <p className="text-black font-semibold text-[15px]">Email</p>
                  <p className="text-[#8B8D97]">{customer?.email || "N/A"}</p>
                </div>
              </div>
            </div>
            <Cards fields={fields} cardplace="flex flex-row gap-4 pr-5" />
          </div>
          <div className="">
            <Table
              title="Order Items"
              mode="order"
              tableTitle={tableTitle}
              heading={tableTitle}
              tableContent={orderItems}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
