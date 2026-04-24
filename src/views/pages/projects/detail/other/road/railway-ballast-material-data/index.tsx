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
import RailwayBallastMaterialDataCard from './railway-ballast-material-data-card';
import RailwayBallastMaterialDataDrawer from './railway-ballast-material-data-drawer';
import { RailwayBallastMaterialData } from 'src/types/project/other';
import { railwayBallastMaterialDataColumns } from './railway-ballast-material-data-row';
import { formatCreatedAt } from 'src/utils/formatter/date';

interface railwayBallastMaterialDataProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RailwayBallastMaterialDataList: React.FC<railwayBallastMaterialDataProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RailwayBallastMaterialData | null>(null);
  const { t } = useTranslation();

  const fetchRailwayBallastMaterialData = (params: GetRequestParam): Promise<IApiResponse<RailwayBallastMaterialData[]>> => {
    return projectOtherApiSecondService<RailwayBallastMaterialData>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: railwayBallastMaterialData,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<RailwayBallastMaterialData[]>({
    queryKey: ['railwayBallastMaterialData'],
    fetchFunction: fetchRailwayBallastMaterialData
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwayBallastMaterialData);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayBallastMaterialData);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (railwayBallastMaterialData: RailwayBallastMaterialData) => {
    toggleDrawer();
    setSelectedRow(railwayBallastMaterialData);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwayBallastMaterialData>().delete(otherSubMenu?.apiRoute || '', id);
    refetch();
  };

  const handleClickDetail = (railwayBallastMaterialData: RailwayBallastMaterialData) => {
    toggleDetailDrawer();
    setSelectedRow(railwayBallastMaterialData);
  };

  const mapRailwayBallastMaterialDataToDetailItems = (
    railwayBallastMaterialData: RailwayBallastMaterialData
  ): { title: string; value: string }[] => [
      {
        title: t('common.table-columns.id'),
        value: railwayBallastMaterialData?.project_id || 'N/A'
      },
      {
        title: t('project.other.railway-ballast-material-data.details.railway-line-section-name'),
        value: railwayBallastMaterialData?.railway_line_section_name || 'N/A'
      },
      {
        title: t('project.other.railway-ballast-material-data.details.ballast-material-type-id'),
        value: railwayBallastMaterialData?.ballastMaterialType?.title ?? railwayBallastMaterialData?.ballast_material_type_id ?? 'N/A'
      },
      {
        title: t('project.other.railway-ballast-material-data.details.particle-size-distribution-grading'),
        value: railwayBallastMaterialData?.particle_size_distribution_grading || 'N/A'
      },
      {
        title: t('project.other.railway-ballast-material-data.details.ballast-used-quantity'),
        value:
          railwayBallastMaterialData?.ballast_used_quantity !== undefined
            ? railwayBallastMaterialData.ballast_used_quantity.toLocaleString()
            : 'N/A'
      },
      {
        title: t('project.other.railway-ballast-material-data.details.ballast-source-id'),
        value: railwayBallastMaterialData?.ballastSource?.title ?? railwayBallastMaterialData?.ballast_source_id ?? 'N/A'
      },
      {
        title: t('project.other.railway-ballast-material-data.details.ballast-material-size'),
        value:
          railwayBallastMaterialData?.ballast_material_size !== undefined
            ? railwayBallastMaterialData.ballast_material_size.toLocaleString()
            : 'N/A'
      },
      {
        title: t('project.other.railway-ballast-material-data.details.ballast-layer-thickness'),
        value:
          railwayBallastMaterialData?.ballast_layer_thickness !== undefined
            ? railwayBallastMaterialData.ballast_layer_thickness.toLocaleString()
            : 'N/A'
      },
      {
        title: t('project.other.railway-ballast-material-data.details.compaction-method-id'),
        value: railwayBallastMaterialData?.compactionMethod?.title ?? railwayBallastMaterialData?.compaction_method_id ?? 'N/A'
      },
      {
        title: t('project.other.railway-ballast-material-data.details.remark'),
        value: railwayBallastMaterialData?.remark || 'N/A'
      },
      {
        title: t('common.table-columns.created-at'),
        value: railwayBallastMaterialData?.created_at ? formatCreatedAt(railwayBallastMaterialData.created_at) : 'N/A'
      },
      {
        title: t('common.table-columns.updated-at'),
        value: railwayBallastMaterialData?.updated_at ? formatCreatedAt(railwayBallastMaterialData.updated_at) : 'N/A'
      }
    ];

  return (
    <Box>
      {showDrawer && (
        <RailwayBallastMaterialDataDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayBallastMaterialData={selectedRow as RailwayBallastMaterialData}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapRailwayBallastMaterialDataToDetailItems(selectedRow as RailwayBallastMaterialData)}
          hasReference={false}
          id={selectedRow?.project_id || ''}
          fileType=""
          title={t('project.other.railway-ballast-material-data.detail')}
        />
      )}

      <ItemsListing
        title={t('project.other.railway-ballast-material-data.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayBallastMaterialDataColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwayBallastMaterialDataCard
            onDetail={handleClickDetail}
            railwayBallastMaterialData={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: 'railwayballastmaterialdata'
          }
        }}
        fetchDataFunction={refetch}
        items={railwayBallastMaterialData || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwayBallastMaterialDataList;
