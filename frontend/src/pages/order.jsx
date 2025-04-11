import React from "react";
import { useNavigate } from "react-router-dom";
import Cards from "../components/Cards";
import order from "../assets/order.svg";
import cart from "../assets/cart.svg";
import Sidebar from "../layout/Sidebar";
import { useState, useEffect } from "react";
import container from "../assets/iconContainer.svg";
import { NewOrder } from "../pages/NewOrder";
import Table from "../components/Table";
import Dropdown from "../components/dropdown";
import axios from "axios";
import dayjs from "dayjs";

const token = localStorage.getItem("token");

const config = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
};

const options = [
    { label: "This Month", href: "#" },
    { label: "Last Month", href: "#" },
    { label: "Last Week", href: "#" },
];

const tableTitle = [
    "Customer Name",
    "Order Date",
    "Order Type",
    "Tracking ID",
    "Order Total",
    "Action",
    "Status",
];

const Order = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [originalOrders, setOriginalOrders] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({
        status: 'All',
        category: [],
        dateRange: null,
        timePeriod: [],
    });

    const [salesData, setSalesData] = useState({
        totalOrders: 0,
        inProgress: 0,
        completed: 0,
        totalCustomers: 0,
        abandonedCart: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const salesRes = await fetch("http://localhost:3000/api/sales", config);
                const salesJson = await salesRes.json();

                setSalesData({
                    totalOrders: salesJson.totalOrders || 0,
                    inProgress: salesJson.inProgress || 0,
                    completed: salesJson.completed || 0,
                    totalCustomers: salesJson.totalCustomers || 0,
                    abandonedCart: salesJson.abandonedCart || 0,
                });
            } catch (error) {
                console.error("Error fetching sales data:", error);
            }
        };

        fetchData();
    }, []);

    const fields = [
        {
            icon: order,
            alt: "order",
            cardStyle: "bg-white rounded-lg w-[605px] h-[145px]",
            maintitleStyle: "gap-40 pl-4",
            titleStyle: "text-[#8B8D97]",
            subtitleStyle: "font-bold text-[#45464E]",
            title1: "All Orders",
            subTitle1: salesData.totalOrders,
            title2: "In-Progress",
            subTitle2: salesData.inProgress,
            title3: "Completed",
            subTitle3: salesData.completed,
            showDropdown: false,
        },
        {
            icon: cart,
            alt: "Sales",
            cardStyle: "bg-white rounded-lg w-[605px] h-[145px]",
            maintitleStyle: "pl-3 justify-between",
            titleStyle: "text-[#8B8D97]",
            subtitleStyle: "font-bold text-[#45464E]",
            title1: "Customer",
            subTitle1: salesData.totalCustomers,
            title2: "Abandoned Cart",
            subTitle2: salesData.abandonedCart,
            showDropdown: false,

        }
    ];

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:3000/orders", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOrders(res.data);
            setOriginalOrders(res.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        fetchOrders(); // Fetch orders on component mount
    }, []);

    const handleActionChange = async (orderId, selectedOption) => {
        try {
            const newStatus = selectedOption.label;
            const response = await axios.patch(
                `http://localhost:3000/orders/${orderId}`,
                { status: newStatus },
                config
            )
            if (response.status === 200) {
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order._id === orderId ? { ...order, status: newStatus } : order
                    )
                );
            } else {
                console.error("Failed to update order status:", response.data);
            }
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };
    const handleSearch = (searchTerm) => {
        setSearchQuery(searchTerm);

        if (searchTerm) {
            const filteredOrders = originalOrders.filter((order) =>
                order.customer?.toLowerCase().startsWith(searchTerm.toLowerCase()) 
            );
            setOrders(filteredOrders);
        } else {
            setOrders(originalOrders);
        }
    };

    const handleSortChange = (newFilters) => {
        setFilters(newFilters);

        let sortedOrders = [...originalOrders];

        if (newFilters.status && newFilters.status !== "All") {
            sortedOrders = sortedOrders.filter(
                (order) => order.status?.toLowerCase() === newFilters.status.toLowerCase()
            );
        }

        if (newFilters.selectedCheckboxes?.length) {
            sortedOrders = sortedOrders.filter((order) =>
                newFilters.selectedCheckboxes.includes(order.orderType)
            );
        }

        if (newFilters.amountFrom) {
            sortedOrders = sortedOrders.filter((order) =>
                parseFloat(order.totalAmount) >= parseFloat(newFilters.amountFrom)
            );
        }

        if (newFilters.amountTo) {
            sortedOrders = sortedOrders.filter((order) =>
                parseFloat(order.totalAmount) <= parseFloat(newFilters.amountTo)
            );
        }

        setOrders(sortedOrders);
    };

    const handleDateFilter = (filters) => {
        let filteredOrders = [...originalOrders];

        if (filters.timePeriod.length > 0) {
            filteredOrders = filteredOrders.filter((order) => {
                const orderDate = dayjs(order.orderDate);
                return filters.timePeriod.some((period) => {
                    switch (period) {
                        case "This Week":
                            return orderDate.isAfter(dayjs().startOf("week"));
                        case "Last Week":
                            return (
                                orderDate.isAfter(dayjs().subtract(1, "week").startOf("week")) &&
                                orderDate.isBefore(dayjs().startOf("week"))
                            );
                        case "This Month":
                            return orderDate.isAfter(dayjs().startOf("month"));
                        case "Last Month":
                            return (
                                orderDate.isAfter(dayjs().subtract(1, "month").startOf("month")) &&
                                orderDate.isBefore(dayjs().startOf("month"))
                            );
                        case "This Year":
                            return orderDate.isAfter(dayjs().startOf("year"));
                        case "Last Year":
                            return (
                                orderDate.isAfter(dayjs().subtract(1, "year").startOf("year")) &&
                                orderDate.isBefore(dayjs().startOf("year"))
                            );
                        default:
                            return true;
                    }
                });
            });
        }

        if (filters.dateRange && filters.dateRange.length === 2) {
            const [startDate, endDate] = filters.dateRange.map((date) =>
                dayjs(date).startOf("day")
            );
            filteredOrders = filteredOrders.filter((order) => {
                const orderDate = dayjs(order.orderDate).startOf("day");
                return (
                    orderDate.isAfter(startDate.subtract(1, "day")) &&
                    orderDate.isBefore(endDate.add(1, "day"))
                );
            });
        }

        setOrders(filteredOrders);
    };
    const formatDate = (dateString) => {
        if (!dateString) return "-";
        return dayjs(dateString).format("MMM D, YYYY");
    };


    const OrderData = orders.map((order) => ({
        customerName: (
            <span
                className="text-gray-600 font-semibold cursor-pointer"

                onDoubleClick={() => navigate(`/orders/${order._id}`, console.log("Navigating to order:", order._id), { state: { OrderId: order._id } })}
            >
                {order.customer || "-"}
            </span>
        ),
        orderDate: order.orderDate ? formatDate(order.orderDate) : "-",
        orderType: order.orderType || "-",
        trackingId: order.trackingID || "-",
        orderTotal: order.totalAmount ? `₦ ${order.totalAmount.toFixed(2)}` : "-",
        action: (
            <Dropdown
                dropdownButtonStyle="text-gray-600 h-[23px] justify-center w-[130px] pr-10 bg-[#5E636614] text-[15px] rounded-md"
                dropdownButtonText={order.status}
                dropdownOptions={[
                    { label: "Pending" },
                    { label: "In-Progress" },
                    { label: "Completed" },
                ]}
                onSelect={(selectedOption) => handleActionChange(order._id, selectedOption)}
            />
        ),
        status: order.status || "Pending",
    }));

    return (
        <div className="">
            <Sidebar
                title={"Orders"} />
            <div className="ml-64 mt-15 bg-[#5E636614] h-screen">
                <div className="ml-4">
                    <div className="flex mb-[20px] pt-4 justify-between">
                        <h1 className="text-[16px] pt-4">Order Summary</h1>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="cursor-pointer bg-[#5570F1] inline-flex w-[205px] h-[36px] justify-center rounded-lg text-[14px] mt-3 mr-4 pt-2 text-white"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                className="mr-3"
                            >
                                <path
                                    d="M12 5V19"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M5 12H19"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            Create New Order
                        </button>
                    </div>
                    <div>
                        <Cards fields={fields} cardplace="flex flex-row gap-4" />
                        {originalOrders.length === 0 ? (
                            <div className="bg-white mt-[22px] rounded-md mr-4">
                                <div className="flex justify-center py-12">
                                    <div className="w-[282px] h-[324px]">
                                        <img src={container} className="justify-self-center pt-3" alt="ordericon" />
                                        <h1 className="pt-3 text-center">No Orders Yet?</h1>
                                        <p className="pt-3 text-center">Add products to your store and start selling to see orders here.</p>
                                        <div className="flex justify-center">
                                            <button
                                                onClick={() => navigate("/newInventory")}
                                                className="bg-[#5570F1] inline-flex w-[150px] h-[36px] justify-center rounded-lg text-[14px] mt-3 pt-2 text-white"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    className="mr-3"
                                                >
                                                    <path
                                                        d="M12 5V19"
                                                        stroke="white"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M5 12H19"
                                                        stroke="white"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                New Product
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white mt-[12px] rounded-md mr-4">
                                <Table
                                    title="Orders"
                                    mode="order"
                                    onSortChange={handleSortChange}
                                    onFilterChange={handleDateFilter}
                                    onSearch={handleSearch}

                                    filters={filters}
                                    heading={tableTitle}
                                    tableContent={OrderData.length > 0 ? OrderData.map((order) => [
                                        order.customerName,
                                        order.orderDate,
                                        order.orderType,
                                        order.trackingId,
                                        order.orderTotal,
                                        order.action,
                                        order.status,
                                    ]) : []}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <NewOrder isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onOrderAdded={fetchOrders}
                />
            </div>
        </div>
    );
};

export default Order;


