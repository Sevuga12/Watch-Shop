import React, { useEffect, useState } from "react";
import About from "./About";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa";

export default function ProductDetail() {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [quantities, setQuantities] = useState({}); // store counts per product

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const id = queryParams.get("id");

  useEffect(() => {
    console.log("Fetching product with id:", id);
    fetch(`http://localhost:8080/v1/prodData?id=` + id) // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        setProductData(data);
        setLoading(false);
        // Initialize quantities for each product
        const initialQuantities = {};
        data.forEach(product => {
          initialQuantities[product.dataId] = 0;
        });
        setQuantities(initialQuantities);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, [id]);

  const toggleWishlist = (id) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((item) => item !== id));
      toast.info("Removed from Wishlist 🗑️");
    } else {
      setWishlist([...wishlist, id]);
      toast.success("Added to Wishlist ❤️");
    }
  };

  const increment = async (id) => {
    setQuantities(prev => ({ ...prev, [id]: prev[id] + 1 }));

    try {
    // 2️⃣ Call API to update the backend
    const response = await fetch(`http://localhost:8080/v1/cart`, {
      method: "POST", // or PATCH depending on your API
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: id,
                            type: "increment"
                  }),
    });

    if (!response.ok) {
      throw new Error("Failed to update quantity on server");
    }

    // Optionally, handle server response if needed
    const data = await response.json();
    console.log("Server response:", data);

  } catch (error) {
    console.error(error);
    // 3️⃣ Rollback UI if API fails
    setQuantities((prev) => ({ ...prev, [id]: prev[id] - 1 }));
    alert("Failed to update quantity on server!");
  }


  };

  const decrement = async(id) => {
    setQuantities(prev => ({ ...prev, [id]: prev[id] > 0 ? prev[id] - 1 : 0 }));

    try {
    // 2️⃣ Call API to update the backend
    const response = await fetch(`http://localhost:8080/v1/cart`, {
      method: "POST", // or PATCH depending on your API
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: id,
                            type: "decrement"
                  }),
    });

    if (!response.ok) {
      throw new Error("Failed to update quantity on server");
    }

    // Optionally, handle server response if needed
    const data = await response.json();
    console.log("Server response:", data);

  } catch (error) {
    console.error(error);
    // 3️⃣ Rollback UI if API fails
    setQuantities((prev) => ({ ...prev, [id]: prev[id] - 1 }));
    alert("Failed to update quantity on server!");
  }
  };

  return (
    <div>
      <section id="products" style={{ padding: "40px", background: "#e9ecef", textAlign: "center" }}>
        {/* <h2>Products</h2> */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          // <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" , justifyContent: "center", gridTemplateColumns: "repeat(4, 1fr)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", justifyContent: "center", alignItems: "center" }}>
            {productData.map((product) => (
              <div key={product.dataId} style={{ background: "#fff", padding: "16px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)",position: "relative" }}>
                {/* Heart Wishlist Icon */}
                <img
                  src={`data:image/jpeg;base64,${product.dataImg}`}
                  alt={product.dataName}
                  style={{ width: "90%", height: "150px", objectFit: "cover", borderRadius: "8px" }}
                />
                {/* Heart icon positioned over the image */}
                <FaHeart
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    color: wishlist.includes(product.dataId)  ? "red" : "gray",
                    cursor: "pointer",
                  }}
                  onClick={() => toggleWishlist(product.dataId)}
                />
                <h3 style={{    fontSize: "89%",
                  fontStyle: "normal",
                  fontFamily:"sans-serif",
                  fontWeight: 100,
                  cursor: "pointer",
                  hover:{color:"blue"}
                }} >{product.dataName}</h3>
                
                <h3 style={{   
                  fontSize: "89%",
                  fontStyle: "normal",
                  fontFamily:"sans-serif",
                  fontWeight: 100
                }} >{product.color}</h3>

                <h3 style={{   
                  fontSize: "89%",
                  fontStyle: "normal",
                  fontFamily:"sans-serif",
                  fontWeight: 600
                }} >₹{product.price}</h3>
                 {/* Quantity Counter */}
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", marginTop: "10px" }}>
                  <button onClick={() => decrement(product.dataId)} style={counterButtonStyle}>-</button>
                  <span>{quantities[product.dataId]}</span>
                  <button onClick={() => increment(product.dataId)} style={counterButtonStyle}>+</button>
                </div>
              </div>
            ))}
          </div>
          
        )}
      </section>
      <About />
    </div>
  );
}

// Shared inline style for counter buttons
const counterButtonStyle = {
  padding: "5px 10px",
  fontSize: "16px",
  cursor: "pointer",
};