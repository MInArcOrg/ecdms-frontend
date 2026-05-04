import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { DataCenterFacilityCapacity } from 'src/types/project/other';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import DataCenterFacilityCapacityCard from './data-center-facility-capacity-card';
import DataCenterFacilityCapacityDrawer from './data-center-facility-capacity-drawer';
import { dataCenterFacilityCapacityColumns } from './data-center-facility-capacity-row';

interface DataCenterFacilityCapacityListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const DataCenterFacilityCapacityList: React.FC<DataCenterFacilityCapacityListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<DataCenterFacilityCapacity | null>(null);
  const { t } = useTranslation();

  const fetchDataCenterFacilityCapacitys = (params: GetRequestParam): Promise<IApiResponse<DataCenterFacilityCapacity[]>> => {
    return projectOtherApiSecondService<DataCenterFacilityCapacity>().getAll(otherSubMenu?.apiRoute || '', {
      ...params
    });
  };

  const {
    data: dataCenterFacilityCapacitys,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<DataCenterFacilityCapacity[]>({
    queryKey: ['dataCenterFacilityCapacitys'],
    fetchFunction: fetchDataCenterFacilityCapacitys
  });

  const toggleDrawer = () => {
    setSelectedRow({} as DataCenterFacilityCapacity);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as DataCenterFacilityCapacity);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (dataCenterFacilityCapacity: DataCenterFacilityCapacity) => {
    toggleDrawer();
    setSelectedRow(dataCenterFacilityCapacity);
  };

  const handleDelete = async (dataCenterFacilityCapacityId: string) => {
    await projectOtherApiSecondService<DataCenterFacilityCapacity>().delete(otherSubMenu?.apiRoute || '', dataCenterFacilityCapacityId);
    refetch();
  };

  const handleClickDetail = (dataCenterFacilityCapacity: DataCenterFacilityCapacity) => {
    toggleDetailDrawer();
    setSelectedRow(dataCenterFacilityCapacity);
  };

  const mapDataCenterFacilityCapacityToDetailItems = (
    dataCenterFacilityCapacity: DataCenterFacilityCapacity
  ): { title: string; value: string }[] => [
    {
      title: t('project.other.data-center-facility-capacity.details.data-center-id'),
      value: dataCenterFacilityCapacity?.dataCenter?.name || dataCenterFacilityCapacity?.data_center_id || 'N/A'
    },
    {
      title: t('project.other.data-center-facility-capacity.details.total-floor-area'),
      value: dataCenterFacilityCapacity?.total_floor_area || 'N/A'
    },
    {
      title: t('project.other.data-center-facility-capacity.details.power-capacity'),
      value: dataCenterFacilityCapacity?.power_capacity || 'N/A'
    },
    {
      title: t('project.other.data-center-facility-capacity.details.rack-space-capacity'),
      value: dataCenterFacilityCapacity?.rack_space_capacity || 'N/A'
    },
    {
      title: t('project.other.data-center-facility-capacity.details.cooling-capacity'),
      value: dataCenterFacilityCapacity?.cooling_capacity || 'N/A'
    },
    {
      title: t('project.other.data-center-facility-capacity.details.access-control'),
      value: dataCenterFacilityCapacity?.access_control ? t('common.yes') : t('common.no')
    },
    {
      title: t('project.other.data-center-facility-capacity.details.surveillance-cameras'),
      value: dataCenterFacilityCapacity?.surveillance_cameras ? t('common.yes') : t('common.no')
    },
    {
      title: t('project.other.data-center-facility-capacity.details.fire-suppression-systems'),
      value: dataCenterFacilityCapacity?.fire_suppression_systems ? t('common.yes') : t('common.no')
    },
    {
      title: t('project.other.data-center-facility-capacity.details.intrusion-detection-systems'),
      value: dataCenterFacilityCapacity?.intrusion_detection_systems ? t('common.yes') : t('common.no')
    },
    {
      title: t('project.other.data-center-facility-capacity.details.others'),
      value: dataCenterFacilityCapacity?.others || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: dataCenterFacilityCapacity?.created_at ? formatCreatedAt(dataCenterFacilityCapacity.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: dataCenterFacilityCapacity?.updated_at ? formatCreatedAt(dataCenterFacilityCapacity.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <DataCenterFacilityCapacityDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          dataCenterFacilityCapacity={selectedRow as DataCenterFacilityCapacity}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapDataCenterFacilityCapacityToDetailItems(selectedRow as DataCenterFacilityCapacity)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.dataCenterFacilityCapacity}
          title={t('project.other.data-center-facility-capacity.data-center-facility-capacity-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.data-center-facility-capacity.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: dataCenterFacilityCapacityColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <DataCenterFacilityCapacityCard
            onDetail={handleClickDetail}
            dataCenterFacilityCapacity={data}
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
            subject: 'datacenterfacilitycapacity'
          }
        }}
        fetchDataFunction={refetch}
        items={dataCenterFacilityCapacitys || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default DataCenterFacilityCapacityList;
