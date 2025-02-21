import React from "react";
import Sidebar from "../components/Sidebar"; 
import Header from "../components/Header"; 
const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full">
        <Header />
        <div className="p-6 mt-16">
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;