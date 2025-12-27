import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/ProductContext";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api from "../api/axios";
import Spinner from "../components/ui/LoaadingSpinner";
import {
  MapPin,
  Mail,
  Phone,
  Home,
  Lock,
  CheckCircle,
  ShoppingCart,
} from "lucide-react";

function CheckOut() {
  const [loading, setLoading] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const [address, setAddress] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    pin: "",
  });

  let location = useLocation();
  const navigate = useNavigate();

  const {
    userData,
    setUserData,
    orderedBooks,
    currentUser,
    userOrders,
    setUserOrders,
    isSingle,
    setIsSingle,
    product,
    productList,
    setProductList,
    setUserCart,
  } = useContext(Context);
  const API = import.meta.env.VITE_API_URL || "http://localhost:4000";
  const [paymentMethod, setPaymentMethod] = useState("cod");

  function loadRazorpayScript() {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  let summary = location?.state;
  const subTotal = summary?.subTotal;
  const shipping = `₹${summary?.shipping}`;
  const discount = summary?.discount;
  const total = summary?.total;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spinner />
      </div>
    );
  }

  function getAddress(e) {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  }

  function submitfn(e) {
    e.preventDefault();
    setIsSubmit(true);
    toast.success("address added");
  }

  async function confirmOrder() {
    if (!isSubmit) {
      toast.warning("Add your address before placing order");
      return;
    }

    if (paymentMethod === "cod") {
      // COD PAYMENT
      try {
        if (isSingle && product) {
          const bookId = product._id || product.id;
          try {
            await api.post("/api/cart", { bookId });
          } catch {}
        }

        const res = await api.post("/api/order", {
          paymentMethod: "cod",
          paymentStatus: "pending",
          address,
        });

        setUserOrders((prev) => [...prev, res.data.order]);
        setUserCart([]);
        setIsSubmit(false);
        setIsSingle(false);

        toast.success("Order placed with Cash on Delivery");
        navigate("/");
      } catch (err) {
        toast.error("Failed to place order");
      }
    }
    if (paymentMethod === "razorpay") {
      try {
        // load Razorpay script
        const loaded = await loadRazorpayScript();
        if (!loaded) {
          toast.error("Razorpay SDK failed to load");
          return;
        }

        // If single product purchase, ensure cart has item
        if (isSingle && product) {
          const bookId = product._id || product.id;
          try {
            await api.post("/api/cart", { bookId });
          } catch (err) {
            console.log("Item may already be in cart");
          }
        }

        // create Razorpay order 
        const { data } = await api.post("/api/payment/create-order", {
          amount: Number(total),
        });

        const razorpayOrder = data.order;

        // STEP 2: open Razorpay checkout
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: razorpayOrder.amount,
          currency: "INR",
          name: "LitVerse",
          description: "Book Purchase",
          order_id: razorpayOrder.id,
          handler: async function (response) {
            try {
              const verifyRes = await api.post("/api/payment/verify", {
                ...response,
                single: isSingle,
                bookId: product?._id,
                address,
              });

              setUserOrders((prev) => [...prev, verifyRes.data.order]);
              setUserCart([]);
              setIsSubmit(false);
              setIsSingle(false);

              toast.success("Payment successful & order placed");
              navigate("/");
            } catch (err) {
              toast.error("Order creation failed after payment");
              console.error(err);
            }
          },
          prefill: {
            name: address.username,
            email: address.email,
            contact: address.phone,
          },
          theme: {
            color: "#4f46e5",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (err) {
        toast.error("Payment initiation failed");
        console.error(err);
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white px-4 md:px-6 py-8 md:py-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingCart className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Checkout
            </h1>
          </div>
          <p className="text-gray-600">Complete your purchase securely</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Delivery Address Form */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-gray-200 shadow-lg bg-white p-6 md:p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Delivery Address
                </h2>
              </div>

              <form onSubmit={submitfn} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      type="text"
                      name="username"
                      placeholder="John Doe"
                      value={address.username}
                      onChange={getAddress}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={address.email}
                      onChange={getAddress}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    type="tel"
                    name="phone"
                    placeholder="+91 98765 43210"
                    value={address.phone}
                    onChange={getAddress}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Street Address
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    type="text"
                    name="address"
                    placeholder="123 Main Street, Apt 4B"
                    value={address.address}
                    onChange={getAddress}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Postal Code
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    type="text"
                    name="pin"
                    placeholder="110001"
                    maxLength="6"
                    value={address.pin}
                    onChange={getAddress}
                    required
                  />
                </div>

                <button
                  className={`w-full font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                    isSubmit
                      ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                      : "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:shadow-lg"
                  }`}
                  type="submit"
                >
                  {isSubmit ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Address Added
                    </>
                  ) : (
                    <>
                      <Home className="w-5 h-5" />
                      Add Address
                    </>
                  )}
                </button>

                {isSubmit && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-700 font-medium">
                      ✓ Address saved successfully
                    </p>
                  </div>
                )}
              </form>

              {/* Payment Method */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                  <Lock className="w-6 h-6 text-indigo-600" />
                  <h3 className="text-xl font-bold text-gray-900">
                    Payment Method
                  </h3>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-4 p-4 border-2 border-gray-300 rounded-xl cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                    />
                    <div>
                      <p className="font-semibold text-gray-900">
                        Cash on Delivery
                      </p>
                      <p className="text-sm text-gray-600">
                        Pay when your order arrives
                      </p>
                    </div>
                  </label>

                  <label className="flex items-center gap-4 p-4 border-2 border-gray-300 rounded-xl cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "razorpay"}
                      onChange={() => setPaymentMethod("razorpay")}
                    />
                    <div>
                      <p className="font-semibold text-gray-900">
                        Online Payment
                      </p>
                      <p className="text-sm text-gray-600">
                        UPI / Card / Netbanking
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary & Confirm */}
          <div className="lg:col-span-1">
            {/* Order Summary */}
            <div className="rounded-2xl border border-gray-200 shadow-lg bg-white p-6 md:p-8 sticky top-20 hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    ₹{subTotal}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Shipping</span>
                  <span className="font-semibold text-gray-900">
                    {shipping}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Discount</span>
                  <span className="font-semibold text-green-600">
                    -₹{discount}
                  </span>
                </div>
              </div>

              <div className="border-t-2 border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-indigo-600">
                    ₹{total}
                  </span>
                </div>
              </div>

              <button
                onClick={confirmOrder}
                disabled={!isSubmit}
                className={`w-full font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                  isSubmit
                    ? "bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {isSubmit ? "Place Order" : "Add Address First"}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By placing this order, you agree to our terms and conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
