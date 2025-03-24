import React, { useState } from "react";
import SortingPopup from "./SortingPopup";
import { useNavigate } from "react-router-dom";
import Filter from "../assets/filter.svg";
import Calendar from "../assets/calendar.svg";
import Send from "../assets/send.svg";
import Dropdown from "./dropdown";
import { CalendarPopup } from "./CalendarPopup";

const Table = ({ title, tableContent, heading, onSearch, mode, onSortChange, filters, onFilterChange }) => {
  const [isSortingOpen, setIsSortingOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const navigate = useNavigate();
  

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    if (onSortChange) {
      onSortChange({ key, direction });
    }
  };

  // Sorting logic
  const sortedContent = React.useMemo(() => {
    let sortableItems = [...tableContent];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [tableContent, sortConfig]);

  // Filtering logic
  // const filteredContent = React.useMemo(() => {
  //   return sortedContent.filter((item) =>
  //     Object.values(item).some((value) =>
  //       value.toString().toLowerCase().includes(searchQuery.toLowerCase())
  //     )
  //   );
  // }, [sortedContent, searchQuery]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredContent.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredContent.length / itemsPerPage);

  // Handle row selection
  const handleRowSelect = (id) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(id)) {
      newSelectedRows.delete(id);
    } else {
      newSelectedRows.add(id);
    }
    setSelectedRows(newSelectedRows);
  };

  // Handle select all rows
  const handleSelectAll = () => {
    if (selectedRows.size === currentItems.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(currentItems.map((item) => item.id)));
    }
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1); // Reset to the first page
  };
  const handleDateFilter = (newFilters) => {
    if (onFilterChange) {
      onFilterChange(newFilters);
    } else {
      console.error("onFilterChange is not defined!");
    }
  };
  

  const filteredContent = tableContent.filter((item) =>
    item.some((data) => data.toString().toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="bg-white rounded-lg h-auto mt-[20px] pl-[21px] mr-[22px] py-[22px] text-[14px]">
      <table className="w-full">
        <caption className="pb-[25px]">
          <div className="flex">
            <div>
              <h1 className="text-[16px] text-[#45464E] font-semibold">{title}</h1>
            </div>
            <div className="absolute flex right-[42px] gap-[12px]">
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 rtl:inset-r-0 start-0 items-center ps-3 pt-2 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="black"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="block ps-10 w-[220px] h-[29px] border border-gray-300 rounded-lg"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-[12px]">
                <div>
                  <button
                    className="flex w-[67px] pt-1 h-[30px] justify-center text-gray-600 border border-gray-600 rounded-lg"
                    onClick={() => setIsSortingOpen(!isSortingOpen)}
                  >
                    <img
                      className="w-[16px] h-[16px] mt-1 mr-1"
                      src={Filter}
                      alt="filter"
                    />
                    Filter
                  </button>
                  {isSortingOpen && <SortingPopup mode={mode} onSortChange={onSortChange} filters={filters}
                    onClose={() => setIsSortingOpen(false)} // Close function
                  />
                  }
                </div>
                <div>
                  <button className="flex w-[67px] pt-1 h-[30px] justify-center text-gray-600 border border-gray-600 rounded-lg"
                    onClick={() => setIsCalendarOpen(true)}
                  >
                    <img className="w-[16px] h-[16px] mt-1 mr-1" src={Calendar} alt="calendar" />
                    Filter
                  </button>
                  {isCalendarOpen && (
                    <CalendarPopup
                      onFilterChange={handleDateFilter}
                      onClose={() => setIsCalendarOpen(false)}
                    />
                  )}
                </div>
                <div>
                  <button className="flex w-[67px] pt-1 h-[30px] justify-center text-gray-600 border border-gray-600 rounded-lg">
                    <img className="w-[16px] h-[16px] mt-1 mr-1" src={Send} alt="send" />
                    Share
                  </button>
                </div>
                <div>
                  <Dropdown
                    dropdownButtonStyle="text-gray-600 h-[30px] pt-1 justify-center w-[135px] pr-5 border border-gray-600 rounded-lg"
                    dropdownMenuStyle="bg-white"
                    dropdownButtonText="Bulk Action"
                  />
                </div>
              </div>
            </div>
          </div>
        </caption>
        <thead className="border-y border-gray-300 w-full text-left">
          <tr>
            <th scope="col" className="p-4">
              <input
                type="checkbox"
                className="w-4 h-4 rounded-sm focus:ring-blue-500"
                checked={selectedRows.size === currentItems.length}
                onChange={handleSelectAll}
              />
            </th>
            {heading.map((topic, index) => (
              <th
                key={index}
                scope="col"
                className="px-4 py-3 text-[14px] font-semibold text-[#2C2D33]"
                // onClick={() => handleSort(topic.toLowerCase())}
              >
                {topic}
                <svg
                onClick={() => sortedContent}
                  className="ml-2 inline-flex"
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
            ))}
          </tr>
        </thead>

        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((data, index) => (
              <tr key={data.id || index} className="border-b border-gray-300 text-[#6E7079]">
                <td className="px-4 py-4 inline-flex">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded-sm focus:ring-blue-500"
                    checked={selectedRows.has(data.id)}
                    onChange={() => handleRowSelect(data.id)}
                  />
                  {data.icon && <img className="pl-5" src={data.icon} alt="icon" />}
                </td>
                {Object.values(data).map((cell, idx) => (
                  <td key={idx} className="px-4 py-4">
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={heading.length + 1} className="text-center py-4 text-gray-500">
                No data found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <nav className="bottom-0">
        <div className="flex border-t border-[#E1E2E9] pt-[9px]">
          <div className="flex">
            <Dropdown
              dropdownButtonStyle="text-gray-600 h-[23px] justify-center pr-8 w-[60px] bg-[#5E636614] text-[15px] rounded-lg"
              dropdownMenuStyle="bg-white"
              dropdownButtonText={itemsPerPage.toString()}
              onSelect={handleItemsPerPageChange}
            />
            <p className="pl-[10px] text-[#A6A8B1]">Items per page</p>
            <p className="pl-[22px] text-[#666666]">
              {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredContent.length)} of {filteredContent.length} items
            </p>
          </div>
          <div className="flex absolute right-[30px] pr-[22px]">
            <Dropdown
              dropdownButtonStyle="text-gray-600 h-[23px] justify-center w-[60px] pr-8 bg-[#5E636614] text-[15px] rounded-lg"
              dropdownMenuStyle="bg-white"
              dropdownButtonText={currentPage.toString()}
              onSelect={handlePageChange}
            />
            <p className="pl-[10px] text-[#666666]">of {totalPages} pages</p>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="disabled:opacity-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                width="10"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 mt-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="disabled:opacity-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 mt-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Table;