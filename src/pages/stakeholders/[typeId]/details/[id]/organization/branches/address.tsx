import { useRouter } from 'next/router';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';
import subMenuItems, { stakeholderOrganizationIds } from '../(sub-menu-items)';
import AddressList from 'src/views/generics/address/address-list';
import { Box } from '@mui/material';
import { stakeholderMenuIds } from 'src/views/pages/stakeholders/details/layout/stakeholder-menu-items';

function StakeholderBranchAddressIndex() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <Box>
      <StakeholderLayout
        activeMenuId={stakeholderMenuIds.ORGANIZATION}
        activeSubMenuId={stakeholderOrganizationIds.branches.address}
        subMenuItems={subMenuItems(id as string, typeId as string)}
      >
        <AddressList type={'stakeholderbranchaddress'} modelId={String(id)} />
      </StakeholderLayout>
    </Box>
  );
}

StakeholderBranchAddressIndex.acl = {
  subject: 'stakeholder',
  action: 'view_stakeholder'
};

export default StakeholderBranchAddressIndex;
