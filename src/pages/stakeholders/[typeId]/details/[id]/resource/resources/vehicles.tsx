import { useRouter } from 'next/router';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';
import { stakeholderMenuIds } from 'src/views/pages/stakeholders/details/layout/stakeholder-menu-items';
import subMenuItems, { stakeholderResourceIds } from '../(sub-menu-items)';
import StakeholderVehicleList from 'src/views/pages/stakeholders/details/stakeholder-vehicle';

function StakeholderMaterialIndex() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <StakeholderLayout
      activeMenuId={stakeholderMenuIds.RESOURCE}
      activeSubMenuId={stakeholderResourceIds.resources.vehicles}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <StakeholderVehicleList stakeholderId={id as string} typeId={typeId as string} />
    </StakeholderLayout>
  );
}

StakeholderMaterialIndex.acl = {
  action: 'view_stakeholdermachinery',
  subject: 'stakeholdermachinery'
};

export default StakeholderMaterialIndex;
