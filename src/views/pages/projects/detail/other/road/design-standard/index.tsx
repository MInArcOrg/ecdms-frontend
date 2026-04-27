'use client';

import type React from 'react';

import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { DesignStandard } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import DesignStandardCard from './design-standard-card';
import DesignStandardDrawer from './design-standard-drawer';
import { designStandardColumns } from './design-standard-row';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';

interface DesignStandardListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const DesignStandardList: React.FC<DesignStandardListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<DesignStandard | null>(null);
  const { t } = useTranslation();

  const fetchDesignStandards = (params: GetRequestParam): Promise<IApiResponse<DesignStandard[]>> => {
    return projectOtherApiSecondService<DesignStandard>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: designStandards,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<DesignStandard[]>({
    queryKey: ['designStandards'],
    fetchFunction: fetchDesignStandards
  });

  const toggleDrawer = () => {
    setSelectedRow({} as DesignStandard);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as DesignStandard);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (designStandard: DesignStandard) => {
    toggleDrawer();
    setSelectedRow(designStandard);
  };

  const handleDelete = async (designStandardId: string) => {
    await projectOtherApiSecondService<DesignStandard>().delete(otherSubMenu?.apiRoute || '', designStandardId);
    refetch();
  };

  const handleClickDetail = (designStandard: DesignStandard) => {
    toggleDetailDrawer();
    setSelectedRow(designStandard);
  };

  const mapDesignStandardToDetailItems = (designStandard: DesignStandard): { title: string; value: string }[] => [
    {
      title: t('project.other.design-standard.details.road-segment'),
      value: designStandard?.roadSegment?.name ?? designStandard?.road_segment_id ?? 'N/A'
    },
    {
      title: t('project.other.design-standard.details.functional-classification'),
      value: designStandard?.functionalClassification?.title ?? designStandard?.functional_classification_id ?? 'N/A'
    },
    {
      title: t('project.other.design-standard.details.design-classification'),
      value: designStandard?.designClassification?.title ?? designStandard?.design_classification_id ?? 'N/A'
    },
    {
      title: t('project.other.design-standard.details.design-standard-id'),
      value: designStandard?.designStandard?.title ?? designStandard?.design_standard_id ?? 'N/A'
    },
    {
      title: t('project.other.design-standard.details.design-traffic-flow'),
      value: designStandard?.designTrafficFlow?.title ?? designStandard?.design_traffic_flow_id ?? 'N/A'
    },
    {
      title: t('project.other.design-standard.details.design-life-time-years'),
      value: designStandard?.design_life_time_years?.toString() || 'N/A'
    },
    {
      title: t('project.other.design-standard.details.segment-number'),
      value: designStandard?.segment_number?.toString() || 'N/A'
    },
    {
      title: t('project.other.design-standard.details.remark'),
      value: designStandard?.remark || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: designStandard?.created_at ? formatCreatedAt(designStandard.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: designStandard?.updated_at ? formatCreatedAt(designStandard.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <DesignStandardDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          designStandard={selectedRow as DesignStandard}
          refetch={refetch}

          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapDesignStandardToDetailItems(selectedRow as DesignStandard)}
          hasReference={false}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.designStandard}
          title={t('project.other.design-standard.design-standard-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.design-standard.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: designStandardColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <DesignStandardCard
            onDetail={handleClickDetail}
            designStandard={data}
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
            subject: 'designstandard'
          }
        }}
        fetchDataFunction={refetch}
        items={designStandards || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default DesignStandardList;

