import React from "react";
import "../../styles/product-card.css";

const producto = {
    nombre: "Bicicleta de montania",
    descripcion: "Bicicleta de montaña Schwinn dos meses de uso, seminueva",
    foto: "https://cdn1.coppel.com/images/catalog/pm/5719973-1.jpg",
    catalogo: "PRODUCTO",
    ofertador: "Mario gonzales"
}

function productCard() {
  return(
    <div className="containerProductCard">
      <label className="titulo18">{producto.catalogo}</label>
      <img src={producto.foto} className="imageProduct"/>
      <label className="titulo18">{producto.nombre}</label>
      <label className="texto14">{producto.descripcion}</label>
      <label className="texto12">{producto.ofertador}</label>
    </div>
  );
}

export default productCard;