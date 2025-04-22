import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { InternetConnectionInfrastructureManufacturer } from 'src/types/project/other';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import InternetConnectionInfrastructureManufacturerCard from './internet-connection-infrastructure-manufacturer-card';
import InternetConnectionInfrastructureManufacturerDrawer from './internet-connection-infrastructure-manufacturer-drawer';
import { internetConnectionInfrastructureManufacturerColumns } from './internet-connection-infrastructure-manufacturer-row';

interface InternetConnectionInfrastructureManufacturerListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const InternetConnectionInfrastructureManufacturerList: React.FC<InternetConnectionInfrastructureManufacturerListProps> = ({
  otherSubMenu,
  projectId,
  typeId
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<InternetConnectionInfrastructureManufacturer | null>(null);
  const { t } = useTranslation();

  const fetchInternetConnectionInfrastructureManufacturers = (
    params: GetRequestParam
  ): Promise<IApiResponse<InternetConnectionInfrastructureManufacturer[]>> => {
    return projectOtherApiSecondService<InternetConnectionInfrastructureManufacturer>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter }
    });
  };

  const {
    data: internetConnectionInfrastructureManufacturers,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<InternetConnectionInfrastructureManufacturer[]>({
    queryKey: ['internetConnectionInfrastructureManufacturers'],
    fetchFunction: fetchInternetConnectionInfrastructureManufacturers
  });

  const toggleDrawer = () => {
    setSelectedRow({} as InternetConnectionInfrastructureManufacturer);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as InternetConnectionInfrastructureManufacturer);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (internetConnectionInfrastructureManufacturer: InternetConnectionInfrastructureManufacturer) => {
    toggleDrawer();
    setSelectedRow(internetConnectionInfrastructureManufacturer);
  };

  const handleDelete = async (internetConnectionInfrastructureManufacturerId: string) => {
    await projectOtherApiSecondService<InternetConnectionInfrastructureManufacturer>().delete(
      otherSubMenu?.apiRoute || '',
      internetConnectionInfrastructureManufacturerId
    );
    refetch();
  };

  const handleClickDetail = (internetConnectionInfrastructureManufacturer: InternetConnectionInfrastructureManufacturer) => {
    toggleDetailDrawer();
    setSelectedRow(internetConnectionInfrastructureManufacturer);
  };

  const mapInternetConnectionInfrastructureManufacturerToDetailItems = (
    internetConnectionInfrastructureManufacturer: InternetConnectionInfrastructureManufacturer
  ): { title: string; value: string }[] => [
    {
      title: t('project.other.internet-connection-infrastructure-manufacturer.details.internet-connection-id'),
      value: internetConnectionInfrastructureManufacturer?.internet_connection_id || 'N/A'
    },
    {
      title: t('project.other.internet-connection-infrastructure-manufacturer.details.routers'),
      value: internetConnectionInfrastructureManufacturer?.routers || 'N/A'
    },
    {
      title: t('project.other.internet-connection-infrastructure-manufacturer.details.switches'),
      value: internetConnectionInfrastructureManufacturer?.switches || 'N/A'
    },
    {
      title: t('project.other.internet-connection-infrastructure-manufacturer.details.modems'),
      value: internetConnectionInfrastructureManufacturer?.modems || 'N/A'
    },
    {
      title: t('project.other.internet-connection-infrastructure-manufacturer.details.cables'),
      value: internetConnectionInfrastructureManufacturer?.cables || 'N/A'
    },
    {
      title: t('project.other.internet-connection-infrastructure-manufacturer.details.others'),
      value: internetConnectionInfrastructureManufacturer?.others || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: internetConnectionInfrastructureManufacturer?.created_at
        ? formatCreatedAt(internetConnectionInfrastructureManufacturer.created_at)
        : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: internetConnectionInfrastructureManufacturer?.updated_at
        ? formatCreatedAt(internetConnectionInfrastructureManufacturer.updated_at)
        : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <InternetConnectionInfrastructureManufacturerDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          internetConnectionInfrastructureManufacturer={selectedRow as InternetConnectionInfrastructureManufacturer}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapInternetConnectionInfrastructureManufacturerToDetailItems(selectedRow as InternetConnectionInfrastructureManufacturer)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.internetConnectionInfrastructureManufacturer}
          title={t('project.other.internet-connection-infrastructure-manufacturer.internet-connection-infrastructure-manufacturer-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.internet-connection-infrastructure-manufacturer.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: internetConnectionInfrastructureManufacturerColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <InternetConnectionInfrastructureManufacturerCard
            onDetail={handleClickDetail}
            internetConnectionInfrastructureManufacturer={data}
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
            subject: 'internetconnectioninfrastructuremanufacturer'
          }
        }}
        fetchDataFunction={refetch}
        items={internetConnectionInfrastructureManufacturers || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default InternetConnectionInfrastructureManufacturerList;
