import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import UserPool from "../UserPool";
import bloqueado from "../assets/bloqueado.png";
import "../App.css"

const initialObject = {
  nom_producto: "",
  descripcion: "",
  fotografia: "",
  id_catalogo: 0,
  id_usuario: 1,
};

function Products() {
  const [formState, setFormState] = useState(initialObject);
  const [cat, setCat] = useState([]);
  const [session,setSession] = useState(false);

  const userRef = useRef();
  const userAuthenticated = UserPool.getCurrentUser();

  useEffect(() => {
    let ok = false;

    if (!ok) {
      (async () => {
        try {
          await axios.get("http://localhost:3000/catalogos").then((res) => {
            setCat(res.data);
            console.log(res.data);
          });
        } catch (error) {
          console.log(
            "ERROR AL RECUPERAR CATALOGOS ------------------> ",
            error
          );
        }
      })();
    }

    return () => {
      ok = true;
    };
  }, []);

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

  const handleSetInput = (key, value) => {
    setFormState({ ...formState, [key]: value });
  };

  const handleRegisterProduct = async () => {
    try {
      const todo = { ...formState };
      await axios
        .post("http://localhost:3000/insertarProducto", todo)
        .then((data) => {
          console.log(data);
        })
        .catch((error) => console.log({ error, todo }));
    } catch (error) {
      console.error("Error creating product: ", error);
    }
  };



  return (
    <div className="baseContainerCentrado">
      <label className="generalTitle">
        Registro de productos
      </label>
      {
        session ?
        <form className="generalCardForm">
          <div className="col-md-12">
            <label className="form-label">Nombre del producto</label>
            <input
              type="email"
              className="generalInput"
              id="inputEmail4"
              value={formState.nom_producto}
              onChange={(value) =>
                handleSetInput("nom_producto", value.target.value)
              }
            />
          </div>
          <div className="col-md-12">
            <label className="form-label">Seleccionar m??ximo 3 fotos</label>
            <input
              className="form-control"
              type="file"
              id="formFileMultiple"
              multiple
            />
          </div>
          <div className="col-12">
            <label className="form-label">Descripci??n</label>
            <textarea
              className="form-control"
              placeholder="Leave a comment here"
              id="floatingTextarea2"
              value={formState.descripcion}
              onChange={(value) =>
                handleSetInput("descripcion", value.target.value)
              }
            ></textarea>
          </div>
          <div className="col-md-12">
            <label className="form-label">Catalogo</label>
            <select
              id="inputState"
              className="form-select"
              value={formState.id_catalogo}
              onChange={(value) =>
                handleSetInput("id_catalogo", value.target.value)
              }
            >
              {cat.map((c, index) => (
                <option value={c.id_catalogo} key={index.toString()}>
                  {c.categoria}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12">
            <button
              type="button"
              className="generalButtonBlue"
              onClick={() => handleRegisterProduct()}
            >
              Guardar
            </button>
          </div>
        </form>
        :
        <div className="divPhoto">
            <img src={bloqueado} className="imageBlock"/>
            <label>NECESITAS UNA CUENTA PARA ACCEDER A ESTA PAGINA</label>
        </div>
      }
    </div>
  );
}

export default Products;
