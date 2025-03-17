import React, { useState } from "react";
import Sidebar from "../layout/Sidebar";
import iconContainer from "../assets/iconContainer.svg"; 

const contacts = [
  { id: 1, name: "Jane Doe", message: "Hi, I want to make enquiries...", time: "12:55 am", unread: 2 },
  { id: 2, name: "Janet Adebayo", message: "Hi, I want to make enquiries...", time: "12:55 am", unread: 1 },
  { id: 3, name: "Kunle Adekunle", message: "Hi, I want to make enquiries...", time: "12:55 am", unread: 3 },
];

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="flex h-screen bg-gray-50">
      
      <div className="w-65 bg-white shadow-md">
        <Sidebar />
      </div>

      <div className="flex flex-1 flex-col p-6">
        
        
        <div className="flex justify-between items-center pb-4 border-b mt-10">
          <h2 className="text-lg font-semibold">Conversations with Customers</h2>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">New Message</button>
        </div>

        <div className="flex flex-1 mt-5">
          
          <div className="w-1/4 bg-white p-4 border-r rounded-lg shadow-md">
            <div className="flex justify-between items-center pb-2">
              <h3 className="text-md font-semibold">Contacts ({contacts.length})</h3>
            </div>
            <input
              type="text"
              placeholder="Search"
              className="w-full p-2 mb-4 border rounded-lg"
            />
            <div>
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => setSelectedChat(contact)}
                  className={`p-3 border-b cursor-pointer rounded-lg flex justify-between items-center ${
                      selectedChat?.id === contact.id ? "bg-gray-200" : ""
                  }`}
                >
                  <div>
                    <span className="font-medium block">{contact.name}</span>
                    <span className="text-sm text-gray-600 block">{contact.message}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500 block">{contact.time}</span>
                    {contact.unread > 0 && (
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

         
          <div className="flex-1 flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md">
            {selectedChat ? (
              <div className="text-center">
                <h2 className="text-lg font-semibold">{selectedChat.name}</h2>
                <p className="text-gray-600">{selectedChat.message}</p>
              </div>
            ) : (
              <div className="text-center">
                <img src={iconContainer} alt="icon" className="w-24 h-24 mb-4 ml-20" />
                <p className="text-gray-500">Click on a contact to view messages.</p>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
                  New Message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;