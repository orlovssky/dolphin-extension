import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import PanToolAltOutlinedIcon from "@mui/icons-material/PanToolAltOutlined";

import MODES from "../constants/PROXY_MODES";

export default {
  [MODES.NO_PROXY]: DoNotDisturbAltIcon,
  [MODES.NEW_PROXY]: AddCircleOutlineIcon,
  [MODES.SELECT_PROXY]: PanToolAltOutlinedIcon,
};
