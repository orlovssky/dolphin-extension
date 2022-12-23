import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Mode, {
  MODES,
} from "components/main/cards/account/fields/proxy/fields/Mode";
import SelectProxy from "components/main/cards/account/fields/proxy/fields/SelectProxy";
import NewProxy from "components/main/cards/account/fields/proxy/fields/newProxy/NewProxy";
import { useFormContext } from "react-hook-form";

const Proxy = () => {
  const { watch } = useFormContext();
  const mode = watch("proxyMode");

  return (
    <Card variant="outlined">
      <CardContent sx={{ "&:last-child": { pb: 2 } }}>
        <Mode />
        {mode === MODES.NEW_PROXY && <NewProxy />}
        {mode === MODES.SELECT_PROXY && <SelectProxy />}
      </CardContent>
    </Card>
  );
};

export default Proxy;
