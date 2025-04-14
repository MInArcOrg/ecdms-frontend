import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import subMenuItems from './(subMenuItems)';
import ProjectFileList from 'src/views/pages/projects/detail/project-file/project-file/project-file';
import { projectFileConstant } from 'src/constants/project-file-contant';

function ProjectFileInitiation() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <Box>
      <ProjectLayout activeMenu={4} activeSubMenu={2} subMenuItems={subMenuItems(String(id), String(typeId))}>
        <ProjectFileList projectId={String(id)} type={projectFileConstant.INITIATION.value} />
      </ProjectLayout>
    </Box>
  );
}

ProjectFileInitiation.acl = {
  action: 'view',
  subject: 'file'
};
export default ProjectFileInitiation;
