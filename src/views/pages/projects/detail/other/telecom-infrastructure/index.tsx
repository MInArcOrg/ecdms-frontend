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
import OtherDetailSidebar from '../../../../../shared/layouts/other/other-detail-drawer';
import TelecomInfrastructureCard from './telecom-infrastructure-card';
import TelecomInfrastructureDrawer from './telecom-infrastructure-drawer';
import { telecomColumns } from './telecom-infrastructure-row'; // Updated import
import { TelecomInfrastructure } from 'src/types/project/other';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';

interface TelecomInfrastructureListProps {
  model: string;
  typeId: string;
  projectId: string;
}

const TelecomInfrastructureList: React.FC<TelecomInfrastructureListProps> = ({ model, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<TelecomInfrastructure | null>(null); // Updated type
  const { t } = useTranslation();

  const fetchTelecomInfrastructures = (params: GetRequestParam): Promise<IApiResponse<TelecomInfrastructure[]>> => {
    // Updated type
    return projectOtherApiService<TelecomInfrastructure>().getAll(model, {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: telecomInfrastructures, // Updated variable name
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<TelecomInfrastructure[]>({
    queryKey: ['telecomInfrastructures'], // Updated query key
    fetchFunction: fetchTelecomInfrastructures
  });

  const toggleDrawer = () => {
    setSelectedRow({} as TelecomInfrastructure);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as TelecomInfrastructure);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (telecomInfrastructure: TelecomInfrastructure) => {
    toggleDrawer();
    setSelectedRow(telecomInfrastructure);
  };

  const handleDelete = async (telecomId: string) => {
    await projectOtherApiService<TelecomInfrastructure>().delete(model, telecomId);
    refetch();
  };

  const handleClickDetail = (telecomInfrastructure: TelecomInfrastructure) => {
    toggleDetailDrawer();
    setSelectedRow(telecomInfrastructure);
  };

  const mapTelecomInfrastructureToDetailItems = (telecomInfrastructure: TelecomInfrastructure): { title: string; value: string }[] => [
    { title: t('project.other.telecom-infrastructure.details.name'), value: telecomInfrastructure?.name || 'N/A' },
    {
      title: t('project.other.telecom-infrastructure.details.specifications'),
      value: telecomInfrastructure?.specifications || 'N/A'
    },
    {
      title: t('project.other.telecom-infrastructure.details.coverage-area'),
      value: telecomInfrastructure?.coverage_area ? `${telecomInfrastructure?.coverage_area} sqm` : 'N/A'
    },
    {
      title: t('project.other.telecom-infrastructure.details.no-of-families-coverage'),
      value: telecomInfrastructure?.no_of_families_coverage?.toString() || 'N/A'
    },
    {
      title: t('project.other.telecom-infrastructure.details.service-period'),
      value: telecomInfrastructure?.service_period ? formatCreatedAt(telecomInfrastructure?.service_period) : 'N/A'
    },
    {
      title: t('project.other.telecom-infrastructure.details.inauguration-date'),
      value: telecomInfrastructure?.inauguration_date ? formatCreatedAt(telecomInfrastructure?.inauguration_date) : 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: telecomInfrastructure?.created_at ? formatCreatedAt(telecomInfrastructure?.created_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <TelecomInfrastructureDrawer
          model={model}
          open={showDrawer}
          toggle={toggleDrawer}
          telecomInfrastructure={selectedRow as TelecomInfrastructure}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapTelecomInfrastructureToDetailItems(selectedRow as TelecomInfrastructure)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.telecomInfrastructure}
          title={t('project.other.telecom-infrastructure.telecom-infrastructure-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.telecom-infrastructure.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: telecomColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <TelecomInfrastructureCard
            onDetail={handleClickDetail}
            telecomInfrastructure={data}
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
            subject: 'telecomInfrastructure'
          }
        }}
        fetchDataFunction={refetch}
        items={telecomInfrastructures || []} // Updated variable name
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default TelecomInfrastructureList;
