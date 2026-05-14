import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { projectResourceIds } from '../(subMenuItems)';
import ManpowerList from 'src/views/pages/projects/detail/resource/resources/manpower';

function ProjectVariation() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <Box>
      <ProjectLayout
        activeMenuId={projectMenuIds.resource}
        activeSubMenuId={projectResourceIds.resources.manpower}
        subMenuItems={subMenuItems(id as string, typeId as string, 'projects')}
      >
        <ManpowerList projectId={id as string} />
      </ProjectLayout>
    </Box>
  );
}

ProjectVariation.acl = {
  action: 'view',
  subject: 'projectmanpower'
};
export default ProjectVariation;
