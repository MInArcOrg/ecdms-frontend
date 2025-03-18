import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import { OtherMenuRoute } from 'src/pages/projects/[typeId]/details/[id]/other/(subMenuItems)';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { DataCenterFacility } from 'src/types/project/other';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import DataCenterFacilityCard from './data-center-facility-card';
import DataCenterFacilityDrawer from './data-center-facility-drawer';
import { dataCenterFacilityColumns } from './data-center-facility-row';

interface DataCenterFacilityListProps {
  otherSubMenu?: OtherMenuRoute;
  typeId: string;
  projectId: string;
}

const DataCenterFacilityList: React.FC<DataCenterFacilityListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<DataCenterFacility | null>(null);
  const { t } = useTranslation();

  const fetchDataCenterFacilitys = (params: GetRequestParam): Promise<IApiResponse<DataCenterFacility[]>> => {
    return projectOtherApiSecondService<DataCenterFacility>().getAll(otherSubMenu?.apiRoute || '', {
      ...params
    });
  };

  const {
    data: dataCenterFacilitys,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<DataCenterFacility[]>({
    queryKey: ['dataCenterFacilitys'],
    fetchFunction: fetchDataCenterFacilitys
  });

  const toggleDrawer = () => {
    setSelectedRow({} as DataCenterFacility);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as DataCenterFacility);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (dataCenterFacility: DataCenterFacility) => {
    toggleDrawer();
    setSelectedRow(dataCenterFacility);
  };

  const handleDelete = async (dataCenterFacilityId: string) => {
    await projectOtherApiSecondService<DataCenterFacility>().delete(otherSubMenu?.apiRoute || '', dataCenterFacilityId);
    refetch();
  };

  const handleClickDetail = (dataCenterFacility: DataCenterFacility) => {
    toggleDetailDrawer();
    setSelectedRow(dataCenterFacility);
  };

  const mapDataCenterFacilityToDetailItems = (dataCenterFacility: DataCenterFacility): { title: string; value: string }[] => [
    {
      title: t('project.other.data-center-facility.details.data-center-id'),
      value: dataCenterFacility?.data_center_id || 'N/A'
    },
    {
      title: t('project.other.data-center-facility.details.total-floor-area'),
      value: dataCenterFacility?.total_floor_area || 'N/A'
    },
    {
      title: t('project.other.data-center-facility.details.power-capacity'),
      value: dataCenterFacility?.power_capacity || 'N/A'
    },
    {
      title: t('project.other.data-center-facility.details.rack-space-capacity'),
      value: dataCenterFacility?.rack_space_capacity || 'N/A'
    },
    {
      title: t('project.other.data-center-facility.details.cooling-capacity'),
      value: dataCenterFacility?.cooling_capacity || 'N/A'
    },
    {
      title: t('project.other.data-center-facility.details.access-control'),
      value: dataCenterFacility?.access_control ? t('common.yes') : t('common.no')
    },
    {
      title: t('project.other.data-center-facility.details.surveillance-cameras'),
      value: dataCenterFacility?.surveillance_cameras ? t('common.yes') : t('common.no')
    },
    {
      title: t('project.other.data-center-facility.details.fire-suppression-systems'),
      value: dataCenterFacility?.fire_suppression_systems ? t('common.yes') : t('common.no')
    },
    {
      title: t('project.other.data-center-facility.details.intrusion-detection-systems'),
      value: dataCenterFacility?.intrusion_detection_systems ? t('common.yes') : t('common.no')
    },
    {
      title: t('project.other.data-center-facility.details.others'),
      value: dataCenterFacility?.others || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: dataCenterFacility?.created_at ? formatCreatedAt(dataCenterFacility.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: dataCenterFacility?.updated_at ? formatCreatedAt(dataCenterFacility.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <DataCenterFacilityDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          dataCenterFacility={selectedRow as DataCenterFacility}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapDataCenterFacilityToDetailItems(selectedRow as DataCenterFacility)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.dataCenterFacility}
          title={t('project.other.data-center-facility.data-center-facility-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.data-center-facility.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: dataCenterFacilityColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <DataCenterFacilityCard
            onDetail={handleClickDetail}
            dataCenterFacility={data}
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
            subject: 'datacenterfacility'
          }
        }}
        fetchDataFunction={refetch}
        items={dataCenterFacilitys || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default DataCenterFacilityList;
