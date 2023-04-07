import Server from "processes/server";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import PlatformProvider from "shared/providers/platform";

import ThemeProvider from "../../providers/ThemeProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <ThemeProvider>
      <PlatformProvider platform="server">
        <Server />
      </PlatformProvider>
    </ThemeProvider>
  </StrictMode>
);
