import React , { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Products() {
 const [products, setProducts] = useState([]);
 const [loading, setLoading] = useState(true);
 const navigate = useNavigate();
 
   useEffect(() => {
    fetch("http://localhost:8080/v1/prod") // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);
  return (
    <section id="products" style={{ padding: "40px", background: "#e9ecef" }}>
      {/* <h2>Products</h2> */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" , justifyContent: "center"}}>
          {products.map((product) => (
            <div key={product.id} style={{ background: "#fff", padding: "16px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
              <img
                src={`data:image/jpeg;base64,${product.productImg}`}
                alt={product.productName}
                style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "8px" , cursor: "pointer"}}
                // onClick={() => navigate(`/productdetail/?id=${product.productId}`);
                onClick={() => navigate(`/productdetail/?id=${product.productId}`)}
              />
              <h3>{product.productName}</h3>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}