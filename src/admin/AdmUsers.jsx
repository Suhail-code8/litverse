import React, { useContext, useState } from "react";
import { AdmContext } from "./AdmContext";
import api from "../api/axios";
import AdminNav from "./AdminNav";
import { toast } from "sonner";

function AdmUsers() {
  const { userList, setUserList, fetchAdmData } = useContext(AdmContext);
  const [search, setSearch] = useState("");

  async function toggleBlockUser(user) {
    try {
      const res = await api.patch(`/api/users/${user._id}`, { isBlocked: !user.isBlocked });
      // Updating frontend
      const newList = userList.map((u) =>
        u._id === user._id ? res.data.user : u
      );
      setUserList(newList);
      // Refresh from backend
      try {
        await fetchAdmData();
      } catch (e) {
        console.warn("AdmUsers: fetchAdmData after toggle failed", e);
      }
      toast.success(`User ${!user.isBlocked ? "blocked" : "unblocked"}!`);
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to update user";
      toast.error(msg);
      console.error("Toggle block error:", err);
    }
  }

  // Filtering users by name or email
  const filteredUsers = userList.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

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
      {/* Listing users */}
      <div className="overflow-x-auto bg-white border rounded-lg shadow">
        <table className="w-full text-sm min-w-[700px]">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Sl:no</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Joined</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={user._id}
                className="border-b hover:bg-gray-50 transition duration-150"
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2 font-medium text-gray-800">
                  {user.name}
                </td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2 capitalize">{user.role}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 text-sm rounded-full ${
                      user.isBlocked
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {user.isBlocked ? "Blocked" : "Active"}
                  </span>
                </td>
                <td className="px-4 py-2">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-2">
                  <button
                    className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                      user.isBlocked
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-red-500 text-white hover:bg-red-600"
                    }`}
                    onClick={() => toggleBlockUser(user)}
                  >
                    {user.isBlocked ? "Unblock" : "Block"}
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
