import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/ProductContext";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import Spinner from "../components/ui/LoaadingSpinner";

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
    API,
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

async  function confirmOrder() {
    if(!isSubmit){
      toast.warning("Add your address before placing order")
      return;}
    let id =
      userOrders?.length > 0
        ? (Number(userOrders[userOrders.length - 1]?.id) + 1).toString()
        : "1";

   let  res = await axios.patch(`${API}/users/${currentUser}`, {
      orders: [
        ...userOrders,
        { 
          id: id,
          orderStatus: "pending",
          date: new Date().toLocaleDateString(),
          total: summary.total,
          address: address,
          products: isSingle ? [product] : orderedBooks,
        },
      ],
    });
    setUserData(res.data)

    if (!isSingle) {
      for (let x of orderedBooks) {
        let book = productList.find((val) => x.id === val.id);
        if (book) {
          axios
            .patch(`${API}/books/${book.id}`, {
              stock: book.stock - x.cartCount,
            })
            .then(() => setProductList([...productList]));
        }
      }
      axios
        .patch(`${API}/users/${currentUser}`, { cart: [] })
        .then(() => setUserCart([]));
    } else {
      axios
        .patch(`${API}/books/${product.id}`, { stock: product.stock - 1 })
        .then(() => setProductList([...productList]));
    }

    toast.success("Order Placed");
    setIsSubmit(false);
    setIsSingle(false);

    navigate("/");
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="rounded-2xl border border-gray-200 shadow-md bg-white p-6">
          <form onSubmit={submitfn} className="space-y-4">
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-none "
              type="text"
              name="username"
              placeholder="username"
              value={address.username}
              onChange={getAddress}
              required
            />{" "}
            <br />
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-none"
              type="email"
              name="email"
              placeholder="email"
              value={address.email}
              onChange={getAddress}
              required
            />{" "}
            <br />
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-none"
              type="tel"
              name="phone"
              placeholder="contact number"
              value={address.phone}
              onChange={getAddress}
              required
            />{" "}
            <br />
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-none"
              type="text"
              name="address"
              placeholder="address"
              value={address.address}
              onChange={getAddress}
              required
            />{" "}
            <br />
            <input
              className="w-full px-4 py-2 border border-gray-300  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-none"
              type="text"
              name="pin"
              placeholder="pin"
              value={address.pin}
              onChange={getAddress}
              required
            />{" "}
            <br />
            <button
              className="w-full bg-blue-600 text-white font-medium  py-2 px-4 rounded-lg hover:bg-blue-800"
              type="submit"
            >
              Add Address
            </button>
          </form>
        </div>

        <div className="rounded-2xl border border-gray-200 shadow-md p-6 bg-white">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Order Summary
          </h2>
          <div className="space-y-2 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium">₹{subTotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-medium">{shipping}</span>
            </div>
            <div className="flex justify-between text-red-600 pb-3">
              <span>Discount</span>
              <span> ₹{discount}</span>
            </div>
            <hr className="text-gray-300 " />
            <div className="flex justify-between pt-1 text-lg font-bold text-gray-900">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 shadow-md p-6 bg-white">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Payment Method
          </h2>
          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                className="text-blue-600 focus:ring-blue-500"
              />
              <span>Cash on Delivery</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                className="text-blue-600 focus:ring-blue-500"
              />
              <span>UPI Payment</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                className="text-blue-600 focus:ring-blue-500"
              />
              <span>Card Payment</span>
            </label>
          </div>
          <button
            onClick={confirmOrder}
            className="w-full mt-6 bg-green-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
