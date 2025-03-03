import React from "react";
import { IoLogOut } from "react-icons/io5";
import metrixlogo from "../assets/metrixlogo.svg";

const Sidebar = ({children}) => {
  const [activeLink, setActiveLink] = React.useState("Dashboard");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="">
      <div className="w-64 text-[14px] text-black-500 p-6 fixed left-0 top-0">
        <div className="flex items-center mb-6">
          <img src={metrixlogo} alt="Logo" className="h-8 w-8 mr-2" />
          <h2 className="text-lg font-bold text-gray-900">Metrix</h2>
        </div>

        <ul className="">
          <a
            href="#"
            onClick={() => handleLinkClick("Dashboard")}
            className={`p-3 rounded-md flex items-center ${
              activeLink === "Dashboard"
                ? "bg-[#5570F1] text-white"
                : "text-black-600"
            }`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`mr-3 ${
                activeLink === "Dashboard" ? "text-white" : "text-black-600"
              }`}
            >
              <path
                opacity="0.4"
                d="M16.0755 2H19.4615C20.8637 2 22 3.14585 22 4.55996V7.97452C22 9.38864 20.8637 10.5345 19.4615 10.5345H16.0755C14.6732 10.5345 13.537 9.38864 13.537 7.97452V4.55996C13.537 3.14585 14.6732 2 16.0755 2Z"
                fill="currentColor"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.53852 2H7.92449C9.32676 2 10.463 3.14585 10.463 4.55996V7.97452C10.463 9.38864 9.32676 10.5345 7.92449 10.5345H4.53852C3.13626 10.5345 2 9.38864 2 7.97452V4.55996C2 3.14585 3.13626 2 4.53852 2ZM4.53852 13.4655H7.92449C9.32676 13.4655 10.463 14.6114 10.463 16.0255V19.44C10.463 20.8532 9.32676 22 7.92449 22H4.53852C3.13626 22 2 20.8532 2 19.44V16.0255C2 14.6114 3.13626 13.4655 4.53852 13.4655ZM19.4615 13.4655H16.0755C14.6732 13.4655 13.537 14.6114 13.537 16.0255V19.44C13.537 20.8532 14.6732 22 16.0755 22H19.4615C20.8637 22 22 20.8532 22 19.44V16.0255C22 14.6114 20.8637 13.4655 19.4615 13.4655Z"
                fill="currentColor"
              />
            </svg>
            Dashboard
          </a>
          <a
            href="#"
            onClick={() => handleLinkClick("Orders")}
            className={`p-3 flex items-center rounded-md ${
              activeLink === "Orders"
                ? "bg-[#5570F1] text-white"
                : "hover:bg-gray-200"
            }`}
          >
            <svg
              width="21"
              height="22"
              viewBox="0 0 21 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`mr-3 ${
                activeLink === "Orders" ? "text-white" : "text-black-600"
              }`}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.5137 20.5H6.16592C3.09955 20.5 0.747152 19.3925 1.41534 14.9348L2.19338 8.89363C2.60528 6.66937 4.02404 5.81812 5.26889 5.81812H15.4474C16.7105 5.81812 18.0469 6.73345 18.5229 8.89363L19.3009 14.9348C19.8684 18.8891 17.5801 20.5 14.5137 20.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.651 5.59842C14.651 3.21235 12.7167 1.27805 10.3307 1.27805V1.27805C9.18168 1.27319 8.07807 1.72622 7.26388 2.53697C6.44969 3.34772 5.99199 4.44941 5.992 5.59842H5.992"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.2963 10.1018H13.2506"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.46572 10.1018H7.41995"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Orders
          </a>
          <a
            href="#"
            onClick={() => handleLinkClick("Customers")}
            className={`p-3 flex items-center rounded-md ${
              activeLink === "Customers"
                ? "bg-[#5570F1] text-white"
                : "hover:bg-gray-200"
            }`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`mr-3 ${
                activeLink === "Customers" ? "text-white" : "text-black-600"
              }`}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.59151 15.2068C13.2805 15.2068 16.4335 15.7658 16.4335 17.9988C16.4335 20.2318 13.3015 20.8068 9.59151 20.8068C5.90151 20.8068 2.74951 20.2528 2.74951 18.0188C2.74951 15.7848 5.88051 15.2068 9.59151 15.2068Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.59151 12.0198C7.16951 12.0198 5.20551 10.0568 5.20551 7.63482C5.20551 5.21282 7.16951 3.24982 9.59151 3.24982C12.0125 3.24982 13.9765 5.21282 13.9765 7.63482C13.9855 10.0478 12.0355 12.0108 9.62251 12.0198H9.59151Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.4831 10.8816C18.0841 10.6566 19.3171 9.28265 19.3201 7.61965C19.3201 5.98065 18.1251 4.62065 16.5581 4.36365"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.5954 14.7322C20.1464 14.9632 21.2294 15.5072 21.2294 16.6272C21.2294 17.3982 20.7194 17.8982 19.8954 18.2112"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Customers
          </a>
          <a
            href="#"
            onClick={() => handleLinkClick("Inventory")}
            className={`p-3 flex items-center rounded-md ${
              activeLink === "Inventory"
                ? "bg-[#5570F1] text-white"
                : "hover:bg-gray-200"
            }`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={` mr-3 ${
                activeLink === "Inventory" ? "text-white" : "text-black-600"
              }`}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.4189 15.7321C21.4189 19.3101 19.3099 21.4191 15.7319 21.4191H7.94988C4.36288 21.4191 2.24988 19.3101 2.24988 15.7321V7.93212C2.24988 4.35912 3.56388 2.25012 7.14288 2.25012H9.14288C9.86088 2.25112 10.5369 2.58812 10.9669 3.16312L11.8799 4.37712C12.3119 4.95112 12.9879 5.28912 13.7059 5.29012H16.5359C20.1229 5.29012 21.4469 7.11612 21.4469 10.7671L21.4189 15.7321Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.48096 14.463H16.216"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Inventory
          </a>
          <a
            href="#"
            onClick={() => handleLinkClick("Conversations")}
            className={`p-3 flex items-center rounded-md ${
              activeLink === "Conversations"
                ? "bg-[#5570F1] text-white"
                : "hover:bg-gray-200"
            }`}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`mr-3 ${
                activeLink === "Conversations" ? "text-white" : "text-black-600"
              }`}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.0714 18.0699C15.0152 21.1263 10.4898 21.7867 6.78642 20.074C6.23971 19.8539 5.79148 19.676 5.36537 19.676C4.17849 19.683 2.70117 20.8339 1.93336 20.067C1.16555 19.2991 2.31726 17.8206 2.31726 16.6266C2.31726 16.2004 2.14642 15.7602 1.92632 15.2124C0.212831 11.5096 0.874109 6.98269 3.93026 3.92721C7.8316 0.0244319 14.17 0.0244322 18.0714 3.9262C21.9797 7.83501 21.9727 14.1681 18.0714 18.0699Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.9394 11.413H14.9484"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.9304 11.413H10.9394"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.9214 11.413H6.9304"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Conversations
          </a>
          <a
            href="#"
            onClick={() => handleLinkClick("Settings")}
            className={`p-3 flex items-center rounded-md ${
              activeLink === "Settings"
                ? "bg-[#5570F1] text-white"
                : "hover:bg-gray-200"
            }`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`mr-3 ${
                activeLink === "Settings" ? "text-white" : "text-black-600"
              }`}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.8067 7.62355L20.1842 6.54346C19.6577 5.62954 18.4907 5.31426 17.5755 5.83866V5.83866C17.1399 6.09528 16.6201 6.16809 16.1307 6.04103C15.6413 5.91396 15.2226 5.59746 14.9668 5.16131C14.8023 4.88409 14.7139 4.56833 14.7105 4.24598V4.24598C14.7254 3.72916 14.5304 3.22834 14.17 2.85761C13.8096 2.48688 13.3145 2.2778 12.7975 2.27802H11.5435C11.037 2.27801 10.5513 2.47985 10.194 2.83888C9.83669 3.19791 9.63717 3.68453 9.63961 4.19106V4.19106C9.6246 5.23686 8.77248 6.07675 7.72657 6.07664C7.40421 6.07329 7.08846 5.98488 6.81123 5.82035V5.82035C5.89606 5.29595 4.72911 5.61123 4.20254 6.52516L3.53435 7.62355C3.00841 8.53633 3.3194 9.70255 4.23 10.2322V10.2322C4.8219 10.574 5.18653 11.2055 5.18653 11.889C5.18653 12.5725 4.8219 13.204 4.23 13.5457V13.5457C3.32056 14.0719 3.00923 15.2353 3.53435 16.1453V16.1453L4.16593 17.2345C4.41265 17.6797 4.8266 18.0082 5.31619 18.1474C5.80578 18.2865 6.33064 18.2248 6.77462 17.976V17.976C7.21108 17.7213 7.73119 17.6515 8.21934 17.7821C8.70749 17.9128 9.12324 18.233 9.37416 18.6716C9.5387 18.9488 9.62711 19.2646 9.63046 19.5869V19.5869C9.63046 20.6435 10.487 21.5 11.5435 21.5H12.7975C13.8505 21.5 14.7055 20.6491 14.7105 19.5961V19.5961C14.7081 19.088 14.9089 18.6 15.2682 18.2407C15.6275 17.8814 16.1155 17.6806 16.6236 17.6831C16.9452 17.6917 17.2596 17.7797 17.5389 17.9393V17.9393C18.4517 18.4653 19.6179 18.1543 20.1476 17.2437V17.2437L20.8067 16.1453C21.0618 15.7074 21.1318 15.1859 21.0012 14.6963C20.8706 14.2067 20.5502 13.7893 20.111 13.5366V13.5366C19.6718 13.2839 19.3514 12.8665 19.2208 12.3769C19.0902 11.8872 19.1603 11.3658 19.4154 10.9279C19.5812 10.6383 19.8214 10.3981 20.111 10.2322V10.2322C21.0161 9.70283 21.3264 8.54343 20.8067 7.63271V7.63271V7.62355Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="12.1751"
                cy="11.889"
                r="2.63616"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Settings
          </a>

          <a
            href="#"
            onClick={() => handleLinkClick("Contact")}
            className={`mt-25 p-3 flex items-center rounded-md ${
              activeLink === "Contact"
                ? "bg-[#5570F1] text-white"
                : "bg-gray-100"
            }`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`mr-3 ${
                activeLink === "Contact" ? "text-white" : "text-black-600"
              }`}
            >
              <path
                d="M3 18V12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12V18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H18C17.4696 21 16.9609 20.7893 16.5858 20.4142C16.2107 20.0391 16 19.5304 16 19V16C16 15.4696 16.2107 14.9609 16.5858 14.5858C16.9609 14.2107 17.4696 14 18 14H21V19ZM3 19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H6C6.53043 21 7.03914 20.7893 7.41421 20.4142C7.78929 20.0391 8 19.5304 8 19V16C8 15.4696 7.78929 14.9609 7.41421 14.5858C7.03914 14.2107 6.53043 14 6 14H3V19Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Contact Support
          </a>

          <a
            href="#"
            onClick={() => handleLinkClick("Gift")}
            className="mt-6 p-4 flex items-center rounded-lg bg-[#FFCC9133]"
          >
            <div className="flex-col">
              <p className="text-black inline-flex text-md font-semibold w-50">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2"
                >
                  <path
                    d="M20 12V22H4V12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 7H2V12H22V7Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 22V7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 7H16.5C17.163 7 17.7989 6.73661 18.2678 6.26777C18.7366 5.79893 19 5.16304 19 4.5C19 3.83696 18.7366 3.20107 18.2678 2.73223C17.7989 2.26339 17.163 2 16.5 2C13 2 12 7 12 7Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 7H7.5C6.83696 7 6.20107 6.73661 5.73223 6.26777C5.26339 5.79893 5 5.16304 5 4.5C5 3.83696 5.26339 3.20107 5.73223 2.73223C6.20107 2.26339 6.83696 2 7.5 2C11 2 12 7 12 7Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Free Gift Awaits You!
              </p>
              <p className="text-sm text-gray-600 inline-flex">
                Upgrade your account
                <svg
                  width="18"
                  height="23"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2"
                >
                  <path
                    d="M6 12L10 8L6 4"
                    stroke="#6E7079"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </p>
            </div>
          </a>

          <div className="mt-6">
            <div className="p-3 flex items-center text-red-500 hover:bg-red-100 rounded-md cursor-pointer">
              <IoLogOut className="h-5 w-5 mr-2" />
              Logout
            </div>
          </div>
        </ul>
      </div>
      {children}
    </div>
   
  );
};

export default Sidebar;
