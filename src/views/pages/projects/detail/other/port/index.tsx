import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectOtherApiService from 'src/services/project/project-other-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { Port } from 'src/types/project/other';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../shared/layouts/other/other-detail-drawer';
import PortCard from './port-card';
import PortDrawer from './port-drawer';
import { portColumns } from './port-row';

interface PortListProps {
  model: string;
  typeId: string;
  projectId: string;
}

const PortList: React.FC<PortListProps> = ({ model, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Port | null>(null);
  const { t } = useTranslation();
  const fetchPorts = (params: GetRequestParam): Promise<IApiResponse<Port[]>> => {
    return projectOtherApiService<Port>().getAll(model, {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: ports,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<Port[]>({
    queryKey: ['ports'],
    fetchFunction: fetchPorts
  });

  const toggleDrawer = () => {
    setSelectedRow({} as Port);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as Port);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (port: Port) => {
    toggleDrawer();
    setSelectedRow(port);
  };

  const handleDelete = async (portId: string) => {
    await projectOtherApiService<Port>().delete(model, portId);
    refetch();
  };

  const handleClickDetail = (port: Port) => {
    toggleDetailDrawer();
    setSelectedRow(port);
  };

  const mapPortToDetailItems = (port: Port): { title: string; value: string }[] => [
    { title: t('project.other.port.details.owner'), value: port?.owner || 'N/A' },
    { title: t('project.other.port.details.operator'), value: port?.operator || 'N/A' },
    { title: t('project.other.port.details.port-type'), value: port?.port_type || 'N/A' },
    {
      title: t('project.other.port.details.site-area'),
      value: port?.site_area ? `${port?.site_area} sqm` : 'N/A'
    },
    {
      title: t('project.other.port.details.annual-traffic-size'),
      value: port?.annual_traffic_size ? `${port?.annual_traffic_size} tons` : 'N/A'
    },
    { title: t('project.other.port.details.revision-no'), value: port?.revision_no?.toString() || 'N/A' },
    {
      title: t('project.other.port.details.created-at'),
      value: port?.created_at ? formatCreatedAt(port?.created_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <PortDrawer
          model={model}
          open={showDrawer}
          toggle={toggleDrawer}
          port={selectedRow as Port}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapPortToDetailItems(selectedRow as Port)}
          hasReference={true} // Assuming ports have references, adjust as necessary
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.port}
          title={t('project.other.port.port-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.port.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: portColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <PortCard onDetail={handleClickDetail} port={data} onEdit={handleEdit} refetch={refetch} onDelete={handleDelete} />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: true,
          permission: {
            action: 'create',
            subject: 'port'
          }
        }}
        fetchDataFunction={refetch}
        items={ports || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default PortList;
