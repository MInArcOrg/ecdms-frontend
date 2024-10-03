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
import WindEnergyCard from './wind-energy-card';
import WindEnergyDrawer from './wind-energy-drawer';
import { WindEnergy } from 'src/types/project/other';
import { windEnergyColumns } from './wind-energy-row';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';

interface WindEnergyListProps {
  model: string;
  typeId: string;
  projectId: string;
}

const WindEnergyList: React.FC<WindEnergyListProps> = ({ model, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<WindEnergy | null>(null);
  const { t } = useTranslation();

  const fetchGeneratingCapacities = (params: GetRequestParam): Promise<IApiResponse<WindEnergy[]>> => {
    return projectOtherApiService<WindEnergy>().getAll(model, {
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
  } = usePaginatedFetch<WindEnergy[]>({
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

  const handleEdit = (windEnergy: WindEnergy) => {
    setSelectedRow(windEnergy);
    setShowDrawer(true);
  };

  const handleDelete = async (windEnergyId: string) => {
    await projectOtherApiService<WindEnergy>().delete(model, windEnergyId);
    refetch();
  };

  const handleClickDetail = (windEnergy: WindEnergy) => {
    setSelectedRow(windEnergy);
    setShowDetailDrawer(true);
  };

  const mapWindEnergyToDetailItems = (windEnergy: WindEnergy): { title: string; value: string }[] => [
    { title: t('project.other.wind-energy.details.title'), value: windEnergy.title || 'N/A' },
    { title: t('project.other.wind-energy.details.description'), value: windEnergy.description || 'N/A' },
    { title: t('project.other.wind-energy.details.specifications'), value: windEnergy.specifications || 'N/A' },
    { title: t('project.other.wind-energy.details.revision-no'), value: windEnergy.revision_no?.toString() || 'N/A' },
    { title: t('common.table-columns.created-at'), value: windEnergy.created_at ? formatCreatedAt(windEnergy.created_at) : 'N/A' }
  ];

  return (
    <Box>
      {showDrawer && (
        <WindEnergyDrawer
          model={model}
          open={showDrawer}
          toggle={toggleDrawer}
          windEnergy={selectedRow as WindEnergy}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapWindEnergyToDetailItems(selectedRow!)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.windEnergy}
          title={t('project.other.wind-energy.wind-energy-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.wind-energy.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: windEnergyColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <WindEnergyCard onDetail={handleClickDetail} windEnergy={data} onEdit={handleEdit} refetch={refetch} onDelete={handleDelete} />
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

export default WindEnergyList;
