import { useRouter } from 'next/router';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';
import subMenuItems from './(sub-menu-items)';
import StakeholderBranchList from 'src/views/pages/stakeholders/details/stakeholder-branch';

function EmployeeBranchIndex() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <StakeholderLayout activeMenu={1} activeSubMenu={0} subMenuItems={subMenuItems(id as string, typeId as string)}>
      <StakeholderBranchList model="stakeholder-branch" stakeholderId={String(id)} typeId={String(typeId)} />
    </StakeholderLayout>
  );
}

EmployeeBranchIndex.acl = {
  subject: 'stakeholder',
  action: 'view_stakeholder'
};

export default EmployeeBranchIndex;
