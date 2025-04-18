import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import "./CalendarStyles.css";

export const CalendarPopup = ({ onFilterChange, onClose }) => {
  const [isDateRangeChecked, setIsDateRangeChecked] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState([new Date(), new Date()]);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleCheckboxChange = (label) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(label)
        ? prevFilters.filter((item) => item !== label)
        : [...prevFilters, label]
    );
  };

  const handleDateChange = (newDate) => {
    setSelectedDateRange(newDate);
  };
 
  const handleApply = () => {
    // Create a filter object to pass back to the parent component
    const filters = {
      timePeriod: selectedFilters,
      dateRange: isDateRangeChecked ? selectedDateRange : null
    };
    
    // Call the parent component's filter change handler
    if (onFilterChange) {
      onFilterChange(filters);
    }
    
    // Close the popup
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="absolute bg-white p-5 rounded-lg z-10 w-[330px] h-auto shadow-xl">
      <h1 className="pb-4 text-[16px] font-semibold text-left">By Date</h1>
      <div className="flex gap-4">
        <div className="flex flex-col gap-2">
          {["This Week", "This Month", "This Year"].map((label) => (
            <label key={label} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="w-5 h-5 accent-blue-500"
                checked={selectedFilters.includes(label)}
                onChange={() => handleCheckboxChange(label)}
              />
              <span className="text-[15px]">{label}</span>
            </label>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {["Last Week", "Last Month", "Last Year"].map((label) => (
            <label key={label} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="w-5 h-5 accent-blue-500"
                checked={selectedFilters.includes(label)}
                onChange={() => handleCheckboxChange(label)}
              />
              <span className="text-[15px]">{label}</span>
            </label>
          ))}
        </div>
      </div>
      <hr className="h-[1px] my-4 bg-gray-200 border-0" />
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          className="w-5 h-5 accent-blue-500"
          onChange={() => setIsDateRangeChecked(!isDateRangeChecked)}
          checked={isDateRangeChecked}
        />
        <span className="text-[15px]">Date Range</span>
      </label>
      {isDateRangeChecked && (
        <div className="mt-3">
          <Calendar
            selectRange
            value={selectedDateRange}
            onChange={handleDateChange}
            className="custom-calendar"
          />
          <p className="text-sm text-gray-600 mt-2">
            Selected: {dayjs(selectedDateRange[0]).format("MMM D, YYYY")} -{" "}
            {dayjs(selectedDateRange[1]).format("MMM D, YYYY")}
          </p>
        </div>
      )}
      <div className="flex gap-2 mt-3">
        <button
          className="bg-gray-200 flex-1 h-[36px] justify-center rounded-lg text-[14px] pt-1 text-gray-700 text-[17px]"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="bg-[#5570F1] flex-1 h-[36px] justify-center rounded-lg text-[14px] pt-1 text-white text-[17px]"
          onClick={handleApply}
        >
          Apply
        </button>
      </div>
    </div>
  );
};