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
import GeneratingCapacityCard from './generating-capacity-card';
import GeneratingCapacityDrawer from './generating-capacity-drawer';
import { GeneratingCapacity } from 'src/types/project/other';
import { generatingCapacityColumns } from './generating-capacity-row';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';

interface GeneratingCapacityListProps {
  model: string;
  typeId: string;
  projectId: string;
}

const GeneratingCapacityList: React.FC<GeneratingCapacityListProps> = ({ model, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<GeneratingCapacity | null>(null);
  const { t } = useTranslation();

  const fetchGeneratingCapacities = (params: GetRequestParam): Promise<IApiResponse<GeneratingCapacity[]>> => {
    return projectOtherApiService<GeneratingCapacity>().getAll(model, {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: generatingCapacities,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<GeneratingCapacity[]>({
    queryKey: ['generatingCapacities'],
    fetchFunction: fetchGeneratingCapacities
  });

  const toggleDrawer = () => {
    setSelectedRow(null);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow(null);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (generatingCapacity: GeneratingCapacity) => {
    setSelectedRow(generatingCapacity);
    setShowDrawer(true);
  };

  const handleDelete = async (generatingCapacityId: string) => {
    await projectOtherApiService<GeneratingCapacity>().delete(model, generatingCapacityId);
    refetch();
  };

  const handleClickDetail = (generatingCapacity: GeneratingCapacity) => {
    setSelectedRow(generatingCapacity);
    setShowDetailDrawer(true);
  };

  const mapGeneratingCapacityToDetailItems = (generatingCapacity: GeneratingCapacity): { title: string; value: string }[] => [
    { title: t('project.other.generating-capacity.details.operator'), value: generatingCapacity.operator || 'N/A' },
    {
      title: t('project.other.generating-capacity.details.turbine-type-number'),
      value: generatingCapacity.turbine_type_number?.toString() || 'N/A'
    },
    { title: t('project.other.generating-capacity.details.designed-capacity'), value: generatingCapacity.designed_capacity || 'N/A' },
    { title: t('project.other.generating-capacity.details.generating-capacity'), value: generatingCapacity.generating_capacity || 'N/A' },
    { title: t('project.other.generating-capacity.details.installed-capacity'), value: generatingCapacity.installed_capacity || 'N/A' },
    { title: t('project.other.generating-capacity.details.capacity-factor'), value: generatingCapacity.capacity_factor || 'N/A' },
    { title: t('project.other.generating-capacity.details.annual-generation'), value: generatingCapacity.annual_generation || 'N/A' },
    {
      title: t('common.table-columns.created-at'),
      value: generatingCapacity.created_at ? formatCreatedAt(generatingCapacity.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: generatingCapacity.updated_at ? formatCreatedAt(generatingCapacity.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <GeneratingCapacityDrawer
          model={model}
          open={showDrawer}
          toggle={toggleDrawer}
          generatingCapacity={selectedRow as GeneratingCapacity}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapGeneratingCapacityToDetailItems(selectedRow!)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.generatingCapacity}
          title={t('project.other.generating-capacity.generating-capacity-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.generating-capacity.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: generatingCapacityColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <GeneratingCapacityCard
            onDetail={handleClickDetail}
            generatingCapacity={data}
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
            subject: 'generatingcapacity'
          }
        }}
        fetchDataFunction={refetch}
        items={generatingCapacities || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default GeneratingCapacityList;
