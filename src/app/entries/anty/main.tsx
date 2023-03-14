import Anty from "processes/anty/publicApi";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

// import App from "./app";

import ThemeProvider from "../../providers/ThemeProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <ThemeProvider>
      <Anty />
    </ThemeProvider>
  </StrictMode>
);
