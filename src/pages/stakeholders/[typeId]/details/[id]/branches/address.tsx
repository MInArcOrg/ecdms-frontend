import { useRouter } from 'next/router';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';
import subMenuItems from './(sub-menu-items)';
import AddressList from 'src/views/generics/address/address-list';
import { Box } from '@mui/material';

function StakeholderBranchAddressIndex() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <Box>
      <StakeholderLayout activeMenu={1} activeSubMenu={3} subMenuItems={subMenuItems(id as string, typeId as string)}>
        <AddressList type={'stakeholder-branch-address'} modelId={String(id)} />
      </StakeholderLayout>
    </Box>
  );
}

StakeholderBranchAddressIndex.acl = {
  subject: 'stakeholder',
  action: 'view_stakeholder'
};

export default StakeholderBranchAddressIndex;
