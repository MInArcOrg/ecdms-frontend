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
import TransformerCard from './transformer-card';
import TransformerDrawer from './transformer-drawer';
import { Transformer } from 'src/types/project/other';
import { transformerColumns } from './transformer-row';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';

interface TransformerListProps {
  model: string;
  typeId: string;
  projectId: string;
}

const TransformerList: React.FC<TransformerListProps> = ({ model, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Transformer | null>(null);
  const { t } = useTranslation();

  const fetchTransformers = (params: GetRequestParam): Promise<IApiResponse<Transformer[]>> => {
    return projectOtherApiService<Transformer>().getAll(model, {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: transformers,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<Transformer[]>({
    queryKey: ['transformers'],
    fetchFunction: fetchTransformers
  });

  const toggleDrawer = () => {
    setSelectedRow(null);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow(null);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (transformer: Transformer) => {
    setSelectedRow(transformer);
    setShowDrawer(true);
  };

  const handleDelete = async (transformerId: string) => {
    await projectOtherApiService<Transformer>().delete(model, transformerId);
    refetch();
  };

  const handleClickDetail = (transformer: Transformer) => {
    setSelectedRow(transformer);
    setShowDetailDrawer(true);
  };

  const mapTransformerToDetailItems = (transformer: Transformer): { title: string; value: string }[] => [
    { title: t('project.other.transformer.details.specifications'), value: transformer.specifications || 'N/A' },
    { title: t('project.other.transformer.details.input-current'), value: transformer.input_current || 'N/A' },
    { title: t('project.other.transformer.details.input-voltage'), value: transformer.input_voltage || 'N/A' },
    { title: t('project.other.transformer.details.output-current'), value: transformer.output_current || 'N/A' },
    { title: t('project.other.transformer.details.output-voltage'), value: transformer.output_voltage || 'N/A' },
    { title: t('project.other.transformer.details.northing'), value: transformer.northing?.toString() || 'N/A' },
    { title: t('project.other.transformer.details.easting'), value: transformer.easting?.toString() || 'N/A' },
    { title: t('common.table-columns.created-at'), value: transformer.created_at ? formatCreatedAt(transformer.created_at) : 'N/A' }
  ];

  return (
    <Box>
      {showDrawer && (
        <TransformerDrawer
          model={model}
          open={showDrawer}
          toggle={toggleDrawer}
          transformer={selectedRow as Transformer}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapTransformerToDetailItems(selectedRow!)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.transformer}
          title={t('project.other.transformer.transformer-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.transformer.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: transformerColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <TransformerCard onDetail={handleClickDetail} transformer={data} onEdit={handleEdit} refetch={refetch} onDelete={handleDelete} />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: true,
          permission: {
            action: 'create',
            subject: 'transformer'
          }
        }}
        fetchDataFunction={refetch}
        items={transformers || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default TransformerList;
