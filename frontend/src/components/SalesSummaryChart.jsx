import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ChevronDown } from "lucide-react";
import axios from "axios";

const config = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const SalesSummaryChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("week");
  const [showDropdown, setShowDropdown] = useState(false);

  const timeRangeOptions = [
    { value: "week", label: "Last Week" },
    { value: "month", label: "Last Month" },
    { value: "year", label: "Last Year" },
    { value: "7", label: "Last 7 Days" },
    { value: "30", label: "Last 30 Days" },
  ];

  const getDaysFromRange = (range) => {
    switch (range) {
      case "week": return 7;
      case "month": return 30;
      case "year": return 365;
      default: return parseInt(range);
    }
  };

  const fetchSalesData = async () => {
    try {
      setLoading(true);
      const days = getDaysFromRange(timeRange);
      const response = await axios.get(
        `http://localhost:3000/api/inventory/sales-summary?days=${days}`,
        config()
      );

      // Format the date for display
      const formattedData = response.data.map(entry => ({
        ...entry,
        date: new Date(entry.date).toLocaleDateString("en-US", {
          month: "short", day: "numeric"
        })
      }));

      setChartData(formattedData);
    } catch (err) {
      console.error("Error fetching sales data:", err);
      setChartData([]);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchSalesData();

  }, [timeRange]);

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    setShowDropdown(false);
  };

  const getDisplayLabel = () => {
    const option = timeRangeOptions.find(opt => opt.value === timeRange);
    return option ? option.label : "Select Range";
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-500 font-semibold">Sales Summary</h3>
        <div className="flex gap-4">
          <button className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg flex items-center">
            Sales <ChevronDown className="w-4 h-4 ml-1" />
          </button>
          <div className="relative">
            <button
              className="text-gray-400 flex items-center"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {getDisplayLabel()}
              <ChevronDown className="w-4 h-4 ml-1" />
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                {timeRangeOptions.map((option) => (
                  <button
                    key={option.value}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${timeRange === option.value ? "bg-blue-50 text-red-600" : "text-gray-700"
                      }`}
                    onClick={() => handleTimeRangeChange(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="h-[300px] flex items-center justify-center">
          <div className="animate-pulse text-gray-400">Loading sales data...</div>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData.length > 0 ? chartData : [{ date: "No Data", sales: 0 }]}
            margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
          >
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              formatter={(value) => [`${value}`, "Sales"]}
            />
            <Bar
              dataKey="sales"
              fill={chartData.length > 0 ? "blue" : "#e5e7eb"} // gray if no sales
              barSize={10}
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default SalesSummaryChart;