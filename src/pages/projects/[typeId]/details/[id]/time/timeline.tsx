import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import MainConctractPriceComponent from 'src/views/pages/projects/detail/project-finance/main-contract-price';
import ProjectLayout from 'src/views/pages/projects/detail/project-layout';
import subMenuItems from './(subMenuItems)';
import ProjectTimeComponent from 'src/views/pages/projects/detail/project-time/project-time-info';

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
