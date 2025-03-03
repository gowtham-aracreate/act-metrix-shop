import react from 'react'
import './App.css'
import RegisterPage from './pages/register'
import LoginPage from './pages/login'
import InventoryPage from './pages/inventory'
import Dropdown from './components/dropdown'
import Table from './components/Table'
import Dashboard   from './layout/dashboard';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { NewInventory } from './pages/NewInventory'


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={< Dashboard />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path='/dropdown' element={<Dropdown />} />
     <Route path="/inventory" element={<InventoryPage />} />
      <Route path="/table" element={<Table />} />
      <Route path='/newinventory' element={<NewInventory/>}/>
    </Routes>
  </BrowserRouter>
  )
}
export default App




