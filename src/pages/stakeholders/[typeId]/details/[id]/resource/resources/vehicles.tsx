import { useRouter } from 'next/router';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';
import { stakeholderMenuIds } from 'src/views/pages/stakeholders/details/layout/stakeholder-menu-items';
import subMenuItems, { stakeholderResourceIds } from '../(sub-menu-items)';

function StakeholderMaterialIndex() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <StakeholderLayout
      activeMenuId={stakeholderMenuIds.RESOURCE}
      activeSubMenuId={stakeholderResourceIds.resources.vehicles}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <>vehicles need to be added here</>
    </StakeholderLayout>
  );
}

StakeholderMaterialIndex.acl = {
  action: 'view_stakeholdermachinery',
  subject: 'stakeholdermachinery'
};

export default StakeholderMaterialIndex;
