import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { projectReportingIds } from '../(subMenuItems)';

function ProjectPlanning() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <Box>
      <ProjectLayout
        activeMenuId={projectMenuIds.reporting}
        activeSubMenuId={projectReportingIds.report.actualStatus}
        subMenuItems={subMenuItems(id as string, typeId as string)}
      >
        <>actual status goes here</>
      </ProjectLayout>
    </Box>
  );
}

ProjectPlanning.acl = {
  action: 'view',
  subject: 'projectplanning'
};
export default ProjectPlanning;
