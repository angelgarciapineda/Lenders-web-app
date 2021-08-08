import React from "react";
import "../../styles/product-card.css";

function productCard(props) {

  //console.log("PROPS --------------> ", props);
  
  return(
    <div className="containerProductCard">
      <label className="titulo18">{props.producto.catalogo}</label>
      <img src={props.producto.fotografia} className="imageProduct"/>
      <label className="titulo18">{props.producto.nom_producto}</label>
      <label className="texto14">{props.producto.descripcion}</label>
      <label className="texto12">{props.producto.ofertador}</label>
    </div>
  );
}

export default productCard;