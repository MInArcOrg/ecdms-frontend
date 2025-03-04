import { useRouter } from "next/router"
import StakeholderLayout from "src/views/pages/stakeholders/details/layout/stakeholder-layout"
import SafetyEquipmentList from "src/views/pages/stakeholders/details/stakeholder-safety-equipments"
import subMenuItems from "./(sub-menu-items)"

function SafetyEquipmentIndex() {
  const router = useRouter()
  const { id, typeId } = router.query;

  return (
    <StakeholderLayout activeMenu={3} activeSubMenu={2} subMenuItems={subMenuItems(id as string, String(typeId))}>
      <SafetyEquipmentList stakeholderId={String(id)} />
    </StakeholderLayout>
  )
}

SafetyEquipmentIndex.acl = {
  action: "view",
  subject: "safety-equipment",
}

export default SafetyEquipmentIndex

