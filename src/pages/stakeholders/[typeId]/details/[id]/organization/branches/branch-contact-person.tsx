import { useRouter } from 'next/router';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';
import subMenuItems, { stakeholderOrganizationIds } from '../(sub-menu-items)';
import StakeholderBranchContactPersonList from 'src/views/pages/stakeholders/details/branch-contact-person';
import { stakeholderMenuIds } from 'src/views/pages/stakeholders/details/layout/stakeholder-menu-items';

function StakeholderBranchContactPersonIndex() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <StakeholderLayout
      activeMenuId={stakeholderMenuIds.ORGANIZATION}
      activeSubMenuId={stakeholderOrganizationIds.branches.additionalInfo}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <StakeholderBranchContactPersonList model="stakeholder-branch-contact-person" stakeholderId={String(id)} typeId={String(typeId)} />
    </StakeholderLayout>
  );
}

StakeholderBranchContactPersonIndex.acl = {
  subject: 'resource',
  action: 'view_resource'
};

export default StakeholderBranchContactPersonIndex;
