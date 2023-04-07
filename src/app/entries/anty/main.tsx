import Anty from "processes/anty";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import PlatformProvider from "shared/providers/platform";

import ThemeProvider from "../../providers/ThemeProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <ThemeProvider>
      <PlatformProvider platform="anty">
        <Anty />
      </PlatformProvider>
    </ThemeProvider>
  </StrictMode>
);
