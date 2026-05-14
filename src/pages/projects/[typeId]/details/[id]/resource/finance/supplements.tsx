import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { variationConstants } from 'src/constants/variation-constants';
import ProjectVariationList from 'src/views/pages/projects/detail/project-finance/project-variation';
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
        activeSubMenuId={projectResourceIds.finance.supplements}
        subMenuItems={subMenuItems(id as string, typeId as string, 'projects')}
      >
        {' '}
        <ProjectVariationList projectId={String(id)} type={variationConstants.SUPPLEMENT.value} />
      </ProjectLayout>
    </Box>
  );
}

ProjectVariation.acl = {
  action: 'view',
  subject: 'projectvariation'
};
export default ProjectVariation;
