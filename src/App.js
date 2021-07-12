import Login from "./components/login/login";
import SignUp from "./components/login/register";
import Home from "./components/home/home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Link to="/">Iniciar sesion</Link>
      <Link to="/signup">Registrarse</Link>
      <Link to="/home">Home</Link>
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
