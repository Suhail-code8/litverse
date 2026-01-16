import React, { useContext, useState } from "react";
import { AdmContext } from "./AdmContext";
import AdminNav from "./AdminNav";
import api from "../api/axios";
import { toast } from "sonner";

export default function AdmOrders() {
  const { orderList, setOrderList, fetchAdmData } = useContext(AdmContext);
  const [filter, setFilter] = useState("All");

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await api.patch(`/api/order/${orderId}`, { status: newStatus });
      // Updating frontend
      const updated = orderList.map((order) =>
        order._id === orderId ? res.data.order : order
      );
      setOrderList(updated);
      try {
        await fetchAdmData();
      } catch (e) {
        console.warn("AdmOrders: fetchAdmData after status update failed", e);
      }
      toast.success("Order status updated!");
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to update order status";
      toast.error(msg);
      console.error("Update status error:", err);
    }
  };

  // Calculate status counts
  let statusCounts = { pending: 0, shipped: 0, cancelled: 0, delivered: 0 };
  orderList.forEach((order) => {
    const status = order.status?.toLowerCase() || "pending";
    if (status === "pending") statusCounts.pending++;
    else if (status === "shipped") statusCounts.shipped++;
    else if (status === "cancelled") statusCounts.cancelled++;
    else if (status === "delivered") statusCounts.delivered++;
  });

  // Filter orders
  let filtered = orderList;
  if (filter !== "All") {
    filtered = orderList.filter((o) => (o.status?.toLowerCase() || "pending") === filter.toLowerCase());
  }

  return (
    <div className="flex">
      <AdminNav />
      <div className="flex-1 lg:ml-52 p-4 sm:p-6 max-w-6xl mx-auto w-full space-y-6 sm:space-y-8 min-h-screen mt-8 lg:mt-0">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Orders</h1>
          <p className="text-gray-500 text-xs sm:text-sm">Manage customer orders</p>
        </div>

        {/* Upper boxes for status count */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="rounded-lg p-3 sm:p-4 text-center shadow-sm bg-yellow-50 text-yellow-700 border border-yellow-200">
            <p className="text-xs font-medium uppercase">Pending</p>
            <p className="text-xl sm:text-2xl font-bold mt-1">{statusCounts.pending}</p>
          </div>
          <div className="rounded-lg p-3 sm:p-4 text-center shadow-sm bg-blue-50 text-blue-700 border border-blue-200">
            <p className="text-xs font-medium uppercase">Shipped</p>
            <p className="text-xl sm:text-2xl font-bold mt-1">{statusCounts.shipped}</p>
          </div>
          <div className="rounded-lg p-3 sm:p-4 text-center shadow-sm bg-green-50 text-green-700 border border-green-200">
            <p className="text-xs font-medium uppercase">Delivered</p>
            <p className="text-xl sm:text-2xl font-bold mt-1">{statusCounts.delivered}</p>
          </div>
          <div className="rounded-lg p-3 sm:p-4 text-center shadow-sm bg-red-50 text-red-700 border border-red-200">
            <p className="text-xs font-medium uppercase">Cancelled</p>
            <p className="text-xl sm:text-2xl font-bold mt-1">{statusCounts.cancelled}</p>
          </div>
        </div>

        {/* filtering option */}
        <div className="flex justify-end">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-blue-300 rounded-md px-3 py-2 text-xs sm:text-sm shadow-sm bg-white focus:ring-2 focus:ring-blue-300 focus:border-none"
          >
            <option value="All">All</option>
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* listing orders */}
        <div className="bg-white border rounded-lg overflow-hidden shadow">
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm min-w-[600px]">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left font-medium">Sl no</th>
                  <th className="px-4 py-2 text-left font-medium">Order ID</th>
                  <th className="px-4 py-2 text-left font-medium">Date</th>
                  <th className="px-4 py-2 text-left font-medium">Total</th>
                  <th className="px-4 py-2 text-left font-medium">Status</th>
                  <th className="px-4 py-2 text-left font-medium">Items</th>
                  <th className="px-4 py-2 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((order, i) => (
                  <tr
                    key={order._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-2">{i + 1}</td>
                    <td className="px-4 py-2 font-medium text-blue-600">{order._id?.slice(-6) || "N/A"}</td>
                    <td className="px-4 py-2">{new Date(order.createdAt).toLocaleDateString() || "N/A"}</td>
                    <td className="px-4 py-2 font-semibold text-gray-800">
                      ₹{order.totalAmount || order.total || 0}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          (order.status?.toLowerCase() || "pending") === "pending"
                            ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                            : (order.status?.toLowerCase() || "pending") === "shipped"
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : (order.status?.toLowerCase() || "pending") === "delivered"
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                        }`}
                      >
                        {order.status || "Pending"}
                      </span>
                    </td>

                    <td className="px-4 py-2">
                      <div className="space-y-1">
                        {order.items?.map((item) => (
                          <div key={item._id} className="text-sm">
                            <p className="font-medium">{item.book?.title || "Unknown"}</p>
                            <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <select
                        value={order.status || "pending"}
                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
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
          </div>

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
