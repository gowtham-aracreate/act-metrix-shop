import React from "react";
import Sidebar from "./Sidebar"; 
import Header from "./Header"; 
import PieChartComponent from "../components/piechart"; 
import { Card } from "../components/Card"; 
import Cards from "../components/Cards";

const Dashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar Navigation */}
      <Sidebar />
      <div className="ml-64">
        <Header />
        <div className="p-6 mt-16">
          <PieChartComponent /> 
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
