import api from "../api/axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Context } from "../context/ProductContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import GoogleAuthButton from "../components/GoogleAuthButton";

export default function Signup() {
  const navigate = useNavigate();

  const {
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
  } = useContext(AuthContext);

  const { setCurrentUser, setUserData } = useContext(Context);

  async function addUser() {
    if (!mail.includes("@")) {
      setMailAlert("Enter a valid email");
      return;
    }

    if (pass.length < 6) {
      setPassAlert("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await api.post("/api/auth/register", {
        name,
        email: mail,
        password: pass,
      });

      const { accessToken, user } = res.data;

      localStorage.setItem("accessToken", accessToken);
      setCurrentUser(user.id);
      setUserData(user);

      toast.success("Account created successfully");
      setMailAlert("");
      setPassAlert("");

      navigate("/");
    } catch (err) {
      const msg = err?.response?.data?.message || "Registration failed";
      toast.error(msg);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-1">
            Create Account
          </h1>
          <p className="text-gray-600 text-sm">
            Enter the world of literature
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-7 border border-gray-100">
          <div className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={getName}
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={mail}
                onChange={getMail}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <p className="text-sm text-red-600 min-h-[20px]">
                {mailAlert}
              </p>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={pass}
                onChange={getPass}
                placeholder="Create a password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <p className="text-sm text-red-600 min-h-[20px]">
                {passAlert}
              </p>
            </div>

            {/* Signup Button */}
            <button
              onClick={addUser}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Create Account
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="text-sm text-gray-500">OR</span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>

            {/* Google Signup */}
            <GoogleAuthButton />

            {/* Login link */}
            <p className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 font-medium"
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
