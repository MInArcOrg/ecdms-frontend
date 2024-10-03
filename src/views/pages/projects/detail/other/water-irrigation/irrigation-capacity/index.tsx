import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectOtherApiService from 'src/services/project/project-other-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import IrrigationCapacityCard from './irrigation-capacity-card';
import IrrigationCapacityDrawer from './irrigation-capacity-drawer';
import { IrrigationCapacity } from 'src/types/project/other';
import { irrigationCapacityColumns } from './irrigation-capacity-row';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';

interface IrrigationCapacityListProps {
  model: string;
  typeId: string;
  projectId: string;
}

const IrrigationCapacityList: React.FC<IrrigationCapacityListProps> = ({ model, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<IrrigationCapacity | null>(null);
  const { t } = useTranslation();

  const fetchIrrigationCapacitys = (params: GetRequestParam): Promise<IApiResponse<IrrigationCapacity[]>> => {
    return projectOtherApiService<IrrigationCapacity>().getAll(model, {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: irrigationCapacitys,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<IrrigationCapacity[]>({
    queryKey: ['irrigationCapacitys'],
    fetchFunction: fetchIrrigationCapacitys
  });

  const toggleDrawer = () => {
    setSelectedRow(null);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow(null);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (irrigationCapacity: IrrigationCapacity) => {
    setSelectedRow(irrigationCapacity);
    setShowDrawer(true);
  };

  const handleDelete = async (irrigationCapacityId: string) => {
    await projectOtherApiService<IrrigationCapacity>().delete(model, irrigationCapacityId);
    refetch();
  };

  const handleClickDetail = (irrigationCapacity: IrrigationCapacity) => {
    setSelectedRow(irrigationCapacity);
    setShowDetailDrawer(true);
  };

  const mapIrrigationCapacityToDetailItems = (irrigationCapacity: IrrigationCapacity): { title: string; value: string }[] => [
    { title: t('project.other.irrigation-capacity.details.id'), value: irrigationCapacity.id },
    { title: t('project.other.irrigation-capacity.details.projectId'), value: irrigationCapacity.project_id },
    {
      title: t('project.other.irrigation-capacity.details.designedCapacity'),
      value: irrigationCapacity.designed_irrigation_capacity?.toString() || 'N/A'
    },
    {
      title: t('project.other.irrigation-capacity.details.actualCapacity'),
      value: irrigationCapacity.actual_irrigation_capacity?.toString() || 'N/A'
    },
    { title: t('project.other.irrigation-capacity.details.revisionNo'), value: irrigationCapacity.revision_no?.toString() || 'N/A' },
    {
      title: t('common.table-columns.created-at'),
      value: irrigationCapacity.created_at ? formatCreatedAt(irrigationCapacity.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: irrigationCapacity.updated_at ? formatCreatedAt(irrigationCapacity.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <IrrigationCapacityDrawer
          model={model}
          open={showDrawer}
          toggle={toggleDrawer}
          irrigationCapacity={selectedRow as IrrigationCapacity}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapIrrigationCapacityToDetailItems(selectedRow!)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.irrigationCapacity}
          title={t('project.other.irrigation-capacity.details.title')}
        />
      )}

      <ItemsListing
        title={t('project.other.irrigation-capacity.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: irrigationCapacityColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <IrrigationCapacityCard
            onDetail={handleClickDetail}
            irrigationCapacity={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: true,
          permission: {
            action: 'create',
            subject: 'irrigationCapacity'
          }
        }}
        fetchDataFunction={refetch}
        items={irrigationCapacitys || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default IrrigationCapacityList;
