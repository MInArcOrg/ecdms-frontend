import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectAdditionalInfoApiService from 'src/services/project/project-additional-info-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import AdditionalInfoCard from './project-additional-info-card';
import AdditionalInfoDrawer from './project-additional-info-drawer';
import { ProjectAdditionalInfo } from 'src/types/project/project-additional-info-and-outcome';
import { additionalInfoColumns } from './project-additional-info-row';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';


interface AdditionalInfoListProps {
    model: string;
    projectId: string;
    typeId: string;
  }

const AdditionalInfoList: React.FC<AdditionalInfoListProps> = ({ projectId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ProjectAdditionalInfo | null>(null);
  const { t } = useTranslation();

  const fetchAdditionalInfos = (params: GetRequestParam): Promise<IApiResponse<ProjectAdditionalInfo[]>> => {
    return projectAdditionalInfoApiService.getAll({
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: additionalInfos,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<ProjectAdditionalInfo[]>({
    queryKey: ['additionalInfos'],
    fetchFunction: fetchAdditionalInfos
  });

  const toggleDrawer = () => {
    setSelectedRow({} as ProjectAdditionalInfo);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as ProjectAdditionalInfo);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (additionalInfo: ProjectAdditionalInfo) => {
    toggleDrawer();
    setSelectedRow(additionalInfo);
  };

  const handleDelete = async (additionalInfoId: string) => {
    await projectAdditionalInfoApiService.delete(additionalInfoId);
    refetch();
  };

  const handleClickDetail = (additionalInfo: ProjectAdditionalInfo) => {
    toggleDetailDrawer();
    setSelectedRow(additionalInfo);
  };

  const mapAdditionalInfoToDetailItems = (additionalInfo: ProjectAdditionalInfo): { title: string; value: string }[] => [
    { title: t('project.additional-info.status'), value: additionalInfo?.project_status || 'N/A' },
    { title: t('project.additional-info.accidents'), value: additionalInfo?.work_accident_number?.toString() || 'N/A' },
    { title: t('project.additional-info.reason'), value: additionalInfo?.reason || 'N/A' },
    { title: t('common.table-columns.created-at'), value: additionalInfo?.created_at ? formatCreatedAt(additionalInfo.created_at) : 'N/A' },
    { title: t('common.table-columns.updated-at'), value: additionalInfo?.updated_at ? formatCreatedAt(additionalInfo.updated_at) : 'N/A' }
  ];

  return (
    <Box>
      {showDrawer && (
        <AdditionalInfoDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          additionalInfo={selectedRow as ProjectAdditionalInfo}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapAdditionalInfoToDetailItems(selectedRow as ProjectAdditionalInfo)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.project}
          title={t('project.additional-info.details')}
        />
      )}

      <ItemsListing
        title={t('project.additional-info.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: additionalInfoColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <AdditionalInfoCard onDetail={handleClickDetail} additionalInfo={data} onEdit={handleEdit} refetch={refetch} onDelete={handleDelete} />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: true,
          permission: {
            action: 'create',
            subject: 'additionalinfo'
          }
        }}
        fetchDataFunction={refetch}
        items={additionalInfos || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default AdditionalInfoList;