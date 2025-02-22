import { useState } from 'react'
import './App.css'
import RegisterPage from './pages/register'
import LoginPage from './pages/login'
import InventoryPage from './pages/inventory'
import Dropdown from './components/dropdown'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";


function App() {
  
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path='/dropdown' element={<Dropdown />} />
      <Route path="/inventory" element={<InventoryPage />} />
    </Routes>
  </BrowserRouter>
  </>
  )
}

export default App
