import React, { useState } from 'react';
import Dropdown from './dropdown';

const SortingPopup = ({ onSortChange }) => {
  const [orderType, setOrderType] = useState('');
  const [status, setStatus] = useState('All');
  const [amountFrom, setAmountFrom] = useState(0);
  const [amountTo, setAmountTo] = useState(0);

  return (
    <div className="absolute bg-white p-8 rounded-md z-1 w-[320px] h-auto">
      <div className='flex flex-col'>
        <h3 className="font-bold text-left text-[16px]">Sort By</h3>
        <p className='font-semibold text-left pt-2 text-[16px]'>Order Type</p>
        <div className='flex pt-2 justify-between'>
          <div className='inline-flex'>
            <input type="checkbox" className='large-checkbox' onChange={() => setOrderType('Home Delivery')} />
            <p className='pl-4 text-[15px]'>Home Delivery</p>
          </div>
          <div className='inline-flex'>
            <input type="checkbox" className='large-checkbox' onChange={() => setOrderType('Pick Up')} />
            <p className='pl-4 text-[15px]'>Pick Up</p>
          </div>
        </div>
        <hr className="h-[1px] my-4 bg-gray-200 border-0"></hr>
        <p className='pt-2 text-left pb-3 font-semibold text-[16px]'>Status</p>
        <Dropdown
          dropdownButtonStyle="text-gray-900 pt-1 w-[258px] h-[30px] pl-5 w-[120px] bg-white border border-gray-400 text-[15px] rounded-md"
          dropdownButtonText={status}
          dropdownOptions={[
            { label: "All", value: "All" },
            { label: "Completed", value: "Completed" },
            { label: "In-Progress", value: "In-Progress" },
            { label: "Pending", value: "Pending" },
          ]}
          onSelect={(selectedOption) => setStatus(selectedOption.value)}
        />
        <p className='pt-3 text-left font-semibold text-[16px]' >Amount</p>
        <div className='flex pt-2'>
          <div className='flex-col pr-3'>
            <p className='text-left pb-1 text-[15px]'>From</p>
            <input type="number" placeholder='0' className='border border-gray-400 w-[122px] h-[30px] rounded-md pl-4' 
              value={amountFrom} onChange={(e) => setAmountFrom(e.target.value)} />
          </div>
          <div className='flex-col'>
            <p className='text-left pb-1 text-[15px]'>To</p>
            <input type="number" placeholder='0' className='border border-gray-400 w-[122px] h-[30px] rounded-md pl-4' 
              value={amountTo} onChange={(e) => setAmountTo(e.target.value)} />
          </div>
        </div>
        <button 
          className="bg-[#5570F1] inline-flex w-[258px] h-[36px] justify-center rounded-lg text-[14px] mt-3 mr-4 pt-1 text-white text-[17px]"
          onClick={() => onSortChange({ orderType, status, amountFrom, amountTo })} 
        >Filter</button>
      </div>
    </div>
  );
};

export default SortingPopup;
