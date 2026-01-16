import React, { useContext } from "react";
import { AdmContext } from "./AdmContext";
import AdminNav from "./AdminNav";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function AdmDash() {
  const { userList, productList, orderList, stats } = useContext(AdmContext);

  const totalRevenue = stats.revenue || orderList.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );

  const usersCount = stats.usersCount || userList.length;
  const productsCount = stats.productsCount || productList.length;
  const ordersCount = stats.ordersCount || orderList.length;

  // Chart data
  const orderStatusData = [
    {
      name: "Delivered",
      value: orderList.filter((o) => o.status === "delivered").length,
    },
    {
      name: "Shipped",
      value: orderList.filter((o) => o.status === "shipped").length,
    },
    {
      name: "Cancelled",
      value: orderList.filter((o) => o.status === "cancelled").length,
    },
    {
      name: "Pending",
      value: orderList.filter((o) => o.status === "pending").length,
    },
  ];

  let productsBycategory = productList.reduce(
    (acc, p) => {
      const cat = p.category;
      if (cat === "Fiction" || cat === "Non-Fiction" || cat === "Children's") {
        acc[cat] = (acc[cat] || 0) + 1;
      } else {
        acc["Other"] = (acc["Other"] || 0) + 1;
      }
      return acc;
    },
    {
      "Fiction": 0,
      "Non-Fiction": 0,
      "Children's": 0,
      "Other": 0,
    }
  );

  const productsCategoryData = Object.keys(productsBycategory).map((key) => ({
    name: key,
    productsno: productsBycategory[key],
  }));

  const COLORS = ["#22c55e", "#3b82f6", "#ef4444", "#facc15", "#8b5cf6"];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <AdminNav />
      <div className="flex-1 lg:ml-52 p-4 sm:p-6 max-w-7xl mx-auto w-full space-y-6 sm:space-y-8 bg-gray-50 min-h-screen mt-8 lg:mt-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 text-xs sm:text-sm">
            Overview of users, products, orders, and revenue
          </p>
        </div>

        {/* Stat boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow text-center">
            <h2 className="text-sm sm:text-lg font-semibold text-gray-700">Users</h2>
            <p className="text-2xl sm:text-3xl font-bold text-blue-600 mt-2">
              {usersCount}
            </p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow text-center">
            <h2 className="text-sm sm:text-lg font-semibold text-gray-700">Products</h2>
            <p className="text-2xl sm:text-3xl font-bold text-green-600 mt-2">
              {productsCount}
            </p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow text-center">
            <h2 className="text-sm sm:text-lg font-semibold text-gray-700">Orders</h2>
            <p className="text-2xl sm:text-3xl font-bold text-yellow-600 mt-2">
              {ordersCount}
            </p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow text-center">
            <h2 className="text-sm sm:text-lg font-semibold text-gray-700">Revenue</h2>
            <p className="text-2xl sm:text-3xl font-bold text-purple-600 mt-2">
              ₹{totalRevenue.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Pie chart for orders */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-4">
              Orders by Status
            </h3>
            <div className="w-full h-80 sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orderStatusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={{ fontSize: 12 }}
                  >
                    {orderStatusData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart for Products by Category */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-4">
              Products by Category
            </h3>
            <div className="w-full h-80 sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productsCategoryData}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="productsno" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
