import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import SnackBar from "components/common/bars/SnackBar";
import Card from "components/main/cards/Card";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

import InjectionResult = chrome.scripting.InjectionResult;

const FbToken = () => {
  const { t } = useTranslation();
  const [snackBarOpened, setSnackBarOpened] = useState(false);
  const [fbToken, setFbToken] = useState("");
  const handleClick = () => {
    navigator.clipboard.writeText(fbToken).then(() => {
      setSnackBarOpened(true);
    });
  };
  const getCurrentTabInfo = async () => {
    return await chrome.tabs.query({ active: true, currentWindow: true });
  };

  useEffect(() => {
    getCurrentTabInfo().then(([tab]) => {
      if (!tab.id) return;

      const executeScriptCallback = (results: InjectionResult<string[]>[]) => {
        if (!Array.isArray(results) || !results.length) return;

        for (const string of results[0].result) {
          if (!string.includes("window.__accessToken")) continue;

          const matchedFbToken = string.match(/"EA[A-Za-z0-9]{20,}/gm);

          if (matchedFbToken) {
            setFbToken(matchedFbToken[0].substring(1));
            break;
          }
        }
      };

      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          func: () =>
            Array.from(document.getElementsByTagName("script")).map(
              (h) => h.innerHTML
            ),
        },
        executeScriptCallback
      );
    });
  }, []);

  return (
    <Card titleNode="fb.token" cardProps={{ sx: { mb: 1 } }}>
      <SnackBar
        text={t("common.copied")}
        isOpened={snackBarOpened}
        onClose={() => {
          setSnackBarOpened(false);
        }}
      />

      {!fbToken && <Alert severity="error">{t("fb.tokenNotFound")}</Alert>}

      {Boolean(fbToken) && (
        <Alert
          severity="success"
          action={
            <IconButton color="success" size="small" onClick={handleClick}>
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          }
        >
          {fbToken}
        </Alert>
      )}
    </Card>
  );
};

export default FbToken;
