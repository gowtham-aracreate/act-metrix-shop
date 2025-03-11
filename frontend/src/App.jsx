// import React from 'react';
// import RegisterPage from './pages/register';
// import LoginPage from './pages/login';
// import InventoryPage from './pages/inventory';
// import Dropdown from './components/dropdown';
// import Table from './components/Table';
// import Dashboard from './layout/dashboard';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { NewInventory } from './pages/NewInventory';
// import Customer from "./pages/customer"; 
// import Order from "./pages/order"; 
// import Header from '.layout/Header';
// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Dashboard />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//         <Route path='/dropdown' element={<Dropdown />} />
//         <Route path="/inventory" element={<InventoryPage />} />
//         <Route path="/table" element={<Table />} />
//         <Route path='/newinventory' element={<NewInventory />} />
//         <Route path="/customer" element={<Customer />} />
//         <Route path="/order" element={<Order />} />
//         <Route path='/header' element={<header />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;



import React from 'react';
import RegisterPage from './pages/register';
import LoginPage from './pages/login';
import InventoryPage from './pages/inventory';
import Dropdown from './components/dropdown';
import Table from './components/Table';
import Dashboard from './layout/dashboard';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NewInventory } from './pages/NewInventory';
import Customer from "./pages/customer"; 
import Order from "./pages/order"; 
import Header from './layout/Header';
import Recover from './pages/recover'
import { Email } from './pages/email'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/recover" element={<Recover/>}/>
      <Route path="/email" element={<Email/>}/>
        <Route path='/dropdown' element={<Dropdown />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/table" element={<Table />} />
        <Route path='/newinventory' element={<NewInventory />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/custorder" element={<custOrder />} />
        <Route path='/header' element={<Header />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/order' element={<Order/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;

