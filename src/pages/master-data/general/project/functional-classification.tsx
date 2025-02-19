import { Box } from '@mui/material';
import FunctionalClassificationDrawer from 'src/views/pages/master/functional-classification';
import GeneralLayout from '../GeneralLayout';

function StakeholderLocation() {

  return (
    <Box>
      <GeneralLayout>
        <FunctionalClassificationDrawer />
      </GeneralLayout>
    </Box>
  );
}

StakeholderLocation.acl = {
  subject: 'projectinfo',
  action: 'view_stakeholder'
};

export default StakeholderLocation;