import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { store } from "./state/store";
import { Provider } from "react-redux";


// for preventing viewport shrinking when keyboard shows up
var viewport = document.querySelector("meta[name=viewport]");
viewport.setAttribute(
  "content",
  viewport.content + ", height=" + window.innerHeight
);
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
