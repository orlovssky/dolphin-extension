import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { useDolphinProfileStore } from 'entities/dolphin'

import SettingsBar from './SettingsBar'
import SignOut from './SignOut'
import Title from './Title'

const AppBar = () => {
  const dolphinProfile = useDolphinProfileStore((state) => state.profile)

  return (
    <>
      <MuiAppBar elevation={0} enableColorOnDark>
        <Toolbar variant="dense" sx={{ justifyContent: 'space-between' }}>
          {Boolean(dolphinProfile?.id) && <SignOut />}
          <Title />
          <SettingsBar />
        </Toolbar>
      </MuiAppBar>
      <Toolbar variant="dense" />
    </>
  )
}

export default AppBar
