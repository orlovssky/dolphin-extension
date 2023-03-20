import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useAntyProfileStore } from "entities/antyData/publicApi";
import { useDolphinTokenData } from "entities/dolphinData/publicApi";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { usePlatformContext } from "shared/providers/platform/publicApi";

import MODES from "../../lib/constants/PROXY_MODES";
import compareProxies from "../../lib/helpers/compareProxies";
import { ISelectedProxy } from "../../lib/typings/proxy";

const SelectProxy = () => {
  const { t } = useTranslation();
  const antyProfile = useAntyProfileStore((state) => state.profile);
  const dolphinTokenData = useDolphinTokenData();
  const { control, setValue, watch } = useFormContext();
  const platform = usePlatformContext();
  const mode = watch("proxyMode");
  const [items, setItems] = useState<ISelectedProxy[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (dolphinTokenData) {
      const { host, authorization } = dolphinTokenData;

      setLoading(true);

      axios<{ success: boolean; data: ISelectedProxy[] }>(`${host}/proxy`, {
        headers: { Authorization: authorization },
      })
        .finally(() => {
          setLoading(false);
        })
        .then(({ data }) => {
          if (data.success && Array.isArray(data.data)) {
            if (platform === "anty" && antyProfile?.proxy) {
              let preselectedProxy = null;

              for (const proxy of data.data) {
                if (compareProxies(proxy, antyProfile.proxy)) {
                  preselectedProxy = proxy;
                  break;
                }
              }

              if (preselectedProxy) {
                setValue("selectedProxy", preselectedProxy);
              } else {
                let newProxy = `${antyProfile.proxy.type}://${antyProfile.proxy.host}:${antyProfile.proxy.port}`;

                if (antyProfile.proxy.login && antyProfile.proxy.password) {
                  newProxy += `:${antyProfile.proxy.login}:${antyProfile.proxy.password}`;
                }

                if (antyProfile.proxy.name) {
                  setValue("newProxyName", antyProfile.proxy.name);
                }

                if (antyProfile.proxy.changeIpUrl) {
                  setValue("withChangeIpUrl", true);
                  setValue("changeIpUrl", antyProfile.proxy.changeIpUrl);
                }

                setValue("newProxy", newProxy);
                setValue("proxyMode", MODES.NEW_PROXY);
              }
            }

            setItems(data.data);
          }
        });
    }
  }, []);

  return mode === MODES.SELECT_PROXY ? (
    <Controller
      name="selectedProxy"
      control={control}
      rules={{
        required: t("validation.required", {
          field: t("proxy.proxy").toLowerCase(),
        }),
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
  ) : null;
};

export default SelectProxy;
