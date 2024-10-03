import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import ProjectTimeComponent from 'src/views/pages/projects/detail/project-time/project-time-info';
import subMenuItems from './(subMenuItems)';

function ProjectVariation() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <Box>
      <ProjectLayout activeMenu={2} activeSubMenu={0} subMenuItems={subMenuItems(id as string, String(typeId))}>
        <ProjectTimeComponent projectId={String(id)} />
      </ProjectLayout>
    </Box>
  );
}

ProjectVariation.acl = {
  action: 'view',
  subject: 'projectfinance'
};
export default ProjectVariation;
