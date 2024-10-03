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
import ConstructionRelatedServiceCard from './construction-related-service-card';
import ConstructionRelatedServiceDrawer from './construction-related-service-drawer';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import { ConstructionRelatedService } from 'src/types/stakeholder/other';
import { constructionRelatedServiceColumns } from './constrution-related-service-row';

interface ConstructionRelatedServiceListProps {
  model: string;
  typeId: string;
  stakeholderId: string;
}

const ConstructionRelatedServiceList: React.FC<ConstructionRelatedServiceListProps> = ({ model, stakeholderId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ConstructionRelatedService | null>(null);
  const { t } = useTranslation();

  const fetchConstructionRelatedServices = (params: GetRequestParam): Promise<IApiResponse<ConstructionRelatedService[]>> => {
    return stakeholderOtherApiService<ConstructionRelatedService>().getAll(model, {
      ...params,
      filter: { ...params.filter, stakeholder_id: stakeholderId }
    });
  };

  const {
    data: constructionRelatedServices,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<ConstructionRelatedService[]>({
    queryKey: ['constructionRelatedServices'],
    fetchFunction: fetchConstructionRelatedServices
  });

  const toggleDrawer = () => {
    setSelectedRow(null);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow(null);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (service: ConstructionRelatedService) => {
    toggleDrawer();
    setSelectedRow(service);
  };

  const handleDelete = async (serviceId: string) => {
    await stakeholderOtherApiService<ConstructionRelatedService>().delete(model, serviceId);
    refetch();
  };

  const handleClickDetail = (service: ConstructionRelatedService) => {
    toggleDetailDrawer();
    setSelectedRow(service);
  };

  const mapConstructionRelatedServiceToDetailItems = (service: ConstructionRelatedService): { title: string; value: string }[] => [
    { title: t('stakeholder.other.stakeholder-service.details.service-type'), value: service.service_type || 'N/A' },
    { title: t('stakeholder.other.stakeholder-service.details.specification-detail'), value: service.specification_detail || 'N/A' },
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
        <ConstructionRelatedServiceDrawer
          model={model}
          open={showDrawer}
          toggle={toggleDrawer}
          constructionRelatedService={selectedRow as ConstructionRelatedService}
          refetch={refetch}
          stakeholderId={stakeholderId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapConstructionRelatedServiceToDetailItems(selectedRow as ConstructionRelatedService)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableStakeholderFileTypes.other.constructionRelatedService}
          title={t('stakeholder.other.stakeholder-service.details.title')}
        />
      )}

      <ItemsListing
        title={t('stakeholder.other.stakeholder-service.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: constructionRelatedServiceColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <ConstructionRelatedServiceCard
            onDetail={handleClickDetail}
            constructionRelatedService={data}
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
            subject: 'constructionRelatedService'
          }
        }}
        fetchDataFunction={refetch}
        items={constructionRelatedServices || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default ConstructionRelatedServiceList;
