import api from "../api/axios";
import React, { createContext, useEffect, useState } from "react";

export const AdmContext = createContext();

function AdmProvider({ children }) {
  const [userList, setUserList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [stats, setStats] = useState({
    usersCount: 0,
    productsCount: 0,
    ordersCount: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);

  // Fetch all admin data on mount
  useEffect(() => {
    fetchAdmData();
  }, []);

  const fetchAdmData = async () => {
    try {

      const booksRes = await api.get("/api/books", {
        params: { role: "admin" },
      });
      setProductList(booksRes.data.books || []);


      try {
        const ordersRes = await api.get("/api/order");
        setOrderList(ordersRes.data.orders || []);
      } catch (err) {
        console.log("Orders fetch error:", err);
        setOrderList([]);
      }


      try {
        const usersRes = await api.get("/api/users");
        setUserList(usersRes.data.users || []);
      } catch (err) {
        console.log("Users fetch error:", err);
        setUserList([]);
      }


      try {
        const statsRes = await api.get("/api/admin/stats");
        setStats(
          statsRes.data.stats || {
            usersCount: 0,
            productsCount: 0,
            ordersCount: 0,
            revenue: 0,
          }
        );
      } catch (err) {
        console.log("Stats fetch error:", err);
        setStats({
          usersCount: 0,
          productsCount: 0,
          ordersCount: 0,
          revenue: 0,
        });
      }
    } catch (err) {
      console.log("Error fetching admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdmContext.Provider
      value={{
        userList,
        setUserList,
        productList,
        setProductList,
        orderList,
        setOrderList,
        stats,
        setStats,
        loading,
        fetchAdmData,
      }}
    >
      {children}
    </AdmContext.Provider>
  );
}

export default AdmProvider;
