import { useRouter } from 'next/router';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';
import subMenuItems from './(sub-menu-items)';
import StakeholderBranchContactPersonList from 'src/views/pages/stakeholders/details/branch-contact-person';

function StakeholderBranchContactPersonIndex() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <StakeholderLayout activeMenu={1} activeSubMenu={2} subMenuItems={subMenuItems(id as string, typeId as string)}>
      <StakeholderBranchContactPersonList model="stakeholder-branch-contact-person" stakeholderId={String(id)} typeId={String(typeId)} />
    </StakeholderLayout>
  );
}

StakeholderBranchContactPersonIndex.acl = {
  subject: 'resource',
  action: 'view_resource'
};

export default StakeholderBranchContactPersonIndex;
