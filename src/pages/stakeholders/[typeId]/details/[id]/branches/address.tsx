import { useRouter } from 'next/router';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';
import subMenuItems from './(sub-menu-items)';
import StakeholderBranchAddressList from 'src/views/pages/stakeholders/details/stakeholder-branch-address';

function StakeholderBranchAddressIndex() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <StakeholderLayout activeMenu={1} activeSubMenu={3} subMenuItems={subMenuItems(id as string, typeId as string)}>
      <StakeholderBranchAddressList model="stakeholder-branch-address" stakeholderId={String(id)} typeId={String(typeId)} />
    </StakeholderLayout>
  );
}

StakeholderBranchAddressIndex.acl = {
  subject: 'resource',
  action: 'view_resource'
};

export default StakeholderBranchAddressIndex;
