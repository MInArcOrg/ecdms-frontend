import { useRouter } from 'next/router';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';
import { stakeholderMenuIds } from 'src/views/pages/stakeholders/details/layout/stakeholder-menu-items';
import MachineryList from 'src/views/pages/stakeholders/details/stakeholder-machineries';
import subMenuItems, { stakeholderResourceIds } from '../(sub-menu-items)';

function StakeholderMaterialIndex() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <StakeholderLayout
      activeMenuId={stakeholderMenuIds.RESOURCE}
      activeSubMenuId={stakeholderResourceIds.resources.machineries}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <MachineryList stakeholderId={String(id)} />
    </StakeholderLayout>
  );
}

StakeholderMaterialIndex.acl = {
  action: 'view',
  subject: 'stakeholdermachinery'
};

export default StakeholderMaterialIndex;
