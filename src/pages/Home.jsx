import React, { useEffect, useRef, useState } from "react";
import "../styles/home.css";
//import "../styles/product-card.css";
import ProductCard from "../components/product-card/product-card";
import { FiSearch, FiX } from "react-icons/fi";
import Modal from "react-modal";
import axios from "axios";
import UserPool from "../UserPool";

const producto = {
  nom_producto: "Bicicleta de montania",
  descripcion: "Bicicleta de montaña Schwinn dos meses de uso, seminueva",
  fotografia: "https://img.icons8.com/cotton/2x/image--v2.png",
  catalogo: "PRODUCTO",
  ofertador: "Mario gonzales",
  id_usuario: 0,
  id_producto: 0,
  id_catalogo: 0,
};

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const URL = "http://3.133.91.107:3000/vistaProductos";

function Home() {
  const userAuthenticated = UserPool.getCurrentUser();

  const [productosState, setProductosState] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [serachState, setSearchState] = useState("");
  const [currentProducto, setCurrentproducto] = useState(producto)

  const arrayProductos = useRef();

  let subtitle;

  useEffect(() => {
    let unmounted = false;

    if (!unmounted) {
      (async () => {
        try {
          await axios.get(URL).then((res) => {
            arrayProductos.current = res.data;
            setProductosState(res.data);
            console.log(
              "PRODUCTOS -------------------> ",
              arrayProductos.current
            );
          });
        } catch (error) {
          console.log(
            "ERROR AL RECUPERAR PRODUCTOS ------------------> ",
            error
          );
        }
      })();
    }

    return () => {
      unmounted = true;
    };
  }, []);

  const setInput = (value) => {
    setSearchState(value)
    const currentArray = Object.values(arrayProductos.current).filter(current => current.nom_producto.toLowerCase().includes(value.toLowerCase()));
    setProductosState(currentArray);
  };

  function openModal(productoSelec) {
    setCurrentproducto(productoSelec)
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="generalContainer">
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="generalModal">
          <div className="divTitleModal">
            <label className="titulo18">{currentProducto.catalogo}</label>
            <button onClick={closeModal} className="generalButtonIcon">
              <FiX size="20px" />
            </button>
          </div>
          <img src={currentProducto.fotografia} className="imageProduct"/>
          <label className="titulo18">{currentProducto.nom_producto}</label>
          <label className="texto14">{currentProducto.descripcion}</label>
          <label className="texto12">{currentProducto.ofertador}</label>
          <button className="generalButtonBlue">
            Solicitar
          </button>
        </div>
      </Modal>
      <div className="divSearch">
        <input 
          className="inputSearch"
          value={serachState}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="divIconSearch">
          <FiSearch size="20px" />
        </div>
      </div>
      <div className="divProducts">
        {productosState.map((element) => {
          const current = {
            nom_producto: element.nom_producto,
            descripcion: element.descripcion,
            fotografia: element.fotografia,
            catalogo: element.categoria,
            ofertador: element.nombre + " " + element.apellidoP,
            id_producto: element.id_producto,
          };
          return <ProductCard producto={current} key={element.id_producto} openModal={openModal}/>;
        })}
      </div>
    </div>
  );
}

export default Home;
