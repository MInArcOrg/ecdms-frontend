import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { bondConstants } from 'src/constants/bond-constants';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import subMenuItems from './(subMenuItems)';
import ProjectBondList from 'src/views/pages/projects/detail/project-finance/project-bond';

function ProjectAdvanceBond() {
  const router = useRouter();
  const { id, typeId } = router.query;
  return (
    <Box>
      <ProjectLayout activeMenu={1} activeSubMenu={9} subMenuItems={subMenuItems(id as string, String(typeId))}>
        <ProjectBondList projectId={String(id)} type={bondConstants.BID_BOND.value} />
      </ProjectLayout>
    </Box>
  );
}

ProjectAdvanceBond.acl = {
  action: 'view',
  subject: 'projectbond'
};
export default ProjectAdvanceBond;
