import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';
import subMenuItems, { stakeholderOrganizationIds } from '../(sub-menu-items)';
import AddressList from 'src/views/generics/address/address-list';
import { stakeholderMenuIds } from 'src/views/pages/stakeholders/details/layout/stakeholder-menu-items';

function StakeholderLocation() {
  // states / hooks / variables
  const router = useRouter();
  const { id, typeId } = router.query;
  return (
    <Box>
    <StakeholderLayout activeMenuId={stakeholderMenuIds.ORGANIZATION} activeSubMenuId={stakeholderOrganizationIds.generalInfo.address} subMenuItems={subMenuItems(id as string, typeId as string)}>
    <AddressList type={'project'} modelId={String(id)} />
      </StakeholderLayout>
    </Box>
  );
}

StakeholderLocation.acl = {
  subject: 'address',
  action: 'view_address'
};

export default StakeholderLocation;
