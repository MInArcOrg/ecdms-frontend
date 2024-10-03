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
import ElectricTowerCard from './electric-tower-card';
import ElectricTowerDrawer from './electric-tower-drawer';
import { ElectricTower } from 'src/types/project/other';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { electricTowerColumns } from './electric-tower-row';

interface ElectricTowerListProps {
  model: string;
  projectId: string;
  typeId: string;
}

const ElectricTowerList: React.FC<ElectricTowerListProps> = ({ model, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ElectricTower | null>(null);
  const { t } = useTranslation();

  const fetchElectricTowers = (params: GetRequestParam): Promise<IApiResponse<ElectricTower[]>> => {
    return projectOtherApiService<ElectricTower>().getAll(model, {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: electricTowers,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<ElectricTower[]>({
    queryKey: ['electricTowers'],
    fetchFunction: fetchElectricTowers
  });

  const toggleDrawer = () => {
    setSelectedRow(null);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow(null);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (electricTower: ElectricTower) => {
    setSelectedRow(electricTower);
    setShowDrawer(true);
  };

  const handleDelete = async (electricTowerId: string) => {
    await projectOtherApiService<ElectricTower>().delete(model, electricTowerId);
    refetch();
  };

  const handleClickDetail = (electricTower: ElectricTower) => {
    setSelectedRow(electricTower);
    setShowDetailDrawer(true);
  };

  const mapElectricTowerToDetailItems = (electricTower: ElectricTower): { title: string; value: string }[] => [
    { title: t('project.other.electric-tower.details.transmissionline-id'), value: electricTower.transmissionline_id || 'N/A' },
    {
      title: t('project.other.electric-tower.details.overall-length'),
      value: electricTower.overall_length !== null ? electricTower.overall_length?.toString() || '' : 'N/A'
    },
    {
      title: t('project.other.electric-tower.details.embedded-length'),
      value: electricTower.embedded_length !== null ? electricTower.embedded_length?.toString() || '' : 'N/A'
    },
    { title: t('project.other.electric-tower.details.columns'), value: electricTower.columns || 'N/A' },
    { title: t('project.other.electric-tower.details.braces'), value: electricTower.braces || 'N/A' },
    { title: t('project.other.electric-tower.details.beam-cross-arms'), value: electricTower.beam_cross_arms || 'N/A' },
    { title: t('project.other.electric-tower.details.brace-cross-arm'), value: electricTower.brace_cross_arm || 'N/A' },
    { title: t('project.other.electric-tower.details.elasticity-modulus'), value: electricTower.elasticity_modulus || 'N/A' },
    { title: t('project.other.electric-tower.details.poission-ratio'), value: electricTower.poission_ratio || 'N/A' },
    {
      title: t('project.other.electric-tower.details.revision-no'),
      value: electricTower.revision_no !== null ? electricTower.revision_no?.toString() || '' : 'N/A'
    },
    { title: t('common.table-columns.created-at'), value: electricTower.created_at ? formatCreatedAt(electricTower.created_at) : 'N/A' },
    { title: t('common.table-columns.updated-at'), value: electricTower.updated_at ? formatCreatedAt(electricTower.updated_at) : 'N/A' }
  ];

  return (
    <Box>
      {showDrawer && (
        <ElectricTowerDrawer
          model={model}
          open={showDrawer}
          toggle={toggleDrawer}
          electricTower={selectedRow as ElectricTower}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapElectricTowerToDetailItems(selectedRow!)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.electricTower}
          title={t('project.other.electric-tower.electric-tower-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.electric-tower.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: electricTowerColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <ElectricTowerCard
            onDetail={handleClickDetail}
            electricTower={data}
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
            subject: 'electrictower'
          }
        }}
        fetchDataFunction={refetch}
        items={electricTowers || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default ElectricTowerList;
