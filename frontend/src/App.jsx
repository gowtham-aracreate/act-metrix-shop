import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dash from './pages/dash'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dash />} />
      </Routes>
    </Router>
  );
};

export default App;











