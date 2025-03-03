import React from "react";
import Header from "../components/Header";  
import Sidebar from "../components/Sidebar"; 

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      
      <Sidebar />


      <div className="flex-1 flex flex-col bg-gray-100">
        
        <Header />

        
        <div className="p-6 mt-16 ml-64">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
