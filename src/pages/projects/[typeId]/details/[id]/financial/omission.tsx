import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { variationConstants } from 'src/constants/variation-constants';
import ProjectVariationList from 'src/views/pages/projects/detail/project-finance/project-variation';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import subMenuItems from './(subMenuItems)';

function ProjectVariation() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <Box>
      <ProjectLayout activeMenu={1} activeSubMenu={3} subMenuItems={subMenuItems(id as string, String(typeId))}>
        <ProjectVariationList projectId={String(id)} type={variationConstants.OMISSION.value} />
      </ProjectLayout>
    </Box>
  );
}

ProjectVariation.acl = {
  action: 'view',
  subject: 'variation'
};
export default ProjectVariation;
