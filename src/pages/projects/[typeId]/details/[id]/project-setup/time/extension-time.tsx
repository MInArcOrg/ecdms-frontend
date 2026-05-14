import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import ProjectExtensionTimeList from 'src/views/pages/projects/detail/project-time/project-extension-time';
import subMenuItems, { projectSetupIds } from '../(subMenuItems)';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';

function ProjectVariation() {
  const router = useRouter();
  const { id, typeId } = router.query;
  return (
    <Box>
      <ProjectLayout
        activeMenuId={projectMenuIds.projectSetup}
        activeSubMenuId={projectSetupIds.time.extensionTime}
        subMenuItems={subMenuItems}
      >
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
