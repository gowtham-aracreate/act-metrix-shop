import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Sidebar from "../layout/Sidebar";
import Cards from "../components/Cards";
import Table from "../components/Table";
import upload from "../assets/upload.svg";
import sales from "../assets/sales.svg";
import orderIcon from "../assets/order.svg";

const ProductDetail = ({ productId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = productId || location.state?.productId;

  const [product, setProduct] = useState(null);
  const [inventory, setInventory] = useState({ inStock: 0 });
  const [orders, setOrders] = useState([]);
  const [salesData, setSalesData] = useState({
    totalSales: 0,
    totalOrders: 0,
    pending: 0,
    completed: 0,
    homeDelivery: 0,
    pickup: 0,
  });

  useEffect(() => {
    if (!id) {
      console.error("No productId provided");
      return;
    }

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        const config = { headers: { Authorization: `Bearer ${token}` } };

        const [productRes, inventoryRes, ordersRes] = await Promise.all([
          axios.get(`http://localhost:3000/product/${id}`, config),
          axios.get(`http://localhost:3000/api/inventory`, config),
          axios.get(`http://localhost:3000/orders/product/${id}`, config),
        ]);

        setProduct(productRes.data);
        const inventoryData = Array.isArray(inventoryRes.data) ? inventoryRes.data : [];
        setInventory(inventoryData.find(item => item.productId === id) || { inStock: 0 });
        setOrders(ordersRes.data);
        let totalSales = 0,
          totalOrders = ordersRes.data.length,
          pending = 0,
          completed = 0,
          homeDelivery = 0,
          pickup = 0;

        ordersRes.data.forEach((order) => {
          totalSales += order.totalAmount || 0;
          if (order.status === "Pending") pending++;
          if (order.status === "Completed") completed++;
          if (order.orderType === "Home Delivery") homeDelivery++;
          if (order.orderType === "Pickup") pickup++;
        });

        setSalesData({ totalSales, totalOrders, pending, completed, homeDelivery, pickup });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleEditProduct = () => {
    
    navigate("/NewInventory", { state: { product } });
  };

  // Table Data Formatting
  const tableTitle = ["Order Date", "Order Type", "Unit Price", "Quantity", "Discount", " Order Total", "Status"];
  const OrderData = orders.map(({ orderDate, orderType, items, totalAmount, status }) => {
    const productItem = items.find(item => item.productId === id);
  
    return [
      new Date(orderDate).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      orderType || "-",
      productItem ? `₦ ${productItem.price.toFixed(2)}` : "-",
      productItem ? productItem.quantity : "-",
      productItem ? `₦ ${(productItem.discount || 0).toFixed(2)}` : "-", 
      `₦ ${totalAmount.toFixed(2)}`, 
      status || "Pending",
    ];
  });
  
  // Cards Data
  const fields = [
    {
      icon: sales,
      alt: "Sales",
      cardStyle: "bg-white rounded-lg w-[345px] h-[140px]",
      maintitleStyle: "px-2 justify-between",
      titleStyle: "text-[#8B8D97] text-[14px]",
      subtitleStyle: "font-bold text-[#45464E]",
      title1: "Total Orders",
      subTitle1: `₦ ${salesData.totalSales.toFixed(2)}`,
      title2: "Home Delivery",
      subTitle2: salesData.homeDelivery,
      title3: "Pickup",
      subTitle3: salesData.pickup,
    },
    {
      icon: orderIcon,
      alt: "Orders",
      cardStyle: "bg-white rounded-lg w-[345px] h-[140px]",
      maintitleStyle: "px-3 justify-between",
      titleStyle: "text-[#8B8D97] text-[15px]",
      subtitleStyle: "font-bold text-[#45464E]",
      title1: "All Orders",
      subTitle1: salesData.totalOrders,
      title2: "Pending",
      subTitle2: salesData.pending,
      title3: "Completed",
      subTitle3: salesData.completed,
    },
  ];

  return (
    <div>
      <Sidebar />
      <div className="ml-64 mt-15 bg-[#5E636614] h-screen p-4">
        <div className="ml-4">
          <div className="flex justify-between items-center">
            <div className="flex">
              <h1 className="font-semibold">{product?.productName}</h1>
              <h1 className="pl-5 font-semibold">Date Added</h1>
              <p className="pl-2 text-gray-600">
                {product?.dateAdded}
                {product?.
                  time
                }
              </p>
            </div>
            <div className="flex items-end">
            <button onClick={handleEditProduct} className="px-6 py-3 bg-black text-white rounded-lg ">
              Edit Product
            </button>
            <button className="px-6 py-3 bg-red-500 text-white rounded-lg ml-2">
              Unpublish Product
            </button>
          </div>
          </div>
          <div className="flex justify-between mt-4">
            <img src={upload} alt="Product" />
            <div className="bg-white p-4 rounded-lg w-[300px] h-[140px]">
              <div className="flex justify-between items-center">
                <p className="text-gray-500 text-[14px]">
                  Last Order{" "}
                  <span className="text-black">
                    {orders[0]?.orderDate ? new Date(orders[0].orderDate).toLocaleDateString() : "N/A"}
                  </span>
                </p>
                <span
                  className={`px-3 py-1 rounded-full ${product?.status === "Publish" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    }`}
                >
                  {product?.status || "N/A"}
                </span>
              </div>
              <div className="flex justify-between mt-10">
                <div>
                  <p className="text-[#8B8D97] text-[14px]">Price</p>
                  <p className="text-black font-medium text-[18px]">
                    ₦ {product?.sellingPrice?.toFixed(2) || "0.00"}
                  </p>
                </div>
                <div className="pr-10">
                  <p className="text-[#8B8D97] text-[14px]">In-Stock</p>
                  <p className="text-black font-medium text-[18px]">{inventory.quantity}</p>
                </div>
              </div>
            </div>
            <Cards fields={fields} cardplace="flex flex-row gap-4" />
          </div>
        </div>
        <div className="pl-4">
          <Table title="Orders" mode="order" tableTitle={tableTitle} heading={tableTitle} tableContent={OrderData} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
