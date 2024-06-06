// ** React Imports

// ** MUI Imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// ** Icon Imports

// ** Custom Components
import CustomAvatar from 'src/@core/components/mui/avatar';
import { getInitials } from 'src/@core/utils/get-initials';
import { availableColors } from 'src/configs/app-constants';
import SmallTeam from 'src/types/team/small-team';

const SmallTeamViewLeft = ({ smallTeam }: { smallTeam: SmallTeam }) => {
  if (smallTeam) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent
              sx={{
                pt: 13.5,
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column'
              }}
            >
              <CustomAvatar
                skin="light"
                color={availableColors[Math.floor(Math.random() * availableColors.length)] as any}
                sx={{
                  mr: 2.5,
                  width: 100,
                  height: 100,
                  fontWeight: 500,
                  fontSize: (theme) => theme.typography.h2.fontSize
                }}
              >
                {getInitials(smallTeam.name)}
              </CustomAvatar>
              <Typography variant="h4" sx={{ mb: 3 }}>
                {smallTeam.name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  } else {
    return null;
  }
};
export default SmallTeamViewLeft;
