import react from 'react'
import './App.css'
import RegisterPage from './pages/register'
import LoginPage from './pages/login'
import InventoryPage from './pages/inventory'
import Dropdown from './components/dropdown'
import Table from './components/Table'
import Dashboard   from './layout/dashboard';
import ProductPage from './pages/productDetail'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { NewInventory } from './pages/NewInventory'
import Order from './pages/order'
import Recover from './pages/recover'
import { Email } from './pages/email'


function App() {
  
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/dashboard" element={< Dashboard />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/recover" element={<Recover/>}/>
      <Route path="/email" element={<Email/>}/>
      <Route path='/dropdown' element={<Dropdown />} />
     <Route path="/inventory" element={<InventoryPage />} />
      <Route path="/table" element={<Table />} />
      <Route path='/newinventory' element={<NewInventory/>}/>
      <Route path='/productDetail' element={<ProductPage/>}/>
      <Route path='/order' element={<Order/>}/>

    </Routes>
  </BrowserRouter>
  </>
  )
}
export default App

