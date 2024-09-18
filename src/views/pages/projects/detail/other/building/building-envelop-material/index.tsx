import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectOtherApiService from 'src/services/project/project-other-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { BuildingEnvelopMaterial } from 'src/types/project/other';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import BuildingEnvelopMaterialCard from './building-envelop-material-card';
import BuildingEnvelopMaterialDrawer from './building-envelop-material-drawer';
import { buildingEnvelopMaterialColumns } from './building-envelop-material-row';

interface BuildingEnvelopMaterialListProps {
  model: string;
  typeId: string;
  projectId: string;
}

const BuildingEnvelopMaterialList: React.FC<BuildingEnvelopMaterialListProps> = ({ model, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<BuildingEnvelopMaterial | null>(null);
  const { t } = useTranslation();

  const fetchBuildingEnvelopMaterials = (params: GetRequestParam): Promise<IApiResponse<BuildingEnvelopMaterial[]>> => {
    return projectOtherApiService<BuildingEnvelopMaterial>().getAll(model, {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: buildingEnvelopMaterials,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<BuildingEnvelopMaterial[]>({
    queryKey: ['buildingEnvelopMaterials'],
    fetchFunction: fetchBuildingEnvelopMaterials
  });

  const toggleDrawer = () => {
    setSelectedRow(null);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow(null);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (buildingEnvelopMaterial: BuildingEnvelopMaterial) => {
    toggleDrawer();
    setSelectedRow(buildingEnvelopMaterial);
  };

  const handleDelete = async (materialId: string) => {
    await projectOtherApiService<BuildingEnvelopMaterial>().delete(model, materialId);
    refetch();
  };

  const handleClickDetail = (buildingEnvelopMaterial: BuildingEnvelopMaterial) => {
    toggleDetailDrawer();
    setSelectedRow(buildingEnvelopMaterial);
  };

  const mapBuildingEnvelopMaterialToDetailItems = (
    buildingEnvelopMaterial: BuildingEnvelopMaterial
  ): { title: string; value: string }[] => [
    { title: t('project.other.building-envelop-material.details.exterior-walls'), value: buildingEnvelopMaterial.exterior_walls || 'N/A' },
    { title: t('project.other.building-envelop-material.details.roof-assembly'), value: buildingEnvelopMaterial.roof_assembly || 'N/A' },
    {
      title: t('project.other.building-envelop-material.details.exterior-windows'),
      value: buildingEnvelopMaterial.exterior_windows || 'N/A'
    },
    { title: t('project.other.building-envelop-material.details.exterior-doors'), value: buildingEnvelopMaterial.exterior_doors || 'N/A' },
    {
      title: t('project.other.building-envelop-material.details.shading-components'),
      value: buildingEnvelopMaterial.shading_components || 'N/A'
    },
    { title: t('project.other.building-envelop-material.details.remark'), value: buildingEnvelopMaterial.remark || 'N/A' },
    {
      title: t('common.table-columns.created-at'),
      value: buildingEnvelopMaterial.created_at ? formatCreatedAt(buildingEnvelopMaterial.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: buildingEnvelopMaterial.updated_at ? formatCreatedAt(buildingEnvelopMaterial.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <BuildingEnvelopMaterialDrawer
          model={model}
          open={showDrawer}
          toggle={toggleDrawer}
          buildingEnvelopMaterial={selectedRow as BuildingEnvelopMaterial}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapBuildingEnvelopMaterialToDetailItems(selectedRow as BuildingEnvelopMaterial)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.buildingEnvelopMaterial}
          title={t('project.other.building-envelop-material.building-envelop-material-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.building-envelop-material.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: buildingEnvelopMaterialColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <BuildingEnvelopMaterialCard
            onDetail={handleClickDetail}
            buildingEnvelopMaterial={data}
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
            subject: 'buildingEnvelopMaterial'
          }
        }}
        fetchDataFunction={refetch}
        items={buildingEnvelopMaterials || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default BuildingEnvelopMaterialList;
