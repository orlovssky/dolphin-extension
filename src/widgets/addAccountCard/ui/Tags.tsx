import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useDolphinTokenData } from "entities/dolphinData/publicApi";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const Tags = () => {
  const { t } = useTranslation();
  const dolphinTokenData = useDolphinTokenData();
  const { control } = useFormContext();
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
            setItems(data.data);
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
