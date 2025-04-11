import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { FaRegPaperPlane } from "react-icons/fa";
import { HiOutlineChatBubbleLeft } from "react-icons/hi2";
import Sidebar from "../layout/Sidebar";
import axios from "axios";
import { format } from "date-fns";

const config = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};


const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);



  // Fetch customers and conversations
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [customersRes, conversationsRes] = await Promise.all([
          axios.get("http://localhost:3000/customers", config()),
          axios.get("http://localhost:3000/api/conversations", config())
        ]);
        setCustomers(customersRes.data);
        setConversations(conversationsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Fetch messages when a chat is selected
  useEffect(() => {
    if (selectedChat) {
      const fetchMessages = async () => {
        try {
          const res = await axios.get(`http://localhost:3000/api/conversations/${selectedChat._id}`, config());
          setMessages(res.data.messages || []);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };
      fetchMessages();
    }
  }, [selectedChat]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return;
    const tempId = Date.now();
    try {
      // Optimistically update UI
      const tempId = Date.now();
      const tempMessage = {
        _id: tempId,
        sender: "user",
        content: newMessage,
        timestamp: new Date()
      };

      setMessages([...messages, tempMessage]);
      setNewMessage("");

      // Send to server
      await axios.post(`http://localhost:3000/api/conversations/${selectedChat._id}`, {
        content: newMessage,
        sender: "user"
      }, config());

      // Refresh messages to get server timestamp
      const res = await axios.get(`http://localhost:3000/api/conversations/${selectedChat._id}`, config());
      setMessages(res.data.messages || []);

      // Update conversation list
      const convRes = await axios.get("http://localhost:3000/api/conversations", config());
      setConversations(convRes.data);
    } catch (error) {
      console.error("Error sending message:", error);
      // Revert optimistic update if failed
      setMessages(messages.filter(msg => msg._id !== tempId));
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MMM d, yyyy");
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return format(date, "h:mm a");
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-white shadow-md">
        <Sidebar 
        title="Conversations"/>
      </div>

      <div className="flex flex-1">
        {/* Contacts/Conversations sidebar */}
        <div className="w-1/3 bg-white p-4 shadow-md mt-20 bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">Contacts</h2>
          <div className="relative mb-4">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              className="w-full pl-10 pr-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Recent Conversations */}
          {conversations.length > 0 && (
            <>
              <h3 className="text-md font-medium mb-2 text-gray-600">Recent Chats</h3>
              <ul className="mb-4">
                {conversations.map((conv) => (
                  <li
                    key={conv._id}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-100 ${selectedChat?._id === conv.customerId._id ? "bg-blue-50" : ""
                      }`}
                    onClick={() => setSelectedChat(conv.customerId)}
                  >
                    <div>
                      <h3 className="text-md font-semibold">{conv.customerId.name}</h3>
                      <p className="text-sm text-gray-500 truncate">
                        {conv.messages[conv.messages.length - 1]?.content || "No messages yet"}
                      </p>
                    </div>
                    <span className="text-xs text-gray-400">
                      {formatTime(conv.lastUpdated)}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}


          {searchTerm && (
            <ul className="absolute z-50 left-70 right-220 top-45 bg-white border mt-1 rounded-lg shadow-lg  overflow-y-auto">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <li
                    key={customer._id}
                    className="p-3 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedChat(customer);
                      setSearchTerm("");
                    }}
                  >
                    <div>
                      <h3 className="text-md font-semibold">{customer.name}</h3>
                      <p className="text-sm text-gray-500">{customer.email}</p>
                    </div>
                  </li>
                ))
              ) : (
                <li className="p-3 text-sm text-gray-400">No matching customers</li>
              )}
            </ul>
          )}
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col bg-white p-6 shadow-lg">
          {selectedChat ? (
            <>
              {/* Chat header */}
              <div className="flex items-center justify-between pt-12 bg border-b">
                <div>
                  <h2 className="text-lg font-semibold">{selectedChat.name}</h2>
                  <p className="text-sm text-gray-500">{selectedChat.email}</p>
                </div>
                <span className="text-sm text-green-500">Online</span>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-auto p-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    No messages yet. Start the conversation!
                  </div>
                ) : (
                  messages.map((message, index) => {
                    // Group messages by date
                    const showDate = index === 0 ||
                      formatDate(messages[index - 1].timestamp) !== formatDate(message.timestamp);

                    return (
                      <React.Fragment key={message._id || index}>
                        {showDate && (
                          <div className="text-center text-gray-500 text-xs my-2">
                            {formatDate(message.timestamp)}
                          </div>
                        )}
                        <div
                          className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"
                            }`}
                        >
                          <div
                            className={`p-3 rounded-lg max-w-xs ${message.sender === "user"
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200"
                              }`}
                          >
                            <p>{message.content}</p>
                            <span
                              className={`text-xs block mt-1 ${message.sender === "user"
                                ? "text-blue-200"
                                : "text-gray-500"
                                }`}
                            >
                              {formatTime(message.timestamp)}
                            </span>
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })
                )}
              </div>

              {/* Message input */}
              <div className="flex items-center border-t pt-3 bg-gray-50 p-2 rounded-lg">
                <input
                  type="text"
                  className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <button
                  className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center hover:bg-blue-600"
                  onClick={handleSendMessage}
                >
                  <FaRegPaperPlane className="w-5 h-5" />
                </button>
              </div>
            </>
          ) : (
            // Empty state
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <HiOutlineChatBubbleLeft className="text-6xl mb-4 text-gray-300" />
              <p className="text-lg font-semibold">Messages</p>
              <p className="text-sm">Select a customer to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;