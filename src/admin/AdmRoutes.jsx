import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AdmProvider from './AdmContext'
import AdmDash from './AdmDash'
import AdmUsers from './AdmUsers'
import AdmProducts from './AdmProducts'
import AdmOrders from './AdmOrders'
import { Context } from '../context/ProductContext'

function AdmRoutes() {
  const { userData } = useContext(Context);
  
  // Only show admin routes if user is admin
  if (userData?.role === "admin") {
    return (
      <Routes>
        <Route path='/' element={<AdmProvider><AdmDash /></AdmProvider>} />
        <Route path='/admusers' element={<AdmProvider><AdmUsers /></AdmProvider>} />
        <Route path='/admproducts' element={<AdmProvider><AdmProducts /></AdmProvider>} />
        <Route path='/admorders' element={<AdmProvider><AdmOrders /></AdmProvider>} />
      </Routes>
    )
  } else {
    return <Navigate to={'/'} />
  }
}

export default AdmRoutes