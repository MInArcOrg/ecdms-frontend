import { Box } from '@mui/material';
import GeneralLayout from '../GeneralLayout';
import SurfaceTypeList from 'src/views/pages/master/surface-type';

function StakeholderLocation() {

  return (
    <Box>
      <GeneralLayout>
        <SurfaceTypeList />
      </GeneralLayout>
    </Box>
  );
}

StakeholderLocation.acl = {
  subject: 'projectinfo',
  action: 'view_stakeholder'
};

export default StakeholderLocation;