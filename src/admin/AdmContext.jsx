import axios from "axios";
import React, { Children, createContext, useEffect, useState } from "react";

export const AdmContext = createContext();

function AdmProvider({ children }) {
  const [userList, setUserList] = useState([]);
  const [xorderlist,setXorderlist] = useState([]);
  const [productList, setProductList] = useState([]);
  const [orderList, setOrderList] = useState([]);
const API = import.meta.env.VITE_API_URL || "https://litverse-db.onrender.com";


  //useEffect for fetching ant setting our datas initially
  useEffect(() => {
    fetchAdmData();
  }, []);

  const fetchAdmData = async () => {
    try {
      await axios.get(`${API}/users`).then((res) => {
        setUserList(res.data.filter((val) => val.orders));

        //Creating our new order list by restructuring our orders in different users into one

        let ordersArr = res.data
          .filter((val) => val.orders)
          .flatMap((user) =>
            user.orders.map((order) => ({
              ...order,
              id: user.id + String(order.id),
            }))
          );
        setOrderList(ordersArr);
      });
      await axios.get(`${API}/books`).then((res) => setProductList(res.data));
    } catch (err) {
      console.log("Error : ", err);
    }
  };

  // console.log(userList);
  // console.log(orderList);
  // console.log(productList);

  return (
    <AdmContext.Provider
      value={{
        userList,
        setUserList,
        productList,
        setProductList,
        orderList,
        setOrderList,
      }}
    >
      {children}
    </AdmContext.Provider>
  );
}

export default AdmProvider;
