import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Dropdown from "../components/dropdown";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import calendar from "../assets/calendar.svg";
import container from "../assets/iconContainer.svg";

const token = localStorage.getItem("token");

const config = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
};

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
export const NewOrder = ({ isOpen, onClose, onOrderAdded }) => {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());
    const [time, setTime] = useState(() => format(new Date(), "HH:mm"));
    const [products, setProducts] = useState([]);
    const [originalProducts, setOriginalProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [cartVisible, setCartVisible] = useState(false);
    const [cart, setCart] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState("");
    const [isNewCustomer, setIsNewCustomer] = useState(false);
const [newCustomerCount, setNewCustomerCount] = useState(0);


    const [formData, setFormData] = useState({
        customerName: "",
        paymentType: "",
        orderType: "",
        status: "",
        shortDescription: "",
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsRes, customersRes] = await Promise.all([
                    axios.get("http://localhost:3000/products", config),
                    axios.get("http://localhost:3000/customers", config),
                ]);

                console.log("Fetched Products:", productsRes.data);
                setOriginalProducts(productsRes.data);
                setProducts([]); // Make sure this is intentional

                console.log("Fetched Customers:", customersRes.data);
                setCustomers(customersRes.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


    const handleDropdownSelect = (selectedValue, type, event) => {
        event?.preventDefault();
        setFormData((prevFormData) => ({
            ...prevFormData,
            [type]: selectedValue.label,
        }));
        if (type === "customerName") {
            setSelectedCustomer(selectedValue);
        }
    };

    const handleSelect = (selectedOption) => {
        console.log("Selected Customer:", selectedOption);
        setSelectedCustomer({
            name: selectedOption.label,
            id: selectedOption.value, 
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const generateTrackingID = () => {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let trackingID = "";
        for (let i = 0; i < 9; i++) {
            trackingID += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return trackingID;
    };
    const handleNewCustomerChange = (e) => {
        const checked = e.target.checked;
        setIsNewCustomer(checked);
      
        if (checked) {
          setNewCustomerCount((prevCount) => prevCount + 1);
          navigate("/customer");
        }
      };

    const handleSubmit = async (event, action) => {
        event.preventDefault();
        if (!formData.customerName || !formData.orderType || cart.length === 0) {
            alert("Please fill in all required fields and add at least one product.");
            return;
        }
        console.log("Selected Customer:", selectedCustomer);
        console.log("Form Data:", formData);
        const orderDetails = {
            customerId: selectedCustomer?.id || formData.customerId,  
            customer: selectedCustomer?.label || formData.customerName,
            paymentType: formData.paymentType,
            orderType: formData.orderType,
            status: formData.status,
            shortDescription: formData.shortDescription || "",
            trackingID: generateTrackingID(),
            orderDate: startDate.toISOString().split("T")[0], // Format as YYYY-MM-DD
            orderTime: time || "00:00",
            items: cart.map((item) => {
                const unitPrice = parseFloat(item.sellingPrice) || 0;
                const quantity = parseInt(item.quantity) || 0;
                const discount = parseFloat(item.discountValue) || 0; // Use discountValue, NOT discount
                const discountAmount = (unitPrice * discount) / 100;
                const total = ((unitPrice - discountAmount) * quantity).toFixed(2);
            
                return {
                    productId: item._id,
                    productName: item.productName,
                    quantity: quantity,
                    price: unitPrice.toFixed(2), // Ensure price is formatted
                    discount: discountAmount, // Store the actual discount percentage
                    total: parseFloat(total), // Convert total back to float
                };
            }),
            
            totalAmount: parseFloat(
                cart.reduce((sum, item) => {
                    const unitPrice = parseFloat(item.sellingPrice) || 0;
                    const quantity = parseInt(item.quantity) || 0;
                    const discount = parseFloat(item.discount) || 0;
                    const discountAmount = (unitPrice * discount) / 100;
                    return sum + (unitPrice - discountAmount) * quantity;
                }, 0).toFixed(2) 
            ),
        };
        
        console.log(orderDetails);
        try {
            setIsSubmitting(true);
            const res = await axios.post("http://localhost:3000/orders", orderDetails, config);
            console.log(res.data);
            setFormData({
                customerName: "",
                orderType: "",
                paymentType: "",
                status: "",
                shortDescription: "",
            });
            setCart([]);
            setSearchQuery("");
            setProducts([]);
            if (onOrderAdded) {
                onOrderAdded();
            }
            onClose();
        } catch (error) {
            console.error("Error creating order:", error);
            alert("There was an error creating the order. Please try again.");
        } finally {
            setIsSubmitting(false);
            setTime("09:00");
        }
    };

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

    const handleAddToCart = (product) => {
        const existingItem = cart.find((item) => item._id === product._id);
        if (existingItem) {
            setCart(
                cart.map((item) =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.sellingPrice }
                        : item
                )
            );
        } else {
            setCart([...cart, { ...product, quantity: 1, total: product.sellingPrice }]);
        }
        console.log("Cart Updated:", cart);
    };

    const handleQuantityChange = (productId, change) => {
        setCart(
            cart.map((item) =>
                item._id === productId
                    ? {
                        ...item,
                        quantity: Math.max(1, item.quantity + change),
                        total: Math.max(1, item.quantity + change) * item.sellingPrice,
                    }
                    : item
            )
        );
    };

    const handleRemoveFromCart = (productId) => {
        setCart(cart.filter((item) => item._id !== productId));
    };

    const getTotal = () => {
        return cart.reduce((sum, item) => sum + calculateTotal(item), 0);
    };

    if (!isOpen) return null;

    const calculateTotal = (item) => {
        const unitPrice = parseFloat(item.sellingPrice) || 0;
        const quantity = parseInt(item.quantity) || 0;
        const discount = parseFloat(item.discountValue) || 0;
        const discountAmount = unitPrice * (discount / 100);

        return (unitPrice - discountAmount) * quantity;
    };

    return (
        <div className="fixed inset-0 flex z-1 items-center justify-center bg-opacity-50 backdrop-blur-lg">
            <div className="bg-white p-8 rounded-xl shadow-lg w-[800px] h-[620px]">
                <h1 className="mb-4 font-bold text-[18px]">Create New Order</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className='flex'>
                            <div className='flex flex-col'>
                                <div className='flex ml-1 mb-4 '>
                                    <p>Order Details</p>
                                    <div className="inline-flex">
                                        <p className="pr-3 pl-32">New Customer</p>
                                        <input
                                            type="checkbox"
                                            className="large-checkbox mt-1"
                                            onChange={handleNewCustomerChange}
                                        />
                                    </div>
                                </div>
                                <Dropdown
                                    dropdownButtonStyle="pl-3 text-gray-900 pt-2 mb-4 border-none bg-[#EFF1F999] w-[358px] h-[42px] rounded-md"
                                    dropdownMenuStyle="bg-white"
                                    dropdownButtonText={formData.customerName || "Select Customer"}
                                    dropdownOptions={customers.map((customer) => ({
                                        label: customer.name,
                                        value: customer._id,
                                    }))}
                                    onSelect={(selectedValue) => {
                                        handleDropdownSelect(selectedValue, "customerName");
                                        handleSelect(selectedValue);
                                    }}
                                />

                                <div className='flex'>
                                    <Dropdown
                                        dropdownButtonStyle="pl-3 text-gray-900 pt-2 border-none bg-[#EFF1F999]  w-[172.5px] h-[42px] rounded-md"
                                        dropdownMenuStyle="bg-white"
                                        dropdownButtonText={formData.paymentType || "Payment Type"}
                                        dropdownOptions={paymentType}
                                        onSelect={(selectedValue, event) => handleDropdownSelect(selectedValue, "paymentType", event)}
                                    />
                                    <Dropdown
                                        dropdownButtonStyle="pl-3 text-gray-900 mr-3 ml-3 pt-2 border-none bg-[#EFF1F999] w-[172.5px] h-[42px] rounded-md"
                                        dropdownMenuStyle="bg-white"
                                        dropdownButtonText={formData.orderType || "Order Type"}
                                        dropdownOptions={orderType}
                                        onSelect={(selectedValue, event) => handleDropdownSelect(selectedValue, "orderType", event)}
                                    />
                                </div>
                                <div>
                                    <div className="flex mt-4">
                                        <div className="inline-flex pt-3 bg-[#EFF1F999] w-[172.5px] h-[42px] rounded-md text-gray-400">
                                            <img src={calendar} alt="calender" className='w-5 pb-2 mx-3' />
                                            <DatePicker
                                                className="w-[111.5px] bg-transparent outline-none"
                                                selected={startDate}
                                                onChange={(date) => setStartDate(date)} dateFormat="yyyy-MM-dd"
                                            />
                                        </div>
                                        <div className="bg-[#EFF1F999] w-[172.5px] mr-3 ml-3 h-[42px] rounded-md rounded-lg focus:ring-blue-500 focus:border-blue-500">
                                            <input
                                                className="bg-transparent mx-4 h-full text-gray-700 outline-none"
                                                type="time"
                                                value={time}
                                                onChange={(e) => setTime(e.target.value)} required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <p className="my-4">Order Status</p>
                                <Dropdown
                                    dropdownButtonStyle="pl-3 text-gray-900 pt-2 border-none bg-[#EFF1F999] mb-3 w-[358px] h-[42px] rounded-md"
                                    dropdownMenuStyle="bg-white"
                                    dropdownButtonText={formData.status || "Status"}
                                    dropdownOptions={status}
                                    onSelect={(selectedValue, event) => handleDropdownSelect(selectedValue, "status", event)}
                                />
                                <div>
                                    <input
                                        type="text"
                                        name="shortDescription"
                                        placeholder="Order Description"
                                        value={formData.shortDescription}
                                        onChange={handleChange}
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
                                    <ul className="bg-white rounded-md shadow-md p-3 mt-2 max-h-[200px] overflow-y-auto">
                                        {products.map((product) => (

                                            <li key={product._id} className="flex scroll justify-between py-2 border-b">
                                                <div className='flex flex-col'>
                                                    <span className="text-gray-700 pb-1">{product.productName}</span>
                                                    <span className="text-gray-500">₦ {product.sellingPrice}</span>
                                                </div>
                                                <div>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleAddToCart(product)}
                                                        className="cursor-pointer pt-3 text-[#5570F1] font-semibold"
                                                    >
                                                        Add Item
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    searchQuery && <p className="text-gray-500 mt-2">No products found</p>
                                )}

                                {cart.length > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setCartVisible(!cartVisible);
                                            setSearchQuery("");
                                            setProducts([]);
                                        }}
                                        className="mt-3 text-[#5570F1] font-semibold"
                                    >
                                        {cartVisible ? "Hide Cart" : "View Cart"} ({cart.length} items)
                                    </button>
                                )}

                                {cartVisible && cart.length > 0 && (
                                    <div className="mt-4 p-3 rounded-md shadow-md">
                                        <h2 className="font-bold mb-2">Added Items</h2>
                                        <ul className="max-h-[200px] overflow-y-auto">
                                            {cart.map((item) => (
                                                <li key={item._id} className="flex justify-between items-center border-b py-2">

                                                    <div>
                                                        <p className="text-gray-700">{item.productName}</p>
                                                        <p className="text-gray-500">₦ {item.sellingPrice}</p>
                                                        <p className="text-gray-900">Sub-Total</p>
                                                    </div>
                                                    <div className='pb-3'>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveFromCart(item._id)}
                                                            className="text-red-500 font-semibold pb-1 pl-5"
                                                        >
                                                            Remove
                                                        </button>
                                                        <div className="flex items-center pr-5">

                                                            <button
                                                                type="button"
                                                                onClick={() => handleQuantityChange(item._id, -1)}
                                                                className="px-2 bg-gray-300 rounded-md"
                                                            >
                                                                -
                                                            </button>
                                                            <span className="px-3">{item.quantity}</span>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleQuantityChange(item._id, 1)}
                                                                className="px-2 bg-gray-300 rounded-md"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                        <p className="text-gray-900 font-semibold pt-2">₦ {calculateTotal(item)}</p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="mt-4 flex justify-between">
                                            <p className="font-bold text-gray-900">Total:</p>
                                            <p className="text-gray-900 font-bold pr-12">₦ {getTotal()}</p>
                                        </div>
                                    </div>
                                )}
                                {searchQuery.trim() === "" && products.length === 0 && cart.length === 0 && (
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
                                type="button"
                                onClick={onClose}>
                                Cancel
                            </button>
                            <button className='cursor-pointer bg-[#5570F1] inline-flex w-[140px] h-[36px] justify-center rounded-lg text-[14px] mr-4 pt-2 text-white'
                                type='submit'>
                                Create Order
                            </button>
                        </div>
                    </div>
                </form>
            </div>

        </div >
    )
}
