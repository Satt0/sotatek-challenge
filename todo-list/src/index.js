import React from "react";
import ReactDOM from "react-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>,
  document.getElementById("root")
);
