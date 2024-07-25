import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import AddressList from 'src/views/generics/address/address-list';
import ProjectLayout from 'src/views/pages/projects/detail/project-layout';
import subMenuItems from './(subMenuItems)';



function ProjectLocation() {
  // states / hooks / variables
  const router = useRouter();
  const { id, typeId } = router.query;

  const { t } = useTranslation();

  return (
    <Box>
  
      <ProjectLayout
        activeMenu={0}
        activeSubMenu={2}
        subMenuItems={subMenuItems(id as string, String(typeId))}
      >
      <AddressList modelId={String(id)}/>
        
      </ProjectLayout>
    </Box>
  );
}

ProjectLocation.acl = {
  subject: 'projectinfo',
  action: 'view_projectinfo'
};

export default ProjectLocation;
