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
import TransformerTypeCard from './transformer-type-card';
import TransformerTypeDrawer from './transformer-type-drawer';
import { TransformerType } from 'src/types/project/other';
import { transformerTypeColumns } from './transformer-type-row';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';

interface TransformerTypeListProps {
  model: string;
  typeId: string;
  projectId: string;
}

const TransformerTypeList: React.FC<TransformerTypeListProps> = ({ model, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<TransformerType | null>(null);
  const { t } = useTranslation();

  const fetchTransformerTypes = (params: GetRequestParam): Promise<IApiResponse<TransformerType[]>> => {
    return projectOtherApiService<TransformerType>().getAll(model, {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: transformerTypes,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<TransformerType[]>({
    queryKey: ['transformerTypes'],
    fetchFunction: fetchTransformerTypes
  });

  const toggleDrawer = () => {
    setSelectedRow(null);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow(null);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (transformerType: TransformerType) => {
    setSelectedRow(transformerType);
    setShowDrawer(true);
  };

  const handleDelete = async (transformerTypeId: string) => {
    await projectOtherApiService<TransformerType>().delete(model, transformerTypeId);
    refetch();
  };

  const handleClickDetail = (transformerType: TransformerType) => {
    setSelectedRow(transformerType);
    setShowDetailDrawer(true);
  };

  const mapTransformerTypeToDetailItems = (transformerType: TransformerType): { title: string; value: string }[] => [
    { title: t('project.other.transformer-type.details.name'), value: transformerType.name || 'N/A' },
    { title: t('project.other.transformer-type.details.description'), value: transformerType.description || 'N/A' },
    { title: t('common.table-columns.created-at'), value: transformerType.created_at ? formatCreatedAt(transformerType.created_at) : 'N/A' }
  ];

  return (
    <Box>
      {showDrawer && (
        <TransformerTypeDrawer
          model={model}
          open={showDrawer}
          toggle={toggleDrawer}
          transformerType={selectedRow as TransformerType}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapTransformerTypeToDetailItems(selectedRow!)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.transformerType}
          title={t('project.other.transformer-type.transformer-type-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.transformer-type.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: transformerTypeColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <TransformerTypeCard
            onDetail={handleClickDetail}
            transformerType={data}
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
            subject: 'generatingcapacity'
          }
        }}
        fetchDataFunction={refetch}
        items={transformerTypes || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default TransformerTypeList;
