import { Box } from '@mui/material';
import FunctionalClassificationDrawer from 'src/views/pages/master/functional-classification';
import GeneralLayout from '../GeneralLayout';
import DesignStandardList from 'src/views/pages/master/design-standard';

function StakeholderLocation() {

  return (
    <Box>
      <GeneralLayout>
        <DesignStandardList />
      </GeneralLayout>
    </Box>
  );
}

StakeholderLocation.acl = {
  subject: 'projectinfo',
  action: 'view_stakeholder'
};

export default StakeholderLocation;