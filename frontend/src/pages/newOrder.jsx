import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Dropdown from "../components/dropdown";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import calendar from "../assets/calendar.svg";
import container from "../assets/iconContainer.svg";


const orderType = [
    { label: "Home Delivery" },
    { label: "Pick Up" },
];
const status = [
    { label: "Pending" },
    { label: "In-Progress" },
    { label: "Completed" },
];
const paymentType = [
    { label: "Cash On Delivery" },
    { label: "Upi" },
    { label: "Master Card" },
    { label: "Bank Account" },
];
export const NewOrder = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());
    const [time, setTime] = useState(() => format(new Date(), "HH:mm"));
    const [products, setProducts] = useState([]);
    const [originalProducts, setOriginalProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [orders, setOrders] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:3000/orders")
            .then((response) => {
                setOrders(response.data);
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
            });
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("http://localhost:3000/products");
                console.log("Fetched Products:", res.data);
                setOriginalProducts(res.data);
                setProducts([]);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);


    const handleSearch = (searchTerm) => {
        setSearchQuery(searchTerm);

        if (searchTerm.trim() === "") {
            setProducts([]);
            console.log("Search cleared, empty product list.");
            return;
        }

        const filteredProducts = originalProducts.filter((product) =>
            product.productName.toLowerCase().includes(searchTerm.toLowerCase())
        );

        console.log("Filtered Products:", filteredProducts);
        setProducts(filteredProducts);
    };
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-lg">
            <div className="bg-white p-8 rounded-xl shadow-lg w-[800px] h-[620px]">
                <h1 className="mb-4 font-bold text-[18px]">Create New Order</h1>
                <div className='flex'>
                    <div className='flex flex-col'>
                        <div className='flex ml-1 mb-4 '>
                            <p>Order Details</p>
                            <div className="inline-flex">
                                <p className="pr-3 pl-32">New Customer</p>
                                <input
                                    type="checkbox"
                                    className="large-checkbox mt-1"
                                    onChange={() => navigate("/customer")}
                                />
                            </div>
                        </div>
                        <Dropdown
                            dropdownButtonStyle="pl-3 text-gray-900 pt-2 mb-4 border-none bg-[#EFF1F999] w-[358px] h-[42px] rounded-md"
                            dropdownMenuStyle="bg-white"
                            dropdownButtonText="Select Customer"
                        />

                        <div className='flex'>
                            <Dropdown
                                dropdownButtonStyle="pl-3 text-gray-900 pt-2 border-none bg-[#EFF1F999]  w-[172.5px] h-[42px] rounded-md"
                                dropdownMenuStyle="bg-white"
                                dropdownButtonText="Payment Type"
                                dropdownOptions={paymentType}
                            />
                            <Dropdown
                                dropdownButtonStyle="pl-3 text-gray-900 mr-3 ml-3 pt-2 border-none bg-[#EFF1F999] w-[172.5px] h-[42px] rounded-md"
                                dropdownMenuStyle="bg-white"
                                dropdownButtonText="Order Type"
                                dropdownOptions={orderType}
                            />
                        </div>
                        <div>
                            <div className="flex mt-4">
                                <div className="inline-flex pt-3 bg-[#EFF1F999] w-[172.5px] h-[42px] rounded-md text-gray-400">
                                    <img src={calendar} alt="calender" className='w-5 pb-2 mx-3' />
                                    <DatePicker
                                        className="w-[111.5px] bg-transparent outline-none"
                                        selected={startDate}
                                        onChange={(date) => {
                                            setStartDate(date);
                                        }}
                                        dateFormat="yyyy-MM-dd"
                                    />
                                </div>
                                <div className="bg-[#EFF1F999] w-[172.5px] mr-3 ml-3 h-[42px] rounded-md rounded-lg focus:ring-blue-500 focus:border-blue-500">
                                    <input
                                        className="bg-transparent mx-4 h-full text-gray-700 outline-none"
                                        type="time"
                                        value={time}
                                        onChange={(e) => {
                                            const newTime = e.target.value;
                                            setTime(newTime);
                                        }}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <p className="my-4">Order Status</p>
                        <Dropdown
                            dropdownButtonStyle="pl-3 text-gray-900 pt-2 border-none bg-[#EFF1F999] mb-3 w-[358px] h-[42px] rounded-md"
                            dropdownMenuStyle="bg-white"
                            dropdownButtonText="Status"
                            dropdownOptions={status}
                        />
                        <div>
                            <input
                                type="text"
                                name="shortDescription"
                                placeholder="Short Description"
                                className="pb-18 w-[360px] mb-[28px] h-[130px] pl-3 bg-[#EFF1F999] rounded-md"
                            />
                        </div>
                    </div>
                    <div className="ml-10">
                        <p className="pb-3">Items</p>
                        <div className="relative">
                            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 items-center ps-3 pt-3 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-gray-500"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="black"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="block ps-10 w-[338px] h-[35px] border border-gray-300 rounded-lg"
                            placeholder="Search Product Name"
                        />

                        {products.length > 0 ? (
                            <ul className="bg-white rounded-md shadow-md p-3 mt-2">
                                {products.map((product) => (
                                    <li key={product._id} className="flex justify-between py-2 border-b">
                                        <span className="text-gray-700">{product.productName}</span>
                                        <span className="text-gray-500">${product.sellingPrice}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            searchQuery && <p className="text-gray-500 mt-2">No products found</p>
                        )}


                        {searchQuery.trim() === "" && products.length === 0 && (
                            <div className="flex justify-center py-12">
                                <div className="w-[282px] h-[324px]">
                                    <img src={container} className="justify-self-center pt-3" alt="ordericon" />
                                    <h1 className="pt-3 text-center">Add Products to Your Order</h1>
                                    <p className="pt-3 text-center">Search and add products to this order.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="justify-center flex">
                    <button className='cursor-pointer bg-white inline-flex w-[140px] h-[36px] justify-center rounded-lg text-[14px] mr-4 pt-2 text-[#5570F1] border-2 border-[#5570F1]'
                        onClick={onClose}>
                        Cancel
                    </button>
                    <button className='cursor-pointer bg-[#5570F1] inline-flex w-[140px] h-[36px] justify-center rounded-lg text-[14px] mr-4 pt-2 text-white'>
                        Create Order
                    </button>
                </div>
            </div>
        </div>
    )
}
