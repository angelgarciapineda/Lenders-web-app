import Login from "./components/login/login";
import SignUp from "./components/login/register";
import confirmCode from "./components/login/confirmCode";
import NavBar from "./components/nav-bar/NavBar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import BloqueadoScreen from "./components/bloqueado"
import ListProducts from "./pages/ListProducts";
import "./App.css";
import ConfirmCode from "./components/login/confirmCode";
import UserPool from "./UserPool";
import React, { useEffect } from "react";

function App() {
  const userAuthenticated = UserPool.getCurrentUser();

  useEffect(() => {
    console.log("------------->", userAuthenticated);
  }, [userAuthenticated]);

  const loggedRoutes = () => (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/products" component={Products} />
      <Route path="/listproducts" component={ListProducts} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={Login} />
      <Route path="/code" component={ConfirmCode} />
      <Route path="/bloqueado" component={BloqueadoScreen} />
    </Switch>
  );
  const routes = () => (
    <Switch>
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={Login} />
      <Route path="/code" component={ConfirmCode} />
    </Switch>
  );
  return (
    <>
      <Router>
        {/* <Link to="/">Iniciar sesion</Link>
        <Link to="/signup">Registrarse</Link>
        <Link to="/home">Home</Link> */}
        <NavBar />
        {userAuthenticated != null ? loggedRoutes() : routes()}
      </Router>
    </>
  );
}

export default App;
