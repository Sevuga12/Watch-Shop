import React from "react";
import Products from "./Products";
import About from "./About";
import Summary from "./Summary";



export default function Dashboard() {
  return (
      <div>
      <Products />
      <Summary />
      <About />
    </div>
  );
}