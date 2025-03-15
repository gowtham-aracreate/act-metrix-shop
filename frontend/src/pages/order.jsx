import React from "react";
import { useNavigate } from "react-router-dom";
import Cards from "../components/Cards";
import order from "../assets/order.svg";
import cart from "../assets/cart.svg";
import Sidebar from "../layout/Sidebar";
import { useState, useEffect } from "react";
import container from "../assets/iconContainer.svg";
import {NewOrder} from "../pages/newOrder";

const options = [
    { label: "This Month", href: "#" },
    { label: "Last Month", href: "#" },
    { label: "Last Week", href: "#" },
];

const fields = [
    {
        icon: order,
        alt: "order",
        cardStyle: "bg-white rounded-lg w-[450px] h-[145px]",
        maintitleStyle: "gap-20 pl-4",
        dropdownButtonStyle: "text-gray-400 border-none pr-10",
        dropdownMenuStyle: "bg-white",
        dropdownButtonText: "This Week",
        dropdownOptions: options,
        titleStyle: "text-[#8B8D97]",
        subtitleStyle: "font-bold text-[#45464E]",
        title1: "All Orders",
        subTitle1: "0",
        title2: "Pending",
        subTitle2: "0",
        title3: "Completed",
        subTitle3: "0",
        showDropdown: true,
    },
    {
        icon: order,
        alt: "order",
        cardStyle: "bg-white rounded-lg w-[450px] h-[145px]",
        maintitleStyle: "gap-20 pl-4",
        dropdownButtonStyle: "text-gray-400 border-none pr-10",
        dropdownMenuStyle: "bg-white",
        dropdownButtonText: "This Week",
        dropdownOptions: options,
        titleStyle: "text-[#8B8D97]",
        subtitleStyle: "font-bold text-[#45464E]",
        title1: "Canceled",
        subTitle1: "0",
        title2: "Returned",
        subTitle2: "0",
        title3: "Damaged",
        subTitle3: "0",
        showDropdown: true,
    },
    {
        icon: cart,
        alt: "Sales",
        cardStyle: "bg-white rounded-lg w-[300px] h-[145px]",
        maintitleStyle: "gap-50 pl-4",
        dropdownButtonStyle: "text-gray-400 border-none pr-10",
        dropdownMenuStyle: "bg-white",
        dropdownButtonText: "This Week",
        dropdownOptions: options,
        titleStyle: "text-[#8B8D97]",
        subtitleStyle: "font-bold text-[#45464E]",
        title1: "Customer",
        subTitle1: "23",
        showDropdown: true,
    }
];

const Order = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="">
            <Sidebar />
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
                            Create a New Order
                        </button>
                    </div>
                    <div>
                        <Cards fields={fields} cardplace="flex flex-row gap-4" />
                        {orders.length === 0 ? (
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
                            <div className="bg-white mt-[22px] rounded-md mr-4 p-4">
                                <h2 className="text-lg font-semibold mb-4">Order List</h2>
                                <Table data={orders} />
                            </div>
                        )}
                    </div>
                </div>
                <NewOrder isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
        </div>
    );
};

export default Order;
