import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Customers from '../pages/Customers';
import Orders from '../pages/Orders';
import Inventory from '../pages/Inventory';

function AppRoutes() {
  return (
        <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/customers' element={<Customers/>}/>
            <Route path='/orders' element={<Orders/>}/>
            <Route path='/inventory' element={<Inventory/>}/>
        </Routes>
  )
}

export default AppRoutes;