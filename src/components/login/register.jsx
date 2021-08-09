import React, { useState } from "react";
import axios from "axios";
import UserPool from "../../UserPool";

const newUser = {
  correo: "",
  contraseña: "",
  foto_perfil: "https://iconape.com/wp-content/files/qe/12301/png/user-tie.png",
  nombre: "",
  apellidoP: "",
  apellidoM: "",
  telefono: "",
  img_identificacion: "",
  codigo_personal: "",
  codigo_recomendacion: "",
  fecha_registro: "",
  id_rol_usuario: 0,
};

function SignUp(props) {
  const [user, setUser] = useState(newUser);

  const setInput = (key, value) => {
    setUser({ ...user, [key]: value });
  };

  const handleSignUp = async () => {
    try {
      const todo = { ...user };
      await axios.post("http://localhost:4000/api/users", todo);
      setUser(newUser);
    } catch (error) {
      console.log("Error creating user: ", error);
    }
  };

  const signUpFunc = () => {
    //console.log("USER --------------------> ",user);

    UserPool.signUp(user.correo, user.contraseña, [], null, (err, data) => {
      if (err) {
        console.log("SIGN UP ERROR ------------> ", err);
        alert("Error vuelva a intentar");
      } else {
        console.log("SIGN UP ---------> ", data);
        props.history.push("/code", user);
      }
    });

    props.history.push({
      pathname: "/code",
      state: { currentUser: user },
    });
  };

  return (
    <div className="container col-sm-4">
      <form className="row g-3">
        <div className="col-md-6">
          <label for="inputEmail4" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="inputEmail4"
            value={user.correo}
            onChange={(e) => setInput("correo", e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label for="inputPassword4" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="inputPassword4"
            value={user.contraseña}
            onChange={(e) => setInput("contraseña", e.target.value)}
          />
        </div>
        <div className="col-12">
          <label for="inputName" className="form-label">
            Nombre(s)
          </label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            placeholder="San Martin Caballero"
            value={user.nombre}
            onChange={(e) => setInput("nombre", e.target.value)}
          />
        </div>
        <div className="col-12">
          <label for="inputLastName" className="form-label">
            Appellidos
          </label>
          <input
            type="text"
            className="form-control"
            id="inputLastName"
            placeholder="Montes de Oca"
            value={user.apellidoP}
            onChange={(e) => setInput("apellidoP", e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label for="inputState" className="form-label">
            Registrarse como
          </label>
          <select
            id="inputState"
            className="form-select"
            onChange={(e) => setInput("id_rol_usuario", e.target.value)}
          >
            <option selected>Seleccionar</option>
            <option value="1">PRESTAMISTA</option>
          </select>
        </div>
        <div className="col-12">
          <button
            type="button"
            className="btn btn-primary"
            onClick={signUpFunc}
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
