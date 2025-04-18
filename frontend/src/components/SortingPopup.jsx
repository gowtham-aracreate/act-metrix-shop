
import React, { useState } from "react";
import Dropdown from "./dropdown";

const SortingPopup = ({ mode, filters, onSortChange, onClose }) => {
   
  const defaultFilters = {
    status: "All",
    amountFrom: "",
    amountTo: "",
    category: [],
  };

  
  const statusOptions = {
    inventory: ["Publish", "Unpublish"],
    order: ["Completed", "In-Progress", "Pending"],
    customer: ["Active", "Inactive"],
  };

  const checkboxes = {
    inventory: ["Gadgets", "Fashion"],
    order: ["Home Delivery", "Pick Up"],
    customer: [],
  };

  const validModes = Object.keys(statusOptions);
  const currentMode = validModes.includes(mode) ? mode : "customer";

  
  const [status, setStatus] = useState(filters?.status || defaultFilters.status);
  const [amountFrom, setAmountFrom] = useState(filters?.amountFrom || defaultFilters.amountFrom);
  const [amountTo, setAmountTo] = useState(filters?.amountTo || defaultFilters.amountTo);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState(filters?.category || defaultFilters.category);

  const handleCheckboxChange = (option) => {
    setSelectedCheckboxes((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
  };

  const handleSort = () => {
    if (onSortChange) {
      onSortChange({ status, amountFrom, amountTo, selectedCheckboxes });
    }
  };

  return (
    <div className="absolute bg-white p-8 rounded-md z-1 w-[320px] h-auto" onClick={(e) => e.stopPropagation()}>
      <div className="flex flex-col">
        <h3 className="font-bold text-left text-[16px]">Sort By</h3>

        {checkboxes[currentMode]?.length > 0 && (
          <>
            <p className="font-semibold text-left pt-2 text-[16px]">Category</p>
            <div className="flex pt-2 justify-between">
              {checkboxes[currentMode].map((option) => (
                <div key={option} className="inline-flex">
                  <input
                    type="checkbox"
                    className="large-checkbox"
                    checked={selectedCheckboxes.includes(option)}
                    onChange={() => handleCheckboxChange(option)}
                  />
                  <p className="pl-4 text-[15px]">{option}</p>
                </div>
              ))}
            </div>
            <hr className="h-[1px] my-4 bg-gray-200 border-0"></hr>
          </>
        )}

        <p className="pt-2 text-left pb-3 font-semibold text-[16px]">Status</p>
        <Dropdown
          onSelect={(selectedOption) => setStatus(selectedOption.value)}
          dropdownButtonStyle="text-gray-900 pt-1 w-[258px] h-[30px] pl-5 bg-white border border-gray-400 text-[15px] rounded-md"
          dropdownButtonText={status}
          dropdownOptions={statusOptions[currentMode].map((s) => ({ label: s, value: s }))}
        />

        <p className="pt-3 text-left font-semibold text-[16px]">Amount</p>
        <div className="flex pt-2">
          <div className="flex-col pr-3">
            <p className="text-left pb-1 text-[15px]">From</p>
            <input
              type="number"
              placeholder="0.00"
              className="border border-gray-400 w-[122px] h-[30px] rounded-md pl-4"
              value={amountFrom}
              onChange={(e) => setAmountFrom(e.target.value)}
            />
          </div>
          <div className="flex-col">
            <p className="text-left pb-1 text-[15px]">To</p>
            <input
              type="number"
              placeholder="0.00"
              className="border border-gray-400 w-[122px] h-[30px] rounded-md pl-4"
              value={amountTo}
              onChange={(e) => setAmountTo(e.target.value)}
            />
          </div>
        </div>

        <button
          className="bg-[#5570F1] inline-flex w-[258px] h-[36px] justify-center rounded-lg text-[14px] mt-3 mr-4 pt-1 text-white text-[17px]"
          onClick={handleSort}
        >
          Sort
        </button>
      </div>
    </div>
  );
};


export default SortingPopup;