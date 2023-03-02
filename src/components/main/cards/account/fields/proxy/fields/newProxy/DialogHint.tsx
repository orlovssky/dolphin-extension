import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

const Title = ({ text }: { text: string }) => (
  <Typography
    gutterBottom
    variant="subtitle1"
    component="h3"
    sx={{ lineHeight: 1.2, fontWeight: "bold" }}
  >
    {text}:
  </Typography>
);

const Code = ({ text }: { text: string }) => (
  <Typography variant="body2">
    <pre style={{ margin: 0 }}>
      <code>{text}</code>
    </pre>
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
  const validFormats = `host:port
host:port:login:password
login:password@host:port`;

  const validFormatsAdditional = `http://192.168.0.1:8000
socks5://login:password@192.168.0.1:8000
socks4://192.168.0.1:8000:login:password`;

  return (
    <Dialog disableScrollLock open={isOpened} onClose={onClose}>
      <CardContent>
        <Title text={t("common.proxy.validFormats")} />
        <Code text={validFormats} />
        <br />
        <Title text={t("common.proxy.validFormatsAdditional")} />
        <Code text={validFormatsAdditional} />
      </CardContent>
      <DialogActions>
        <Button onClick={onClose}>{t("common.close")}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogHint;
