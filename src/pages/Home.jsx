import React from "react";
import "../styles/home.css";
import ProductCard from "../components/product-card/product-card";
import { FiSearch } from "react-icons/fi"

function Home() {
  return <div className="generalContainer">
    <div className="divSearch">
      <input className="inputSearch"/>
      <div className="divIconSearch">
        <FiSearch size="20px"/>
      </div>
    </div>
    <div className="divProducts">
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  </div>;
}

export default Home;
