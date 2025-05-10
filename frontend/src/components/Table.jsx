import React, { useState } from "react";
import SortingPopup from "./SortingPopup";
import { useNavigate } from "react-router-dom";
import Filter from "../assets/filter.svg";
import Calendar from "../assets/calendar.svg";
import Send from "../assets/send.svg";
import select from "../assets/select.png";
import { CalendarPopup } from "./CalendarPopup";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


const Table = ({ title, tableContent, heading, onSearch, mode, onSortChange, filters, onFilterChange }) => {
  const [isSortingOpen, setIsSortingOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();



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

  const filteredContent = React.useMemo(() => {
    return sortedContent.filter((item) =>
      Object.values(item).some((value) => {
        if (React.isValidElement(value)) {
          const textContent = value.props?.children;
          return textContent && textContent.toString().toLowerCase().includes(searchQuery.toLowerCase());
        }
        return value && value.toString().toLowerCase().includes(searchQuery.toLowerCase());
      })
    );
  }, [sortedContent, searchQuery]);

  const handleRowSelect = (id) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(id)) {
      newSelectedRows.delete(id);
    } else {
      newSelectedRows.add(id);
    }
    setSelectedRows(newSelectedRows);
  };
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredContent.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredContent.length / itemsPerPage);

  const handleSelectAll = () => {
    const currentIds = currentItems.map((item, index) => getRowKey(item, index));
    const allSelected = currentIds.every((id) => selectedRows.has(id));
  
    if (allSelected) {
      const newSelectedRows = new Set(selectedRows);
      currentIds.forEach((id) => newSelectedRows.delete(id));
      setSelectedRows(newSelectedRows);
    } else {
      const newSelectedRows = new Set(selectedRows);
      currentIds.forEach((id) => newSelectedRows.add(id));
      setSelectedRows(newSelectedRows);
    }
  };
  

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleDateFilter = (newFilters) => {
    if (onFilterChange) {
      onFilterChange(newFilters);
    } else {
      console.error("onFilterChange is not defined!");
    }
  };

  const handleShare = () => {
    const rowsToExport = tableContent.filter((item, index) =>
      selectedRows.has(getRowKey(item, index))
    );
  
    if (rowsToExport.length === 0) {
      alert("No rows selected to share/export.");
      return;
    }
  
    const plainData = rowsToExport.map((row, rowIndex) => {
      const plainRow = {};
      Object.entries(row).forEach(([key, value]) => {
        if (React.isValidElement(value)) {
          plainRow[key] = getTextFromReactElement(value);
        } else {
          plainRow[key] = value;
        }
      });
      return plainRow;
    });
  
    const worksheet = XLSX.utils.json_to_sheet(plainData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
  
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
  
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "selected_rows.xlsx");
  };
  
  const getTextFromReactElement = (element) => {
    if (typeof element === 'string' || typeof element === 'number') {
      return element;
    }
  
    if (React.isValidElement(element)) {
      const children = element.props.children;
      if (typeof children === 'string' || typeof children === 'number') {
        return children;
      }
  
      if (Array.isArray(children)) {
        return children.map(child => getTextFromReactElement(child)).join('');
      }
  
      return getTextFromReactElement(children);
    }
  
    return '';
  };
    
  
  const getRowKey = (item, index) => item.id || item._id || item.key || index;

  // const filteredContent = tableContent.filter((item) =>
  //   item.some((data) => data.toString().toLowerCase().includes(searchQuery.toLowerCase()))
  // );

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
                    onChange={(e) => handleSearch(e.target.value)}
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
                  <button 
                  onClick={handleShare}
                  className="flex w-[67px] pt-1 h-[30px] justify-center text-gray-600 border border-gray-600 rounded-lg">
                    <img className="w-[16px] h-[16px] mt-1 mr-1" src={Send} alt="send" />
                    Share
                  </button>
                </div>
                <div>
                  <button
                    onClick={handleSelectAll}
                    className="text-gray-600 h-[30px] pt-1 justify-center px-2 w-auto  border border-gray-600 rounded-lg">
                    <img src={select} alt="select" className="w-5 h-5 mx-1 inline-flex mb-1"
                    />
{currentItems.every((item, index) => selectedRows.has(getRowKey(item, index)))
  ? "Deselect All"
  : "Select All"}
                                     </button>
                </div>
              </div>
            </div>
          </div>
        </caption>
        <thead className="border-y border-gray-300 w-full text-left">
          <tr>
            <th scope="col" className="p-4">
              {/*  */}
            </th>
            {heading.map((topic, index) => (
              <th
                key={index}
                scope="col"
                className="px-4 py-3 text-[14px] font-semibold text-[#2C2D33]"
              // onClick={() => handleSort(topic.toLowerCase())}
              >
                {topic}
                
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
                    checked={selectedRows.has(data.id || index)}
                    onChange={() => handleRowSelect(getRowKey(data, index))}
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
      <div className="flex justify-center items-center pt-3 mt-3">

        <nav aria-label="Page navigation example">
          <ul className="inline-flex pr-10 -space-x-px text-sm">
            <li>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
              >
                Previous
              </button>
            </li>
            {[...Array(totalPages)].map((_, i) => (
              <li key={i}>
                <button
                  onClick={() => setCurrentPage(i + 1)}
                  className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 ${currentPage === i + 1
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-500 bg-white"
                    }`}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Table;