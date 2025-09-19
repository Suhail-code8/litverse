import React, { useContext, useState } from "react";
import { AdmContext } from "./AdmContext";
import AdminNav from "./AdminNav";
import axios from "axios";

export default function AdmOrders() {
  const { orderList, setOrderList, userList, setUserList, API } =
    useContext(AdmContext);
  const [filter, setFilter] = useState("All");
  // function to change status
  function getStatus(status, id) {
    let userId = id.slice(0, id.length - 1);
    let newOrderList = userList
      .find((user) => user.id === userId)
      .orders.map((order) =>
        order.id == id[id.length - 1]
          ? { ...order, orderStatus: status }
          : order
      );
    axios.patch(`${API}/users/${userId}`, { orders: newOrderList });
    const updatedOrders = orderList.map((order) => {
      if (order.id === id) {
        return { ...order, orderStatus: status };
      } else {
        return order;
      }
    });
    setOrderList(updatedOrders);
  }

  // setting datas for calculating orders category
  let statusCounts = { pending: 0, shipped: 0, cancelled: 0, delivered: 0 };
  orderList.forEach((order) => {
    if (order.orderStatus === "pending") statusCounts.pending++;
    else if (order.orderStatus === "shipped") statusCounts.shipped++;
    else if (order.orderStatus === "cancelled") statusCounts.cancelled++;
    else if (order.orderStatus === "delivered") statusCounts.delivered++;
  });

  // setting list according to filter
  let filtered = orderList;
  if (filter !== "All") {
    filtered = orderList.filter((o) => o.orderStatus === filter);
  }

  return (
    <div className="flex">
      <AdminNav />
      <div className="flex-1 lg:ml-52 p-6 max-w-6xl mx-auto space-y-8  min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
          <p className="text-gray-500 text-sm">Manage customer orders</p>
        </div>

        {/* Upper boxes for status count */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-lg p-4 text-center shadow-sm bg-yellow-50 text-yellow-700 border border-yellow-200">
            <p className="text-xs uppercase font-medium">Pending</p>
            <p className="text-lg font-bold">{statusCounts.pending}</p>
          </div>
          <div className="rounded-lg p-4 text-center shadow-sm bg-blue-50 text-blue-700 border border-blue-200">
            <p className="text-xs uppercase font-medium">Shipped</p>
            <p className="text-lg font-bold">{statusCounts.shipped}</p>
          </div>
          <div className="rounded-lg p-4 text-center shadow-sm bg-green-50 text-green-700 border border-green-200">
            <p className="text-xs uppercase font-medium">Delivered</p>
            <p className="text-lg font-bold">{statusCounts.delivered}</p>
          </div>
          <div className="rounded-lg p-4 text-center shadow-sm bg-red-50 text-red-700 border border-red-200">
            <p className="text-xs uppercase font-medium">Cancelled</p>
            <p className="text-lg font-bold">{statusCounts.cancelled}</p>
          </div>
        </div>

        {/* filtering option */}
        <div className="flex justify-end">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-blue-300 rounded-md px-3 py-1 text-sm shadow-sm bg-white focus:ring-2 focus:ring-blue-300 focus:border-none "
          >
            <option value="All">All</option>
            <option value="pending">P   ending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* listing orders */}
        <div className="bg-white border rounded-lg overflow-hidden shadow">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-left font-medium">Sl no</th>
                <th className="px-4 py-2 text-left font-medium">Order ID</th>
                <th className="px-4 py-2 text-left font-medium">Date</th>
                <th className="px-4 py-2 text-left font-medium">Total</th>
                <th className="px-4 py-2 text-left font-medium">Status</th>
                <th className="px-4 py-2 text-left font-medium">Products</th>
                <th className="px-4 py-2 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order, i) => (
                <tr
                  key={order.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-2">{i + 1}</td>
                  <td className="px-4 py-2 font-medium">{order.id}</td>
                  <td className="px-4 py-2">{order.date}</td>
                  <td className="px-4 py-2 font-semibold text-gray-800">
                    ${order.total}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.orderStatus === "pending"
                          ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                          : order.orderStatus === "shipped"
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : order.orderStatus === "delivered"
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>

                  <td className="px-4 py-2">
                    <div className="space-y-1">
                      {order.products.map((p) => (
                        <div key={p.id} className="flex items-center gap-2">
                          <img
                            src={p.image}
                            alt={p.title}
                            className="w-8 h-8 rounded object-cover border"
                          />
                          <div>
                            <p className="text-sm font-medium">{p.title}</p>
                            <p className="text-xs text-gray-500">${p.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <select
                      value={order.orderStatus}
                      onChange={(e) => getStatus(e.target.value, order.id)}
                      className="border rounded px-2 py-1 text-xs bg-white focus:ring-2 focus:ring-blue-300"
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No orders found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
