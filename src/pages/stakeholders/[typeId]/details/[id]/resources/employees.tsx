import { useRouter } from "next/router"
import StakeholderLayout from "src/views/pages/stakeholders/details/layout/stakeholder-layout"
import StakeholderEmployeeList from "src/views/pages/stakeholders/details/stakeholder-employee"
import subMenuItems from "./(sub-menu-items)"

function StakeholderEmployeeIndex() {
  const router = useRouter()
  const { id, typeId } = router.query;

  return (
    <StakeholderLayout activeMenu={3} activeSubMenu={4} subMenuItems={subMenuItems(id as string, String(typeId))}>
      <StakeholderEmployeeList stakeholderId={String(id)} />
    </StakeholderLayout>
  )
}

StakeholderEmployeeIndex.acl = {
  action: "view",
  subject: "stakeholder-machinery",
}

export default StakeholderEmployeeIndex

