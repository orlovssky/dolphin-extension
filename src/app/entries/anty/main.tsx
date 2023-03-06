import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import ThemeProvider from "../../providers/ThemeProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <ThemeProvider>anty</ThemeProvider>
  </StrictMode>
);
