import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { RoadSurfaceCondition } from 'src/types/project/other';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import RoadSurfaceConditionCard from './road-surface-condition-card';
import RoadSurfaceConditionDrawer from './road-surface-condition-drawer';
import { roadSurfaceConditionColumns } from './road-surface-condition-row';

interface RoadSurfaceConditionListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RoadSurfaceConditionList: React.FC<RoadSurfaceConditionListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RoadSurfaceCondition | null>(null);
  const { t } = useTranslation();

  const fetchRoadSurfaceConditions = (params: GetRequestParam): Promise<IApiResponse<RoadSurfaceCondition[]>> => {
    return projectOtherApiSecondService<RoadSurfaceCondition>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: roadSurfaceConditions,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<RoadSurfaceCondition[]>({
    queryKey: ['roadSurfaceConditions'],
    fetchFunction: fetchRoadSurfaceConditions
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RoadSurfaceCondition);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RoadSurfaceCondition);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (roadSurfaceCondition: RoadSurfaceCondition) => {
    toggleDrawer();
    setSelectedRow(roadSurfaceCondition);
  };

  const handleDelete = async (roadSurfaceConditionId: string) => {
    await projectOtherApiSecondService<RoadSurfaceCondition>().delete(otherSubMenu?.apiRoute || '', roadSurfaceConditionId);
    refetch();
  };

  const handleClickDetail = (roadSurfaceCondition: RoadSurfaceCondition) => {
    toggleDetailDrawer();
    setSelectedRow(roadSurfaceCondition);
  };

  const mapRoadSurfaceConditionToDetailItems = (roadSurfaceCondition: RoadSurfaceCondition): { title: string; value: string }[] => [
    {
      title: t('project.other.road-surface-condition.details.road-segment'),
      value: roadSurfaceCondition?.road_segment || 'N/A'
    },
    {
      title: t('project.other.road-surface-condition.details.cracks'),
      value: roadSurfaceCondition?.cracks ? t('common.yes') : t('common.no')
    },
    {
      title: t('project.other.road-surface-condition.details.rutting'),
      value: roadSurfaceCondition?.rutting ? t('common.yes') : t('common.no')
    },
    {
      title: t('project.other.road-surface-condition.details.patching'),
      value: roadSurfaceCondition?.patching ? t('common.yes') : t('common.no')
    },
    {
      title: t('project.other.road-surface-condition.details.drainage-problems'),
      value: roadSurfaceCondition?.drainage_problems ? t('common.yes') : t('common.no')
    },
    {
      title: t('project.other.road-surface-condition.details.surface-type'),
      value: roadSurfaceCondition?.surface_type_id || 'N/A'
    },
    {
      title: t('project.other.road-surface-condition.details.assessment-condition'),
      value: roadSurfaceCondition?.assessment_condition_id || 'N/A'
    },
    {
      title: t('project.other.road-surface-condition.details.action-taken-date'),
      value: roadSurfaceCondition?.action_taken_date ? formatCreatedAt(roadSurfaceCondition.action_taken_date) : 'N/A'
    },
    {
      title: t('project.other.road-surface-condition.details.action-taken'),
      value: roadSurfaceCondition?.action_taken || 'N/A'
    },
    {
      title: t('project.other.road-surface-condition.details.action-taken-cost'),
      value: roadSurfaceCondition?.action_taken_cost?.toString() || 'N/A'
    },
    {
      title: t('project.other.road-surface-condition.details.remark'),
      value: roadSurfaceCondition?.remark || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: roadSurfaceCondition?.created_at ? formatCreatedAt(roadSurfaceCondition.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: roadSurfaceCondition?.updated_at ? formatCreatedAt(roadSurfaceCondition.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <RoadSurfaceConditionDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          roadSurfaceCondition={selectedRow as RoadSurfaceCondition}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapRoadSurfaceConditionToDetailItems(selectedRow as RoadSurfaceCondition)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.roadSurfaceCondition}
          title={t('project.other.road-surface-condition.road-surface-condition-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.road-surface-condition.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: roadSurfaceConditionColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RoadSurfaceConditionCard
            onDetail={handleClickDetail}
            roadSurfaceCondition={data}
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
            subject: 'roadsurfacecondition'
          }
        }}
        fetchDataFunction={refetch}
        items={roadSurfaceConditions || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RoadSurfaceConditionList;
