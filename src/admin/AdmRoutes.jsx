import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AdmProvider from './AdmContext'
import AdmDash from './AdmDash'
import AdmUsers from './AdmUsers'
import AdmProducts from './AdmProducts'
import AdmOrders from './AdmOrders'

function AdmRoutes() {
const id = localStorage.getItem("id")
if (id==="1"){
 return (

   <Routes>
        <Route path='/' element={<AdmProvider><AdmDash /></AdmProvider>} />
        <Route path='/admusers' element={<AdmProvider><AdmUsers /></AdmProvider>} />
        <Route path='/admproducts' element={<AdmProvider><AdmProducts /></AdmProvider>} />
        <Route path='/admorders' element={<AdmProvider><AdmOrders /></AdmProvider>} />
</Routes>

  )
}
else{
return <Navigate to={'/'} />
} 

 
}

export default AdmRoutes