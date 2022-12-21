import AppBar from "components/app/bars/appBar/AppBar";
import Main from "components/main/Main";
import ThemeProvider from "services/context/theme.context";
import TokenProvider from "services/context/token.context";

const App = () => (
  <ThemeProvider>
    <TokenProvider>
      <AppBar />
      <Main />
    </TokenProvider>
  </ThemeProvider>
);

export default App;
