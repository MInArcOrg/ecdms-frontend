// ** MUI Imports
import { Icon } from '@iconify/react';
import { CircularProgress, Divider, IconButton, Tooltip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { Fragment, useState } from 'react';
// import CentersDrawer from './sub-department/sub-department-drawer';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import departmentApiService from 'src/services/department/department-service';
import Department from 'src/types/department/department';
import SubDepartmentDrawer from './sub-department/sub-department-drawer';
const ProfileCard = ({ department, refetch, loading }: { department: Department; refetch: () => void; loading: boolean }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const { data: departmentHead } = useQuery({
    queryKey: ['head-department', department?.id],
    queryFn: () => departmentApiService.getDepartmentHead(department?.id, {})
  });
  const handleDrawer = () => {
    setShowDrawer(!showDrawer);
  };
  const { t } = useTranslation();

  return (
    <Card sx={{ position: 'relative' }}>
      {showDrawer && (
        <SubDepartmentDrawer
          open={showDrawer}
          toggle={handleDrawer}
          refetch={refetch}
          subDepartment={department as Department}
          departmentId={department.parent_department_id}
        />
      )}
      <input id="upload-cover-pic" type="file" hidden />
      <Tooltip title="Upload Cover Picture" placement="top" arrow>
        <label htmlFor="upload-cover-pic">
          <CardMedia sx={{ height: '6rem', cursor: 'pointer' }} image="/images/cards/background-user.png" />
        </label>
      </Tooltip>
      <input id="upload-avatar-pic" type="file" hidden />
      <label htmlFor="upload-avatar-pic">
        <Tooltip title="Upload Profile Picture" placement="top" arrow>
          <Avatar
            alt="Robert Meyer"
            src="/images/avatars/1.png"
            sx={{
              width: 90,
              height: 90,
              left: '1.313rem',
              top: '-1.5rem',
              cursor: 'pointer',

              border: (theme) => `solid ${theme.palette.common.white}`
            }}
          />
        </Tooltip>
      </label>

      <CardContent>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box>
            <Typography variant="h6" sx={{ color: 'text.primary', mt: 0 }}>
              {department?.name}
            </Typography>
            <IconButton
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'text.primary'
                }
              }}
              onClick={handleDrawer}
            >
              <Icon icon="tabler:edit" fontSize={19} />
            </IconButton>
            <Typography
              href="/department-structure"
              component={Link}
              sx={{
                textDecoration: 'none',
                display: 'block',
                color: 'primary.main'
              }}
              mb={2}
            >
              {t('department.department-structure')}
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }} mb={3}>
              {department?.description}
            </Typography>
            {departmentHead?.full_name && (
              <Fragment>
                <Divider />
                <Box display="flex" alignItems="center" gap={3} py={2}>
                  <Avatar sx={{ backgroundColor: 'primary.light', color: '#fff' }}>{departmentHead?.full_name}</Avatar>
                  <Box>
                    <Typography variant="subtitle1" mt={3.5}>
                      {departmentHead?.full_name}
                    </Typography>
                    <Typography variant="subtitle2" mb={3.5}>
                      {departmentHead?.position_name}
                    </Typography>
                  </Box>
                </Box>
                <Divider />
              </Fragment>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
