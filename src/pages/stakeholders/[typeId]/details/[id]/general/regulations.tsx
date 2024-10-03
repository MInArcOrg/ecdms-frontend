import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';
import StakeholderRegulationList from 'src/views/pages/stakeholders/details/stakeholder-regulation';
import subMenuItems from './(subMenuItems)';

function StakeholderTraining() {
  // states / hooks / variables
  const router = useRouter();
  const { id, typeId } = router.query;
  return (
    <Box>
      <StakeholderLayout activeMenu={0} activeSubMenu={6} subMenuItems={subMenuItems(id as string, String(typeId))}>
        <StakeholderRegulationList stakeholderId={String(id)} />
      </StakeholderLayout>
    </Box>
  );
}

StakeholderTraining.acl = {
  subject: 'projectinfo',
  action: 'view_stakeholder'
};

export default StakeholderTraining;
