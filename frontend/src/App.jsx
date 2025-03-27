import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from './pages/register';
import LoginPage from './pages/login';
import InventoryPage from './pages/inventory';
import Table from './components/Table';
import Dashboard from './pages/dashboard'; 
import { NewInventory } from './pages/NewInventory';
import Customer from "./pages/customer"; 
import Order from "./pages/order"; 
import CustOrder from "./pages/custorder"; 
import PieChart from "./components/piechart";
import SalesSummaryChart from './components/SalesSummaryChart';
import { NewOrder } from './pages/NewOrder';
import ChatPage from "./pages/ChatPage";
import { Setting } from './pages/setting';
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from './pages/forgotPassword';
import Verify from './pages/verifyOtp';
import ResetPassword  from './pages/reset';
import ProductDetail  from './pages/productDetail';
import ErrorBoundary from './components/ErrorBoundary';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route element={<ProtectedRoute />}>
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/table" element={<Table />} />
        <Route path="/newinventory" element={<NewInventory />} />
        <Route path="/customer" element={<Customer />} /> 
        <Route path="/custorder" element={<CustOrder />} /> 
        <Route path="/customer/orders/:id" element={<CustOrder />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/order" element={<Order />} />
        <Route path="/neworder" element={<NewOrder />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/piechart" element={<PieChart />} />
        <Route path="/SalesSummaryChart" element={<SalesSummaryChart />} />
        <Route path="/chatpage" element={<ChatPage />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/orders/:orderId" element={<OrderDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
