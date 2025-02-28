import { useRouter } from 'next/router';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';
import subMenuItems from './(sub-menu-items)';
import StakeholderBranchManagerList from 'src/views/pages/stakeholders/details/stakeholder-branch-manager';

function StakeholderBranchManagerIndex() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <StakeholderLayout activeMenu={1} activeSubMenu={1} subMenuItems={subMenuItems(id as string, typeId as string)}>
      <StakeholderBranchManagerList model="stakeholder-branch-manager" stakeholderId={String(id)} typeId={String(typeId)} />
    </StakeholderLayout>
  );
}

StakeholderBranchManagerIndex.acl = {
  subject: 'resource',
  action: 'view_resource'
};

export default StakeholderBranchManagerIndex;
