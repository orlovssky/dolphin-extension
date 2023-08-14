import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

const FullScreenCircularProgress = () => (
  <Box
    sx={{
      width: '100%',
      minHeight: 'inherit',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <CircularProgress size={56} />
  </Box>
)

export default FullScreenCircularProgress
