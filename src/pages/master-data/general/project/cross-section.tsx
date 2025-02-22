import { Box } from '@mui/material';
import GeneralLayout from '../GeneralLayout';
import CrossSectionTypeList from 'src/views/pages/master/cross-section-type';

function StakeholderLocation() {

  return (
    <Box>
      <GeneralLayout>
        <CrossSectionTypeList />
      </GeneralLayout>
    </Box>
  );
}

StakeholderLocation.acl = {
  subject: 'projectinfo',
  action: 'view_stakeholder'
};

export default StakeholderLocation;