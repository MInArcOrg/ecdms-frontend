import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import AddressList from 'src/views/generics/address/address-list';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import subMenuItems, { projectSetupIds } from '../(subMenuItems)';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';

function ProjectLocation() {
  // states / hooks / variables
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <Box>
      <ProjectLayout
        activeMenuId={projectMenuIds.projectSetup}
        activeSubMenuId={projectSetupIds.generalInfo.address}
        subMenuItems={subMenuItems}
      >
        <AddressList modelId={String(id)} type={'project'} />
      </ProjectLayout>
    </Box>
  );
}

ProjectLocation.acl = {
  subject: 'project',
  action: 'view'
};

export default ProjectLocation;
