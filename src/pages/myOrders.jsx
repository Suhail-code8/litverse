import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Spinner from "../components/ui/LoaadingSpinner";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const res = await api.get("/api/order/my");
      setOrders(res.data.orders);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Spinner />;

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center">
          <h2 className="text-lg font-semibold">You have no orders yet</h2>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>

        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-5 rounded-lg shadow border"
            >
              <div className="flex justify-between mb-2">
                <p className="font-semibold">Order #{order._id?.slice(-6)}</p>
                <span className="text-sm capitalize text-blue-600">
                  {order.status}
                </span>
              </div>

              <div className="text-sm text-gray-600 mb-3">
                {new Date(order.createdAt).toLocaleDateString()}
              </div>

              <div className="space-y-1">
                {order.items && order.items.map((item) => (
                  <div
                    key={item.book._id}
                    className="flex justify-between text-sm"
                  >
                    <span>
                      {item.book.title} × {item.qty}
                    </span>
                    <span>${(item.book.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <hr className="my-3" />

              <p className="text-right font-bold">
                Total: ${order.total?.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MyOrders;
