import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import DialogChangeIpUrl from "./DialogChangeIpUrl";

const NewProxyChangeIpUrl = () => {
  const { t } = useTranslation();
  const { register, formState, getFieldState, setValue } = useFormContext();
  const [dialogChangeIpUrlOpened, setDialogChangeIpUrlOpened] = useState(false);
  const [withChangeIpUrl, setWithChangeIpUrl] = useState(false);
  const { error: changeIpUrlError } = getFieldState("changeIpUrl", formState);
  const turnOffWithChangeIpUrl = () => {
    setValue("changeIpUrl", undefined);
    setWithChangeIpUrl(false);
  };

  return (
    <>
      <DialogChangeIpUrl
        isOpened={dialogChangeIpUrlOpened}
        onClose={() => {
          setDialogChangeIpUrlOpened(false);
        }}
        onAgree={() => {
          setDialogChangeIpUrlOpened(false);
          setWithChangeIpUrl(true);
        }}
      />

      <FormControlLabel
        sx={{ mt: 0.5 }}
        control={
          <Switch
            checked={withChangeIpUrl}
            onChange={({ target: checked }) => {
              if (checked) {
                setDialogChangeIpUrlOpened(true);
              } else {
                turnOffWithChangeIpUrl();
              }
            }}
          />
        }
        label={t("proxy.sendChangeIpUrl")}
      />

      {Boolean(withChangeIpUrl) && (
        <TextField
          {...register("changeIpUrl", {
            required: t("validation.required", {
              field: t("proxy.changeIpUrl").toLowerCase(),
            }),
          })}
          sx={{ my: 1.5 }}
          size="small"
          label={t("proxy.changeIpUrl")}
          fullWidth
          error={Boolean(changeIpUrlError)}
          helperText={changeIpUrlError?.message}
        />
      )}
    </>
  );
};

export default NewProxyChangeIpUrl;
