import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { IForm } from "components/main/cards/account/form";
import { Control, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

const WithCookies = ({ control }: { control: Control<IForm> }) => {
  const { t } = useTranslation();

  return (
    <Controller
      name="withCookies"
      control={control}
      render={({ field }) => (
        <FormControlLabel
          sx={{ mt: 0.5 }}
          control={
            <Switch
              checked={field.value}
              onChange={({ target }) => field.onChange(target.checked)}
            />
          }
          label={t("common.sendCookies")}
        />
      )}
    />
  );
};

export default WithCookies;
