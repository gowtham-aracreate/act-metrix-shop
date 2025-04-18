import React, { useState, useEffect } from 'react';

const Dropdown = ({ dropdownButtonStyle, dropdownMenuStyle, dropdownButtonText, dropdownOptions,onSelect, staticLabel = false, }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(dropdownButtonText);

  useEffect(() => {
    setSelectedOption(dropdownButtonText);
  }, [dropdownButtonText]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    if (!staticLabel) {
      setSelectedOption(option.label); // only update if not static
    }
    setIsOpen(false);
    onSelect?.(option);
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
          className={`z-1 origin-top-right absolute right-0 mt-2 w-56 rounded-md ${dropdownMenuStyle}`}
          role="menu"
        >
          <div className="py-1 bg-white border border-gray-400 rounded-lg pl-4" role="none">
            {dropdownOptions.map((option, index) => (
              <button

                key={index}
                // href={option.href}
                onClick={() => handleOptionClick(option)}
                className="block py-2 text-sm  text-gray-700 w-full text-left"
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










