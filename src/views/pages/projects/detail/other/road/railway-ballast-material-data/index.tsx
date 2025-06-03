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
import RailwayBallastCard from './railway-ballast-material-data-card';
import RailwayBallastDrawer from './railway-ballast-material-data-drawer';
import { RailwayBallastMaterialData } from 'src/types/project/other';
import { railwayBallastColumns } from './railway-ballast-material-data-row';

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

  const fetchRailwayBallast = (params: GetRequestParam): Promise<IApiResponse<RailwayBallastMaterialData[]>> => {
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
    fetchFunction: fetchRailwayBallast
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwayBallastMaterialData);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayBallastMaterialData);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (railwayBallast: RailwayBallastMaterialData) => {
    toggleDrawer();
    setSelectedRow(railwayBallast);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwayBallastMaterialData>().delete(otherSubMenu?.apiRoute || '', id);
    refetch();
  };

  const handleClickDetail = (railwayBallast: RailwayBallastMaterialData) => {
    toggleDetailDrawer();
    setSelectedRow(railwayBallast);
  };

  const mapRailwayBallastToDetailItems = (railwayBallast: RailwayBallastMaterialData): { title: string; value: string }[] => [
    {
      title: t('common.table-columns.id'),
      value: railwayBallast?.project_id || 'N/A'
    },
    {
      title: t('project.other.railway-ballast-material-data.details.railway-line-section-name'),
      value: railwayBallast?.railway_line_section_name || 'N/A'
    },
    {
      title: t('project.other.railway-ballast-material-data.details.ballast-material-type-id'),
      value: railwayBallast?.ballast_material_type_id || 'N/A'
    },
    {
      title: t('project.other.railway-ballast-material-data.details.particle-size-distribution-grading'),
      value: railwayBallast?.particle_size_distribution_grading || 'N/A'
    },
    {
      title: t('project.other.railway-ballast-material-data.details.ballast-used-quantity'),
      value: railwayBallast?.ballast_used_quantity !== undefined
        ? railwayBallast.ballast_used_quantity.toLocaleString()
        : 'N/A'
    },
    {
      title: t('project.other.railway-ballast-material-data.details.ballast-source-id'),
      value: railwayBallast?.ballast_source_id || 'N/A'
    },
    {
      title: t('project.other.railway-ballast-material-data.details.ballast-material-size'),
      value: railwayBallast?.ballast_material_size !== undefined
        ? railwayBallast.ballast_material_size.toLocaleString()
        : 'N/A'
    },
    {
      title: t('project.other.railway-ballast-material-data.details.ballast-layer-thickness'),
      value: railwayBallast?.ballast_layer_thickness !== undefined
        ? railwayBallast.ballast_layer_thickness.toLocaleString()
        : 'N/A'
    },
    {
      title: t('project.other.railway-ballast-material-data.details.compaction-method-id'),
      value: railwayBallast?.compaction_method_id || 'N/A'
    },
    {
      title: t('project.other.railway-ballast-material-data.details.remark'),
      value: railwayBallast?.remark || 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <RailwayBallastDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayBallast={selectedRow as RailwayBallastMaterialData}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapRailwayBallastToDetailItems(selectedRow as RailwayBallastMaterialData)}
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
          headers: railwayBallastColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwayBallastCard
            onDetail={handleClickDetail}
            railwayBallast={data}
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
