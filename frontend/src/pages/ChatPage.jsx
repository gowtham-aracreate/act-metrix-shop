// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../layout/Sidebar";

// const initialContacts = [
//   { id: 1, name: "Jane Doe", lastActivity: "12 Aug 2022 - 12:55 am" },
//   { id: 2, name: "Janet Adebayo", lastActivity: "12 Aug 2022 - 12:55 am" },
//   { id: 3, name: "Kunle Adekunle", lastActivity: "12 Aug 2022 - 12:55 am" },
// ];

// const ChatPage = () => {
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [contactList, setContactList] = useState(initialContacts);
//   const [showModal, setShowModal] = useState(false);
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleNewMessage = () => {
//     setShowModal(true);
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <div className="w-65 bg-white shadow-md">
//         <Sidebar />
//       </div>

//       <div className="flex flex-1 flex-col p-6">
//         <div className="flex justify-between items-center pb-4 border-b">
//           <h2 className="text-lg font-semibold">Conversations with Customers</h2>
//           <button onClick={handleNewMessage} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
//             New Message
//           </button>
//         </div>

//         <div className="flex flex-1 mt-5">
//           <div className="w-1/4 bg-white p-4 border-r rounded-lg shadow-md">
//             <input type="text" placeholder="Search" className="w-full p-2 mb-4 border rounded-lg" />
//             <div>
//               {contactList.map((contact) => (
//                 <div
//                   key={contact.id}
//                   onClick={() => setSelectedChat(contact)}
//                   className={`p-3 border-b cursor-pointer rounded-lg flex justify-between items-center ${selectedChat?.id === contact.id ? "bg-gray-200" : ""}`}
//                 >
//                   <div>
//                     <span className="font-medium block">{contact.name}</span>
//                     <span className="text-sm text-gray-600 block">{contact.lastActivity}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="flex-1 flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md">
//             {selectedChat ? (
//               <div className="w-full max-w-md">
//                 <h2 className="text-lg font-semibold">{selectedChat.name}</h2>
//                 <textarea
//                   className="w-full p-2 border rounded-lg mb-4"
//                   placeholder="Type your message here..."
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                 />
//                 <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">Send Message</button>
//               </div>
//             ) : (
//               <div className="text-center">
//                 <p className="text-gray-500">Click on a contact to view messages.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {showModal && (
//         <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-5 rounded-lg shadow-md w-1/3">
//             <h2 className="text-lg font-semibold mb-4">New Message</h2>
//             <input type="text" placeholder="Search customer name" className="w-full p-2 border rounded-lg mb-4" />
//             <div className="max-h-60 overflow-y-auto">
//               {contactList.map((contact) => (
//                 <div key={contact.id} className="p-3 border-b cursor-pointer hover:bg-gray-100">
//                   <span>{contact.name}</span>
//                 </div>
//               ))}
//             </div>
//             <button onClick={() => setShowModal(false)} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg">Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatPage;



import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaRegPaperPlane } from "react-icons/fa";
import { HiOutlineChatBubbleLeft } from "react-icons/hi2";
import Sidebar from "../layout/Sidebar";

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="flex h-screen">
      
      <div className="w-64 bg-white shadow-md">
        <Sidebar />
      </div>

      
      <div className="flex flex-1">
        
        <div className="w-1/3 bg-white p-4 shadow-md mt-20 bg-gray-200">
          <h2 className="text-xl font-semibold mb-4">Contacts</h2>
          <div className="relative mb-4">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              className="w-full pl-10 pr-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Search"
            />
          </div>

          
          <ul>
            {["Jane Doe", "Janet Adebayo", "Kunle Adekunle"].map((name, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-200"
                onClick={() => setSelectedChat(name)}
              >
                <div>
                  <h3 className="text-md font-semibold">{name}</h3>
                  <p className="text-sm text-gray-500">I want to make enquiries...</p>
                </div>
                <span className="text-xs text-gray-400">12:55 am</span>
              </li>
            ))}
          </ul>
        </div>


        <div className="flex-1 flex flex-col bg-white p-6 shadow-lg">
          {selectedChat ? (
            <>
              
              <div className="flex items-center justify-between pb-4 border-b">
                <h2 className="text-lg font-semibold">{selectedChat}</h2>
                <span className="text-sm text-green-500">Online</span>
              </div>
              
              
              <div className="flex-1 overflow-auto p-4">
                <div className="text-center text-gray-500 text-xs mb-2">12 August 2022</div>

                
                <div className="bg-blue-500 text-white p-3 my-2 max-w-xs rounded-lg">
                  <p>Hello, I want to make enquiries about your product</p>
                  <span className="text-xs block mt-1 text-gray-300">12:55 am</span>
                </div>

                <div className="bg-yellow-200 p-3 my-2 max-w-xs rounded-lg ml-auto">
                  <p>Hello, thank you for reaching out</p>
                  <span className="text-xs block mt-1 text-gray-500">12:57 am</span>
                </div>

                <div className="bg-yellow-200 p-3 my-2 max-w-xs rounded-lg ml-auto">
                  <p>What do you need to know?</p>
                  <span className="text-xs block mt-1 text-gray-500">12:57 am</span>
                </div>

                <div className="text-center text-gray-500 text-xs my-2">Today</div>

                <div className="bg-blue-500 text-white p-3 my-2 max-w-xs rounded-lg">
                  <p>I want to know if the price is negotiable.I need about 2 units</p>
                  <span className="text-xs block mt-1 text-grayy-300">12:55 am</span>
                  </div>
                  </div>
                  
                  <div className="flex items-center border-t pt-3 bg-gray-100 p-2 rounded-lg">
                <input
                  type="text"
                  className="flex-1 p-3 border rounded-lg focus:outline-none"
                  placeholder="Your message..."
                />
                <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center">
                  <FaRegPaperPlane className="w-5 h-5" />
                </button>
              </div>
            </>
          ) : (
            
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <HiOutlineChatBubbleLeft className="text-6xl mb-4 text-gray-300" />
              <p className="text-lg font-semibold">Messages</p>
              <p className="text-sm">Click on a contact to view messages.</p>
              <button 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                onClick={() => setSelectedChat("chat")} 
              >
                New Message
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
