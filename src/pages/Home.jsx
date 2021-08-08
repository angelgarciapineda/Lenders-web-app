import React, { useEffect, useRef } from "react";
import "../styles/home.css";
import ProductCard from "../components/product-card/product-card";
import { FiSearch } from "react-icons/fi"
import axios from 'axios';

const producto = {
  nom_producto: "Bicicleta de montania",
  descripcion: "Bicicleta de montaña Schwinn dos meses de uso, seminueva",
  fotografia: "https://img.icons8.com/cotton/2x/image--v2.png",
  catalogo: "PRODUCTO",
  ofertador: "Mario gonzales",
  id_usuario: 0,
  id_producto: 0,
  id_catalogo: 0
}

const URL = "http://localhost:3000/vistaProductos"

function Home() {

  const arrayProductos = useRef([])

  useEffect(() => {
    let unmounted = false;

    if(!unmounted){

      (async () => {
        try {

          await axios.get(URL)
          .then(res => {
            
            arrayProductos.current = res.data
            console.log("PRODUCTOS -------------------> ",arrayProductos.current);
            
          })

        }
        catch (error) {
          console.log("ERROR AL RECUPERAR PRODUCTOS ------------------> ",error);
        }
      })();

    }

    return () => {unmounted = true}
  }, [])

  return <div className="generalContainer">
    <div className="divSearch">
      <input className="inputSearch"/>
      <div className="divIconSearch">
        <FiSearch size="20px"/>
      </div>
    </div>
    <div className="divProducts">
      {
        arrayProductos.current.map(element => {

          const current = {
            nom_producto: element.nom_producto,
            descripcion: element.descripcion,
            fotografia: element.fotografia,
            catalogo: element.categoria,
            ofertador: element.nombre +" "+ element.apellidoP,
            id_producto: element.id_producto
          }

          return (
            <ProductCard producto={current} key={element.id_producto}/>
          )

        })
      }
    </div>
  </div>;
}

export default Home;
