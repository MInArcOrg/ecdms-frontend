import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';
import StakeholderContactPersonList from 'src/views/pages/stakeholders/stakeholder-contact-person';
import subMenuItems, { stakeholderOrganizationIds } from '../(sub-menu-items)';
import { stakeholderMenuIds } from 'src/views/pages/stakeholders/details/layout/stakeholder-menu-items';

function StakeholderContactPersonIndex() {
  // states / hooks / variables
  const router = useRouter();
  const { id, typeId } = router.query;
  return (
    <Box>
    <StakeholderLayout activeMenuId={stakeholderMenuIds.ORGANIZATION} activeSubMenuId={stakeholderOrganizationIds.generalInfo.contactPerson} subMenuItems={subMenuItems(id as string, typeId as string)}>
    <StakeholderContactPersonList type={'project'} stakeholderId={String(id)} />
      </StakeholderLayout>
    </Box>
  );
}

StakeholderContactPersonIndex.acl = {
  subject: 'stakeholdercontactperson',
  action: 'view_stakeholdercontactperson'
};

export default StakeholderContactPersonIndex;
