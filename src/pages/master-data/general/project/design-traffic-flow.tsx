import { Box } from '@mui/material';
import GeneralLayout from '../GeneralLayout';
import DesignTrafficFlowList from 'src/views/pages/master/design-traffic-flow';

function StakeholderLocation() {

  return (
    <Box>
      <GeneralLayout>
        <DesignTrafficFlowList />
      </GeneralLayout>
    </Box>
  );
}

StakeholderLocation.acl = {
  subject: 'projectinfo',
  action: 'view_stakeholder'
};

export default StakeholderLocation;