import Login from "./components/login/login";
import SignUp from "./components/login/register";
//import Home from "./components/home/home";
import NavBar from "./components/nav-bar/NavBar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import "./App.css";
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
