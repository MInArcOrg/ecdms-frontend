import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { dropDownConfig } from 'src/configs/api-constants';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { DataCenter } from 'src/types/project/other';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import DataCenterCard from './data-center-card';
import DataCenterDrawer from './data-center-drawer';
import { dataCenterColumns } from './data-center-row';

interface DataCenterListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const DataCenterList: React.FC<DataCenterListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<DataCenter | null>(null);
  const { t } = useTranslation();

  const { data: dataCenterTypes } = useQuery({
    queryKey: ['data-center-types', projectMasterModels.dataCenterType.model],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll(
        dropDownConfig({
          filter: {
            model: projectMasterModels.dataCenterType.model
          }
        })
      )
  });

  const dataCenterTypeMap = new Map<string, string>(dataCenterTypes?.payload.map((item) => [item.id, item.title || '']) || []);

  const fetchDataCenters = (params: GetRequestParam): Promise<IApiResponse<DataCenter[]>> => {
    return projectOtherApiSecondService<DataCenter>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: dataCenters,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<DataCenter[]>({
    queryKey: ['dataCenters'],
    fetchFunction: fetchDataCenters
  });

  const toggleDrawer = () => {
    setSelectedRow({} as DataCenter);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as DataCenter);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (dataCenter: DataCenter) => {
    toggleDrawer();
    setSelectedRow(dataCenter);
  };

  const handleDelete = async (dataCenterId: string) => {
    await projectOtherApiSecondService<DataCenter>().delete(otherSubMenu?.apiRoute || '', dataCenterId);
    refetch();
  };

  const handleClickDetail = (dataCenter: DataCenter) => {
    toggleDetailDrawer();
    setSelectedRow(dataCenter);
  };

  const mapDataCenterToDetailItems = (dataCenter: DataCenter): { title: string; value: string }[] => [
    {
      title: t('project.other.data-center.details.name'),
      value: dataCenter?.name || 'N/A'
    },
    {
      title: t('project.other.data-center.details.data-center-type-id'),
      value:
        dataCenter?.dataCenterType?.title ||
        dataCenterTypeMap.get(dataCenter?.data_center_type_id) ||
        dataCenter?.data_center_type_id ||
        'N/A'
    },
    {
      title: t('project.other.data-center.details.servers'),
      value: dataCenter?.servers ? t('common.yes') : t('common.no')
    },
    {
      title: t('project.other.data-center.details.storage-devices'),
      value: dataCenter?.storage_devices ? t('common.yes') : t('common.no')
    },
    {
      title: t('project.other.data-center.details.networking-equipment'),
      value: dataCenter?.networking_equipment ? t('common.yes') : t('common.no')
    },
    {
      title: t('project.other.data-center.details.cooling-systems'),
      value: dataCenter?.cooling_systems ? t('common.yes') : t('common.no')
    },
    {
      title: t('project.other.data-center.details.backup-generators'),
      value: dataCenter?.backup_generators ? t('common.yes') : t('common.no')
    },
    {
      title: t('project.other.data-center.details.others'),
      value: dataCenter?.others || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: dataCenter?.created_at ? formatCreatedAt(dataCenter.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: dataCenter?.updated_at ? formatCreatedAt(dataCenter.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <DataCenterDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          dataCenter={selectedRow as DataCenter}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapDataCenterToDetailItems(selectedRow as DataCenter)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.dataCenter}
          title={t('project.other.data-center.data-center-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.data-center.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: dataCenterColumns(handleClickDetail, handleEdit, handleDelete, t, refetch, dataCenterTypeMap)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <DataCenterCard
            onDetail={handleClickDetail}
            dataCenter={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
            dataCenterTypeMap={dataCenterTypeMap}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: 'datacenter'
          }
        }}
        fetchDataFunction={refetch}
        items={dataCenters || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default DataCenterList;
