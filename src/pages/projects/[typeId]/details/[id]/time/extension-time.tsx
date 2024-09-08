import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import ProjectExtensionTimeList from 'src/views/pages/projects/detail/project-time/project-extension-time';
import subMenuItems from './(subMenuItems)';

function ProjectVariation() {
  const router = useRouter();
  const { id, typeId } = router.query;
  return (
    <Box>
      <ProjectLayout activeMenu={2} activeSubMenu={2} subMenuItems={subMenuItems(id as string, String(typeId))}>
        <ProjectExtensionTimeList projectId={String(id)} type={''} />
      </ProjectLayout>
    </Box>
  );
}

ProjectVariation.acl = {
  action: 'view',
  subject: 'projectextensiontime'
};
export default ProjectVariation;
