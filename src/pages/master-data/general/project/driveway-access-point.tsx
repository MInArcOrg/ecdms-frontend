import { Box } from '@mui/material';
import GeneralLayout from '../GeneralLayout';
import DrivewayAccessPointList from 'src/views/pages/master/driveway-access-point';

function StakeholderLocation() {

  return (
    <Box>
      <GeneralLayout>
        <DrivewayAccessPointList />
      </GeneralLayout>
    </Box>
  );
}

StakeholderLocation.acl = {
  subject: 'projectinfo',
  action: 'view_stakeholder'
};

export default StakeholderLocation;