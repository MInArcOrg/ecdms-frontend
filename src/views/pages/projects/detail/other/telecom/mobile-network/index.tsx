import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import { OtherMenuRoute } from 'src/pages/projects/[typeId]/details/[id]/other/(subMenuItems)';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { MobileNetwork } from 'src/types/project/other';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import MobileNetworkCard from './mobile-network-card';
import MobileNetworkDrawer from './mobile-network-drawer';
import { mobileNetworkColumns } from './mobile-network-row';

interface MobileNetworkListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const MobileNetworkList: React.FC<MobileNetworkListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<MobileNetwork | null>(null);
  const { t } = useTranslation();

  const fetchMobileNetworks = (params: GetRequestParam): Promise<IApiResponse<MobileNetwork[]>> => {
    return projectOtherApiSecondService<MobileNetwork>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: mobileNetworks,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<MobileNetwork[]>({
    queryKey: ['mobileNetworks'],
    fetchFunction: fetchMobileNetworks
  });

  const toggleDrawer = () => {
    setSelectedRow({} as MobileNetwork);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as MobileNetwork);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (mobileNetwork: MobileNetwork) => {
    toggleDrawer();
    setSelectedRow(mobileNetwork);
  };

  const handleDelete = async (mobileNetworkId: string) => {
    await projectOtherApiSecondService<MobileNetwork>().delete(otherSubMenu?.apiRoute || '', mobileNetworkId);
    refetch();
  };

  const handleClickDetail = (mobileNetwork: MobileNetwork) => {
    toggleDetailDrawer();
    setSelectedRow(mobileNetwork);
  };

  const mapMobileNetworkToDetailItems = (mobileNetwork: MobileNetwork): { title: string; value: string }[] => [
    {
      title: t('project.other.mobile-network.details.mobile-network-type'),
      value: mobileNetwork?.mobilenetworktype.title || 'N/A'
    },
    {
      title: t('project.other.mobile-network.details.call-towers'),
      value: mobileNetwork?.call_towers ? t('common.yes') : t('common.no')
    },
    {
      title: t('project.other.mobile-network.details.antennas'),
      value: mobileNetwork?.antennas ? t('common.yes') : t('common.no')
    },
    {
      title: t('project.other.mobile-network.details.base-stations'),
      value: mobileNetwork?.base_stations ? t('common.yes') : t('common.no')
    },
    {
      title: t('project.other.mobile-network.details.repeaters'),
      value: mobileNetwork?.repeaters ? t('common.yes') : t('common.no')
    },
    {
      title: t('project.other.mobile-network.details.switches'),
      value: mobileNetwork?.switches ? t('common.yes') : t('common.no')
    },
    {
      title: t('project.other.mobile-network.details.others'),
      value: mobileNetwork?.others || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: mobileNetwork?.created_at ? formatCreatedAt(mobileNetwork.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: mobileNetwork?.updated_at ? formatCreatedAt(mobileNetwork.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <MobileNetworkDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          mobileNetwork={selectedRow as MobileNetwork}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapMobileNetworkToDetailItems(selectedRow as MobileNetwork)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.mobileNetwork}
          title={t('project.other.mobile-network.mobile-network-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.mobile-network.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: mobileNetworkColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <MobileNetworkCard
            onDetail={handleClickDetail}
            mobileNetwork={data}
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
            subject: 'mobilenetwork'
          }
        }}
        fetchDataFunction={refetch}
        items={mobileNetworks || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default MobileNetworkList;
