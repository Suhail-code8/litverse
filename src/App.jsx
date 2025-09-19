import { useContext, useState } from "react";
import "./App.css";
import AuthProvider from "./context/AuthContext";
import ProdProvider from "./context/ProductContext";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import WishList from "./pages/wishlist";
import ProductView from "./pages/productView";
import CheckOut from "./pages/checkout";
import Profile from "./pages/profile";
import { Toaster } from "sonner";
import { Navigate, Route, Routes } from "react-router-dom";
import { Context } from "./context/ProductContext";
import AdmRoutes from "./admin/AdmRoutes";

function App() {
  const { currentUser } = useContext(Context);
  console.log(currentUser);
  
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/productView/:id" element={<ProductView />} />

          {currentUser !=="1"? <Route path="/cart" element={<Cart />} /> : <Route path="*" element={<Navigate to="/"/>} />}
          {currentUser !=="1"?  <Route path="/wishlist" element={<WishList />} /> : <Route path="*" element={<Navigate to="/"/>} />}
          {currentUser !=="1"? <Route path="/checkout" element={<CheckOut />} /> : <Route path="*" element={<Navigate to="/"/>} />}
          {currentUser !=="1"?  <Route path="/profile" element={<Profile />} /> : <Route path="*" element={<Navigate to="/"/>} />}
          {!currentUser? <Route path="/signup" element={<Signup />} /> : <Route path="*" element={<Navigate to="/"/>} />}
          {!currentUser? <Route path="/login" element={<Login />} /> : <Route path="*" element={<Navigate to="/"/>} />}
          <Route path="/admin/*" element={<AdmRoutes />}/>
        </Routes>
      </AuthProvider>

      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
