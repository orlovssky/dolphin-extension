import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { IForm } from "components/main/cards/account/form";
import { Control, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useTokenContext } from "services/context/token.context";

const Tags = ({ control }: { control: Control<IForm> }) => {
  const { t } = useTranslation();
  const tokenContext = useTokenContext();
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
            <TextField {...params} label={t("common.tags")} size="small" />
          )}
          onChange={(_, value) => field.onChange(value)}
        />
      )}
    />
  );
};

export default Tags;
