import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useAntyProfileStore } from "entities/antyData/publicApi";
import { useDolphinTokenData } from "entities/dolphinData/publicApi";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const Tags = ({ isAnty }: { isAnty: boolean }) => {
  const { t } = useTranslation();
  const antyProfile = useAntyProfileStore((state) => state.profile);
  const dolphinTokenData = useDolphinTokenData();
  const { control, setValue } = useFormContext();
  const [items, setItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (dolphinTokenData) {
      const { host, authorization } = dolphinTokenData;

      setLoading(true);
      axios(`${host}/tags?only_from=accounts`, {
        headers: { Authorization: authorization },
      })
        .finally(() => {
          setLoading(false);
        })
        .then(({ data }) => {
          if (data.success && Array.isArray(data.data)) {
            const tags = data.data;

            if (
              isAnty &&
              antyProfile?.tags &&
              Array.isArray(antyProfile.tags)
            ) {
              for (const tag of antyProfile.tags) {
                if (!tags.include(tag)) {
                  tags.push(tag);
                }
              }
            }

            setItems(tags);
          }
        })
        .catch(() => {
          if (isAnty && antyProfile?.tags && Array.isArray(antyProfile.tags)) {
            setItems(antyProfile.tags);
          }
        })
        .finally(() => {
          if (isAnty && antyProfile?.tags && Array.isArray(antyProfile.tags)) {
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
