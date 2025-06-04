'use client';

import type React from 'react';
import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import RailwaySubBallastMaterialCard from './railway-sub-ballast-material-card';
import RailwaySubBallastMaterialDrawer from './railway-sub-ballast-material-drawer';
import { RailwaySubBallastMaterial } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import { railwaySubBallastMaterialColumns } from './railway-sub-ballast-material-row';

interface RailwaySubBallastMaterialListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RailwaySubBallastMaterialList: React.FC<RailwaySubBallastMaterialListProps> = ({
  otherSubMenu,
  projectId,
  typeId
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RailwaySubBallastMaterial | null>(null);
  const { t } = useTranslation();

  const fetchData = (params: GetRequestParam): Promise<IApiResponse<RailwaySubBallastMaterial[]>> => {
    return projectOtherApiSecondService<RailwaySubBallastMaterial>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<RailwaySubBallastMaterial[]>({
    queryKey: ['railwaySubBallastMaterials'],
    fetchFunction: fetchData
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwaySubBallastMaterial);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwaySubBallastMaterial);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (row: RailwaySubBallastMaterial) => {
    setSelectedRow(row);
    setShowDrawer(true);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwaySubBallastMaterial>().delete(otherSubMenu?.apiRoute || '', id);
    refetch();
  };

  const handleClickDetail = (row: RailwaySubBallastMaterial) => {
    setSelectedRow(row);
    setShowDetailDrawer(true);
  };

  const mapToDetailItems = (row: RailwaySubBallastMaterial): { title: string; value: string }[] => [
    {
      title: t('common.table-columns.id'),
      value: row?.id || 'N/A'
    },
    {
      title: t('project.other.railway-sub-ballast-material.details.railway-line-section-name'),
      value: row?.railway_line_section_name || 'N/A'
    },
    {
      title: t('project.other.railway-sub-ballast-material.details.sub-ballast-material-type-id'),
      value: row?.sub_ballast_material_type_id || 'N/A'
    },
    {
      title: t('project.other.railway-sub-ballast-material.details.layer-thickness'),
      value: row?.layer_thickness?.toLocaleString() ?? 'N/A'
    },
    {
      title: t('project.other.railway-sub-ballast-material.details.layer-depth'),
      value: row?.layer_depth?.toLocaleString() ?? 'N/A'
    },
    {
      title: t('project.other.railway-sub-ballast-material.details.density'),
      value: row?.density?.toLocaleString() ?? 'N/A'
    },
    {
      title: t('project.other.railway-sub-ballast-material.details.moisture-content'),
      value: row?.moisture_content?.toLocaleString() ?? 'N/A'
    },
    {
      title: t('project.other.railway-sub-ballast-material.details.method-used-for-compaction'),
      value: row?.method_used_for_compaction || 'N/A'
    },
    {
      title: t('project.other.railway-sub-ballast-material.details.compaction-density'),
      value: row?.compaction_density?.toLocaleString() ?? 'N/A'
    },
    {
      title: t('project.other.railway-sub-ballast-material.details.remark'),
      value: row?.remark || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: row?.created_at ? formatCreatedAt(row.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: row?.updated_at ? formatCreatedAt(row.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <RailwaySubBallastMaterialDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwaySubBallastMaterial={selectedRow as RailwaySubBallastMaterial}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapToDetailItems(selectedRow as RailwaySubBallastMaterial)}
          hasReference={false}
          id={selectedRow?.id || ''}
          fileType=""
          title={t('project.other.railway-sub-ballast-material.detail')}
        />
      )}

      <ItemsListing
        title={t('project.other.railway-sub-ballast-material.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwaySubBallastMaterialColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwaySubBallastMaterialCard
            onDetail={handleClickDetail}
            railwaySubBallastMaterial={data}
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
            subject: 'railwaysubballastmaterial'
          }
        }}
        fetchDataFunction={refetch}
        items={data || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwaySubBallastMaterialList;