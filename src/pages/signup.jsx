import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import WishList from "./wishlist";
import { toast } from "sonner";

function Signup() {
  let {
    name,
     pass,
    mail,
    mailAlert,
    setMailAlert,
    passAlert,
    setPassAlert,
    getName,
    getPass,
    getMail,
    API
  } = useContext(AuthContext);
  const navigate = useNavigate();


  function addUser() {
    if (mail.includes("@gmail") && pass.length >= 6) {
      axios.post(`${API}/users`, {
        username: `${name}`,
        mail: `${mail}`,
        password: `${pass}`,
        role :`user`,
        isBlock : false,
        date : new Date().toLocaleDateString(),
        cart : [],
        wishlist : [],
        orders : []
      });
      toast.success("Account created")
      setMailAlert("");
      setPassAlert("");
      navigate("/login")
    } else {
      if (!mail.includes("@gmail")) setMailAlert("Enter a valid email ");
      if (pass.length < 6)
        setPassAlert("Your password should have atleast 6 character");
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Create Account
          </h1>
          <p className="text-gray-600">Enter the world of Literature</p>
        </div>
        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="space-y-6">
            {/* input for name */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={getName}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400"
                />
              </div>
            </div>
            {/*Input for email */}
            <div className="space-y-2">
              <label
                htmlFor="mail"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  id="mail"
                  type="email"
                  value={mail}
                  onChange={getMail}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400"
                />
                <p className="text-red-700">{mailAlert}</p>
              </div>
            </div>
            {/*Input for pass */}
            <div className="space-y-2">
              <label
                htmlFor="pass"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="pass"
                  type="password"
                  value={pass}
                  onChange={getPass}
                  placeholder="Create a password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400"
                />
                <p className="text-red-700">{passAlert}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={addUser}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
            >
              Create Account
            </button>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
