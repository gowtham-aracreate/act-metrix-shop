import React, { useState } from 'react';

const Dropdown = ({ dropdownButtonStyle, dropdownMenuStyle, dropdownButtonText, dropdownOptions, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(dropdownButtonText);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option.label);
    setIsOpen(false);
    if (onSelect) {
      onSelect(option); 
    }
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
        type="button"
          onClick={toggleDropdown}
          className={`inline-flex relative ${dropdownButtonStyle}`}
        >
          {selectedOption}
          <svg
            className="absolute right-5 ml-2 -mr-1 h-6.5 w-5"
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
          className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md ${dropdownMenuStyle}`}
          role="menu"
        >
          <div className="py-1" role="none">
            {dropdownOptions.map((option, index) => (
              <button

                key={index}
                // href={option.href}
                onClick={() => handleOptionClick(option)}
                className="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
              >
                {option.label}
              </button>

            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
