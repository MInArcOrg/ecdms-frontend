import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import MainConctractPriceComponent from 'src/views/pages/projects/detail/project-finance/main-contract-price';
import ProjectLayout from 'src/views/pages/projects/detail/project-layout';
import subMenuItems from './(subMenuItems)';
import ProjectVariationList from 'src/views/pages/projects/detail/project-finance/project-variation';
import { variationConstants } from 'src/constants/variation-contants';

function ProjectMainContractPrice() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <Box>
      <ProjectLayout activeMenu={0} activeSubMenu={3} subMenuItems={subMenuItems(id as string, String(typeId))}>
        <ProjectVariationList projectId={String(id)} type={variationConstants.OMISSION.value} />
      </ProjectLayout>
    </Box>
  );
}

ProjectMainContractPrice.acl = {
  action: 'view_variation',
  subject: 'variation'
};
export default ProjectMainContractPrice;
