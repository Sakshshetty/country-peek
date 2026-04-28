import React from "react";
import ReactDOM from "react-dom/client";   // ✅ THIS LINE IS REQUIRED
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { FavouritesProvider } from "./context/FavouritesContext";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <FavouritesProvider>
      <App />
    </FavouritesProvider>
  </ThemeProvider>
);