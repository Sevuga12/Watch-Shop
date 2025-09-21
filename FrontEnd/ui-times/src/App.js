import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import './App.css';
import Summary from "./pages/Summary";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Navbar from "./navs/Navbar";

function App() {
  return (
     <div>
      <Navbar />
      {/* Routes */}
      <Routes>
        {/* for initial load */}
        <Route path="/" element={<Dashboard />} />
        {/* for initial load */}

        {/* Routes if create a new element */}
        <Route path="/summary" element={<Summary />} />
        <Route path="/productdetail" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />

        {/* Routes if create a new element */}
      </Routes>
    </div>
  );
}

export default App;
