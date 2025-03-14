import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';
import './CalendarStyles.css';

export const CalendarPopup = () => {
  const [isDateRangeChecked, setIsDateRangeChecked] = useState(false);
  const [date, setDate] = useState([new Date(), new Date()]);

  return (
    <div className="absolute bg-white p-5 rounded-lg z-10 w-[330px] h-auto shadow-xl">
      <h1 className="pb-4 text-[16px] font-semibold text-left">By Date</h1>
      <div className="flex gap-4">
        <div className="flex flex-col gap-2">
          {['This Week', 'This Month', 'This Year'].map((label) => (
            <label key={label} className="flex items-center space-x-2">
              <input type="checkbox" className="w-5 h-5 accent-blue-500" />
              <span className="text-[15px]">{label}</span>
            </label>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {['Last Week', 'Last Month', 'Last Year'].map((label) => (
            <label key={label} className="flex items-center space-x-2">
              <input type="checkbox" className="w-5 h-5 accent-blue-500" />
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
            value={date}
            onChange={setDate}
            className="custom-calendar"
          />
          <p className="text-sm text-gray-600 mt-2">
            Selected: {dayjs(date[0]).format('MMM D, YYYY')} - {dayjs(date[1]).format('MMM D, YYYY')}
          </p>
        </div>
      )}
    </div>
  );
};
