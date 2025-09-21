import React from "react";

export default function About() {
  return (
    <section id="about" style={{ padding: "30px",background: "#dee2e6" , textAlign: "center" }}>
      <h2>ℹ️ About Us</h2>
      <p style={{whiteSpace: "pre-line"}}>
       {`6, Kamarajapuram Main Road,
        Kamarajapuram, Sembakkam,
        Chennai, Tamil Nadu – 600073
        Contact: 9876543210`}
      </p>
    </section>
  );
}