import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { useAntyProfileStore } from "entities/antyData";
import { useDolphinTokenData } from "entities/dolphinData";
import { ChangeEvent, useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { usePlatformContext } from "shared/providers/platform";
import { useDebouncedCallback } from "use-debounce";

import getTags from "../api/requests/getTags";

const Tags = () => {
  const { t } = useTranslation();
  const antyProfile = useAntyProfileStore((state) => state.profile);
  const dolphinTokenData = useDolphinTokenData();
  const { control, setValue } = useFormContext();
  const platform = usePlatformContext();
  const [items, setItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const debounce = useDebouncedCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      if (dolphinTokenData?.dolphinType === "cloud") {
        setLoading(true);

        getTags({
          ...dolphinTokenData,
          search: value,
        })
          .then((data) => {
            setItems([...new Set(items.concat(data))]);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    },
    500
  );

  useEffect(() => {
    if (dolphinTokenData) {
      setLoading(true);

      getTags(dolphinTokenData)
        .then((data) => {
          const tags = data;

          if (
            platform === "anty" &&
            antyProfile?.tags &&
            Array.isArray(antyProfile.tags)
          ) {
            for (const tag of antyProfile.tags) {
              if (!tags.includes(tag)) {
                tags.push(tag);
              }
            }
          }

          setItems(tags);
        })
        .catch(() => {
          if (
            platform === "anty" &&
            antyProfile?.tags &&
            Array.isArray(antyProfile.tags)
          ) {
            setItems(antyProfile.tags);
          }
        })
        .finally(() => {
          setLoading(false);

          if (
            platform === "anty" &&
            antyProfile?.tags &&
            Array.isArray(antyProfile.tags)
          ) {
            setValue("tags", antyProfile.tags);
          }
        });
    }
  }, []);

  return (
    <Controller
      name="tags"
      control={control}
      render={({ field }) => (
        <Autocomplete
          sx={{ mt: 1.5 }}
          value={field.value}
          options={items}
          fullWidth
          multiple
          freeSolo
          loading={loading}
          renderInput={(params) => (
            <TextField
              {...params}
              label={t("common.tags")}
              size="small"
              helperText={t("common.optional")}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
              onInput={debounce}
            />
          )}
          onChange={(_, value) => {
            field.onChange(value);
          }}
        />
      )}
    />
  );
};

export default Tags;
