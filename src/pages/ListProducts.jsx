import React, { useState, useEffect } from "react";
import axios from "axios";

function ListProducts() {
  const [products, setProducts] = useState([]);

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
    <div className="container col-md-8">
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
    </div>
  );
}

export default ListProducts;
