import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../context/ProductContext";
import { toast } from "sonner";

export default function Login() {
  // const [userData, setUserData] = useState("");
  const navigate = useNavigate();
  const {
    pass,
    setPass,
    mail,
    setMail,
    getMail,
    getPass,
    mailAlert,
    setMailAlert,
    passAlert,
    setPassAlert,
  } = useContext(AuthContext);
  const {
    currentUser,
    setCurrentUser,
    userData,
    setUserData,
    setUserCart,
    setUserWishlist,
  } = useContext(Context);
  useEffect(() => {
    async function fetchUsers() {
      let users = await axios.get("http://localhost:4000/users");
      setUserData(users.data);
    }
    fetchUsers();
    currentUser && navigate("/");
  }, []);
  function verifyUser() {
    userData.map((user) => {
      if (user.mail !== mail) {
        setMailAlert("Invalid email");
      } else if (user.isBlock) {
        setMailAlert("");
        toast.info("Something went wrong , try again later");
      } else {
        if (user.password !== pass) {
          setPassAlert("Incorrect Password");
        } else {
          setPassAlert("");
          toast.success("Login Successfull", { duration: 1000 });
          if (user.role === "admin") {
                        localStorage.setItem("id", `${user.id}`)
            navigate("/admin");
          } else {
            localStorage.setItem("id", `${user.id}`)
            setCurrentUser(user.id);
            setUserData(user);
            setUserCart(user.cart);
            setUserWishlist(user.wishlist);
            toast.success("Login Successfull", { duration: 1000 });
            navigate("/");
          }
        }
      }
    });
    setMail("");
    setPass("");
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Enter Your Data
          </h1>
          <p className="text-gray-600">Login to your Excisting Account</p>
        </div>

        {/* Form Div*/}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="space-y-6">
            {/* input for email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                value={mail}
                type="text"
                onChange={getMail}
                placeholder="Enter your Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400"
              />
              <p>{mailAlert}</p>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="pass"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="pass"
                type="password"
                value={pass}
                onChange={getPass}
                placeholder="Enter your Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400"
              />
              {passAlert}
              <br /> <br />
              <button
                type="button"
                onClick={verifyUser}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                Login
              </button>
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                >
                  Create
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
