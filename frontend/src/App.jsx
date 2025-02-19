import { useState } from 'react'
import './App.css'
import RegisterPage from './pages/register'
import LoginPage from './pages/login'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
