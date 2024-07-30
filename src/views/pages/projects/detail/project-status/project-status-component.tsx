import { Card, CardContent } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import LoadingPlaceholder from 'src/views/components/loader';

import projectStatusApiService from 'src/services/project/project-status-service';
import { ProjectStatus } from 'src/types/project';
import ProjectStatusAction from './project-status-action';
import ProjectStatusDetail from './project-status-detail';
import ProjectStatusDrawer from './project-status-drawer';
import TimelineSection from './project-time-line';

interface ProjectStatusComponentProps {
  projectId: string;
}

const ProjectStatusComponent: React.FC<ProjectStatusComponentProps> = ({ projectId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ProjectStatus | null>(null);

  const {
    data: projectStatus,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['project-status', projectId],
    queryFn: () => projectStatusApiService.getAll({ filter: { project_id: projectId } })
  });

  const handleStatusClick = (item: ProjectStatus) => {
    setSelectedRow(item);
    setShowDetailDrawer(true);
  };

  const handleChangeStatusClick = () => {
    setSelectedRow(projectStatus?.payload[0] || null);
    setShowDrawer(true);
  };

  const handleDrawerClose = () => {
    setShowDrawer(false);
    setSelectedRow(null);
  };

  const handleDetailDrawerClose = () => {
    setShowDetailDrawer(false);
    setSelectedRow(null);
  };

  return isLoading ? (
    <LoadingPlaceholder />
  ) : (
    <>
      {showDrawer && selectedRow && (
        <ProjectStatusDrawer
          open={showDrawer}
          toggle={handleDrawerClose}
          projectStatus={selectedRow}
          refetch={refetch}
          projectId={projectId}
        />
      )}
      {showDetailDrawer && selectedRow && (
        <ProjectStatusDetail open={showDetailDrawer} projectStatus={selectedRow} toggleDrawer={handleDetailDrawerClose} refetch={refetch} />
      )}
      <Card>
        <CardContent>
          <TimelineSection data={projectStatus?.payload || []} onStatusClick={handleStatusClick} />
          {projectStatus?.payload && projectStatus?.payload?.length > 0 && (
            <ProjectStatusAction refetch={refetch} projectStatus={projectStatus.payload[0]} onStatusChangeClick={handleChangeStatusClick} />
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default ProjectStatusComponent;
