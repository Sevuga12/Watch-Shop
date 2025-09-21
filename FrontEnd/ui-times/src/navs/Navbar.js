import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "flex-end", // 👈 keeps nav links at right
        alignItems: "center",
        padding: "12px 20px",
        backgroundColor: "#222",
      }}
    >

       {/* Logo Section */}
      <div style={{ fontWeight: "bold", fontSize: "20px" , color : "white"}}>
        🕰️ Siva times
      </div>

      {/* Search Bar in Center */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <input
          type="text"
          placeholder="Search watches..."
          style={{
            width: "50%",
            padding: "8px 12px",
            borderRadius: "6px",
            border: "none",
            outline: "none",
          }}
        />
      </div>

      <div style={{ textAlign: "left" }}>
  {/* React Router Links */}
  <Link to="/" style={{ color: "white", textDecoration: "none" }}>
    wishlist
  </Link>
  <Link to="/cart" style={{ color: "white", marginLeft: "20px", textDecoration: "none" }}>
    Cart 🛒
  </Link>
   </div> 
    </nav>
  );
}