import React from "react";
import ReactDOM from "react-dom";
<<<<<<< HEAD
import App from "./shared/App";
=======
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
>>>>>>> stripe integration first commit client
import * as serviceWorker from "./serviceWorker";

import { Provider } from "react-redux";
import store from "./data/store";

ReactDOM.render(
<<<<<<< HEAD
  <Provider store={store}>
    <App />
  </Provider>,
=======
  <BrowserRouter>
    <App />
  </BrowserRouter>,
>>>>>>> stripe integration first commit client
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
