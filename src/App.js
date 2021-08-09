import Login from "./components/login/login";
import SignUp from "./components/login/register";
import confirmCode from "./components/login/confirmCode"
import NavBar from "./components/nav-bar/NavBar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ListProducts from "./pages/ListProducts";
import "./App.css";
import ConfirmCode from "./components/login/confirmCode";
function App() {
  return (
    <>
      <Router>
        {/* <Link to="/">Iniciar sesion</Link>
        <Link to="/signup">Registrarse</Link>
        <Link to="/home">Home</Link> */}
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/products" component={Products} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={Login} />
          <Route path="/code" component={ConfirmCode}/>
          <Route path="/listproducts" component={ListProducts} />
        </Switch>
        {/* <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
        </Switch> */}
      </Router>
    </>
  );
}

export default App;
