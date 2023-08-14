import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'

import MODE from '../constants/MODE'

export default [
  {
    mode: MODE.LIGHT,
    icon: LightModeOutlinedIcon,
  },
  {
    mode: MODE.SYSTEM,
    icon: SettingsBrightnessIcon,
  },
  {
    mode: MODE.DARK,
    icon: DarkModeOutlinedIcon,
  },
]
