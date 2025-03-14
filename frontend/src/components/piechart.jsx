import React from "react";
import { HiChevronDown } from "react-icons/hi";
import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";

export default function EmptyDonutChart() {
  const data = [{ value: 100 }];

  return (
    <div className="w-105 h-90 bg-white p-6 rounded-md shadow-md">
      <div className="flex gap-40">

      <h2 className=" font-bold text-gray-900 mb-4 text-medium flex">Marketing</h2>
      <div>
        This week      
      </div>
      </div>
      <div className="flex justify-center gap-12  font-small mb-4">
        <div className="flex items-center space-x-2">
          <span className=" w-2 h-2 rounded-full bg-red-400 acquisition"></span>
          <span className="text-gray-300">Acquisition</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-blue-500 purchase"></span>
          <span className="text-gray-300">Purchase</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-yellow-500 retention"></span>
          <span className="text-gray-300">Retention</span>
        </div>
      </div>
      <ResponsiveContainer width={400} height={300}>
        <PieChart>
          
          <Pie
            data={data}
    
            innerRadius={50}
            outerRadius={100}
            fill="#E0E0E0"
          >
          </Pie>
         
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={0}
            outerRadius={50}
            fill="#E0E0E0"
            dataKey="value"
          >
            
            <Cell fill="#FFFFFF" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      </div>
  );
}