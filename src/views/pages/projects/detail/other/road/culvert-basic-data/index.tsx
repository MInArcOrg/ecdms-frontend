'use client';

import type React from 'react';

import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import type { OtherMenuRoute } from 'src/pages/projects/[typeId]/details/[id]/other/(subMenuItems)';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { CulvertBasicData } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import CulvertBasicDataCard from './culvert-basic-data-card';
import CulvertBasicDataDrawer from './culvert-basic-data-drawer';
import { culvertBasicDataColumns } from './culvert-basic-data-row';

interface CulvertBasicDataListProps {
  otherSubMenu?: OtherMenuRoute;
  typeId: string;
  projectId: string;
}

const CulvertBasicDataList: React.FC<CulvertBasicDataListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<CulvertBasicData | null>(null);
  const { t } = useTranslation();

  const fetchCulvertBasicData = (params: GetRequestParam): Promise<IApiResponse<CulvertBasicData[]>> => {
    return projectOtherApiSecondService<CulvertBasicData>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: culvertBasicData,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<CulvertBasicData[]>({
    queryKey: ['culvertBasicData'],
    fetchFunction: fetchCulvertBasicData
  });

  const toggleDrawer = () => {
    setSelectedRow({} as CulvertBasicData);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as CulvertBasicData);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (culvertBasicData: CulvertBasicData) => {
    toggleDrawer();
    setSelectedRow(culvertBasicData);
  };

  const handleDelete = async (culvertBasicDataId: string) => {
    await projectOtherApiSecondService<CulvertBasicData>().delete(otherSubMenu?.apiRoute || '', culvertBasicDataId);
    refetch();
  };

  const handleClickDetail = (culvertBasicData: CulvertBasicData) => {
    toggleDetailDrawer();
    setSelectedRow(culvertBasicData);
  };

  const mapCulvertBasicDataToDetailItems = (culvertBasicData: CulvertBasicData): { title: string; value: string }[] => [
    {
      title: t('project.other.culvert-basic-data.details.name'),
      value: culvertBasicData?.name || 'N/A'
    },
    {
      title: t('project.other.culvert-basic-data.details.culvert-name'),
      value: culvertBasicData?.culvert_name || 'N/A'
    },
    {
      title: t('project.other.culvert-basic-data.details.culvert-number'),
      value: culvertBasicData?.culvert_number?.toString() || 'N/A'
    },
    {
      title: t('project.other.culvert-basic-data.details.culvert-coordinate-x'),
      value: culvertBasicData?.culvert_coordinate_x?.toString() || 'N/A'
    },
    {
      title: t('project.other.culvert-basic-data.details.culvert-coordinate-y'),
      value: culvertBasicData?.culvert_coordinate_y?.toString() || 'N/A'
    },
    {
      title: t('project.other.culvert-basic-data.details.area-topography-id'),
      value: culvertBasicData?.area_topography_id || 'N/A'
    },
    {
      title: t('project.other.culvert-basic-data.details.highest-water-level'),
      value: culvertBasicData?.highest_water_level?.toString() || 'N/A'
    },
    {
      title: t('project.other.culvert-basic-data.details.lowest-water-level'),
      value: culvertBasicData?.lowest_water_level?.toString() || 'N/A'
    },
    {
      title: t('project.other.culvert-basic-data.details.construction-year'),
      value: culvertBasicData?.construction_year?.toString() || 'N/A'
    },
    {
      title: t('project.other.culvert-basic-data.details.contractor'),
      value: culvertBasicData?.contractor || 'N/A'
    },
    {
      title: t('project.other.culvert-basic-data.details.designer'),
      value: culvertBasicData?.designer || 'N/A'
    },
    {
      title: t('project.other.culvert-basic-data.details.culvert-cost'),
      value: culvertBasicData?.culvert_cost?.toString() || 'N/A'
    },
    {
      title: t('project.other.culvert-basic-data.details.detour-possibility'),
      value: culvertBasicData?.detour_possibility ? t('common.yes') : t('common.no')
    },
    {
      title: t('project.other.culvert-basic-data.details.road-alignment'),
      value: culvertBasicData?.road_alignment || 'N/A'
    },
    {
      title: t('project.other.culvert-basic-data.details.altitude'),
      value: culvertBasicData?.altitude?.toString() || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: culvertBasicData?.created_at ? formatCreatedAt(culvertBasicData.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: culvertBasicData?.updated_at ? formatCreatedAt(culvertBasicData.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <CulvertBasicDataDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          culvertBasicData={selectedRow as CulvertBasicData}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapCulvertBasicDataToDetailItems(selectedRow as CulvertBasicData)}
          hasReference={false}
          id={selectedRow?.id || ''}
          title={t('project.other.culvert-basic-data.culvert-basic-data-details')}
          fileType=""
        />
      )}

      <ItemsListing
        title={t('project.other.culvert-basic-data.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: culvertBasicDataColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <CulvertBasicDataCard
            onDetail={handleClickDetail}
            culvertBasicData={data}
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
            subject: 'culvertbasicdata'
          }
        }}
        fetchDataFunction={refetch}
        items={culvertBasicData || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default CulvertBasicDataList;
