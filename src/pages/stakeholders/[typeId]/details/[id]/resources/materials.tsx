import { useRouter } from "next/router"
import StakeholderLayout from "src/views/pages/stakeholders/details/layout/stakeholder-layout"
import MaterialList from "src/views/pages/stakeholders/details/stakeholder-materials"
import subMenuItems from "./(sub-menu-items)"


function Index() {
  const router = useRouter()
  const { id, typeId } = router.query;

  return (
    <StakeholderLayout activeMenu={0} activeSubMenu={5} subMenuItems={subMenuItems(id as string, String(typeId))}>
      <MaterialList stakeholderId={String(id)} />
    </StakeholderLayout>
  )
}

Index.acl = {
  action: "view",
  subject: "stakeholder-material",
}

export default Index

