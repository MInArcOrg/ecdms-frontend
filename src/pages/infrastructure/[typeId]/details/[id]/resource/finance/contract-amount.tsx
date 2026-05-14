import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import MainConctractPriceComponent from 'src/views/pages/projects/detail/project-finance/main-contract-price';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import subMenuItems, { projectResourceIds } from '../(subMenuItems)';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';

function ProjectVariation() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <Box>
      <ProjectLayout
        activeMenuId={projectMenuIds.resource}
        activeSubMenuId={projectResourceIds.finance.contractAmount}
        subMenuItems={subMenuItems(id as string, typeId as string, 'infrastructure')}
      >
        {' '}
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
