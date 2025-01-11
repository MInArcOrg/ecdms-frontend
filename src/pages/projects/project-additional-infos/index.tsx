import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@mui/material';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectAdditionalInfosApiService from 'src/services/project/project-additional-info';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { ProjectAdditionalInfo } from 'src/types/project/project-additional-infos';
import ItemsListing from 'src/views/shared/listing';
import ProjectAdditionalInfoCard from 'src/views/pages/projects/detail/project-info-drawer/project-additional-info-card';
import ProjectAdditionalInfoDrawer from 'src/views/pages/projects/detail/project-info-drawer/project-additional-info-drawer.tsx';

interface ProjectAdditionalInfoPageProps {
  projectId: string;
  onClose?: () => void;
}

const ProjectAdditionalInfoPage: React.FC<ProjectAdditionalInfoPageProps> = ({ projectId, onClose }) => {
  const [allInfos, setAllInfos] = useState<ProjectAdditionalInfo[]>([]);
  const [filteredInfos, setFilteredInfos] = useState<ProjectAdditionalInfo[]>([]);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<ProjectAdditionalInfo | null>(null);
  const { t } = useTranslation();

  const toggleDrawer = (isOpen: boolean) => setShowDrawer(isOpen);

  const { isLoading, refetch } = usePaginatedFetch<ProjectAdditionalInfo[]>({
    queryKey: ['projectAdditionalInfo'],
    fetchFunction: async () => {
      const response = await projectAdditionalInfosApiService.getAll();
      setAllInfos(response.payload || []);
      return response;
    },
  });

  useEffect(() => {
    const filtered = allInfos.filter((info) => info.project_id === projectId);
    setFilteredInfos(filtered);
  }, [allInfos, projectId]);

  const handleDelete = async (infoId: string) => {
    try {
      await projectAdditionalInfosApiService.delete(infoId);
      setAllInfos((prev) => prev.filter((info) => info.id !== infoId));
    } catch (error) {
      console.error('Error deleting project info:', error);
    }
  };

  const handleEdit = (projectInfo: ProjectAdditionalInfo) => {
    setSelectedRow(projectInfo);
    toggleDrawer(true);
  };

  return (
    <div>
      {showDrawer && (
        <ProjectAdditionalInfoDrawer
          projectId={projectId}
          open={showDrawer}
          toggle={() => toggleDrawer(false)}
          projectInfo={selectedRow}
          refetch={refetch}
        />
      )}
      <Card>
        <CardContent>
          <ItemsListing
            type={ITEMS_LISTING_TYPE.list.value}
            title={t('project.additional-info')}
            isLoading={isLoading}
            createActionConfig={{
              ...defaultCreateActionConfig,
              onClick: () => toggleDrawer(true),
              onlyIcon: true,
              permission: {
                action: 'create',
                subject: 'project',
              },
            }}
            ItemViewComponent={({ data }) => (
              <ProjectAdditionalInfoCard
                projectInfo={data}
                onDelete={handleDelete}
                onEdit={handleEdit}
                t={t}
                refetch={refetch}
              />
            )}
            fetchDataFunction={refetch}
            items={filteredInfos}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectAdditionalInfoPage;
