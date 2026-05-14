import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { bondConstants } from 'src/constants/bond-constants';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import subMenuItems, { projectResourceIds } from '../(subMenuItems)';
import ProjectBondList from 'src/views/pages/projects/detail/project-finance/project-bond';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';

function ProjectAdvanceBond() {
  const router = useRouter();
  const { id, typeId } = router.query;
  return (
    <Box>
      <ProjectLayout
        activeMenuId={projectMenuIds.resource}
        activeSubMenuId={projectResourceIds.finance.advanceBond}
        subMenuItems={subMenuItems(id as string, typeId as string, 'projects')}
      >
        {' '}
        <ProjectBondList projectId={String(id)} type={bondConstants.ADVANCE_BOND.value} />
      </ProjectLayout>
    </Box>
  );
}

ProjectAdvanceBond.acl = {
  action: 'view',
  subject: 'projectbond'
};
export default ProjectAdvanceBond;
