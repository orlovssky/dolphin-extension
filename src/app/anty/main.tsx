import React from "react";
import ReactDOM from "react-dom/client";

import ThemeProvider from "../providers/ThemeProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>anty</ThemeProvider>
  </React.StrictMode>
);
