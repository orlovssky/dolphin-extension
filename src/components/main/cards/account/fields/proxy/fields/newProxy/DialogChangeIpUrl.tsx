import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { openBlank } from "services/utils/browser/openBlank.utils";

const Text = ({ text }: { text: string }) => (
  <Typography variant="body2">{text}</Typography>
);
const DialogChangeIpUrl = ({
  isOpened,
  onClose,
  onAgree,
}: {
  isOpened: boolean;
  onClose: () => void;
  onAgree: () => void;
}) => {
  const { t, i18n } = useTranslation();

  return (
    <Dialog disableScrollLock open={isOpened} onClose={onClose}>
      <CardContent>
        <Text text={t("common.proxy.changeIpUrlDialogText1")} />
        <br />
        <Text text={t("common.proxy.changeIpUrlDialogText2")} />
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Button
            variant="outlined"
            onClick={() => {
              openBlank(
                `https://docs.dolphin.ru.com/view/9?lang=${
                  i18n.language === "ru" ? "ru" : "en"
                }`
              );
            }}
          >
            {t("common.readArticle")}
          </Button>
        </Box>
      </CardContent>
      <DialogActions>
        <Button onClick={onClose}>{t("common.close")}</Button>
        <Button onClick={onAgree}>{t("common.proxy.useChangeIpUrl")}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogChangeIpUrl;
