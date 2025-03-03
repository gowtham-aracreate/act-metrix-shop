import React from "react";
import Sidebar from "../components/Sidebar"; 
import Header from "../components/Header"; 
import { PieChart } from "../components/PieChart";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full">
        <Header />
        <div className="p-10">
          <PieChart/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;













