import { Card, CardContent, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';
import { stakeholderMenuIds } from 'src/views/pages/stakeholders/details/layout/stakeholder-menu-items';
import subMenuItems, { stakeholderProjectIds } from '../(sub-menu-items)';

function BranchAdditionalInformationIndex() {
  const router = useRouter();
  const { id, typeId } = router.query;
  return (
    <StakeholderLayout
      activeMenuId={stakeholderMenuIds.PROJECTS}
      activeSubMenuId={stakeholderProjectIds.services.trainings}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <Card sx={{ border: 1, borderColor: 'divider', borderRadius: 1 }}>
        <CardContent>
          <Typography variant="h6">Trainings</Typography>
        </CardContent>
      </Card>
    </StakeholderLayout>
  );
}

BranchAdditionalInformationIndex.acl = {
  subject: 'stakeholder',
  action: 'view'
};

export default BranchAdditionalInformationIndex;
