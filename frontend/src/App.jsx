import React from 'react'
import "tailwindcss";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loading from './Pages/Loading'; // Adjust path if needed (e.g., './components/LoadingPage')
import Home from './Pages/Home'; // Your home page component (create if not exists)

function App() {
  return (
    <Router> {/* Wraps the entire app for routing */}
      <Routes>
        <Route path="/" element={<Loading />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;