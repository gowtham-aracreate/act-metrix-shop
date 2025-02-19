import React from "react";

const customers = [
  {
    name: "Janet Adebayo",
    email: "janet.a@mail.com",
    phone: "+2348065650633",
    orders: 10,
    orderTotal: "₦250,000.00",
    customerSince: "12 Aug 2022 - 12:25 am",
    status: "Active",
  },
  // Add more customer objects as needed
];

const CustomersPage = () => {
  return (
    <div className="p-4">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Customers</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Add a New Customer</button>
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-4 gap-4 my-6">
        {[
          { label: "All Customers", value: "1,250", change: "+15.80%" },
          { label: "Active", value: "1,180", change: "+85%" },
          { label: "In-Active", value: "70", change: "-10%" },
          { label: "New Customers", value: "30", change: "-20%" },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-gray-100 p-4 rounded-lg shadow-md text-center"
          >
            <h2 className="text-lg font-semibold">{item.label}</h2>
            <p className="text-xl font-bold">{item.value}</p>
            <p className={`text-sm ${item.change.includes("-") ? "text-red-500" : "text-green-500"}`}>
              {item.change}
            </p>
          </div>
        ))}
      </div>

      {/* Customers Table */}
      <table className="w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Customer Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Phone</th>
            <th className="p-2 text-left">Orders</th>
            <th className="p-2 text-left">Order Total</th>
            <th className="p-2 text-left">Customer Since</th>
            <th className="p-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index} className="border-b">
              <td className="p-2">{customer.name}</td>
              <td className="p-2">{customer.email}</td>
              <td className="p-2">{customer.phone}</td>
              <td className="p-2">{customer.orders}</td>
              <td className="p-2">{customer.orderTotal}</td>
              <td className="p-2">{customer.customerSince}</td>
              <td className="p-2">
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                  {customer.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p>Showing 1-10 of 44 pages</p>
        <div>
          <button className="px-4 py-2 bg-gray-200 rounded-l-lg">Previous</button>
          <button className="px-4 py-2 bg-gray-200 rounded-r-lg">Next</button>
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;
