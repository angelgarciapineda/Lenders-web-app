import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import UserPool from "../../UserPool";
import bloqueado from "../../assets/bloqueado.png";
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast.success('Codigo enviado correctamente');

const newUser = {
  correo: null,
  contraseña: "",
  foto_perfil: "https://iconape.com/wp-content/files/qe/12301/png/user-tie.png",
  nombre: null,
  apellidoP: null,
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
  const [session, setSession] = useState(false);
  const [errMess, setErrMess ] = useState("");
  const userRef = useRef();

  const notifyErr = (txt) => toast.error(txt);

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

    console.log("USER --------------------> ",user);

    const attributeList = [];
        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"name",Value:user.nombre}));
        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"family_name",Value:user.apellidoP}));
        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"email",Value:user.correo}));

    UserPool.signUp(user.correo, user.contraseña, attributeList, null, (err, data) => {
      if (err) {

        console.log("SIGN UP ERROR ------------> ", err);

        //alert("Error vuelva a intentar");
        notifyErr(err.message)

      } else {

        console.log("SIGN UP ---------> ", data);
        notify()
        props.history.push({
          pathname: "/code",
          state: { currentUser: user },
        });

      }
    });
  };

  return (
    <div className="container col-sm-4">
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      {
        session ?
        <div className="divPhoto">
            <img src={bloqueado} className="imageBlock"/>
            <label>YA TE ENCUENTRAS REGISTRADO</label>
        </div>
        :
        <form className="row g-3">
          <div className="col-md-6">
            
          </div>
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
          <button
            type="button"
            className="btn btn-primary"
            onClick={signUpFunc}//notify, signUpFunc
          >
            Sign In
          </button>
          <div className="col-12">
            
          </div>
        </form>
      }
    </div>
  );
}

export default SignUp;
