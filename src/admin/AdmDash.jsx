import React, { Children, useContext } from "react";
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
  const { userList, productList, orderList } = useContext(AdmContext);

  const totalRevenue = orderList.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );

  // Chart data
  const orderStatusData = [
    {
      name: "Delivered",
      value: orderList.filter((o) => o.orderStatus === "delivered").length,
    },
    {
      name: "Shipped",
      value: orderList.filter((o) => o.orderStatus === "shipped").length,
    },
    {
      name: "Cancelled",
      value: orderList.filter((o) => o.orderStatus === "cancelled").length,
    },
    {
      name: "Pending",
      value: orderList.filter((o) => o.orderStatus === "pending").length,
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

  const productsCount = Object.keys(productsBycategory).map((key) => ({
    name: key,
    productsno: productsBycategory[key],
  }));

  const COLORS = ["#22c55e", "#3b82f6", "#ef4444", "#facc15", "#8b5cf6"];

  return (
    <div className="flex">
      <AdminNav />
      <div className="flex-1 lg:ml-52  p-6 max-w-7xl mx-auto space-y-8 bg-gray-50 min-h-screen mt-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 text-sm">
            Overview of users, products, orders, and revenue
          </p>
        </div>

        {/* Above boxes of status*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <h2 className="text-lg font-semibold text-gray-700">Users</h2>
            <p className="text-2xl font-bold text-blue-600">
              {userList.length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <h2 className="text-lg font-semibold text-gray-700">Products</h2>
            <p className="text-2xl font-bold text-green-600">
              {productList.length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <h2 className="text-lg font-semibold text-gray-700">Orders</h2>
            <p className="text-2xl font-bold text-yellow-600">
              {orderList.length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <h2 className="text-lg font-semibold text-gray-700">Revenue</h2>
            <p className="text-2xl font-bold text-purple-600">
              ${totalRevenue.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
          {/* Pei chart for orders */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Orders by Status
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {orderStatusData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Products By category*/}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Products by Category
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productsCount}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="productsno" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
