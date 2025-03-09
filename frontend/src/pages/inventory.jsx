import React from "react";
import { useNavigate } from "react-router-dom";
import Cards from "../components/Cards";
import Table from "../components/Table";
import sales from "../assets/sales.svg";
import inventory from "../assets/inventory.svg";
import product from "../assets/product.png";
import Dropdown from "../components/dropdown";
import Sidebar from "../layout/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";

const options = [
  { label: "This Month", href: "#" },
  { label: "Last Month", href: "#" },
  { label: "Last Week", href: "#" },
];

const fields = [
  {
    icon: inventory,
    alt: "Sales",
    cardStyle: "bg-[#5570F1] rounded-lg w-[605px] h-[145px]",
    maintitleStyle: "gap-64 pl-4",
    titleStyle: "text-white",
    subtitleStyle: "font-bold text-gray-500 text-white",
    title1: "Sales",
    subTitle1: "₦0.00",
    title2: "Volume",
    subTitle2: "0",
    showDropdown: false,
  },
  {
    icon: sales,
    alt: "Sales",
    cardStyle: "bg-white rounded-lg w-[605px] h-[145px]",
    maintitleStyle: "gap-50 pl-4",
    dropdownButtonStyle: "text-gray-400 border-none pr-10",
    dropdownMenuStyle: "bg-white",
    dropdownButtonText: "This Week",
    dropdownOptions: options,
    titleStyle: "text-[#8B8D97]",
    subtitleStyle: "font-bold text-[#45464E]",
    title1: "Low Stock Alert",
    subTitle1: "23",
    title2: "Expired",
    subTitle2: "3",
    showDropdown: true,
  },
];



const tableTitle = [
  "Product name",
  "Category",
  "Unit Price",
  "In-Stock",
  "Discount",
  "Total Value",
  "Action",
  "Status",
];

const actionOption = [
  { label: "Publish", href: "#" },
  { label: "Unpublish", href: "#" },
];



const InventoryPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);
  
  const handleActionChange = async (productId, selectedOption) => {
    try {
      const newStatus = selectedOption.label;
      await axios.patch(`http://localhost:3000/products/${productId}`, {
        status: newStatus,
      });
        setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId ? { ...product, status: newStatus } : product
        )
      );
    } catch (error) {
      console.error("Error updating product status:", error);
    }
  };
  

  const calculateTotal = (item) => {
    const unitPrice = parseFloat(item.sellingPrice);
    const quantity = parseInt(item.quantity);
    const discount = item.discountValue ? parseFloat(item.discountValue) : 0;

    if (discount > 0) {
      const discountAmount = unitPrice * (discount / 100);
      return (unitPrice - discountAmount) * quantity;
    }
    return unitPrice * quantity;
  };

  const Products = products.map((item) => {
    const discount = item.discountValue ? parseFloat(item.discountValue) : 0;
    const unitPrice = parseFloat(item.sellingPrice);
    const discountAmount = discount > 0 ? unitPrice * (discount / 100) : 0;

    return {
      product: item.productName || "-",
      category: item.productCategory || "-",
      unit: item.sellingPrice || "-",
      stock: item.quantity || "-",
      discount: discount > 0 ? `₦ ${discountAmount.toFixed(2)}` : "-",
      total: item.total || calculateTotal(item),
      action: (
        <Dropdown
        dropdownButtonStyle="text-gray-600 h-[23px] justify-center w-[120px] pr-10 bg-[#5E636614] text-[15px] rounded-md"
        dropdownButtonText={item.status}
        dropdownOptions={[
          { label: "Publish" },
          { label: "Unpublish" },
        ]}
        onSelect={(selectedOption) =>
          handleActionChange(item._id, selectedOption)
        }
        />
      ),
      status: item.status || "unpublished",
    };
  });


  return (
    <div className="">
      <Sidebar />
      <div className="ml-64 mt-15 bg-[#5E636614] h-screen">
        <div className="ml-4">
          <div className="flex mb-[20px] pt-4 justify-between">
            <h1 className="text-[16px] pt-4">Inventory Summary</h1>
            <button
              onClick={() => navigate("/NewInventory")} 
              className="bg-[#5570F1] inline-flex w-[205px] h-[36px] justify-center rounded-lg text-[14px] mt-3 mr-4 pt-2 text-white"
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
              Add a New Product
            </button>
          </div>
          <div>
            <Cards fields={fields} cardplace="flex flex-row gap-4" />
             <Table
             title="Inventory"
              heading={tableTitle}
              tableContent={Products.map((item) => [
                item.product, 
                item.category, 
                item.unit ? `₦ ${item.unit}` : "-", 
                item.stock, 
                item.discount, 
                item.total ? `₦ ${item.total}` : "-",
                item.action, 
                item.status, 
              ])}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
