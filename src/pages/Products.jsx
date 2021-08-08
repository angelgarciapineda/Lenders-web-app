import React, { useEffect, useState } from "react";
import axios from "axios";

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
    <div className="container col-sm-4">
      <form className="row g-3">
        <div className="col-md-12">
          <label className="form-label">Nombre del producto</label>
          <input
            type="email"
            className="form-control"
            id="inputEmail4"
            value={formState.nom_producto}
            onChange={(value) =>
              handleSetInput("nom_producto", value.target.value)
            }
          />
        </div>
        <div className="col-md-12">
          <label className="form-label">Seleccionar máximo 3 fotos</label>
          <input
            className="form-control"
            type="file"
            id="formFileMultiple"
            multiple
          />
        </div>
        <div className="col-12">
          <label className="form-label">Descripción</label>
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
            className="btn btn-primary"
            onClick={() => handleRegisterProduct()}
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Products;
