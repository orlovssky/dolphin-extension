import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import IconButton from '@mui/material/IconButton'
import { useClearDolphinData } from 'entities/dolphin'

const SignOut = () => {
  const clearDolphinData = useClearDolphinData()

  return (
    <IconButton color="inherit" onClick={clearDolphinData}>
      <LogoutOutlinedIcon />
    </IconButton>
  )
}

export default SignOut
