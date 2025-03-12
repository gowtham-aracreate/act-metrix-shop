import React, { useState } from 'react';

export const CalenderPopup = () => {
  const [isDateRangeChecked, setIsDateRangeChecked] = useState(false);


  return (
    <div className="absolute bg-white p-5 rounded-md z-1 w-[330px] h-auto">
      <div>
        <h1 className='pb-4 text-[16px] font-semibold text-left'>By Date</h1>
        <div className='flex gap-15' >
          <div className='flex flex-col gap-2 '>
            <div className='inline-flex'>
              <input type="checkbox" className='large-checkbox ' />
              <p className='pl-3 text-[15px]'>This Week</p>
            </div>
            <div className='inline-flex'>
              <input type="checkbox" className='large-checkbox ' />
              <p className='pl-3 text-[15px]'>This Month</p>
            </div>
            <div className='inline-flex'>
              <input type="checkbox" className='large-checkbox ' />
              <p className='pl-3 text-[15px]'>This Year</p>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='inline-flex'>
              <input type="checkbox" className='large-checkbox ' />
              <p className='pl-3 text-[15px]'>Last Week</p>
            </div>
            <div className='inline-flex'>
              <input type="checkbox" className='large-checkbox ' />
              <p className='pl-2 text-[15px]'>Last Month</p>
            </div>
            <div className='inline-flex'>
              <input type="checkbox" className='large-checkbox ' />
              <p className='pl-3 text-[15px]'>Last Year</p>
            </div>
          </div>
        </div>
        <hr className="h-[1px] my-4 bg-gray-200 border-0"></hr>
        <div className='inline-flex pr-45'>
          <input type="checkbox"
            className='large-checkbox '
            onChange={() => setIsDateRangeChecked(!isDateRangeChecked)}
            checked={isDateRangeChecked}
          />

          <p className='pl-3 text-[15px]'>Date Range</p>
        </div>
        {isDateRangeChecked && (
          <div id="datepicker-inline" inline-datepicker="true" data-date="02/25/2024"></div>

        )}
      </div>
    </div>
  )
}
