/* eslint-disable max-lines */
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import DialogChangeIpUrl from "./DialogChangeIpUrl";
import DialogHint from "./DialogHint";

const NewProxy = () => {
  const { t } = useTranslation();
  const { control, register, formState, getFieldState, setValue } =
    useFormContext();
  const [dialogHintOpened, setDialogHintOpened] = useState(false);
  const [dialogChangeIpUrlOpened, setDialogChangeIpUrlOpened] = useState(false);
  const [withChangeIpUrl, setWithChangeIpUrl] = useState(false);
  const { error: changeIpUrlError } = getFieldState("changeIpUrl", formState);
  const turnOffWithChangeIpUrl = () => {
    setValue("changeIpUrl", undefined);
    setWithChangeIpUrl(false);
  };

  return (
    <>
      <DialogHint
        isOpened={dialogHintOpened}
        onClose={() => {
          setDialogHintOpened(false);
        }}
      />

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

      <Controller
        name="newProxy"
        control={control}
        rules={{
          required: t("validation.required", {
            field: t("proxy.proxy").toLowerCase(),
          }),
          pattern: {
            value: /.+:.+/,
            message: t("validation.regex", {
              field: t("proxy.proxy").toLowerCase(),
            }),
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            sx={{ mt: 1.5 }}
            value={field.value}
            size="small"
            label={t("proxy.proxy")}
            fullWidth
            error={Boolean(error)}
            helperText={error?.message}
            onChange={({ target }) => {
              field.onChange(target.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    size="small"
                    onClick={() => {
                      setDialogHintOpened(true);
                    }}
                  >
                    <InfoOutlinedIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />

      <Controller
        name="newProxyName"
        control={control}
        render={({ field }) => (
          <TextField
            sx={{ mt: 1.5 }}
            value={field.value}
            size="small"
            label={t("proxy.proxyName")}
            fullWidth
            helperText={t("common.optional")}
            onChange={({ target }) => {
              field.onChange(target.value);
            }}
          />
        )}
      />

      <FormControlLabel
        sx={{ mt: 0.5 }}
        control={
          <Switch
            checked={withChangeIpUrl}
            onChange={({ target }) => {
              if (target.checked) {
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

export default NewProxy;
