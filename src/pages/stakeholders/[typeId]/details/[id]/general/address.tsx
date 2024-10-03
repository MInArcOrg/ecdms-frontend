import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';
import subMenuItems from './(subMenuItems)';
import AddressList from 'src/views/generics/address/address-list';

function StakeholderLocation() {
  // states / hooks / variables
  const router = useRouter();
  const { id, typeId } = router.query;
  return (
    <Box>
      <StakeholderLayout activeMenu={0} activeSubMenu={3} subMenuItems={subMenuItems(id as string, String(typeId))}>
        <AddressList type={'project'} modelId={String(id)} />
      </StakeholderLayout>
    </Box>
  );
}

StakeholderLocation.acl = {
  subject: 'projectinfo',
  action: 'view_stakeholder'
};

export default StakeholderLocation;
