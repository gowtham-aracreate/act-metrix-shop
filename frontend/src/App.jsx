import { useState } from 'react'
import './App.css'
import CustomerPage from './pages/customer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/customer" element={<CustomerPage />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
