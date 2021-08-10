import React, { Fragment, useRef, useState, useEffect } from "react";
import UserPool from "../../UserPool";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import toast, { Toaster } from "react-hot-toast";

const USER = {
  email: "",
  password: "",
};

const Login = () => {
  const [user, setUser] = useState(USER);
  const [session, setSession] = useState(false);
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

  const setInput = (key, value) => {
    setUser({ ...user, [key]: value });
  };

  const signUp = (event) => {
    event.preventDefault();

    const currentUser = new CognitoUser({
      Username: user.email,
      Pool: UserPool,
    });

    const AuthDetails = new AuthenticationDetails({
      Username: user.email,
      Password: user.password,
    });

    currentUser.authenticateUser(AuthDetails, {
      onSuccess: (data) => {
        setSession(true);
        toast.success("Inicio de sesión correcto");
      },
      onFailure: (err) => {
        console.log("LOGIN ERROR ----------> ", err);
        toast.error("Usuario o contraseña incorrectos");
      },
      newPasswordRequired: (data) => {
        console.log("LOGIN NEW PASSWORD ----------> ", data);
      },
    });

    //console.log("USER -------------> ",user);
  };

  const signOut = (event) => {
    event.preventDefault();

    const currentUser = UserPool.getCurrentUser();
    if (currentUser) {
      try {
        currentUser.signOut();
        setSession(false);
        toast.success("Sesión cerrada");
      } catch (error) {
        console.log("ERROR LOG OUT -------> ", error);
      }
    }
  };

  return (
    <Fragment>
      <div className="container col-sm-4">
        {session ? (
          <button type="submit" className="btn btn-primary" onClick={signOut}>
            Log out
          </button>
        ) : (
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
            <button type="submit" className="btn btn-primary" onClick={signUp}>
              Submit
            </button>
          </form>
        )}
      </div>
      <Toaster />
    </Fragment>
  );
};

export default Login;
