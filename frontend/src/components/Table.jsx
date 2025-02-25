import React from "react";
import { useNavigate } from "react-router-dom";
import Filter from "../assets/filter.svg";
import Calendar from "../assets/calendar.svg";
import Send from "../assets/send.svg";
import Dropdown from "./dropdown";

const Table = (title, tableContent, heading) => {
  const navigate = useNavigate();
  return (
    <div className="p-[22px] bg-white rounded-lg h-screen">
      <caption className="pb-[25px]">
        <div className=" flex">
          <div>
            <h1 className="text-[16px] text-[#45464E] font-semibold">
              {title}
            </h1>
          </div>
          <div className="absolute flex right-[28px]  gap-[12px]">
            <div>
              <div class="relative">
                <div class="absolute inset-y-0 rtl:inset-r-0 start-0 items-center ps-3 pt-2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="black"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
              </div>
              <input
                type="text"
                class="block ps-10 w-[176px] h-[29px] border border-gray-300 rounded-lg "
                placeholder="Search"
              />
            </div>
            <div className="flex  gap-[12px]">
              <div>
                <button className="flex w-[67px] h-[29px] justify-center text-gray-600 border border-gray-600 rounded-lg">
                  <img
                    className="w-[16px] h-[16px] mt-1"
                    src={Filter}
                    alt="filter"
                  />
                  Filter
                </button>
              </div>
              <div>
                <button className="flex w-[67px] h-[29px] justify-center text-gray-600 border border-gray-600 rounded-lg">
                  <img
                    className="w-[16px] h-[16px] mt-1"
                    src={Calendar}
                    alt="calendar"
                  />
                  Filter
                </button>
              </div>
              <div>
                <button className="flex w-[67px] h-[29px] justify-center text-gray-600 border border-gray-600 rounded-lg">
                  <img
                    className="w-[16px] h-[16px] mt-1"
                    src={Send}
                    alt="send"
                  />
                  Share
                </button>
              </div>
              <div>
                <Dropdown
                  dropdownButtonStyle="text-gray-600 h-[29px] justify-center w-[120px] border border-gray-600 rounded-lg"
                  dropdownMenuStyle="bg-white"
                  dropdownButtonText="Bulk Action"
                />
              </div>
            </div>
          </div>
        </div>
      </caption>
      <table className="w-full text-left">
        <thead className="border-y border-gray-300">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded-sm focus:ring-blue-500"
                />
              </div>
            </th>
            {heading.map((topic, index) => {
                <th
                key={index}
                  scope="col"
                  className="px-6 py-3 flex text-[14px] text-[#2C2D33]"
                >
                  {topic}
                  <svg
                    className="ml-3"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="22"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      stroke="currentColor"
                      d="M14 5.1665H2C1.72667 5.1665 1.5 4.93984 1.5 4.6665C1.5 4.39317 1.72667 4.1665 2 4.1665H14C14.2733 4.1665 14.5 4.39317 14.5 4.6665C14.5 4.93984 14.2733 5.1665 14 5.1665Z"
                      fill="#00092E"
                    />
                    <path
                      stroke="currentColor"
                      d="M12 8.5H4C3.72667 8.5 3.5 8.27333 3.5 8C3.5 7.72667 3.72667 7.5 4 7.5H12C12.2733 7.5 12.5 7.72667 12.5 8C12.5 8.27333 12.2733 8.5 12 8.5Z"
                      fill="#00092E"
                    />
                    <path
                      stroke="currentColor"
                      d="M9.33332 11.8335H6.66666C6.39332 11.8335 6.16666 11.6068 6.16666 11.3335C6.16666 11.0602 6.39332 10.8335 6.66666 10.8335H9.33332C9.60666 10.8335 9.83332 11.0602 9.83332 11.3335C9.83332 11.6068 9.60666 11.8335 9.33332 11.8335Z"
                      fill="#00092E"
                    />
                  </svg>
                </th>
            })}
          </tr>
        </thead>
        <tbody>
            {tableContent.map((data, index) => {
               <tr key={index}>
               <td className="w-4 p-4">
                 <div className="flex items-center">
                   <input
                     type="checkbox"
                     className="w-4 h-4 rounded-sm focus:ring-blue-500"
                   />
                 </div>
               </td>
                <td className="px-6 py-4">{data.name}</td>
                <td className="px-6 py-4">{data.email}</td>
                <td className="px-6 py-4">{data.phone}</td>
                <td className="px-6 py-4">{data.order}</td>
                <td className="px-6 py-4">{data.total}</td>
                <td className="px-6 py-4">{data.customer}</td>
                <td className="px-6 py-4">{data.status}</td> 
              </tr>
            })}
        </tbody>
      </table>
      <nav className="bottom-0">
        <div className="flex border-t border-[#E1E2E9] pt-[9px]">
          <div className="flex ">
            <Dropdown
              dropdownButtonStyle="text-gray-600 h-[23px] justify-center w-[60px] bg-[#5E636614] text-[15px] rounded-lg"
              dropdownMenuStyle="bg-white"
              dropdownButtonText="10"
            />
            <p className=" pl-[10px] text-[#A6A8B1]">Items per page</p>
            <p className="pl-[22px] text-[#666666]">1-10 of 200 items</p>
          </div>
          <div className="flex absolute right-0 pr-[22px]">
            <Dropdown
              dropdownButtonStyle="text-gray-600 h-[23px] justify-center w-[60px] bg-[#5E636614] text-[15px] rounded-lg"
              dropdownMenuStyle="bg-white"
              dropdownButtonText="1"
            />
            <p className="pl-[10px] text-[#666666]"> of 44 pages</p>
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                width="10"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-5 mt-1"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </a>
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-5 mt-1"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Table;
