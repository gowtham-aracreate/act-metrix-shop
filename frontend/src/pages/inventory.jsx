import React from "react";
import { useNavigate } from "react-router-dom";
import Cards from "../components/Cards";
import Table from "../components/Table";
import sales from "../assets/sales.svg";
import inventory from "../assets/inventory.svg";
import product from "../assets/product.png";
import Dropdown from "../components/dropdown";
import Sidebar from "../layout/Sidebar";

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
    maintitleStyle: "gap-35 pl-4",
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
    title3: "1 Star Rating",
    subTitle3: "2",
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

const action = (
  <Dropdown
    dropdownButtonStyle="text-gray-400 bg-[#5E636614] w-[110px] h-[23px] pl-3 pr-3 rounded-lg"
    dropdownMenuStyle="bg-white"
    dropdownButtonText="Publish"
    dropdownOptions={actionOption}
  />
);
const tableContent = [
  {
    icon: product,
    product: "iPhone 13 Pro",
    category: "abc@gmail.com",
    unit: "39402049302",
    stock: "23",
    discount: "23000",
    total: "2002",
    action: action,
    status: "Publish",
  },
  {
    icon: product,
    product: "iPhone 13 Pro",
    category: "abc@gmail.com",
    unit: "39402049302",
    stock: "23",
    discount: "23000",
    total: "2002",
    action: action,
    status: "Publish",
  },
  {
    icon: product,
    product: "iPhone 13 Pro",
    category: "abc@gmail.com",
    unit: "39402049302",
    stock: "23",
    discount: "23000",
    total: "2002",
    action: action,
    status: "Publish",
  },
  {
    icon: product,
    product: "iPhone 13 Pro",
    category: "abc@gmail.com",
    unit: "39402049302",
    stock: "23",
    discount: "23000",
    total: "2002",
    action: action,
    status: "Publish",
  },
];

const InventoryPage = () => {
  const navigate = useNavigate();
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
                title="Customer"
                heading={tableTitle}
                tableContent={tableContent}
              />
            </div>
          </div>
        </div>
      </div>
  );
};

export default InventoryPage;
