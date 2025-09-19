import React, { useContext, useState } from "react";
import { AdmContext } from "./AdmContext";
import axios from "axios";
import AdminNav from "./AdminNav";

function AdmUsers() {
  const { userList, setUserList } = useContext(AdmContext);
  const API = import.meta.env.VITE_API_URL || "https://litverse-db.onrender.com";

  const [search, setSearch] = useState("");

  async function action(user) {
    await axios.patch(`${API}/users/${user.id}`, { isBlock: !user.isBlock });

    let newList = userList.map((val) =>
      val.id === user.id ? { ...val, isBlock: !val.isBlock } : val
    );
    setUserList(newList);
  }

  // Filtering users by username (for searching)
  const filteredUsers = userList.filter(
    (user) =>
      user.username.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex">
      <AdminNav />
    <div className="flex-1 lg:ml-52 p-6 max-w-6xl mx-auto space-y-6  min-h-screen mt-8">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <h1 className="text-2xl font-bold text-gray-800 text-center">User Management</h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search users..."
          className="px-4 py-2 w-full sm:w-64 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {/* Listing usres */}
      <div className="overflow-x-auto bg-white border rounded-lg shadow">
        <table className="w-full text-sm min-w-[700px]">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Sl:no</th>
              <th className="px-4 py-2 text-left">Username</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Joined</th>
              <th className="px-4 py-2 text-left">Orders</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={user.id}
                className="border-b hover:bg-gray-50 transition duration-150"
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2 font-medium text-gray-800">
                  {user.username}
                </td>
                <td className="px-4 py-2">{user.mail}</td>
                <td className="px-4 py-2 capitalize">{user.role}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 text-sm rounded-full ${
                      user.isBlock
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {user.isBlock ? "Inactive" : "Active"}
                  </span>
                </td>
                <td className="px-4 py-2">{user?.date}</td>
                <td className="px-4 py-2 flex justify-center ">
                    <span className="text-blue-600 font-medium">
                      {user.orders?.length}
                    </span>
                </td>
                <td className="px-4 py-2">
                  <button
                    className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                      user.isBlock
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-red-500 text-white hover:bg-red-600"
                    }`}
                    onClick={() => action(user)}
                  >
                    {user.isBlock ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="text-center py-8 text-gray-500">No users found</div>
        )}
      </div>
    </div>
    </div>
  );
}

export default AdmUsers;
