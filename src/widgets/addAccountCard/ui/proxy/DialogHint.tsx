import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

const Formats = ({ title, code }: { title: string; code: string }) => (
  <Typography
    gutterBottom
    variant="subtitle1"
    component="h3"
    sx={{ lineHeight: 1.2, fontWeight: "bold" }}
  >
    {title}:
    <Typography variant="body2">
      <pre style={{ margin: 0 }}>
        <code>{code}</code>
      </pre>
    </Typography>
  </Typography>
);

const DialogHint = ({
  isOpened,
  onClose,
}: {
  isOpened: boolean;
  onClose: () => void;
}) => {
  const { t } = useTranslation();

  return (
    <Dialog disableScrollLock open={isOpened} onClose={onClose}>
      <CardContent>
        <Formats
          title={t("proxy.validFormats")}
          code={`host:port
host:port:login:password
login:password@host:port`}
        />
        <br />
        <Formats
          title={t("proxy.validFormatsAdditional")}
          code={`http://192.168.0.1:8000
socks5://login:password@192.168.0.1:8000
socks4://192.168.0.1:8000:login:password`}
        />
      </CardContent>
      <DialogActions>
        <Button onClick={onClose}>{t("common.close")}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogHint;
