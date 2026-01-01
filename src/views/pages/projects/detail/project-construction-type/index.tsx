'use client';

import type React from 'react';

import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectConstructionTypeApiService from 'src/services/project/project-construction-type-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import ProjectConstructionTypeCard from './project-construction-type-card';
import ProjectConstructionTypeDrawer from './project-construction-type-drawer';
import type { ProjectConstructionType } from 'src/types/project/project-construction-type';
import { constructionTypeColumns } from './project-construction-type-row';

interface ProjectConstructionTypeListProps {
  model: string;
  projectId: string;
  typeId: string;
}

const ProjectConstructionTypeList: React.FC<ProjectConstructionTypeListProps> = ({ projectId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ProjectConstructionType | null>(null);
  const { t } = useTranslation();

  const fetchConstructionTypes = (params: GetRequestParam): Promise<IApiResponse<ProjectConstructionType[]>> => {
    return projectConstructionTypeApiService.getAll({
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: constructionTypes,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<ProjectConstructionType[]>({
    queryKey: ['constructionTypes'],
    fetchFunction: fetchConstructionTypes
  });

  const toggleDrawer = () => {
    setSelectedRow({} as ProjectConstructionType);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as ProjectConstructionType);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (constructionType: ProjectConstructionType) => {
    toggleDrawer();
    setSelectedRow(constructionType);
  };

  const handleDelete = async (constructionTypeId: string) => {
    await projectConstructionTypeApiService.delete(constructionTypeId);
    refetch();
  };

  const handleClickDetail = (constructionType: ProjectConstructionType) => {
    toggleDetailDrawer();
    setSelectedRow(constructionType);
  };

  const mapConstructionTypeToDetailItems = (constructionType: ProjectConstructionType): { title: string; value: string }[] => [
    {
      title: t('project.construction-type.construction-type'),
      value: constructionType?.construction_type_id || 'N/A'
    },
    {
      title: t('project.construction-type.description'),
      value: constructionType?.description || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: constructionType?.created_at ? formatCreatedAt(constructionType.created_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <ProjectConstructionTypeDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          projectConstructionType={selectedRow as ProjectConstructionType}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapConstructionTypeToDetailItems(selectedRow as ProjectConstructionType)}
          id={selectedRow?.id || ''}
          hasReference={true}
          fileType="PROJECT_CONSTRUCTION_TYPE"
          title={t('project.construction-type.details')}
        />
      )}

      <ItemsListing
        title={t('project.construction-type.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: constructionTypeColumns(handleClickDetail, handleEdit, handleDelete, t)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <ProjectConstructionTypeCard
            onDetail={handleClickDetail}
            constructionType={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: 'projectconstructiontype'
          }
        }}
        fetchDataFunction={refetch}
        items={constructionTypes || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default ProjectConstructionTypeList;
