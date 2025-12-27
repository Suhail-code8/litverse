import React, { useContext, useState, useEffect } from "react";
import { Context } from "../context/ProductContext";
import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import api from "../api/axios";

function Profile() {
  let { currentUser, userData } = useContext(Context);
  const [modalon, setmodalon] = useState(false);
  const [mail, setmail] = useState("");
  const [pass, setPass] = useState("");
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const dateObj = new Date(userData.createdAt)
  const date = dateObj.toDateString()

  useEffect(() => {
    if (currentUser) {
      fetchOrders();
    }
  }, [currentUser]);

  async function fetchOrders() {
    try {
      const res = await api.get("/api/order/my");
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoadingOrders(false);
    }
  }

  async function changePass() {
    if (userData.email === mail) {
      try {
        await api.patch("/api/auth/user", { password: pass });
        alert("Password changed successfully");
        setmodalon(false);
        setmail("");
        setPass("");
      } catch (err) {
        alert("Failed to change password: " + (err?.response?.data?.message || err.message));
      }
    } else {
      alert("Your email doesn't match with the existing one");
    }
  }
  

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentUser && userData ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8 text-white">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold">
                  {userData.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{userData.name}</h1>
                  <p className="text-blue-100 opacity-90">{userData.email}</p>
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="p-6">
              {/* Quick Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Account Status
                  </h3>
                  <div className="flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full mr-2 ${
                        userData.isBlock ? "bg-red-500" : "bg-green-500"
                      }`}
                    ></div>
                    <span className="font-medium">
                      {userData.isBlock ? "Inactive" : "Active"}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Member Since
                  </h3>
                  <p className="font-medium">{date}</p>
                </div>
              </div>

              {/* Account Details */}
              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Account Details
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Full Name</span>
                    <span className="font-medium">{userData.name}</span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Email Address</span>
                    <span className="font-medium">{userData.email}</span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Account Status</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        userData.isBlock
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {userData.isBlock ? "Inactive" : "Active"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Role</span>
                    <span className="font-medium capitalize">{userData.role || "user"}</span>
                  </div>
                  {/* <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Password</span>
                    <button onClick={() => setmodalon(!modalon)} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 w-full sm:w-auto">
                      Change password
                    </button>
                  </div> */}
                </div>
              </div>

              {/* Orders Section */}
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  My Orders
                </h2>

                {loadingOrders ? (
                  <p className="text-gray-500">Loading orders...</p>
                ) : orders && orders.length > 0 ? (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div
                        key={order._id}
                        className="border border-gray-200 rounded-lg shadow-sm bg-white overflow-hidden"
                      >
                        {/* Order Header */}
                        <div className="px-4 py-3 bg-gray-50 flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-500">
                              Order ID: #{order._id?.slice(-6)}
                            </p>
                            <p className="text-xs text-gray-400">
                              Date: {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                order.status === "delivered"
                                  ? "bg-green-100 text-green-800"
                                  : order.status === "shipped"
                                  ? "bg-blue-100 text-blue-800"
                                  : order.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>
                        </div>

                        {/* Products */}
                        <div className="p-4 space-y-4">
                          {
                          order.items && order.items.map((item) => {
                          return(
                            <div
                              key={item.book._id}
                              className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-b-0"
                            >
                              <img
                                src={item.book.image?.url}
                                alt={item.book.title}
                                className="w-16 h-20 object-cover rounded-md"
                              />
                              <div className="flex-1">
                                <h3 className="text-sm font-semibold text-gray-800">
                                  {item.book.title}
                                </h3>
                                <p className="text-xs text-gray-500">
                                  {item.book.author}
                                </p>
                                <p className="text-sm font-medium text-gray-700 mt-1">
                                  ${item.book.price} × {item.qty}
                                </p>
                              </div>
                            </div>
)})}
                        </div>

                        {/* Order Footer */}
                        <div className="px-4 py-3 bg-gray-50 flex justify-between items-center">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Total:</span> ${order.total?.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">You have no orders yet.</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          // Not Logged In State
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-4">
              You are not logged in
            </h2>
            <p className="text-gray-600 mb-6">
              Please log in to view your profile and account details.
            </p>

            <Link
              to="/login"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              Log In
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
            </Link>

            <p className="mt-6 text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Sign up here
              </Link>
            </p>
          </div>
        )}
      </div>
      {modalon && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-2">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-md backdrop-saturate-150"
            onClick={() => setmodalon(false)}
          ></div>

          <div className="relative bg-white rounded-lg p-6 w-full max-w-md shadow-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Change Password</h2>

            <div className="space-y-3">
              <input
                placeholder="Input your email"
                value={mail}
                onChange={(e) => setmail(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
              <input
                placeholder="Enter a new password"
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-end mt-4 gap-2">
              <button
                onClick={() => setmodalon(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={changePass}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 w-full sm:w-auto"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
