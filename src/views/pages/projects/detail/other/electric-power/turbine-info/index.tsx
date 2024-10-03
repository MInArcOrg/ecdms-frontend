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
import TurbineInfoCard from './turbine-info-card';
import TurbineInfoDrawer from './turbine-info-drawer';
import { TurbineInfo } from 'src/types/project/other';
import { turbineInfoColumns } from './turbine-info-row';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';

interface TurbineInfoListProps {
  model: string;
  typeId: string;
  projectId: string;
}

const TurbineInfoList: React.FC<TurbineInfoListProps> = ({ model, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<TurbineInfo | null>(null);
  const { t } = useTranslation();

  const fetchGeneratingCapacities = (params: GetRequestParam): Promise<IApiResponse<TurbineInfo[]>> => {
    return projectOtherApiService<TurbineInfo>().getAll(model, {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: generatingCapacities,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<TurbineInfo[]>({
    queryKey: ['generatingCapacities'],
    fetchFunction: fetchGeneratingCapacities
  });

  const toggleDrawer = () => {
    setSelectedRow(null);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow(null);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (turbineInfo: TurbineInfo) => {
    setSelectedRow(turbineInfo);
    setShowDrawer(true);
  };

  const handleDelete = async (turbineInfoId: string) => {
    await projectOtherApiService<TurbineInfo>().delete(model, turbineInfoId);
    refetch();
  };

  const handleClickDetail = (turbineInfo: TurbineInfo) => {
    setSelectedRow(turbineInfo);
    setShowDetailDrawer(true);
  };

  const mapTurbineInfoToDetailItems = (turbineInfo: TurbineInfo): { title: string; value: string }[] => [
    { title: t('project.other.turbine-info.details.name'), value: turbineInfo.name || 'N/A' },
    { title: t('project.other.turbine-info.details.turbine-type'), value: turbineInfo.turbine_type || 'N/A' },
    { title: t('project.other.turbine-info.details.generating-capacity'), value: turbineInfo.generating_capacity || 'N/A' },
    { title: t('project.other.turbine-info.details.designed-quantity'), value: turbineInfo.designed_quantity || 'N/A' },
    { title: t('project.other.turbine-info.details.installed-quantity'), value: turbineInfo.installed_quantity || 'N/A' },
    { title: t('project.other.turbine-info.details.functional-quantity'), value: turbineInfo.functional_quantity || 'N/A' },
    { title: t('common.table-columns.created-at'), value: turbineInfo.created_at ? formatCreatedAt(turbineInfo.created_at) : 'N/A' },
    { title: t('common.table-columns.updated-at'), value: turbineInfo.updated_at ? formatCreatedAt(turbineInfo.updated_at) : 'N/A' }
  ];

  return (
    <Box>
      {showDrawer && (
        <TurbineInfoDrawer
          model={model}
          open={showDrawer}
          toggle={toggleDrawer}
          turbineInfo={selectedRow as TurbineInfo}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapTurbineInfoToDetailItems(selectedRow!)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.turbineInfo}
          title={t('project.other.turbine-info.turbine-info-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.turbine-info.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: turbineInfoColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <TurbineInfoCard onDetail={handleClickDetail} turbineInfo={data} onEdit={handleEdit} refetch={refetch} onDelete={handleDelete} />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: true,
          permission: {
            action: 'create',
            subject: 'turbineinfo'
          }
        }}
        fetchDataFunction={refetch}
        items={generatingCapacities || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default TurbineInfoList;
