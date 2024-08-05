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
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ProjectTime | null>(null);

  const { data: projectTime, isLoading, refetch } = useQuery({
    queryKey: ['project-status', projectId],
    queryFn: () => projectTimeApiService.getAll({ filter: { project_id: projectId } }),
    select: (data) => data.payload?.[0] ?? null, // Extract the first item from the array
  });

  const handleDrawerClose = () => {
    setShowDrawer(false);
    setSelectedRow(null);
  };

  const handleDetailDrawerClose = () => {
    setShowDetailDrawer(false);
    setSelectedRow(null);
  };

  const handleChangeStatusClick = () => {
    // Handle status change logic here
  };

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
            toggle={handleDrawerClose}
            projectTime={projectTime as ProjectTime}
            refetch={refetch}
            projectId={projectId}
          />
        )}

        <Card>
          <CardContent>
            {projectTime && <TimelineSection data={projectTime} />}
            {projectTime && (
              <ProjectTimeAction
                refetch={refetch}
                projectTime={projectTime}
                onStatusChangeClick={handleChangeStatusClick}
              />
            )}
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default ProjectTimeComponent;
