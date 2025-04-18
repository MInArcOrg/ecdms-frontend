import { useRouter } from 'next/router';
import StakeholderLayout from 'src/views/pages/stakeholders/details/layout/stakeholder-layout';
import SafetyEquipmentList from 'src/views/pages/stakeholders/details/stakeholder-safety-equipments';
import subMenuItems, { stakeholderResourceIds } from '../(sub-menu-items)';
import { stakeholderMenuIds } from 'src/views/pages/stakeholders/details/layout/stakeholder-menu-items';

function SafetyEquipmentIndex() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <StakeholderLayout
      activeMenuId={stakeholderMenuIds.RESOURCE}
      activeSubMenuId={stakeholderResourceIds.resources.safetyEquipment}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <SafetyEquipmentList stakeholderId={String(id)} />
    </StakeholderLayout>
  );
}

SafetyEquipmentIndex.acl = {
  action: 'view',
  subject: 'safetyequipment'
};

export default SafetyEquipmentIndex;
