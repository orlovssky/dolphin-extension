import "../assets/styles/main.scss";
import Box from "@mui/material/Box";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  i18n,
  localizations,
  TLocale,
  getLocalLocale,
} from "entities/layout/locale/publicApi";
import {
  THEME_MODES,
  useThemeStore,
  getLocalThemeMode,
} from "entities/layout/theme/publicApi";
import { ReactNode, useEffect, useMemo } from "react";
import AppBar from "widgets/layout/appBar/publicApi";

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { mode, setMode } = useThemeStore((state) => state);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const generatePalette = () => {
    const palette = {
      mode: prefersDarkMode ? THEME_MODES.DARK : THEME_MODES.LIGHT,
    };

    if (mode !== THEME_MODES.SYSTEM) {
      palette.mode = mode;
    }

    return palette;
  };
  const theme = useMemo(
    () =>
      createTheme(
        {
          palette: generatePalette(),
          typography: {
            fontFamily: "'NotoSans', 'Roboto', sans-serif",
          },
        },
        localizations[i18n.language as TLocale]
      ),
    [mode, i18n.language, prefersDarkMode]
  );

  useEffect(() => {
    getLocalLocale().then((locale) => {
      i18n.changeLanguage(locale).then(() => {
        // do nothing
      });
    });

    getLocalThemeMode().then((themeMode) => {
      setMode(themeMode);
    });
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <AppBar />
      <Toolbar variant="dense" />
      <Box component="main" sx={{ p: 2 }}>
        {children}
      </Box>
    </MuiThemeProvider>
  );
};

export default ThemeProvider;