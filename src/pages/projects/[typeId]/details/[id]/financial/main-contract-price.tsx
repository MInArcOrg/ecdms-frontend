import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import MainConctractPriceComponent from 'src/views/pages/projects/detail/project-finance/main-contract-price';
import ProjectLayout from 'src/views/pages/projects/detail/project-layout';
import subMenuItems from './(subMenuItems)';

function ProjectMainContractPrice() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <Box>
      <ProjectLayout activeMenu={0} activeSubMenu={2} subMenuItems={subMenuItems(id as string, String(typeId))}>
        <MainConctractPriceComponent projectId={String(id)} />
      </ProjectLayout>
    </Box>
  );
}

ProjectMainContractPrice.acl = {
  action: 'view_projectfinance',
  subject: 'projectfinance'
};
export default ProjectMainContractPrice;
