import "./App.css";
import Login from "./components/login/login";
import Register from "./components/login/register";
import Home from "./components/home/home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Link to="/">Iniciar sesion</Link>
      <Link to="/signup">Registrarse</Link>
      <Link to="/home">Home</Link>
      <Switch>
        <Router path="/" exact>
          <Login />
        </Router>
        <Router path="/signup">
          <Register />
        </Router>
        <Router path="/home">
          <Home />
        </Router>
      </Switch>
    </Router>
  );
}

export default App;
