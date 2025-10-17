import { useRouter } from 'next/router';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';
import subMenuItems, { stakeholderOrganizationIds } from '../(sub-menu-items)';
import StakeholderDepartmentList from 'src/views/pages/stakeholders/details/stakeholder-department';
import { stakeholderMenuIds } from 'src/views/pages/stakeholders/details/layout/stakeholder-menu-items';

function CompanyStructureIndex() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <StakeholderLayout
      activeMenuId={stakeholderMenuIds.ORGANIZATION}
      activeSubMenuId={stakeholderOrganizationIds.companyStructure.departments}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <StakeholderDepartmentList model="stakeholder-department" stakeholderId={String(id)} typeId={String(typeId)} />
    </StakeholderLayout>
  );
}

CompanyStructureIndex.acl = {
  subject: 'stakeholder',
  action: 'view_stakeholder'
};

export default CompanyStructureIndex;
