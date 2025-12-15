'use client';

import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import stakeholderMaterialApiService from 'src/services/stakeholder/stakeholder-material-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import MaterialCard from './stakeholder-material-card';
import MaterialDrawer from './stakeholder-material-drawer';
import type { StakeholderMaterial } from 'src/types/stakeholder/stackholder-material';
import { materialColumns } from './stakeholder-material-row';

interface MaterialListProps {
  stakeholderId: string;
}

const MaterialList: React.FC<MaterialListProps> = ({ stakeholderId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<StakeholderMaterial | null>(null);
  const { t } = useTranslation();

  const { data: materialCategories } = usePaginatedFetch<StakeholderMaterial[]>({
    queryKey: ['material-categories'],
    fetchFunction: () => stakeholderMaterialApiService.getAll({
      filter: { stakeholder_id: stakeholderId }
    })
  });
  const fetchMaterials = (params: GetRequestParam): Promise<IApiResponse<StakeholderMaterial[]>> => {
    return stakeholderMaterialApiService.getAll({
      ...params,
      filter: { ...params.filter, stakeholder_id: stakeholderId }
    });
  };

  const {
    data: materials,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<StakeholderMaterial[]>({
    queryKey: ['materials'],
    fetchFunction: fetchMaterials
  });

  const toggleDrawer = () => {
    setSelectedRow({} as StakeholderMaterial);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as StakeholderMaterial);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (material: StakeholderMaterial) => {
    toggleDrawer();
    setSelectedRow(material);
  };

  const handleDelete = async (materialId: string) => {
    await stakeholderMaterialApiService.delete(materialId);
    refetch();
  };

  const handleClickDetail = (material: StakeholderMaterial) => {
    toggleDetailDrawer();
    setSelectedRow(material);
  };

  const getCategoryName = (categoryId: string) => {
    const category = materialCategories.find((cat) => cat.id === categoryId);
    return category ? category.name : 'N/A';
  };

  const mapMaterialToDetailItems = (material: StakeholderMaterial): { title: string; value: string }[] => [
    { title: t('stakeholder.material.name'), value: material?.name || 'N/A' },
    {
      title: t('stakeholder.material.category'),
      value: getCategoryName(material?.material_category)
    },
    {
      title: t('stakeholder.material.subcategory'),
      value: material?.material_subcategory || 'N/A'
    },
    {
      title: t('stakeholder.material.description'),
      value: material?.description || 'N/A'
    },
    {
      title: t('stakeholder.material.purpose'),
      value: material?.purpose || 'N/A'
    },
    {
      title: t('stakeholder.material.quantity'),
      value: material?.quantity?.toString() || 'N/A'
    },
    {
      title: t('stakeholder.material.unit-price'),
      value: material?.unit_price?.toString() || 'N/A'
    },
    {
      title: t('stakeholder.material.current-situation'),
      value: material?.current_situation || 'N/A'
    },
    {
      title: t('stakeholder.material.location'),
      value: material?.location || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: material?.created_at ? formatCreatedAt(material.created_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <MaterialDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          material={selectedRow as StakeholderMaterial}
          refetch={refetch}
          stakeholderId={stakeholderId}
          materialCategories={materialCategories}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapMaterialToDetailItems(selectedRow as StakeholderMaterial)}
          id={selectedRow?.id || ''}
          hasReference={false}
          fileType="stakeholder-material"
          title={t('stakeholder.material.details')}
        />
      )}

      <ItemsListing
        title={t('stakeholder.material.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: materialColumns(handleClickDetail, handleEdit, handleDelete, t, materialCategories)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <MaterialCard
            onDetail={handleClickDetail}
            material={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
            materialCategories={materialCategories}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: 'stakeholdermaterial'
          }
        }}
        fetchDataFunction={refetch}
        items={materials || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default MaterialList;
