import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import DialogChangeIpUrl from "./DialogChangeIpUrl";

const NewProxyChangeIpUrl = () => {
  const { t } = useTranslation();
  const { setValue, control } = useFormContext();
  const [dialogChangeIpUrlOpened, setDialogChangeIpUrlOpened] = useState(false);
  const [withChangeIpUrl, setWithChangeIpUrl] = useState(false);
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
        <Controller
          name="changeIpUrl"
          control={control}
          rules={{
            required: t("validation.required", {
              field: t("proxy.changeIpUrl").toLowerCase(),
            }),
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              sx={{ my: 1.5 }}
              value={field.value}
              size="small"
              label={t("proxy.changeIpUrl")}
              fullWidth
              error={Boolean(error)}
              helperText={error?.message}
              onChange={({ target }) => {
                field.onChange(target.value);
              }}
            />
          )}
        />
      )}
    </>
  );
};

export default NewProxyChangeIpUrl;
