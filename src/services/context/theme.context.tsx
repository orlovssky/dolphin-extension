import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTranslation } from "react-i18next";
import {
  useState,
  createContext,
  ReactNode,
  useMemo,
  useContext,
  useEffect,
} from "react";
import { LOCAL_STORAGE } from "services/constants/app/localStorage.constants";
import { LOCALES } from "services/constants/app/locale.constants";
import { THEME_MODES } from "services/constants/app/theme.constants";
import { localizations } from "services/static/app/locale.static";

interface IThemeContext {
  mode: THEME_MODES;
  setMode: (mode: THEME_MODES) => void;
}

const ThemeContext = createContext<IThemeContext | null>(null);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { i18n } = useTranslation();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [themeMode, setThemeMode] = useState<THEME_MODES>(THEME_MODES.LIGHT);
  const contextValue = useMemo(
    () => ({
      mode: themeMode,
      setMode: (mode: THEME_MODES) => {
        setThemeMode(mode);
      },
    }),
    [themeMode]
  );
  const getPaletteMode = () => {
    if (themeMode !== THEME_MODES.SYSTEM) {
      return themeMode;
    }

    return prefersDarkMode ? THEME_MODES.DARK : THEME_MODES.LIGHT;
  };
  const theme = useMemo(
    () =>
      createTheme(
        {
          palette: { mode: getPaletteMode() },
        },
        localizations[i18n.language as LOCALES]
      ),
    [themeMode, prefersDarkMode, i18n.language]
  );

  useEffect(() => {
    chrome.storage.local.get([LOCAL_STORAGE.THEME_MODE]).then((result) => {
      setThemeMode(result[LOCAL_STORAGE.THEME_MODE]);
    });
  }, []);

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
export default ThemeProvider;
