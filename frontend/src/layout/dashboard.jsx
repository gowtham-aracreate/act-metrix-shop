import React from "react";
import Sidebar from "../components/Sidebar"; 
import Header from "../components/Header"; 
import PieChartComponent from "../components/piechart"; 
import Card from "../components/Card";
import  Cards from "../components/Cards";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full">
        <Header />
        <div className="p-6 mt-16">
          <PieChartComponent /> 
          <div className="mt-8">
            <Card />
          </div>
          <div>
            <Cards />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;