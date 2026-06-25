import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { dropDownConfig } from 'src/configs/api-constants';
import { resourceMasterModels } from 'src/constants/master-data/resource-general-master-constants';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import resourceGeneralMasterDataApiService from 'src/services/general/resource-general-master-data-service';
import masterCategoryApiService from 'src/services/master-data/master-category-service';
import masterSubCategoryApiService from 'src/services/master-data/master-sub-category-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import type { Resource } from 'src/types/resource';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import masterTypeApiService from 'src/services/master-data/master-type-service';
import resourceApiService from 'src/services/resource/resource-service';
import { resourceTypesMaster } from 'src/views/pages/resources/details/layout/resource-menu-items';
import MaterialsDrawer from './materials-drawer';
import { materialColumns } from './materials-row';

const ProjectMaterialsList = ({ projectId }: { projectId: string }) => {
  const { t } = useTranslation();
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Resource | null>(null);

  const { data: materialTypes } = useQuery({
    queryKey: ['masterType', 'resource', resourceTypesMaster.material],
    queryFn: () => masterTypeApiService.getAll('resource', { filter: { flag: resourceTypesMaster.material } }),
    staleTime: Infinity,
    gcTime: 5 * 60 * 1000
  });

  const materialTypeId = materialTypes?.payload?.[0]?.id || '';

  const { data: materialCategories } = useQuery({
    queryKey: ['masterCategory', 'resource', materialTypeId],
    queryFn: () =>
      masterCategoryApiService.getAll('resource', {
        filter: { resourcetype_id: materialTypeId },
        pagination: { page: 1, pageSize: 100000 }
      }),
    enabled: Boolean(materialTypeId)
  });

  const { data: materialSubCategories } = useQuery({
    queryKey: ['masterSubCategory', 'resource'],
    queryFn: () =>
      masterSubCategoryApiService.getAll('resource', {
        pagination: { page: 1, pageSize: 100000 }
      }),
    enabled: Boolean(materialTypeId)
  });

  const { data: quantityMeasurementUnits } = useQuery({
    queryKey: ['quantity-measurement-units', resourceMasterModels.quantityMeasurementUnit.model],
    queryFn: () =>
      resourceGeneralMasterDataApiService.getAll(
        dropDownConfig({
          pagination: { page: 1, pageSize: 100000 },
          filter: {
            model: resourceMasterModels.quantityMeasurementUnit.model
          }
        })
      )
  });

  const { data: qualityMeasurementUnits } = useQuery({
    queryKey: ['quality-measurement-units', resourceMasterModels.qualityMeasurementUnit.model],
    queryFn: () =>
      resourceGeneralMasterDataApiService.getAll(
        dropDownConfig({
          pagination: { page: 1, pageSize: 100000 },
          filter: {
            model: resourceMasterModels.qualityMeasurementUnit.model
          }
        })
      )
  });

  const fetchMaterials = (params: GetRequestParam): Promise<IApiResponse<Resource[]>> => {
    return resourceApiService.getAll({
      ...params,
      filter: {
        ...params.filter,
        resourcetype_id: materialTypeId,
        parent: projectId
      }
    });
  };

  const {
    data: materials,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<Resource[]>({
    queryKey: ['project-materials', projectId, materialTypeId],
    fetchFunction: fetchMaterials
  });

  const toggleDrawer = () => setShowDrawer(!showDrawer);

  const toggleDetailDrawer = () => {
    setSelectedRow(null);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleCreate = () => {
    setSelectedRow(null);
    setShowDrawer(true);
  };

  const handleEdit = (item: Resource) => {
    setSelectedRow(item);
    setShowDrawer(true);
  };

  const handleClickDetail = (item: Resource) => {
    setSelectedRow(item);
    setShowDetailDrawer(true);
  };

  const handleDelete = async (id: string) => {
    await resourceApiService.delete(id);
    refetch();
  };

  const canRender = Boolean(materialTypeId);

  const getMasterTitle = (items: { id?: string; title?: string }[] | undefined, id?: string) => {
    if (!id) return 'N/A';

    return items?.find((item) => item.id === id)?.title || 'N/A';
  };

  const mapMaterialToDetailItems = (material: Resource): { title: string; value: string }[] => [
    { title: t('resource.form.name'), value: material?.name || 'N/A' },
    {
      title: t('resource.form.resourcecategory_id'),
      value: getMasterTitle(materialCategories?.payload, material?.resourcecategory_id)
    },
    {
      title: t('resource.form.resourcesubcategory_id'),
      value: getMasterTitle(materialSubCategories?.payload, material?.resourcesubcategory_id)
    },
    {
      title: t('resource.form.quantity_measurement_unit_id'),
      value: getMasterTitle(quantityMeasurementUnits?.payload, material?.quantity_measurement_unit_id)
    },
    {
      title: t('resource.form.quality_measurement_unit_id'),
      value: getMasterTitle(qualityMeasurementUnits?.payload, material?.quality_measurement_unit_id)
    },
    {
      title: t('resource.columns.remark'),
      value: material?.remark || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: material?.created_at ? formatCreatedAt(material.created_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && canRender && (
        <MaterialsDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          refetch={refetch}
          projectId={projectId}
          resourceTypeId={materialTypeId}
          material={selectedRow}
        />
      )}

      {showDetailDrawer && selectedRow && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapMaterialToDetailItems(selectedRow)}
          id={selectedRow.id || ''}
          hasReference={false}
          fileType="project-material"
          title={t('project.navigation.submenu.resource.resources.materials')}
        />
      )}

      <ItemsListing
        title={t('project.navigation.submenu.resource.resources.materials')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        isLoading={isLoading}
        tableProps={{
          headers: materialColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: handleCreate,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: 'projectmaterial'
          }
        }}
        fetchDataFunction={refetch}
        items={materials || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default ProjectMaterialsList;
