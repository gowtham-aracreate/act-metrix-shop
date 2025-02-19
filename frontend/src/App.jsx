import { useState } from 'react'
import './App.css'
import OrderPage from './pages/order'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/order" element={<OrderPage />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
