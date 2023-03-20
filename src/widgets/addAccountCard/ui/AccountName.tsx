import TextField from "@mui/material/TextField";
import { useAntyProfileStore } from "entities/antyData/publicApi";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { usePlatformContext } from "shared/providers/platform/publicApi";

const AccountName = () => {
  const { t } = useTranslation();
  const { control, setValue } = useFormContext();
  const antyProfile = useAntyProfileStore((state) => state.profile);
  const platform = usePlatformContext();

  useEffect(() => {
    if (platform === "anty" && antyProfile?.name) {
      setValue("accountName", antyProfile.name);
    }
  }, []);

  return (
    <Controller
      name="accountName"
      control={control}
      rules={{
        required: t("validation.required", {
          field: t("common.accountName").toLowerCase(),
        }),
      }}
      render={({ field, fieldState: { error } }) => (
        <TextField
          value={field.value}
          size="small"
          label={t("common.accountName")}
          fullWidth
          error={Boolean(error)}
          helperText={error?.message}
          onChange={({ target }) => {
            field.onChange(target.value);
          }}
        />
      )}
    />
  );
};

export default AccountName;
