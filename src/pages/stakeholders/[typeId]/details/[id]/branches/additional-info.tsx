import { useRouter } from "next/router"
import StakeholderLayout from "src/views/pages/stakeholders/details/layout/stakeholder-layout"
import subMenuItems from "./(sub-menu-items)"
import BranchAdditionalInformationList from "src/views/pages/stakeholders/details/branch-additional-information"

function BranchAdditionalInformationIndex() {
  const router = useRouter()
  const { id, typeId } = router.query

  return (
    <StakeholderLayout activeMenu={1} activeSubMenu={4} subMenuItems={subMenuItems(id as string, typeId as string)}>
      <BranchAdditionalInformationList
        model="branch-additional-information"
        stakeholderId={String(id)}
        typeId={String(typeId)}
      />
    </StakeholderLayout>
  )
}

BranchAdditionalInformationIndex.acl = {
  subject: "stakeholder",
  action: "view_stakeholder",
}

export default BranchAdditionalInformationIndex

