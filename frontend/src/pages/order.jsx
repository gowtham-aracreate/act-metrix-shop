import React from "react";

const OrdersPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 shadow rounded-lg">
        <h1 className="text-xl font-semibold">Orders</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          + Create a New Order
        </button>
      </div>

      {/* Orders Summary (Grouped Cards) */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <GroupedSummaryCard
          title="Orders Overview"
          items={[
            { label: "All Orders", count: 0 },
            { label: "Pending", count: 0 },
            { label: "Completed", count: 0 },
          ]}
        />
        <GroupedSummaryCard
          title="Issues Overview"
          items={[
            { label: "Canceled", count: 0 },
            { label: "Returned", count: 0 },
            { label: "Damaged", count: 0 },
          ]}
        />
        <GroupedSummaryCard
          title="Other Metrics"
          items={[
            { label: "Abandoned Cart", count: 0, highlight: true },
            { label: "Customers", count: 0 },
          ]}
        />
      </div>

      {/* Empty Orders State */}
      <div className="flex flex-col items-center justify-center mt-10 bg-white p-10 shadow-lg rounded-lg">
        <div className="text-gray-400 text-5xl mb-4">🛍️</div>
        <h2 className="text-lg font-semibold">No Orders Yet?</h2>
        <p className="text-gray-500">Add products to your store and start selling to see orders here.</p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-700">
          + New Product
        </button>
      </div>
    </div>
  );
};

// Grouped Summary Card Component
const GroupedSummaryCard = ({ title, items }) => {
  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h3 className="text-gray-700 font-semibold mb-2">{title}</h3>
      {items.map((item, index) => (
        <div
          key={index}
          className={`flex justify-between py-1 ${
            item.highlight ? "text-red-600 font-bold" : "text-gray-600"
          }`}
        >
          <span>{item.label}</span>
          <span className="text-xl font-bold">{item.count}</span>
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;