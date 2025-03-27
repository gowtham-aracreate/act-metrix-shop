import React from "react";
import { useNavigate } from "react-router-dom";
import Cards from "../components/Cards";
import Table from "../components/Table";
import sales from "../assets/sales.svg";
import inventory from "../assets/inventory.svg";
import Dropdown from "../components/dropdown";
import Sidebar from "../layout/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { Label } from "recharts";

const config = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};


const options = [
  {label1: "This Month", href: "#"},
  {label1: "This Month", href: "#"},
  {Label1: "This Month", href:"#"}
]

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


const InventoryPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: 'All',
    category: [],
    dateRange: null,
    selectedCheckboxes: [],
    timePeriod: [],
  });
  const [salesData, setSalesData] = useState({ totalSales: 0, totalVolume: 0 });
  const [inventoryData, setInventoryData] = useState({
    lowStockCount: 0,
    expiredCount: 0,
  });

  // Fetch Sales Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [salesRes, inventoryRes] = await Promise.all([
          axios.get("http://localhost:3000/api/sales", config()),
          axios.get("http://localhost:3000/api/inventory", config()),
        ]);

        setSalesData({
          totalSales: salesRes.data.totalSales,
          totalVolume: salesRes.data.totalVolume,
        });

        setInventoryData({
          lowStockCount: inventoryRes.data.lowStockCount,
          expiredCount: inventoryRes.data.expiredCount,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  const fields = [
    {
      icon: inventory,
      alt: "Sales",
      cardStyle: "bg-[#5570F1] rounded-lg w-[605px] h-[145px]",
      maintitleStyle: " pl-4 justify-between",
      titleStyle: "text-white",
      subtitleStyle: "font-bold text-gray-500 text-white",
      title1: "Sales",
      subTitle1: `₦ ${(salesData.totalSales || 0).toFixed(1)}`,
      title2: "Volume",
      subTitle2: `${salesData.totalVolume || 0}`,
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
      subTitle1: `${inventoryData.lowStockCount || 0}`,
      title2: "Expired",
      subTitle2: `${inventoryData.expiredCount || 0}`,
      showDropdown: true,
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/products", config());
        setOriginalProducts(res.data);
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleSearch = (searchTerm) => {
    setSearchQuery(searchTerm);
    
    if (searchTerm) {
      const filteredProducts = originalProducts.filter((item) => 
        item.productName.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      
      setProducts(filteredProducts);
    } else {
      setProducts(originalProducts);
    }
  };
  
  const handleSortChange = (newFilters) => {
    setFilters(newFilters);
  
    let sortedProducts = [...originalProducts];
  
    if (newFilters.status && newFilters.status !== "All") {
      sortedProducts = sortedProducts.filter((product) =>
        product.status?.toLowerCase() === newFilters.status.toLowerCase()
      );
    }
  
    if (newFilters.selectedCheckboxes?.length) {
      sortedProducts = sortedProducts.filter((product) =>
        newFilters.selectedCheckboxes.includes(product.productCategory)
      );
    }
  
    if (newFilters.amountFrom) {
      sortedProducts = sortedProducts.filter((product) =>
        parseFloat(product.sellingPrice) >= parseFloat(newFilters.amountFrom)
      );
    }
  
    if (newFilters.amountTo) {
      sortedProducts = sortedProducts.filter((product) =>
        parseFloat(product.sellingPrice) <= parseFloat(newFilters.amountTo)
      );
    }
  
    setProducts(sortedProducts); // Update only filters, search stays independent
  };
  
  const handleDateFilter = (filters) => {
    let filteredProducts = [...originalProducts];
  
    if (filters.timePeriod.length > 0) {
      filteredProducts = filteredProducts.filter((product) => {
        const productDate = dayjs(product.dateAdded);
        return filters.timePeriod.some((period) => {
          switch (period) {
            case "This Week":
              return productDate.isAfter(dayjs().startOf("week"));
            case "Last Week":
              return (
                productDate.isAfter(dayjs().subtract(1, "week").startOf("week")) &&
                productDate.isBefore(dayjs().startOf("week"))
              );
            case "This Month":
              return productDate.isAfter(dayjs().startOf("month"));
            case "Last Month":
              return (
                productDate.isAfter(dayjs().subtract(1, "month").startOf("month")) &&
                productDate.isBefore(dayjs().startOf("month"))
              );
            case "This Year":
              return productDate.isAfter(dayjs().startOf("year"));
            case "Last Year":
              return (
                productDate.isAfter(dayjs().subtract(1, "year").startOf("year")) &&
                productDate.isBefore(dayjs().startOf("year"))
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
      filteredProducts = filteredProducts.filter((product) => {
        const productDate = dayjs(product.dateAdded).startOf("day");
        return (
          productDate.isAfter(startDate.subtract(1, "day")) &&
          productDate.isBefore(endDate.add(1, "day"))
        );
      });
    }
  
    setProducts(filteredProducts); // Date filtering applies separately
  };
  
  const handleActionChange = async (productId, selectedOption) => {
    try {
      const newStatus = selectedOption.label;

      // Send update request to backend
      const response = await axios.patch(
        `http://localhost:3000/products/${productId}`,
        { status: newStatus },
        config()
      );

      if (response.status === 200) {
        // Update state with the new status
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === productId ? { ...product, status: newStatus } : product
          )
        );
      } else {
        console.error("Failed to update status:", response.data);
      }
    } catch (error) {
      console.error("Error updating product status:", error.response?.data || error.message);
    }
  };


  const calculateTotal = (item) => {
    const unitPrice = parseFloat(item.sellingPrice) || 0;
    const quantity = parseInt(item.quantity) || 0;
    const discount = parseFloat(item.discountValue) || 0;

    const discountAmount = unitPrice * (discount / 100);
    return (unitPrice - discountAmount) * quantity;
  };

  const Products = products.map((item) => {
    const discount = parseFloat(item.discountValue) || 0;
    const unitPrice = parseFloat(item.sellingPrice) || 0;
    const discountAmount = discount > 0 ? unitPrice * (discount / 100) : 0;
  
    return {
      product: (
        <span
          className="cursor-pointer font-semibold"
          onDoubleClick={() => navigate(`/product/${item._id}`, { state: { productId: item._id } })}
        >
          {item.productName || "-"}
        </span>
      ),  
      category: item.productCategory || "-",  
      unit: unitPrice > 0 ? `${unitPrice.toFixed(2)}` : "-",
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
          onSelect={(selectedOption) => handleActionChange(item._id, selectedOption)}
        />
      ),
      status: (
        <span
          className={`px-2 py-1 rounded-lg ${item.status === "Publish" ? "bg-[#5570F129] text-[#5570F1]" : "bg-[#FFF2E2] text-black"
            }`}
        >
          {item.status || "Unpublish"}
        </span>
      ),
    };
  });

  return (
    <div className="">
      <Sidebar 
      title={"Inventory"}/>
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
              mode="inventory"
              heading={tableTitle}
               onSearch={handleSearch}
              onSortChange={handleSortChange}
              onFilterChange={handleDateFilter}
              filters={filters}
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


