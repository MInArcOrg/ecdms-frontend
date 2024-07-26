import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Card, CardContent, CircularProgress } from '@mui/material';
import subMenuItems from './(subMenuItems)';
import { useTranslation } from 'react-i18next';
import ProjectLayout from 'src/views/pages/projects/detail/project-layout';
import ProjectStatusComponent from 'src/views/pages/projects/detail/project-status/project-status-component';

const ProjectStatus = () => {
  const router = useRouter();
  const { id, typeId } = router.query;




  return (
    <ProjectLayout
      activeMenu={0}
      activeSubMenu={3}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      
      <ProjectStatusComponent projectId={String(id)}/>
    </ProjectLayout>
  );
};

ProjectStatus.acl = {
  subject: 'projectstatus',
  action: 'view_projectstatus'
};

export default ProjectStatus;
