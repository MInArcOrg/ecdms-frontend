import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';
import StakeholderContactPersonList from 'src/views/pages/stakeholders/stakeholder-contact-person';
import subMenuItems from './(subMenuItems)';

function StakeholderLocation() {
  // states / hooks / variables
  const router = useRouter();
  const { id, typeId } = router.query;
  return (
    <Box>
      <StakeholderLayout activeMenu={0} activeSubMenu={4} subMenuItems={subMenuItems(id as string, String(typeId))}>
        <StakeholderContactPersonList type={'project'} stakeholderId={String(id)} />
      </StakeholderLayout>
    </Box>
  );
}

StakeholderLocation.acl = {
  subject: 'projectinfo',
  action: 'view_stakeholder'
};

export default StakeholderLocation;
