import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useTokenContext } from "services/context/token.context";
import { IForm } from "types/main/account/form.types";

const Tags = () => {
  const { t } = useTranslation();
  const tokenContext = useTokenContext();
  const { control } = useFormContext();
  const [items, setItems] = useState<IForm["tags"]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tokenContext) {
      const { data } = tokenContext;

      setLoading(true);
      axios(`${data.host}/tags?only_from=accounts`, {
        headers: { Authorization: data.authorization },
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
          loading={loading}
          renderInput={(params) => (
            <TextField
              {...params}
              label={t("common.tags")}
              size="small"
              helperText={t("common.optional")}
            />
          )}
          onChange={(_, value) => field.onChange(value)}
        />
      )}
    />
  );
};

export default Tags;