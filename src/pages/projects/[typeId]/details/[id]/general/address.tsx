import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import AddressList from 'src/views/generics/address/address-list';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import subMenuItems from './(subMenuItems)';

function ProjectLocation() {
  // states / hooks / variables
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <Box>
      <ProjectLayout activeMenu={0} activeSubMenu={2} subMenuItems={subMenuItems(id as string, String(typeId))}>
        <AddressList modelId={String(id)} type={'project'} />
      </ProjectLayout>
    </Box>
  );
}

ProjectLocation.acl = {
  subject: 'projectinfo',
  action: 'view_projectinfo'
};

export default ProjectLocation;
