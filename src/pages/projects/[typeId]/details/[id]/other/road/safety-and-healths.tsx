import { useRouter } from 'next/router';
import ProjectOtherLayout from 'src/views/pages/projects/detail/other/layouts/project-other-layout';
import subMenuItems, { findOtherSubMenu } from '../(subMenuItems)';
import SafetyAndHealthList from 'src/views/pages/projects/detail/other/road/safety-and-health';

function Index() {
  const router = useRouter();
  const { id, typeId } = router.query;
  const baseUrl = `/projects/${typeId}/details/${id}/other`;
  const activeMenu = 8;
  const activeType = 2;
  const activeSubType = 24;

  return (
    <ProjectOtherLayout
      activeMenu={activeMenu}
      activeType={activeType}
      activeSubMenu={activeSubType}
      subMenuItems={subMenuItems}
      baseUrl={baseUrl}
    >
      <SafetyAndHealthList
        otherSubMenu={findOtherSubMenu(subMenuItems(baseUrl), activeType, activeSubType)}
        projectId={String(id)}
        typeId={String(typeId)}
      />
    </ProjectOtherLayout>
  );
}

Index.acl = {
  action: 'view_other',
  subject: 'other'
};

export default Index;
