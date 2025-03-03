import React from "react";
import Sidebar from "../components/Sidebar"; 
import Header from "../components/Header"; 
import PieChart from "../components/PieChart"; 
import Card from "../components/Card";
import Cards from "../components/Cards"; 


const Dashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar Navigation */}
      <Sidebar />
      <div className="ml-64 w-[calc(100%-16rem)]">
        {/* Page Header */}
        <Header />
        <div className="p-6">
          {/* Pie Chart Section */}
          <PieChart />
          <div className="mt-8">
            {/* Cards Section */}
            <Cards />
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
