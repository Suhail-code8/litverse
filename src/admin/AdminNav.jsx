import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { LogOut, Menu, X } from "lucide-react";
import { Context } from "../context/ProductContext";
import api from "../api/axios";

function AdminNav() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
    const { setCurrentUser } = useContext(Context);


  async function logout() {
    await api.post('/api/auth/logout')
    localStorage.clear();
    setCurrentUser(null);
    navigate("/login");
    toast.error("Signed out from your account", { duration: 1000 });
    setIsOpen(false); 
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white shadow-md rounded-md"
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/*body of sidebar  */}
      <div
        className={`fixed top-16 left-0 z-40 w-52 h-full bg-white shadow-md transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex flex-col p-4 space-y-2">
          <Link
            to="/admin"
            className="text-sm font-medium text-gray-600 hover:text-blue-600 p-2 rounded-md"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/admin/admusers"
            className="text-sm font-medium text-gray-600 hover:text-blue-600 p-2 rounded-md"
            onClick={() => setIsOpen(false)}
          >
            Users
          </Link>
          <Link
            to="/admin/admproducts"
            className="text-sm font-medium text-gray-600 hover:text-blue-600 p-2 rounded-md"
            onClick={() => setIsOpen(false)}
          >
            Products
          </Link>
          <Link
            to="/admin/admorders"
            className="text-sm font-medium text-gray-600 hover:text-blue-600 p-2 rounded-md"
            onClick={() => setIsOpen(false)}
          >
            Orders
          </Link>
          <button
            onClick={logout}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 p-2 rounded-md"
            title="Logout"
          >
            <LogOut size={20} />
            <span className="text-sm font-medium hidden lg:block">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default AdminNav;
