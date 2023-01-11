import "assets/styles/main.css";
import "plugins/i18next";
import ReactDOM from "react-dom/client";
import React from "react";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
