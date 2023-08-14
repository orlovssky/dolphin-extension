import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt'
import PanToolAltOutlinedIcon from '@mui/icons-material/PanToolAltOutlined'

import MODE from '../constants/PROXY_MODE'

export default [
  {
    mode: MODE.NO_PROXY,
    icon: DoNotDisturbAltIcon,
  },
  {
    mode: MODE.NEW_PROXY,
    icon: AddCircleOutlineIcon,
  },
  {
    mode: MODE.SELECT_PROXY,
    icon: PanToolAltOutlinedIcon,
  },
]
