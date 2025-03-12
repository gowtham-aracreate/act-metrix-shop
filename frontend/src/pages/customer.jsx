import React, { useState } from "react";
import Table from "../components/Table";
import Cards from "../components/Cards";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const customerSummary = [
  { title1: "All Customers", subTitle1: "1,250", title2: "Active", subTitle2: "1,180", title3: "In-Active", subTitle3: "70", cardStyle: "bg-white shadow-md p-3 rounded-lg" },
  { title1: "New Customers", subTitle1: "30", title2: "Purchasing", subTitle2: "657", title3: "Abandoned Carts", subTitle3: "5", cardStyle: "bg-white shadow-md p-3 rounded-lg" },
];
const tableTitle = [
  "Customer Name", "Email", "Phone", "Orders", "Order Total", "Customer Since", "Status"
];
const tableData = [
  { name: "Janet Adebayo", email: "janet.a@mail.com", phone: "+2348065650633", Orders: "10", total: "250,000.00", CustomerSince: "12 Aug 2022 - 12:25 am", status: "Active" },
];
const duplicatedTableData = Array(10).fill(tableData).flat();

const CustomersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/order");
  };

  return (
    <div className="relative p-6">
      <div className={`transition-all duration-300 ${isModalOpen ? "blur-background" : ""}`}>
        <h2 className="text-2xl font-semibold mb-4">Customers Summary</h2>
        <div className="flex flex-row justify-between gap-4">
          <Cards fields={customerSummary.slice(0, 1)} cardplace="flex flex-row justify-between gap-4" />
          <div className="flex flex-col justify-between">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-40 py-2 ml-10 bg-blue-500 text-white rounded-md">
              Add New Customer
            </button>
            <Cards fields={customerSummary.slice(1, 2)} cardplace="flex flex-row justify-between gap-4" />
          </div>
        </div>
        <div className="mt-6">
          <Table title="Customers" heading={tableTitle} tableContent={duplicatedTableData} />
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-10 backdrop-blur-md">
          <div className="bg-white p-6 rounded-2xl shadow-md w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Add a New Customer</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-600 hover:text-gray-900">
                <AiOutlineClose size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Customer Name"
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Customer Email"
                />
              </div>
              <div className="mb-3 flex items-center gap-2">
                <div className="flex items-center border p-2 rounded-md">
                  <select className="focus:outline-none bg-transparent text-gray-600">
                    <option value="+234">+234</option>
                  </select>
                </div>
                <input
                  type="tel"
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="8023456789"
                />
              </div>
              <div className="mb-3 flex items-center justify-between">
                <label className="text-gray-600 text-sm">Add Address</label>
                <input
                  type="checkbox"
                  className="toggle-checkbox"
                  checked={showAddress}
                  onChange={() => setShowAddress(!showAddress)}
                />
              </div>
              {showAddress && (
                <>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="Building No., Street Address"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="City"
                    />
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="w-1/2 p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="Country"
                    />
                    <input
                      type="text"
                      className="w-1/2 p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="State"
                    />
                  </div>
                </>
              )}
              <div className="flex justify-between mt-5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/3 py-2 border rounded-lg text-gray-600 hover:bg-gray-100">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersPage;
