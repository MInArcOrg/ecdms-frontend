import { Box, Card, Typography } from '@mui/material';

const AnalyticsPageLayout = ({ children }) => {
  return (
    <Box>
      <Card sx={{ display: 'flex', alignItems: 'center', p: 4, my: 6, gap: 8 }}>
        <Typography />
        <Typography variant="h6" sx={{ textDecoration: 'underline' }}>
          General
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: 'secondary.main'
          }}
        >
          Regional
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: 'secondary.main'
          }}
        >
          Other
        </Typography>
      </Card>

      <div>{children}</div>
    </Box>
  );
};

export default AnalyticsPageLayout;
