import { Box } from '@mui/material';
import GeneralLayout from '../GeneralLayout';
import IntersectionTypeList from 'src/views/pages/master/intersection-type';

function StakeholderLocation() {

  return (
    <Box>
      <GeneralLayout>
        <IntersectionTypeList />
      </GeneralLayout>
    </Box>
  );
}

StakeholderLocation.acl = {
  subject: 'projectinfo',
  action: 'view_stakeholder'
};

export default StakeholderLocation;