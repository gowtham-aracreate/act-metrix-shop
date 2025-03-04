import React, { useState } from "react";
import Dropdown from "../components/dropdown";
import Editor from "react-simple-wysiwyg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Sidebar from "../layout/Sidebar";


export const NewInventory = () => {
  const [html, setHtml] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const [formData, setFormData] = useState({
    productName: "",
    productCategory: "",
    sellingPrice: "",
    costPrice: "",
    quantity: "",
    orderType: "",
    discount: false,
    expiryDate: "",
    returnPolicy: false,
    description: "",
  });

  const [image, setImage] = useState(null);


  function onChange(e) {
    setHtml(e.target.value);
  }

  const [quantity, setQuantity] = useState("");
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  const handleInputChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      setQuantity(value);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  }; 
  
  const handleImageUpload = (e) => {
    setImage(e.target.files[0]); // Store image file
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("productData", JSON.stringify(formData)); // Send product data
    if (image) {
      formDataToSend.append("productImage", image); // Append image
    }

    try {
      await axios.post("http://localhost:3000/products", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const productCategory = [
    { label: "Gadgets", href: "#" },
    { label: "Fashion", href: "#" },
  ];
 
  const dicount = [
    { label: "10 %", href: "#" },
    { label: "20 %", href: "#" },
  ];

  const orderType = [
    { label: "COD", href: "#" },
    { label: "Online", href: "#" },
  ];


  return (
    <div className="z-2">
       <Sidebar />
       <div className="ml-64 mt-15 bg-[#5E636614] w-screen h-screen fixed">
       <div className="ml-6">
            {/* <div className="flex justify-between mt-4 ">
              <div>
                <h1>New Inventory Item</h1>
              </div>
              <div>
                <button className="bg-black text-white w-[171px] h-[36px] rounded-md mr-[24px]">
                  Save as Draft
                </button>
                <button className="bg-[#5570F1] text-white w-[161px] h-[36px] rounded-md">
                  Save & Publish
                </button>
              </div>
            </div> */}
            
            <form onSubmit={handleSubmit}>
            <div className="pt-3 pb-3 flex">
                <h1>New Inventory Item</h1>
            <div className="pl-180">
                <button className="bg-black text-white w-[171px] h-[36px] rounded-md mr-[24px]">
                  Save as Draft
                </button>
                <button className="bg-[#5570F1] text-white w-[161px] h-[36px] rounded-md">
                  Save & Publish
                </button>
              </div>
              </div>
              <div className="flex flex-row">
                <div className="flex">
                  <div className="flex flex-col bg-white gap-[20px] px-[33px] py-[25px] ">
                    <input
                      type="text"
                      placeholder="Product Name"
                      className="pl-3 bg-[#EFF1F999] w-[300px] h-[42px] rounded-md"
                    />
                    <Dropdown
                      dropdownButtonStyle="pl-3 text-gray-500 pt-2 border-none bg-[#EFF1F999]  w-[300px] h-[42px] rounded-md"
                      dropdownMenuStyle="bg-white"
                      dropdownButtonText="Select Product Category"
                      dropdownOptions={productCategory}
                    />
                    <div className="flex gap-[12px]">
                      <input
                        type="number"
                        placeholder="Selling Price"
                        className="pl-3 bg-[#EFF1F999] w-[144.5px] h-[42px] rounded-md"
                      />
                      <input
                        type="number"
                        placeholder="Cost Price"
                        className="pl-3 bg-[#EFF1F999] w-[144.5px] h-[42px] rounded-md"
                      />
                    </div>
                    <div className="inline-flex relative">
                      <input
                        value={quantity}
                        onChange={handleInputChange}
                        type="number"
                        placeholder="Quantity in Stock"
                        className="pl-3 bg-[#EFF1F999] w-[300px] h-[42px] rounded-md"
                      />
                      <div className="flex flex-col absolute left-63">
                        <button type="button" onClick={increaseQuantity}>
                          <svg
                            width="38"
                            height="20"
                            viewBox="0 0 41 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0.5 4C0.5 1.79086 2.29086 0 4.5 0H36.5C38.7091 0 40.5 1.79086 40.5 4V19.5H0.5V4Z"
                              fill="#DDE2E6"
                            />
                            <path
                              d="M20.5 3.75L25.6962 12.75H15.3038L20.5 3.75Z"
                              fill="#83898C"
                            />
                          </svg>
                        </button>
                        <button type="button" onClick={decreaseQuantity}>
                          <svg
                            width="38"
                            height="20"
                            viewBox="0 0 41 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M40.5 16C40.5 18.2091 38.7091 20 36.5 20L4.5 20C2.29086 20 0.5 18.2091 0.5 16L0.500002 0.499996L40.5 0.5L40.5 16Z"
                              fill="#DDE2E6"
                            />
                            <path
                              d="M20.5 16.25L15.3038 7.25L25.6962 7.25L20.5 16.25Z"
                              fill="#83898C"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <Dropdown
                      dropdownButtonStyle="pl-3 text-gray-500 pt-2 border-none bg-[#EFF1F999]  w-[300px] h-[42px] rounded-md"
                      dropdownMenuStyle="bg-white"
                      dropdownButtonText="Order Type"
                      dropdownOptions={orderType}
                    />
                    <div>
                      <p className="inline-flex text-gray-500 pr-21">
                        Discount
                      </p>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          value=""
                          className="sr-only peer "
                        />
                        <span className="text-gray-900 pr-3">Add Discount</span>
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex ">
                      <Dropdown
                        dropdownButtonStyle="pl-3 mr-[12px] text-gray-500 pt-3 bg-[#EFF1F999] w-[144.5px] h-[42px] rounded-md"
                        dropdownMenuStyle="bg-white"
                        dropdownButtonText="Type"
                        dropdownOptions={dicount}
                      />
                      <input
                        type="number"
                        placeholder="Value"
                        className="pl-3 bg-[#EFF1F999] w-[144.5px] h-[42px] rounded-md"
                      />
                    </div>
                    <div>
                      <p className="inline-flex text-gray-500 pr-13">
                        Exipry Date
                      </p>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          value=""
                          className="sr-only peer "
                        />
                        <span className="text-gray-900 pr-3">
                          Add Expiry Date
                        </span>
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="bg-[#EFF1F999] w-[300px] h-[45px] rounded-md pt-3 text-gray-400">
                      <svg
                        className="inline-flex mr-3 ml-3"
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.59253 9.40445H21.4165"
                          stroke="#5E6366"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16.942 13.3097H16.9512"
                          stroke="#5E6366"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12.5047 13.3097H12.514"
                          stroke="#5E6366"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8.05793 13.3097H8.0672"
                          stroke="#5E6366"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16.942 17.1964H16.9512"
                          stroke="#5E6366"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12.5047 17.1964H12.514"
                          stroke="#5E6366"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8.05793 17.1964H8.0672"
                          stroke="#5E6366"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16.5438 2V5.29078"
                          stroke="#5E6366"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8.4654 2V5.29078"
                          stroke="#5E6366"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M16.7383 3.5791H8.27096C5.33427 3.5791 3.5 5.21504 3.5 8.22213V17.2718C3.5 20.3261 5.33427 21.9999 8.27096 21.9999H16.729C19.675 21.9999 21.5 20.3545 21.5 17.3474V8.22213C21.5092 5.21504 19.6842 3.5791 16.7383 3.5791Z"
                          stroke="#5E6366"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      <DatePicker
                        className="w-[111.5px]"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                      />
                    </div>
                  </div>
                  <div className="flex-col bg-white px-[33px] py-[25px] rounde-md">
                    <input
                      type="text"
                      placeholder="Short Description"
                      className="pb-28 w-[360px] mb-[14px] h-[140px] pl-3 bg-[#EFF1F999] rounded-md"
                    />
                    <p className="text-[#5E6366] pb-1">
                      Product Long Description
                    </p>
                    <div className="w-[360px] bg-[#EFF1F999]">
                      <Editor
                        placeholder="Your Text Goes Here"
                        value={html}
                        onChange={onChange}
                        className="h-[140px]"
                      />
                    </div>
                    <p className="text-gray-400">
                      Add a long description for your product
                    </p>
                    <div className="pt-[13px]">
                      <p className="inline-flex text-gray-500 pr-31">
                        Return Policy
                      </p>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          value=""
                          className="sr-only peer "
                        />
                        <span className="text-gray-900 pr-3">Add Discount</span>
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <p className="text-gray-900 pt-[13px]">Date Addred</p>
                    <div className="flex mt-4">
                      <div className="inline-flex pt-3 bg-[#EFF1F999] w-[172.5px] h-[45px] rounded-md text-gray-400">
                        <svg
                          width="25"
                          height="24"
                          viewBox="0 0 25 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className=" mr-3 ml-3"
                        >
                          <path
                            d="M3.59253 9.40445H21.4165"
                            stroke="#5E6366"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16.942 13.3097H16.9512"
                            stroke="#5E6366"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12.5047 13.3097H12.514"
                            stroke="#5E6366"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8.05793 13.3097H8.0672"
                            stroke="#5E6366"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16.942 17.1964H16.9512"
                            stroke="#5E6366"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12.5047 17.1964H12.514"
                            stroke="#5E6366"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8.05793 17.1964H8.0672"
                            stroke="#5E6366"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16.5438 2V5.29078"
                            stroke="#5E6366"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8.4654 2V5.29078"
                            stroke="#5E6366"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M16.7383 3.5791H8.27096C5.33427 3.5791 3.5 5.21504 3.5 8.22213V17.2718C3.5 20.3261 5.33427 21.9999 8.27096 21.9999H16.729C19.675 21.9999 21.5 20.3545 21.5 17.3474V8.22213C21.5092 5.21504 19.6842 3.5791 16.7383 3.5791Z"
                            stroke="#5E6366"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>

                        <DatePicker
                          className="w-[111.5px]"
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                        />
                      </div>
                      <div className="bg-[#EFF1F999] w-[172.5px] mr-3 ml-3 h-[45px] rounded-md rounded-lg focus:ring-blue-500 focus:border-blue-500">
                        <input
                          className="pt-3 pl-3 text-gray-400"
                          type="time"
                          min="09:00"
                          max="18:00"
                          value="00:00"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounde-md px-[33px] py-[25px]">
                  <div className="items-center justify-center">
                    <label
                      for="dropzone-file"
                      className="flex flex-col items-center justify-center border border-[#E1E2E9]  w-[345px] h-[290px] rounded-lg cursor-pointer bg-[#F4F5FA]"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          width="48"
                          height="48"
                          viewBox="0 0 48 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mb-[12px] ml-5"
                        >
                          <path
                            opacity="0.4"
                            d="M34.11 47.3337H13.8878C5.9795 47.3337 0.666748 41.7871 0.666748 33.5303V14.4727C0.666748 6.21592 5.9795 0.666992 13.8878 0.666992H34.1123C42.0207 0.666992 47.3334 6.21592 47.3334 14.4727V33.5303C47.3334 41.7871 42.0207 47.3337 34.11 47.3337Z"
                            fill="#5570F1"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M22.2385 16.2421C22.2385 19.4387 19.6368 22.0404 16.4401 22.0404C13.2411 22.0404 10.6418 19.4387 10.6418 16.2421C10.6418 13.0454 13.2411 10.4414 16.4401 10.4414C19.6368 10.4414 22.2385 13.0454 22.2385 16.2421ZM41.2677 28.8715C41.8114 29.3988 42.2011 30.0008 42.4577 30.6425C43.2347 32.5838 42.8311 34.9171 42.0004 36.8398C41.0157 39.1288 39.1304 40.8578 36.7551 41.6138C35.7004 41.9521 34.5944 42.0968 33.4907 42.0968H13.9351C11.9891 42.0968 10.2671 41.6441 8.85541 40.7948C7.97108 40.2628 7.81474 39.0378 8.47041 38.2398C9.56708 36.9098 10.6497 35.5751 11.7417 34.2288C13.8231 31.6528 15.2254 30.9061 16.7841 31.5618C17.4164 31.8325 18.0511 32.2408 18.7044 32.6701C20.4451 33.8228 22.8647 35.4048 26.0521 33.6875C28.2308 32.4962 29.4954 30.4576 30.5962 28.6832L30.6184 28.6475C30.6925 28.5287 30.7659 28.41 30.8392 28.2917C31.2135 27.6869 31.5821 27.0912 31.9997 26.5428C32.5177 25.8638 34.4404 23.7405 36.9254 25.2525C38.5097 26.2045 39.8421 27.4925 41.2677 28.8715Z"
                            fill="#5570F1"
                          />
                        </svg>

                        <div className="inline-flex">
                          <svg
                            className="w-8 h-8 mb-4 text-gray-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="#5570F1"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p class="ml-4 text-[16px] text-[#5570F1] font-semibold">
                            Upload Image
                          </p>
                        </div>
                        <p className="text-[#8B8D97] pb-[12px]">
                          Upload a cover image for your product
                        </p>
                        <p class="text-[12px] text-gray-500">
                          File Format
                          <span className="font-semibold">jpeg, png</span>
                          Recommened Size
                          <span className="font-semibold">600x600 (1:1)</span>
                        </p>
                      </div>
                      <input id="dropzone-file" type="file" class="hidden" onChange={handleImageUpload} />
                    </label>
                  </div>
                  <p className="py-[12px]">Additional Images</p>
                  <div className="flex ">
                    <div class="flex items-center justify-center mr-8">
                      <label
                        for="dropzone-file"
                        className="flex flex-col items-center justify-center w-[160px] h-[150px] border border-[#E1E2E9] rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 48 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mt-8"
                        >
                          <path
                            opacity="0.4"
                            d="M34.11 47.3337H13.8878C5.9795 47.3337 0.666748 41.7871 0.666748 33.5303V14.4727C0.666748 6.21592 5.9795 0.666992 13.8878 0.666992H34.1123C42.0207 0.666992 47.3334 6.21592 47.3334 14.4727V33.5303C47.3334 41.7871 42.0207 47.3337 34.11 47.3337Z"
                            fill="#5570F1"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M22.2385 16.2421C22.2385 19.4387 19.6368 22.0404 16.4401 22.0404C13.2411 22.0404 10.6418 19.4387 10.6418 16.2421C10.6418 13.0454 13.2411 10.4414 16.4401 10.4414C19.6368 10.4414 22.2385 13.0454 22.2385 16.2421ZM41.2677 28.8715C41.8114 29.3988 42.2011 30.0008 42.4577 30.6425C43.2347 32.5838 42.8311 34.9171 42.0004 36.8398C41.0157 39.1288 39.1304 40.8578 36.7551 41.6138C35.7004 41.9521 34.5944 42.0968 33.4907 42.0968H13.9351C11.9891 42.0968 10.2671 41.6441 8.85541 40.7948C7.97108 40.2628 7.81474 39.0378 8.47041 38.2398C9.56708 36.9098 10.6497 35.5751 11.7417 34.2288C13.8231 31.6528 15.2254 30.9061 16.7841 31.5618C17.4164 31.8325 18.0511 32.2408 18.7044 32.6701C20.4451 33.8228 22.8647 35.4048 26.0521 33.6875C28.2308 32.4962 29.4954 30.4576 30.5962 28.6832L30.6184 28.6475C30.6925 28.5287 30.7659 28.41 30.8392 28.2917C31.2135 27.6869 31.5821 27.0912 31.9997 26.5428C32.5177 25.8638 34.4404 23.7405 36.9254 25.2525C38.5097 26.2045 39.8421 27.4925 41.2677 28.8715Z"
                            fill="#5570F1"
                          />
                        </svg>

                        <div class="inline-flex items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-[16px] h-[16px] mb-2 text-gray-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 14"
                          >
                            <path
                              stroke="#5570F1"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p class="mb-2 pl-2 text-[14px] text-[#5570F1]">
                            Upload Image
                          </p>
                        </div>
                        <input id="dropzone-file" type="file" class="hidden" onChange={handleImageUpload} />
                      </label>
                    </div>
                    <div class="flex items-center justify-center">
                      <label
                        for="dropzone-file"
                        class="flex flex-col items-center justify-center w-[160px] h-[150px] border border-[#E1E2E9] rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 48 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mt-8"
                        >
                          <path
                            opacity="0.4"
                            d="M34.11 47.3337H13.8878C5.9795 47.3337 0.666748 41.7871 0.666748 33.5303V14.4727C0.666748 6.21592 5.9795 0.666992 13.8878 0.666992H34.1123C42.0207 0.666992 47.3334 6.21592 47.3334 14.4727V33.5303C47.3334 41.7871 42.0207 47.3337 34.11 47.3337Z"
                            fill="#5570F1"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M22.2385 16.2421C22.2385 19.4387 19.6368 22.0404 16.4401 22.0404C13.2411 22.0404 10.6418 19.4387 10.6418 16.2421C10.6418 13.0454 13.2411 10.4414 16.4401 10.4414C19.6368 10.4414 22.2385 13.0454 22.2385 16.2421ZM41.2677 28.8715C41.8114 29.3988 42.2011 30.0008 42.4577 30.6425C43.2347 32.5838 42.8311 34.9171 42.0004 36.8398C41.0157 39.1288 39.1304 40.8578 36.7551 41.6138C35.7004 41.9521 34.5944 42.0968 33.4907 42.0968H13.9351C11.9891 42.0968 10.2671 41.6441 8.85541 40.7948C7.97108 40.2628 7.81474 39.0378 8.47041 38.2398C9.56708 36.9098 10.6497 35.5751 11.7417 34.2288C13.8231 31.6528 15.2254 30.9061 16.7841 31.5618C17.4164 31.8325 18.0511 32.2408 18.7044 32.6701C20.4451 33.8228 22.8647 35.4048 26.0521 33.6875C28.2308 32.4962 29.4954 30.4576 30.5962 28.6832L30.6184 28.6475C30.6925 28.5287 30.7659 28.41 30.8392 28.2917C31.2135 27.6869 31.5821 27.0912 31.9997 26.5428C32.5177 25.8638 34.4404 23.7405 36.9254 25.2525C38.5097 26.2045 39.8421 27.4925 41.2677 28.8715Z"
                            fill="#5570F1"
                          />
                        </svg>

                        <div class="inline-flex items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-[16px] h-[16px] mb-2 text-gray-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 14"
                          >
                            <path
                              stroke="#5570F1"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p class="mb-2 pl-2 text-[14px] text-[#5570F1]">
                            Upload Image
                          </p>
                        </div>
                        <input id="dropzone-file" type="file" class="hidden" onChange={handleImageUpload} />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          </div>
          </div>
  );
};
