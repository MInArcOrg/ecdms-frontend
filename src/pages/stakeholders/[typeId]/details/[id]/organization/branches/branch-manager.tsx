import { useRouter } from 'next/router';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';
import StakeholderBranchManagerList from 'src/views/pages/stakeholders/details/stakeholder-branch-manager';
import { stakeholderMenuIds } from 'src/views/pages/stakeholders/details/layout/stakeholder-menu-items';
import subMenuItems, { stakeholderOrganizationIds } from '../(sub-menu-items)';

function StakeholderBranchManagerIndex() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <StakeholderLayout activeMenuId={stakeholderMenuIds.ORGANIZATION} activeSubMenuId={stakeholderOrganizationIds.branches.branchManager} subMenuItems={subMenuItems(id as string, typeId as string)}>
      <StakeholderBranchManagerList model="stakeholder-branch-manager" stakeholderId={String(id)} typeId={String(typeId)} />
    </StakeholderLayout>
  );
}

StakeholderBranchManagerIndex.acl = {
  subject: 'resource',
  action: 'view_resource'
};

export default StakeholderBranchManagerIndex;
