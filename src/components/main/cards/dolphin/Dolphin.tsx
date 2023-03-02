import ClearIcon from "@mui/icons-material/Clear";
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Card from "components/main/cards/Card";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ERRORS } from "services/constants/app/error.constants";
import { LOCAL_STORAGE } from "services/constants/app/localStorage.constants";
import { useTokenContext } from "services/context/token.context";

const emptyError = {
  show: false,
  messageNode: "",
};

const Dolphin = () => {
  const { t } = useTranslation();
  const tokenContext = useTokenContext();
  const dolphinTokenRef = useRef("");
  const [dolphinToken, setDolphinToken] = useState("");
  const [error, setError] = useState({ ...emptyError });
  const clearError = () => {
    if (error.show) {
      setError({ ...emptyError });
    }
  };
  const handleClick = () => {
    if (!tokenContext) return;

    clearError();

    tokenContext
      .loadProfile({
        dolphinToken: dolphinToken.trim(),
      })
      .then(({ success }) => {
        if (success) {
          dolphinTokenRef.current = dolphinToken.trim();
        } else {
          throw new Error("Error from loadProfile");
        }
      })
      .catch(({ errorCode }) => {
        let messageNode = "dolphin.connectionNotEstablished";

        if (errorCode === ERRORS.NO_TOKEN_DATA) {
          messageNode = "dolphin.invalidDolphinToken";
        }

        setError({ show: true, messageNode });
      });
  };

  useEffect(() => {
    chrome.storage.local.get([LOCAL_STORAGE.DOLPHIN_TOKEN]).then((result) => {
      const storedDolphinToken = result[LOCAL_STORAGE.DOLPHIN_TOKEN];

      if (storedDolphinToken) {
        setDolphinToken(storedDolphinToken);
        dolphinTokenRef.current = storedDolphinToken;
      }
    });
  }, []);

  return (
    <Card titleNode="dolphin.connection">
      <TextField
        value={dolphinToken}
        label={t("dolphin.token")}
        fullWidth
        size="small"
        InputProps={{
          endAdornment: Boolean(dolphinToken) && (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                size="small"
                onClick={() => {
                  clearError();
                  setDolphinToken("");
                }}
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
          clearError();
          setDolphinToken(target.value);
        }}
      />

      {(!tokenContext?.isConnected ||
        dolphinToken.trim() !== dolphinTokenRef.current) && (
        <>
          <Box sx={{ textAlign: "center", mt: 1 }}>
            <LoadingButton
              variant="contained"
              disabled={!dolphinToken}
              loading={Boolean(tokenContext?.loading)}
              onClick={handleClick}
            >
              {t("common.connect")}
            </LoadingButton>
          </Box>

          {error.show && (
            <Alert sx={{ mt: 1 }} severity="error">
              {t(error.messageNode)}
            </Alert>
          )}
        </>
      )}
    </Card>
  );
};

export default Dolphin;
