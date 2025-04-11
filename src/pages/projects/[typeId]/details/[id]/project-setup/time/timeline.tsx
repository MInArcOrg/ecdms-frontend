import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import ProjectTimeComponent from 'src/views/pages/projects/detail/project-time/project-time-info';
import subMenuItems, { projectSetupIds } from '../(subMenuItems)';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';

function ProjectVariation() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <Box>
      <ProjectLayout
        activeMenuId={projectMenuIds.projectSetup}
        activeSubMenuId={projectSetupIds.time.time}
        subMenuItems={subMenuItems(id as string, typeId as string)}
      >        <ProjectTimeComponent projectId={String(id)} />
      </ProjectLayout>
    </Box>
  );
}

ProjectVariation.acl = {
  action: 'view',
  subject: 'projectfinance'
};
export default ProjectVariation;
