import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useDolphinTokenData } from "entities/dolphinData/publicApi";
import { useEffect, useState } from "react";
import { Controller, Message, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface ISelectedProxy {
  id?: number;
  name: string | null;
  type: string;
  ip: string;
  port: number;
  login: string | null;
  password: string | null;
  change_ip_url: string | null;
}
const SelectProxy = () => {
  const { t } = useTranslation();
  const dolphinTokenData = useDolphinTokenData();
  const { control } = useFormContext();
  const [items, setItems] = useState<ISelectedProxy[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (dolphinTokenData) {
      const { host, authorization } = dolphinTokenData;

      setLoading(true);

      axios(`${host}/proxy`, {
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
      name="selectedProxy"
      control={control}
      rules={{
        required: t("validation.required", {
          field: t("proxy.proxy").toLowerCase(),
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
              label={t("proxy.proxy")}
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
