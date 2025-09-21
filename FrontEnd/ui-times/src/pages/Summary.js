import React from "react";

export default function Summary() {
  return (
    <section id="summary" style={{
        position: "relative",
        height: "400px", // ensure space for the image
        color: "white",
        backgroundImage: "url('../img/watchfavicon.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // vertical center
        alignItems: "center",     // horizontal center
        textAlign: "center"
      }}>
    <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      ></div>
    <div style={{ position: "relative", zIndex: 1 }}>
      <p>
       Siva and Geetha’s Watch Shop is a trusted destination for timepiece lovers, offering a wide range of stylish, premium, and affordable watches. With a keen eye for quality and design, they bring together classic elegance, modern trends, and smart technology under one roof.
      </p>
    </div>
    </section>
  );
}