import { useRouter } from 'next/router';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';
import subMenuItems from './(sub-menu-items)';
import StakeholderDepartmentList from 'src/views/pages/stakeholders/details/stakeholder-department';

function CompanyStructureIndex() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <StakeholderLayout activeMenu={2} activeSubMenu={0} subMenuItems={subMenuItems(id as string, typeId as string)}>
      <StakeholderDepartmentList model="stakeholder-department" stakeholderId={String(id)} typeId={String(typeId)} />
    </StakeholderLayout>
  );
}

CompanyStructureIndex.acl = {
  subject: 'stakeholder',
  action: 'view_stakeholder'
};

export default CompanyStructureIndex;
