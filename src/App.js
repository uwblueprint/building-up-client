import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Checkout from "./components/Checkout";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    // <div className="App">
    //   <h2>Welcome to UW Blueprint Building Up!</h2>
    // </div>
    <Router>
      <div>
        <h2>Welcome to UW Blueprint Building Up!</h2>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li>
              <Link to={"/checkout"} className="nav-link">
                Checkout
              </Link>
            </li>
          </ul>
        </nav>
        <hr />
        <Switch>
          <Route path="/checkout" component={Checkout} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
