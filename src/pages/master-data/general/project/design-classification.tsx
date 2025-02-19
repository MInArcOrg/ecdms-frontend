import { Box } from '@mui/material';
import GeneralLayout from '../GeneralLayout';
import DesignClassificationCard from 'src/views/pages/master/design-classification';

function StakeholderLocation() {

  return (
    <Box>
      <GeneralLayout>
        <DesignClassificationCard />
      </GeneralLayout>
    </Box>
  );
}

StakeholderLocation.acl = {
  subject: 'projectinfo',
  action: 'view_stakeholder'
};

export default StakeholderLocation;