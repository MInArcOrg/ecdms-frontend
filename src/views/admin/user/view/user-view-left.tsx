// ** React Imports
import { useState } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// ** Icon Imports
import Icon from 'src/@core/components/icon';

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip';
import ChangePasswordDrawer from './change-password-drawer';

// ** Types
import { useTranslation } from 'react-i18next';

// ** Utils Import
import User from 'src/types/admin/user';
import UserAvatar from '../user-avatar';

const UserViewLeft = ({ user }: { user: User }) => {
  const { t } = useTranslation();
  // ** States
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);

  if (user) {
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
              <UserAvatar variant="rounded" sx={{ width: 100, height: 100, mb: 4, fontSize: '3rem' }} user={user} />
              <Typography variant="h4" sx={{ mb: 3 }}>
                {user.name}
              </Typography>
              <CustomChip rounded skin="light" size="small" sx={{ textTransform: 'capitalize' }} />
            </CardContent>

            <Divider sx={{ my: '0 !important', mx: 6 }} />

            <CardContent sx={{ pb: 4 }}>
              <Typography variant="body2" sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
                Details
              </Typography>
              <Box sx={{ pt: 4 }}>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Email:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{user.email}</Typography>
                </Box>

                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Role:</Typography>
                  <Typography
                    sx={{
                      color: 'text.secondary',
                      textTransform: 'capitalize'
                    }}
                  >{user?.position.name}</Typography>
                </Box>

                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, color: 'text.secondary' }}>Contact:</Typography>
                  <Typography sx={{ color: 'text.secondary' }}> {user.phone}</Typography>
                </Box>
              </Box>
            </CardContent>

            <Divider sx={{ my: '0 !important', mx: 6 }} />

            <CardContent>
              <Button
                fullWidth
                variant="contained"
                startIcon={<Icon icon="tabler:lock" />}
                onClick={() => setOpenPasswordDialog(true)}
              >
                {t('user.password.change-password')}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <ChangePasswordDrawer
          open={openPasswordDialog}
          toggle={() => setOpenPasswordDialog(false)}
          userId={user.id}
        />
      </Grid>
    );
  } else {
    return null;
  }
};

export default UserViewLeft;
