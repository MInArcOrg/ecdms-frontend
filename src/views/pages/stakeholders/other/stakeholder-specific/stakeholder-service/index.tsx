import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import stakeholderOtherApiService from 'src/services/stakeholder/stakeholder-other-service';
import { uploadableStakeholderFileTypes } from 'src/services/utils/file-constants';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import StakeholderServiceCard from './stakeholder-service-card';
import StakeholderServiceDrawer from './stakeholder-service-drawer';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import { StakeholderService } from 'src/types/stakeholder/other';
import { stakeholderServiceColumns } from './stakeholder-service-row';

interface StakeholderServiceListProps {
  model: string;
  typeId: string;
  stakeholderId: string;
}

const StakeholderServiceList: React.FC<StakeholderServiceListProps> = ({ model, stakeholderId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<StakeholderService | null>(null);
  const { t } = useTranslation();

  const fetchStakeholderServices = (params: GetRequestParam): Promise<IApiResponse<StakeholderService[]>> => {
    return stakeholderOtherApiService<StakeholderService>().getAll(model, {
      ...params,
      filter: { ...params.filter, stakeholder_id: stakeholderId }
    });
  };

  const {
    data: stakeholderServices,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<StakeholderService[]>({
    queryKey: ['stakeholderServices'],
    fetchFunction: fetchStakeholderServices
  });

  const toggleDrawer = () => {
    setSelectedRow(null);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow(null);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (service: StakeholderService) => {
    toggleDrawer();
    setSelectedRow(service);
  };

  const handleDelete = async (serviceId: string) => {
    await stakeholderOtherApiService<StakeholderService>().delete(model, serviceId);
    refetch();
  };

  const handleClickDetail = (service: StakeholderService) => {
    toggleDetailDrawer();
    setSelectedRow(service);
  };

  const mapStakeholderServiceToDetailItems = (service: StakeholderService): { title: string; value: string }[] => [
    {
      title: t('stakeholder.other.stakeholder-service.details.service-type'),
      value: service.constructionrelatedservice?.service_type || 'N/A'
    },
    {
      title: t('stakeholder.other.stakeholder-service.details.specification-detail'),
      value: service.constructionrelatedservice?.specification_detail || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: service.created_at ? formatCreatedAt(service.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: service.updated_at ? formatCreatedAt(service.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <StakeholderServiceDrawer
          model={model}
          open={showDrawer}
          toggle={toggleDrawer}
          stakeholderService={selectedRow as StakeholderService}
          refetch={refetch}
          stakeholderId={stakeholderId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapStakeholderServiceToDetailItems(selectedRow as StakeholderService)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableStakeholderFileTypes.other.stakeholderService}
          title={t('stakeholder.other.stakeholder-service.details')}
        />
      )}

      <ItemsListing
        title={t('stakeholder.other.stakeholder-service.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: stakeholderServiceColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <StakeholderServiceCard
            onDetail={handleClickDetail}
            stakeholderService={data}
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
            subject: 'stakeholderService'
          }
        }}
        fetchDataFunction={refetch}
        items={stakeholderServices || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default StakeholderServiceList;
