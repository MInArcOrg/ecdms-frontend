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
import TransmissionLineCard from './transmission-line-card';
import TransmissionLineDrawer from './transmission-line-drawer';
import { TransmissionLine } from 'src/types/project/other';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { transmissionLineColumns } from './transmission-line-row';

interface TransmissionLineListProps {
  model: string;
  typeId: string;
  projectId: string;
}

const TransmissionLineList: React.FC<TransmissionLineListProps> = ({ model, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<TransmissionLine | null>(null);
  const { t } = useTranslation();

  const fetchTransmissionLines = (params: GetRequestParam): Promise<IApiResponse<TransmissionLine[]>> => {
    return projectOtherApiService<TransmissionLine>().getAll(model, {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: transmissionLines,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<TransmissionLine[]>({
    queryKey: ['transmissionLines'],
    fetchFunction: fetchTransmissionLines
  });

  const toggleDrawer = () => {
    setSelectedRow(null);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow(null);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (transmissionLine: TransmissionLine) => {
    setSelectedRow(transmissionLine);
    setShowDrawer(true);
  };

  const handleDelete = async (transmissionLineId: string) => {
    await projectOtherApiService<TransmissionLine>().delete(model, transmissionLineId);
    refetch();
  };

  const handleClickDetail = (transmissionLine: TransmissionLine) => {
    setSelectedRow(transmissionLine);
    setShowDetailDrawer(true);
  };

  const mapTransmissionLineToDetailItems = (transmissionLine: TransmissionLine): { title: string; value: string }[] => [
    { title: t('project.other.transmission-line.details.name'), value: transmissionLine.name || 'N/A' },
    { title: t('project.other.transmission-line.details.line-type'), value: transmissionLine.line_type || 'N/A' },
    { title: t('project.other.transmission-line.details.transmission-capacity'), value: transmissionLine.transmission_capacity || 'N/A' },
    { title: t('project.other.transmission-line.details.transmitting-power'), value: transmissionLine.transmitting_power || 'N/A' },
    { title: t('project.other.transmission-line.details.transmitting-current'), value: transmissionLine.transmitting_current || 'N/A' },
    { title: t('project.other.transmission-line.details.transmitting-voltage'), value: transmissionLine.transmitting_voltage || 'N/A' },
    {
      title: t('project.other.transmission-line.details.transmission-towers-number'),
      value: transmissionLine?.transmission_towers_number !== null ? transmissionLine.transmission_towers_number?.toString() || '' : 'N/A'
    },
    {
      title: t('project.other.transmission-line.details.start-northing'),
      value: transmissionLine.start_northing !== null ? transmissionLine.start_northing?.toString() || '' : 'N/A'
    },
    {
      title: t('project.other.transmission-line.details.start-easting'),
      value: transmissionLine.start_easting !== null ? transmissionLine.start_easting?.toString() || '' : 'N/A'
    },
    {
      title: t('project.other.transmission-line.details.end-northing'),
      value: transmissionLine.end_northing !== null ? transmissionLine.end_northing?.toString() || '' : 'N/A'
    },
    {
      title: t('project.other.transmission-line.details.end-easting'),
      value: transmissionLine.end_easting !== null ? transmissionLine.end_easting?.toString() || '' : 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: transmissionLine.created_at ? formatCreatedAt(transmissionLine.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: transmissionLine.updated_at ? formatCreatedAt(transmissionLine.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <TransmissionLineDrawer
          model={model}
          open={showDrawer}
          toggle={toggleDrawer}
          transmissionLine={selectedRow as TransmissionLine}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapTransmissionLineToDetailItems(selectedRow!)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.transmissionLine}
          title={t('project.other.transmission-line.transmission-line-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.transmission-line.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: transmissionLineColumns(handleClickDetail, handleEdit, handleDelete, t, refetch) // Updated function name
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <TransmissionLineCard
            onDetail={handleClickDetail}
            transmissionLine={data}
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
            subject: 'transmissionline'
          }
        }}
        fetchDataFunction={refetch}
        items={transmissionLines || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default TransmissionLineList;
