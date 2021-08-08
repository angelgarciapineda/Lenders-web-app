import React, { Fragment, useState } from "react";
import axios from "axios";

const { innerWidth: width, innerHeight: height } = window;

const USER = {
  email: "",
  password: "",
};

const Login = () => {
  const [user, setUser] = useState(USER);

  const setInput = (key, value) => {
    setUser({ ...user, [key]: value });
  };

  const handleSignin = async () => {
    try {
      const _user = { ...user };
      await axios
        .post("url", { correo: _user.email, contrasenia: _user.password })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => console.log({ error, _user }));
    } catch (error) {
      console.log("Error to signin account: ", error);
    }
  };

  return (
    <Fragment>
      <div className="container col-sm-4">
        <form className="row g-3">
          <div className="mb-3">
            <label id="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={user.email}
              onChange={(e) => setInput("email", e.target.value)}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label id="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={user.password}
              onChange={(e) => setInput("password", e.target.value)}
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" id="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleSignin}>
            Submit
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default Login;
