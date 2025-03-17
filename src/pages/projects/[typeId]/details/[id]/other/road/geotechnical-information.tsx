"use client"

import { useRouter } from "next/router"
import ProjectOtherLayout from "src/views/pages/projects/detail/other/layouts/project-other-layout"
import GeotechnicalInformationList from "src/views/pages/projects/detail/other/road/geotechnical-information"
import subMenuItems, { findOtherSubMenu } from "../(subMenuItems)"

function Index() {
  const router = useRouter()
  const { id, typeId } = router.query
  const baseUrl = `/projects/${typeId}/details/${id}/other`
  const activeMenu = 8
  const activeType = 2 
  const activeSubType = 47

  return (
    <ProjectOtherLayout
      activeMenu={activeMenu}
      activeType={activeType}
      activeSubMenu={activeSubType}
      subMenuItems={subMenuItems}
      baseUrl={baseUrl}
    >
      <GeotechnicalInformationList
        otherSubMenu={findOtherSubMenu(subMenuItems(baseUrl), activeType, activeSubType)}
        projectId={String(id)}
        typeId={String(typeId)}
      />
    </ProjectOtherLayout>
  )
}

Index.acl = {
  action: "view_other",
  subject: "other",
}

export default Index

