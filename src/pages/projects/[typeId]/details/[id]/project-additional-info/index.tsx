import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import ProjectAdditionalInfoList from 'src/views/pages/projects/detail/project-additional-info';
import subMenuItems from './(subMenuItems)';

function Index() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <ProjectLayout activeMenu={9} activeSubMenu={0} subMenuItems={subMenuItems(String(id), String(typeId))}>
      <ProjectAdditionalInfoList
        model="project-additional-info"
        projectId={String(id)}
        typeId={String(typeId)}
      />
     </ProjectLayout>
  );
}

Index.acl = {
  action: 'view_project_additional_info',
  subject: 'project-additional-info'
};

export default Index; 