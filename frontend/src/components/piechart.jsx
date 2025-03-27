// import React from "react";
// import { HiChevronDown } from "react-icons/hi";
// import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";

// export default function EmptyDonutChart() {
//   const data = [{ value: 100 }];

//   return (
//     <div className="w-105 h-90 bg-white p-6 rounded-md shadow-md">
//       <div className="flex gap-40">

//       <h2 className=" font-bold text-gray-900 mb-4 text-medium flex">Marketing</h2>
//       <div>
//         This week      
//       </div>
//       </div>
//       <div className="flex justify-center gap-12  font-small mb-4">
//         <div className="flex items-center space-x-2">
//           <span className=" w-2 h-2 rounded-full bg-red-400 sales"></span>
//           <span className="text-gray-300">sales</span>
//         </div>
//         <div className="flex items-center space-x-2">
//           <span className="w-3 h-3 rounded-full bg-blue-500 In progress"></span>
//           <span className="text-gray-300">In progress</span>
//         </div>
//         <div className="flex items-center space-x-2">
//           <span className="w-3 h-3 rounded-full bg-yellow-500 Completed"></span>
//           <span className="text-gray-300">Completed</span>
//         </div>
//       </div>
//       <ResponsiveContainer width={400} height={300}>
//         <PieChart>
          
//           <Pie
//             data={data}
    
//             innerRadius={50}
//             outerRadius={100}
//             fill="#E0E0E0"
//           >
//           </Pie>
         
//           <Pie
//             data={data}
//             cx="50%"
//             cy="50%"
//             innerRadius={0}
//             outerRadius={50}
//             fill="#E0E0E0"
//             dataKey="value"
//           >
            
//             <Cell fill="#FFFFFF" />
//           </Pie>
//         </PieChart>
//       </ResponsiveContainer>
//       </div>
//   );
// }

import React from "react";
import { PieChart, Pie, ResponsiveContainer, Cell, Legend, Tooltip } from "recharts";

const COLORS = ['#0088FE', '#FFBB28', '#FF8042', '#00C49F'];

export default function InventoryPieChart({ lowStockCount, expiredCount, inStockCount }) {
  const data = [
    { name: 'In Stock', value: inStockCount },
    { name: 'Low Stock', value: lowStockCount },
    { name: 'Expired', value: expiredCount },
  ];

  
  const total = inStockCount + lowStockCount + expiredCount;
  const inStockPercentage = total > 0 ? Math.round((inStockCount / total) * 100) : 0;

  return (
    <div className="w-105 h-90 bg-white p-6 rounded-md shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-gray-900 text-medium">Inventory Status</h2>
        <div className="text-gray-400 text-sm">This Week</div>
      </div>
      
      <div className="flex justify-center gap-4 mb-4">
        {data.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center space-x-2">
            <span 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-gray-500 text-sm">{entry.name}</span>
          </div>
        ))}
      </div>
      
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`${value} items`, 'Count']}
            />
            
            
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}