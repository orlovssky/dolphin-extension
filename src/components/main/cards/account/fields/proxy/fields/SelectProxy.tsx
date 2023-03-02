import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useEffect, useState } from "react";
import { Controller, Message, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useTokenContext } from "services/context/token.context";
import { ISelectedProxy } from "types/main/account/proxy.types";

const SelectProxy = () => {
  const { t } = useTranslation();
  const tokenContext = useTokenContext();
  const { control } = useFormContext();
  const [items, setItems] = useState<ISelectedProxy[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tokenContext) {
      const { data } = tokenContext;

      setLoading(true);
      axios(`${data.host}/proxy`, {
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
      name="selectedProxy"
      control={control}
      rules={{
        required: t("validation.required", {
          field: t("common.proxy.proxy").toLowerCase(),
        }) as Message,
      }}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          sx={{ mt: 1.5 }}
          value={field.value}
          options={items}
          getOptionLabel={({ name, type, ip, port }) =>
            name || `${type}://${ip}:${port}`
          }
          fullWidth
          loading={loading}
          renderInput={(params) => (
            <TextField
              {...params}
              label={t("common.proxy.proxy")}
              size="small"
              error={Boolean(error)}
              helperText={error?.message}
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

export default SelectProxy;
