import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import MainConctractPriceComponent from 'src/views/pages/projects/detail/project-finance/main-contract-price';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import subMenuItems from './(subMenuItems)';

function ProjectVariation() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <Box>
      <ProjectLayout activeMenu={1} activeSubMenu={0} subMenuItems={subMenuItems(id as string, String(typeId))}>
        <MainConctractPriceComponent projectId={String(id)} />
      </ProjectLayout>
    </Box>
  );
}

ProjectVariation.acl = {
  action: 'view',
  subject: 'projectfinance'
};
export default ProjectVariation;
