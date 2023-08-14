import CardContent from '@mui/material/CardContent'
import MuiCard, { CardProps } from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { PropsWithChildren } from 'react'

const Card = ({
  title,
  children,
  cardProps,
}: PropsWithChildren<{
  title: string
  cardProps?: CardProps
}>) => (
  <MuiCard variant="outlined" {...cardProps}>
    <CardContent>
      <Typography variant="subtitle1" component="h3" sx={{ mb: 0.5 }}>
        {title}
      </Typography>

      {children}
    </CardContent>
  </MuiCard>
)

export default Card
