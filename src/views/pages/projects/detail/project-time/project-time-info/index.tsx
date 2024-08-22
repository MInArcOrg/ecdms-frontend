import { Box, Card, CardContent, IconButton } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import LoadingPlaceholder from 'src/views/components/loader';

import ProjectTimeAction from './project-time-action';
import ProjectTimeDrawer from './project-time-drawer';
import TimelineSection from './project-time-line';
import { ProjectTime } from 'src/types/project/project-time';
import Can from 'src/layouts/components/acl/Can';
import Icon from 'src/@core/components/icon';
import projectTimeApiService from 'src/services/project/project-time-service';

interface ProjectTimeComponentProps {
  projectId: string;
}

const ProjectTimeComponent: React.FC<ProjectTimeComponentProps> = ({ projectId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const {
    data: projectTime,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['project-status', projectId],
    queryFn: () => projectTimeApiService.getAll({ filter: { project_id: projectId } }),
    select: (data) => data.payload?.[0] ?? null // Extract the first item from the array
  });

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (projectTime: ProjectTime) => {
    toggleDrawer();
  };
  const handleDelete = async (projectTimeId: string) => {
    await projectTimeApiService.delete(projectTimeId);
    refetch();
  };
  console.log('project time updated', projectTime);
  return isLoading ? (
    <LoadingPlaceholder />
  ) : (
    <>
      <Box display="flex" flexDirection="column" gap={3}>
        {!projectTime && (
          <Can do="register" on="projecttime">
            <Box alignSelf="end">
              <IconButton onClick={() => setShowDrawer(true)}>
                <Icon icon="tabler:plus" width="25" height="25" />
              </IconButton>
            </Box>
          </Can>
        )}
        {showDrawer && (
          <ProjectTimeDrawer
            open={showDrawer}
            toggle={toggleDrawer}
            projectTime={projectTime as ProjectTime}
            refetch={refetch}
            projectId={projectId}
          />
        )}

        <Card>
          <CardContent>
            {projectTime && <TimelineSection data={projectTime} />}
            {projectTime && <ProjectTimeAction refetch={refetch} projectTime={projectTime} onDelete={handleDelete} onEdit={handleEdit} />}
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default ProjectTimeComponent;
