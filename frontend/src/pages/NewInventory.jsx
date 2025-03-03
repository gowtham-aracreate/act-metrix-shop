import React, { useState } from "react";
import Dropdown from "../components/dropdown";
import Editor from "react-simple-wysiwyg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";

export const NewInventory = () => {
  const [html, setHtml] = useState("");
  const [startDate, setStartDate] = useState(new Date());

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
  return (
    <div>
      <div className="flex justify-between">
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
      </div>
      <form className="bg-white" action="">
        <div className="flex flex-row gap-[24px]">
          <div className="flex flex-col gap-[24px] pr-[50px]">
            <input
              type="text"
              placeholder="Product Name"
              className="pl-3 bg-[#EFF1F999] w-[375px] h-[52px] rounded-md"
            />
            <Dropdown
              dropdownButtonStyle="pl-3 text-gray-500 pt-4 border-none bg-[#EFF1F999]  w-[375px] h-[52px] rounded-md"
              dropdownMenuStyle="bg-white"
              dropdownButtonText="Select Product Category"
            />
            <div className="flex gap-[12px]">
              <input
                type="number"
                placeholder="Selling Price"
                className="pl-3 bg-[#EFF1F999] w-[181.5px] h-[52px] rounded-md"
              />
              <input
                type="number"
                placeholder="Cost Price"
                className="pl-3 bg-[#EFF1F999] w-[181.5px] h-[52px] rounded-md"
              />
            </div>
            <div className="inline-flex relative">
              <input
                value={quantity}
                onChange={handleInputChange}
                type="number"
                placeholder="Quantity in Stock"
                className="pl-3 bg-[#EFF1F999] w-[375px] h-[52px] rounded-md"
              />
              <div className="flex flex-col absolute left-80 bottom-1">
                <button type="button" onClick={increaseQuantity}>
                  <svg
                    width="41"
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
                    width="41"
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
              dropdownButtonStyle="pl-3 text-gray-500 pt-4 border-none bg-[#EFF1F999]  w-[375px] h-[52px] rounded-md"
              dropdownMenuStyle="bg-white"
              dropdownButtonText="Order Type"
            />
            <div>
              <p className="inline-flex text-gray-500 pr-40">Discount</p>
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer " />
                <span className="text-gray-900 pr-3">Add Discount</span>
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex ">
              <Dropdown
                dropdownButtonStyle="pl-3 mr-[12px] text-gray-500 pt-3 bg-[#EFF1F999] w-[181.5px] h-[52px] rounded-md"
                dropdownMenuStyle="bg-white"
                dropdownButtonText="Type"
              />
              <input
                type="text"
                placeholder="Selling Price"
                className="pl-3 bg-[#EFF1F999] w-[181.5px] h-[52px] rounded-md"
              />
            </div>
            <div>
              <p className="inline-flex text-gray-500 pr-31">Exipry Date</p>
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer " />
                <span className="text-gray-900 pr-3">Add Exipry Date</span>
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="bg-[#EFF1F999] w-[375px] h-[52px] rounded-md pt-3 text-gray-400">
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
          <div className="flex-col">
            <input
              type="text"
              placeholder="Short Description"
              className="pb-28 w-[375px] mb-[24px] h-[163px] pl-3 bg-[#EFF1F999] rounded-md"
            />
            <p className="text-[#5E6366] pb-1">Product Long Description</p>
            <div className="w-[375px] bg-[#EFF1F999] border-none text-gray-400">
              <Editor
                placeholder="Your Text Goes Here"
                value={html}
                onChange={onChange}
                className="h-[182px]"
              />
            </div>
            <p className="text-gray-400">
              Add a long description for your product
            </p>
            <div>
              <p className="inline-flex text-gray-500 pr-31">Return Policy</p>
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer " />
                <span className="text-gray-900 pr-3">Add Discount</span>
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex bg-[#EFF1F999] w-[181.5px] h-[52px] rounded-md mt-4 pt-3 text-gray-400">
              <div className="inline-flex mr-3 ml-3">
              <svg
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
</div>
              <DatePicker
                className="w-[111.5px]"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
                <input
                  type="time"
                  id="time"
                  class="bg-[#EFF1F999] w-[181.5px] h-[52px] rounded-md text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  min="09:00"
                  max="18:00"
                  value="00:00"
                  required
                />
              </div>
            </div>
        </div>
      </form>
    </div>
  );
};
