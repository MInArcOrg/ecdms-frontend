import { useRouter } from 'next/router';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';
import subMenuItems, { stakeholderOrganizationIds } from '../(sub-menu-items)';
import StakeholderBranchList from 'src/views/pages/stakeholders/details/stakeholder-branch';
import { stakeholderMenuIds } from 'src/views/pages/stakeholders/details/layout/stakeholder-menu-items';

function EmployeeBranchIndex() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <StakeholderLayout activeMenuId={stakeholderMenuIds.ORGANIZATION} activeSubMenuId={stakeholderOrganizationIds.generalInfo.additionalInfo} subMenuItems={subMenuItems(id as string, typeId as string)}>
      <StakeholderBranchList model="stakeholder-branch" stakeholderId={String(id)} typeId={String(typeId)} />
    </StakeholderLayout>
  );
}

EmployeeBranchIndex.acl = {
  subject: 'stakeholder',
  action: 'view_stakeholder'
};

export default EmployeeBranchIndex;
