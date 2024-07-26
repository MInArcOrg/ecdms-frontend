import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import ProjectLayout from 'src/views/pages/projects/detail/project-layout';
import subMenuItems from './(subMenuItems)';



function ProjectMainContractPrice() {
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
      <MainContractPrice projectId={String(id)}/>
        
      </ProjectLayout>
    </Box>
  );
}


ProjectMainContractPrice.acl = {
  action: 'view_projectfinance',
  subject: 'projectfinance'
}
export default ProjectMainContractPrice;
