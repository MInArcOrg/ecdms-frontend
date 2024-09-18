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
import SolarEnergyCard from './solar-energy-card';
import SolarEnergyDrawer from './solar-energy-drawer';
import { SolarEnergy } from 'src/types/project/other';
import { solarEnergyColumns } from './solar-energy-row';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';

interface SolarEnergyListProps {
  model: string;
  typeId: string;
  projectId: string;
}

const SolarEnergyList: React.FC<SolarEnergyListProps> = ({ model, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<SolarEnergy | null>(null);
  const { t } = useTranslation();

  const fetchGeneratingCapacities = (params: GetRequestParam): Promise<IApiResponse<SolarEnergy[]>> => {
    return projectOtherApiService<SolarEnergy>().getAll(model, {
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
  } = usePaginatedFetch<SolarEnergy[]>({
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

  const handleEdit = (solarEnergy: SolarEnergy) => {
    setSelectedRow(solarEnergy);
    setShowDrawer(true);
  };

  const handleDelete = async (solarEnergyId: string) => {
    await projectOtherApiService<SolarEnergy>().delete(model, solarEnergyId);
    refetch();
  };

  const handleClickDetail = (solarEnergy: SolarEnergy) => {
    setSelectedRow(solarEnergy);
    setShowDetailDrawer(true);
  };

  const mapSolarEnergyToDetailItems = (solarEnergy: SolarEnergy): { title: string; value: string }[] => [
    { title: t('project.other.solar-energy.details.title'), value: solarEnergy.title || 'N/A' },
    { title: t('project.other.solar-energy.details.description'), value: solarEnergy.description || 'N/A' },
    { title: t('project.other.solar-energy.details.specifications'), value: solarEnergy.specifications || 'N/A' },
    { title: t('common.table-columns.created-at'), value: solarEnergy.created_at ? formatCreatedAt(solarEnergy.created_at) : 'N/A' }
  ];

  return (
    <Box>
      {showDrawer && (
        <SolarEnergyDrawer
          model={model}
          open={showDrawer}
          toggle={toggleDrawer}
          solarEnergy={selectedRow as SolarEnergy}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapSolarEnergyToDetailItems(selectedRow!)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.solarEnergy}
          title={t('project.other.solar-energy.solar-energy-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.solar-energy.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: solarEnergyColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <SolarEnergyCard onDetail={handleClickDetail} solarEnergy={data} onEdit={handleEdit} refetch={refetch} onDelete={handleDelete} />
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

export default SolarEnergyList;
