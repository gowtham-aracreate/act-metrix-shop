import React, { useState } from 'react';

const Dropdown = ({ dropdownButtonStyle, dropdownMenuStyle, dropdownButtonText,  dropdownOptions}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(dropdownButtonText);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleOptionClick = (label) => {
    setSelectedOption(label);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={toggleDropdown}
          className={`inline-flex
           ${dropdownButtonStyle}`}
        >
            {selectedOption}
          <svg
            className="ml-2 -mr-1 h-6.5 w-5"

            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className={`origin-top-right absolute right-0 mt-2 w-56 
          rounded-md ${dropdownMenuStyle}`}
          role="menu"
        >
          <div className="py-1" role="none">
            { dropdownOptions.map((option, index) => (
              <a
                key={index}
                href={option.href}
                onClick={() => handleOptionClick(option.label)}
                className="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
              >
                {option.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;