import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { projectResourceIds } from '../(subMenuItems)';
import { projectFileConstant } from 'src/constants/project-file-contant';
import ProjectFileList from 'src/views/pages/projects/detail/project-file/project-file/project-file';

function ProjectPlanning() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <Box>
      <ProjectLayout
        activeMenuId={projectMenuIds.resource}
        activeSubMenuId={projectResourceIds.documents.planning}
        subMenuItems={subMenuItems(id as string, typeId as string)}
      >
        <ProjectFileList projectId={String(id)} type={projectFileConstant.PLANNING.value} />
      </ProjectLayout>
    </Box>
  );
}

ProjectPlanning.acl = {
  action: 'view',
  subject: 'projectplan'
};
export default ProjectPlanning;
