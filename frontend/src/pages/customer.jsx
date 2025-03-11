import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Table from "../components/Table";
import { AiOutlineClose } from "react-icons/ai";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import { MdPersonAddAlt } from "react-icons/md";

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addAddress, setAddAddress] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    state: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const customersRes = await axios.get("http://localhost:3000/customers");
      setCustomers(customersRes.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/customers", formData);
      console.log("API Response:", response.data); // Debugging API response

      if (response.data) {
        fetchCustomers(); // Fetch updated customer list
        setIsModalOpen(false);
        console.log("Navigating to /order"); // Debugging navigation
        navigate("/order"); // Redirect to Order Page
      }
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  return (
    <div className="flex">
      <Sidebar className="h-screen fixed" />
      <div className="w-full ml-[17%] p-6 pt-20 bg-gray-100 pr-10">
        <Header />

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Customers</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white flex items-center px-5 py-2 rounded-lg hover:bg-blue-600"
          >
            <MdPersonAddAlt size={20} className="mr-2" /> Add a New Customer
          </button>
        </div>

        <div className="bg-white p-6 shadow-md rounded-lg mt-6">
          <Table
            title="Customers"
            heading={[
              "Customer Name",
              "Email",
              "Phone",
              "Orders",
              "Order Total",
              "Status",
            ]}
            tableContent={customers}
          />
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-lg">
            <div className="bg-white p-8 rounded-xl shadow-lg w-[400px]">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-semibold">Add a New Customer</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-900"
                >
                  <AiOutlineClose size={22} />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg mb-3 focus:outline-blue-400"
                  placeholder="Customer Name"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg mb-3 focus:outline-blue-400"
                  placeholder="Customer Email"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg mb-3 focus:outline-blue-400"
                  placeholder="Phone Number"
                  required
                />

                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-700">Add Address</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only"
                      onChange={() => setAddAddress(!addAddress)}
                    />
                    <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-blue-500"></div>
                  </label>
                </div>

                {addAddress && (
                  <>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-lg mb-3"
                      placeholder="Street Address"
                      required
                    />
                  </>
                )}

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="py-2 px-6 border rounded-lg text-gray-600 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2 px-10 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomersPage;
