import { useEffect, useState } from "react";
import {loadRazorpay} from "../utility/loadRazorpay";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState("");

  // Fetch cart items from backend
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("http://localhost:8080/v1/view/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: 1 }),
        });
        const data = await res.json();

        // Aggregate duplicates
        const grouped = data.reduce((acc, item) => {
          const existing = acc.find(i => i.dataId === item.dataId);
          if (existing) {
            existing.quantity += 1;
          } else {
            acc.push({ ...item, quantity: 1 });
          }
          return acc;
        }, []);

        setCartItems(grouped);
      } catch (err) {
        console.error("Failed to fetch cart items:", err);
      }
    };

    fetchCart();
  }, []);

  // Increment / Decrement
  const updateQuantity = (dataId, type) => {
    setCartItems(prev =>
      prev.map(item =>
        item.dataId === dataId
          ? { ...item, quantity: type === "increment" ? item.quantity + 1 : Math.max(item.quantity - 1, 1) }
          : item
      )
    );
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Handle Proceed to Pay
  const proceedToPay = async() => {
    if (!address.trim()) {
      alert("Please enter your address before proceeding!");
      return;
    }

  const res = await loadRazorpay();
  if (!res) {
    alert("Failed to load Razorpay SDK. Please check your connection.");
    return;
  }
  try {
      // 1️⃣ Call backend to create order
      const res = await fetch("http://localhost:8080/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalPrice }),
      });

      const orderData = await res.json();

      // 2️⃣ Razorpay options
      const options = {
        key: "rzp_test_RK0hZAsvpncTYC", // your frontend key
        amount: orderData.amount,
        currency: orderData.currency,
        name: "My Shop",
        description: "Order Payment",
        order_id: orderData.orderId,
        handler: function (response) {
          alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
          setCartItems([]);
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment failed:", err);
      alert("Something went wrong while creating order.");
    }

    // Here you can call your payment API
    console.log("Proceeding to payment with address:", address);
    console.log("Cart items:", cartItems);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2>Your Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</h2>

      {cartItems.length === 0 && <p>Your cart is empty</p>}

      {cartItems.map(item => (
        <div
          key={item.dataId}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
            borderBottom: "1px solid #ccc",
            paddingBottom: "10px",
          }}
        >
          <img
            src={`data:image/jpeg;base64,${item.dataImg}`}
            alt={item.name}
            style={{ width: "100px", height: "100px", marginRight: "20px" }}
          />
          <div style={{ flex: 1 }}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px" }}>
              <button onClick={() => updateQuantity(item.dataId, "decrement")}>-</button>
              <span>{item.qty}</span>
              <button onClick={() => updateQuantity(item.dataId, "increment")}>+</button>
            </div>
          </div>
          <div style={{ marginLeft: "20px", fontWeight: "bold" }}>
            ₹{(item.price * item.quantity).toFixed(2)}
          </div>
        </div>
      ))}

      {/* Address */}
      <div style={{ marginTop: "20px" }}>
        <label>
          <strong>Delivery Address:</strong>
        </label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your address"
          style={{ width: "100%", height: "80px", marginTop: "5px", padding: "10px" }}
        />
      </div>

      {/* Total & Proceed */}
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: "18px", fontWeight: "bold" }}>Total: ₹{totalPrice.toFixed(2)}</div>
        <button
          onClick={proceedToPay}
          style={{ padding: "10px 20px", backgroundColor: "#fb641b", color: "white", border: "none", cursor: "pointer" }}
        >
          Proceed to Pay
        </button>
      </div>
    </div>
  );
};

export default Cart;
