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
import HydroElectricDamCard from './hydro-electric-dam-card';
import HydroElectricDamDrawer from './hydro-electric-dam-drawer';
import { HydroElectricDam } from 'src/types/project/other';
import { hydroElectricDamColumns } from './hydro-electric-dam-row';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';

interface HydroElectricDamListProps {
  model: string;
  typeId: string;
  projectId: string;
}

const HydroElectricDamList: React.FC<HydroElectricDamListProps> = ({ model, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<HydroElectricDam | null>(null);
  const { t } = useTranslation();

  const fetchGeneratingCapacities = (params: GetRequestParam): Promise<IApiResponse<HydroElectricDam[]>> => {
    return projectOtherApiService<HydroElectricDam>().getAll(model, {
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
  } = usePaginatedFetch<HydroElectricDam[]>({
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

  const handleEdit = (hydroElectricDam: HydroElectricDam) => {
    setSelectedRow(hydroElectricDam);
    setShowDrawer(true);
  };

  const handleDelete = async (hydroElectricDamId: string) => {
    await projectOtherApiService<HydroElectricDam>().delete(model, hydroElectricDamId);
    refetch();
  };

  const handleClickDetail = (hydroElectricDam: HydroElectricDam) => {
    setSelectedRow(hydroElectricDam);
    setShowDetailDrawer(true);
  };

  const mapHydroElectricDamToDetailItems = (hydroElectricDam: HydroElectricDam): { title: string; value: string }[] => [
    { title: t('project.other.hydro-electric-dam.details.river-name'), value: hydroElectricDam.river_name || 'N/A' },
    {
      title: t('project.other.hydro-electric-dam.details.elevation-from-sea-level'),
      value: hydroElectricDam.elevation_from_sea_level || 'N/A'
    },
    { title: t('project.other.hydro-electric-dam.details.elevation-from-ngl'), value: hydroElectricDam.elevation_from_ngl || 'N/A' },
    { title: t('project.other.hydro-electric-dam.details.dam-type'), value: hydroElectricDam.dam_type || 'N/A' },
    { title: t('project.other.hydro-electric-dam.details.dam-volume'), value: hydroElectricDam.dam_volume || 'N/A' },
    {
      title: t('project.other.hydro-electric-dam.details.gated-spillway-no'),
      value: hydroElectricDam.gated_spillway_no?.toString() || 'N/A'
    },
    {
      title: t('project.other.hydro-electric-dam.details.none-gated-spillway-no'),
      value: hydroElectricDam.none_gated_spillway_no?.toString() || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: hydroElectricDam.created_at ? formatCreatedAt(hydroElectricDam.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: hydroElectricDam.updated_at ? formatCreatedAt(hydroElectricDam.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <HydroElectricDamDrawer
          model={model}
          open={showDrawer}
          toggle={toggleDrawer}
          hydroElectricDam={selectedRow as HydroElectricDam}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapHydroElectricDamToDetailItems(selectedRow!)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.hydroElectricDam}
          title={t('project.other.hydro-electric-dam.hydro-electric-dam-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.hydro-electric-dam.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: hydroElectricDamColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <HydroElectricDamCard
            onDetail={handleClickDetail}
            hydroElectricDam={data}
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
            subject: 'hydroelectricdam'
          }
        }}
        fetchDataFunction={refetch}
        items={generatingCapacities || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default HydroElectricDamList;
