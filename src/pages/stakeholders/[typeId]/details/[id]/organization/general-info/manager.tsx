import { useRouter } from 'next/router';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';
import subMenuItems, { stakeholderOrganizationIds } from '../(sub-menu-items)';
import StakeholderManagerList from 'src/views/pages/stakeholders/details/stakeholder-manager';
import { stakeholderMenuIds } from 'src/views/pages/stakeholders/details/layout/stakeholder-menu-items';

function StakeholderManagerIndex() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <StakeholderLayout
      activeMenuId={stakeholderMenuIds.ORGANIZATION}
      activeSubMenuId={stakeholderOrganizationIds.generalInfo.manager}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <StakeholderManagerList model="stakeholder-manager" stakeholderId={String(id)} typeId={String(typeId)} />
    </StakeholderLayout>
  );
}

StakeholderManagerIndex.acl = {
  subject: 'stakeholderownerormanager',
  action: 'view'
};

export default StakeholderManagerIndex;
