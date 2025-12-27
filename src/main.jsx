import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ProdProvider from "./context/ProductContext.jsx";
import BackendProductProvider from "./context/BackendProductContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ProdProvider>
        <BackendProductProvider>
          <App />
        </BackendProductProvider>
      </ProdProvider>
    </BrowserRouter>
  </StrictMode>
);
