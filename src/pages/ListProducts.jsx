import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import UserPool from "../UserPool";
import bloqueado from "../assets/bloqueado.png";

function ListProducts() {
  const [products, setProducts] = useState([]);
  const [session,setSession] = useState(false);

  const userRef = useRef();

  useEffect(() => {
    let unmounted = false;

    if (!unmounted) {
      const currentUser = UserPool.getCurrentUser();
      if (currentUser) {
        userRef.current = currentUser;
        setSession(true);
        console.log("CURRENT USER ------------> ", userRef.current);
      }
    }

    return () => {
      unmounted = true;
    };
  }, []);

  useEffect(() => {
    handleFetchProducts();
  }, []);

  const handleFetchProducts = async () => {
    try {
      await axios
        .get("http://localhost:3000/productos")
        .then((response) => {
          console.log(response.data);
          setProducts(response.data);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log("Error creating user: ", error);
    }
  };



  return (
    <div className="baseContainerCentrado">
      <label className="generalTitle">
        Mis productos
      </label>
      {
        session ?
        <div class="table-responsive">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Descripción</th>
                <th scope="col">Catalogo</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => (
                <tr>
                  <td>{item.id_producto} </td>
                  <td>{item.nom_producto} </td>
                  <td>{item.descripcion} </td>
                  <td>{item.id_catalogo} </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        :
        <div className="divPhoto">
            <img src={bloqueado} className="imageBlock"/>
            <label>NECESITAS UNA CUENTA PARA ACCEDER A ESTA PAGINA</label>
        </div>
      }
    </div>
  );
}

export default ListProducts;
