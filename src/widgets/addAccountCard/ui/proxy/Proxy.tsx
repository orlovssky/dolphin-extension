import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import Mode, { MODES } from "./Mode";
import NewProxy from "./NewProxy";
import SelectProxy from "./SelectProxy";

const Proxy = () => {
  const { t } = useTranslation();
  const { watch } = useFormContext();
  const mode = watch("proxyMode");

  return (
    <Card variant="outlined" sx={{ mt: 1 }}>
      <CardContent sx={{ "&:last-child": { pb: 2 } }}>
        <Typography variant="subtitle2" component="h3" sx={{ mb: 1 }}>
          {t("proxy.proxy")}
        </Typography>

        <Mode />
        {mode === MODES.NEW_PROXY && <NewProxy />}
        {mode === MODES.SELECT_PROXY && <SelectProxy />}
      </CardContent>
    </Card>
  );
};

export default Proxy;
