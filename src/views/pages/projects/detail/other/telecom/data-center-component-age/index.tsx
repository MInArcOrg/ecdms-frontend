import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import { OtherMenuRoute } from 'src/pages/projects/[typeId]/details/[id]/other/(subMenuItems)';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { DataCenterComponentAge } from 'src/types/project/other';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import DataCenterComponentAgeCard from './data-center-component-age-card';
import DataCenterComponentAgeDrawer from './data-center-component-age-drawer';
import { dataCenterComponentAgeColumns } from './data-center-component-age-row';

interface DataCenterComponentAgeListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const DataCenterComponentAgeList: React.FC<DataCenterComponentAgeListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<DataCenterComponentAge | null>(null);
  const { t } = useTranslation();

  const fetchDataCenterComponentAges = (params: GetRequestParam): Promise<IApiResponse<DataCenterComponentAge[]>> => {
    return projectOtherApiSecondService<DataCenterComponentAge>().getAll(otherSubMenu?.apiRoute || '', {
      ...params
    });
  };

  const {
    data: dataCenterComponentAges,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<DataCenterComponentAge[]>({
    queryKey: ['dataCenterComponentAges'],
    fetchFunction: fetchDataCenterComponentAges
  });

  const toggleDrawer = () => {
    setSelectedRow({} as DataCenterComponentAge);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as DataCenterComponentAge);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (dataCenterComponentAge: DataCenterComponentAge) => {
    toggleDrawer();
    setSelectedRow(dataCenterComponentAge);
  };

  const handleDelete = async (dataCenterComponentAgeId: string) => {
    await projectOtherApiSecondService<DataCenterComponentAge>().delete(otherSubMenu?.apiRoute || '', dataCenterComponentAgeId);
    refetch();
  };

  const handleClickDetail = (dataCenterComponentAge: DataCenterComponentAge) => {
    toggleDetailDrawer();
    setSelectedRow(dataCenterComponentAge);
  };

  const mapDataCenterComponentAgeToDetailItems = (dataCenterComponentAge: DataCenterComponentAge): { title: string; value: string }[] => [
    {
      title: t('project.other.data-center-component-age.details.data-center-id'),
      value: dataCenterComponentAge?.data_center_id || 'N/A'
    },
    {
      title: t('project.other.data-center-component-age.details.servers'),
      value: dataCenterComponentAge?.servers?.toString() || 'N/A'
    },
    {
      title: t('project.other.data-center-component-age.details.storage-devices'),
      value: dataCenterComponentAge?.storage_devices?.toString() || 'N/A'
    },
    {
      title: t('project.other.data-center-component-age.details.networking-equipment'),
      value: dataCenterComponentAge?.networking_equipment?.toString() || 'N/A'
    },
    {
      title: t('project.other.data-center-component-age.details.cooling-systems'),
      value: dataCenterComponentAge?.cooling_systems?.toString() || 'N/A'
    },
    {
      title: t('project.other.data-center-component-age.details.backup-generators'),
      value: dataCenterComponentAge?.backup_generators?.toString() || 'N/A'
    },
    {
      title: t('project.other.data-center-component-age.details.others'),
      value: dataCenterComponentAge?.others || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: dataCenterComponentAge?.created_at ? formatCreatedAt(dataCenterComponentAge.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: dataCenterComponentAge?.updated_at ? formatCreatedAt(dataCenterComponentAge.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <DataCenterComponentAgeDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          dataCenterComponentAge={selectedRow as DataCenterComponentAge}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapDataCenterComponentAgeToDetailItems(selectedRow as DataCenterComponentAge)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.dataCenterComponentAge}
          title={t('project.other.data-center-component-age.data-center-component-age-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.data-center-component-age.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: dataCenterComponentAgeColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <DataCenterComponentAgeCard
            onDetail={handleClickDetail}
            dataCenterComponentAge={data}
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
            subject: 'datacentercomponentage'
          }
        }}
        fetchDataFunction={refetch}
        items={dataCenterComponentAges || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default DataCenterComponentAgeList;
