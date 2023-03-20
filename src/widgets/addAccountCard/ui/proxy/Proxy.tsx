import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

import Mode from "./Mode";
import NewProxy from "./NewProxy";
import SelectProxy from "./SelectProxy";

const Proxy = () => {
  const { t } = useTranslation();

  return (
    <Card variant="outlined" sx={{ mt: 1 }}>
      <CardContent sx={{ "&:last-child": { pb: 2 } }}>
        <Typography variant="subtitle2" component="h3" sx={{ mb: 1 }}>
          {t("proxy.proxy")}
        </Typography>

        <Mode />
        <NewProxy />
        <SelectProxy />
      </CardContent>
    </Card>
  );
};

export default Proxy;
