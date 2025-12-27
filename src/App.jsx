import { useContext, useState } from "react";
import "./App.css";
import AuthProvider from "./context/AuthContext";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import WishList from "./pages/wishlist";
import ProductView from "./pages/productView";
import CheckOut from "./pages/checkout";
import Profile from "./pages/profile";
import MyOrders from "./pages/myOrders";
import { Toaster } from "sonner";
import { Navigate, Route, Routes } from "react-router-dom";
import { Context } from "./context/ProductContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import AdmRoutes from "./admin/AdmRoutes";
import ForgotPassword from "./pages/forgotPassword";
import ResetPassword from "./pages/resetPass";

function App() {
  const { currentUser, userData } = useContext(Context);

  return (
    <div>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/productView/:id" element={<ProductView />} />

          {/* User must be logged in to access these routes*/}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <WishList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckOut />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myOrders"
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />

          {/* Only accessible in logged out state */}
          <Route
            path="/signup"
            element={
              currentUser ? (
                userData?.role === "admin" ? (
                  <Navigate to="/admin" replace />
                ) : (
                  <Navigate to="/" replace />
                )
              ) : (
                <Signup />
              )
            }
          />
          <Route
            path="/login"
            element={
              currentUser ? (
                userData?.role === "admin" ? (
                  <Navigate to="/admin" replace />
                ) : (
                  <Navigate to="/" replace />
                )
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/forgot-password"
            element={
              currentUser ? <Navigate to="/" replace /> : <ForgotPassword />
            }
          />

          <Route
            path="/reset-password/:token"
            element={
              currentUser ? <Navigate to="/" replace /> : <ResetPassword />
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <AdminRoute>
                <AdmRoutes />
              </AdminRoute>
            }
          />

          {/* Catch-all - 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>

      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
