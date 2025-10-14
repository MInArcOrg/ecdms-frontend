import { Box, Card, CardContent, CardHeader, CircularProgress, Grid, Typography } from '@mui/material'
import { getStakeSummary } from 'src/services/analytics/general'
import ApiErrors from 'src/views/components/ApiErrors'

const AnalyticsPageLayout = ({ children }) => {
  return (
    <Box>
      <Card sx={{ display: 'flex', alignItems: 'center', p: 4, my: 6, gap: 8 }}>
        <Typography />
        <Typography variant='h6' sx={{ textDecoration: 'underline' }}>
          General
        </Typography>
        <Typography
          variant='h6'
          sx={{
            color: 'secondary.main'
          }}
        >
          Regional
        </Typography>
        <Typography
          variant='h6'
          sx={{
            color: 'secondary.main'
          }}
        >
          Other
        </Typography>
      </Card>

      <div>{children}</div>
    </Box>
  )
}

export default AnalyticsPageLayout
