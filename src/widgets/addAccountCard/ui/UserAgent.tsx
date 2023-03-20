import TextField from "@mui/material/TextField";
import { useAntyProfileStore } from "entities/antyData/publicApi";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { usePlatformContext } from "shared/providers/platform/publicApi";
import { getCurrentTabInfo } from "shared/utils/chrome/publicApi";

const UserAgent = () => {
  const { t } = useTranslation();
  const { control, setValue } = useFormContext();
  const antyProfile = useAntyProfileStore((state) => state.profile);
  const platform = usePlatformContext();

  useEffect(() => {
    if (platform === "anty" && antyProfile?.useragent?.value) {
      setValue("userAgent", antyProfile.useragent.value);

      return;
    }

    getCurrentTabInfo().then(({ tabId }) => {
      chrome.scripting.executeScript(
        {
          target: { tabId },
          func: () => window.navigator.userAgent,
        },
        (results) => {
          if (Array.isArray(results) && results.length) {
            setValue("userAgent", results[0].result);
          }
        }
      );
    });
  }, []);

  return (
    <Controller
      name="userAgent"
      control={control}
      rules={{
        required: t("validation.required", {
          field: "user-agent",
        }),
      }}
      render={({ field, fieldState: { error } }) => (
        <TextField
          sx={{ mt: 1 }}
          value={field.value}
          size="small"
          label="User-Agent"
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

export default UserAgent;
