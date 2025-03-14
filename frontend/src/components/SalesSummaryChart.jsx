import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ChevronDown } from "lucide-react";

const data = [
  { date: "Sept 10", sales: 90 },
  { date: "Sept 11", sales: 40 },
  { date: "Sept 12", sales: 10 },
  { date: "Sept 13", sales: 50 },
  { date: "Sept 14", sales: 90 },
  { date: "Sept 15", sales: 40 },
  { date: "Sept 16", sales: 85 },
];

const SalesSummaryChart = () => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-500 font-semibold">Summary</h3>
        <div className="flex gap-4">
          <button className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg flex items-center">
            Sales <ChevronDown className="w-4 h-4 ml-1" />
          </button>
          <button className="text-gray-400 flex items-center">
            Last 7 Days <ChevronDown className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>

    
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
          
          
          <XAxis dataKey="date" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          
          
          <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          
         
          <Tooltip cursor={{ fill: "transparent" }} />
          
        
          <Bar dataKey="sales" fill="#D1D5DB" barSize={5} radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesSummaryChart;
