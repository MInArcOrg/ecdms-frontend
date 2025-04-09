import { useRouter } from 'next/router';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';
import StakeholderEmployeeList from 'src/views/pages/stakeholders/details/stakeholder-employee';
import subMenuItems, { stakeholderResourceIds } from '../(sub-menu-items)';
import { stakeholderMenuIds } from 'src/views/pages/stakeholders/details/layout/stakeholder-menu-items';

function StakeholderEmployeeIndex() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <StakeholderLayout activeMenuId={stakeholderMenuIds.RESOURCE} activeSubMenuId={stakeholderResourceIds.resources.employees} subMenuItems={subMenuItems(id as string, typeId as string)}>
      <StakeholderEmployeeList stakeholderId={String(id)} />
    </StakeholderLayout>
  );
}

StakeholderEmployeeIndex.acl = {
  action: 'view',
  subject: 'stakeholder-machinery'
};

export default StakeholderEmployeeIndex;
