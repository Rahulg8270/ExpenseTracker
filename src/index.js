import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Context from "./context/MyContext"; // Import the Context wrapper
import Modal from "react-modal";
import { SnackbarProvider } from "notistack";

Modal.setAppElement("#root");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context>
    <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
      <App />
    </SnackbarProvider>
  </Context>
);
