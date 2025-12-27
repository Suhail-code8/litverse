import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../context/ProductContext";

export default function AdminRoute({ children }) {
  const { currentUser, userData, loading } = useContext(Context);

  // Debug logging
  console.log("AdminRoute - Loading:", loading);
  console.log("AdminRoute - CurrentUser:", currentUser);
  console.log("AdminRoute - UserData:", userData);
  console.log("AdminRoute - Role:", userData?.role);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Check if user is admin
  const isAdmin = currentUser && userData?.role === "admin";
  
  console.log("AdminRoute - isAdmin:", isAdmin);
  
  if (!isAdmin) {
    console.warn("Access denied: Not an admin. Current userData:", userData);
    return <Navigate to="/" replace />;
  }

  return children;
}
