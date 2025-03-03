import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import InventoryPage from "./pages/inventory";
import CustomersPage from "./pages/customer";
import OrderPage from "./pages/order"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/customer" element={<CustomersPage />} />
        <Route path="/order" element={<OrderPage />} /> 
        
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;



