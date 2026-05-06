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
import type { BridgeComponentAndAncillaries } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import BridgeComponentsAncillariesCard from './bridge-components-ancillaries-card';
import BridgeComponentsAncillariesDrawer from './bridge-components-ancillaries-drawer';
import { bridgeComponentsAncillariesColumns } from './bridge-components-ancillaries-row';

interface BridgeComponentsAncillariesListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const BridgeComponentsAncillariesList: React.FC<BridgeComponentsAncillariesListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<BridgeComponentAndAncillaries | null>(null);
  const { t } = useTranslation();

  const fetchItems = (params: GetRequestParam): Promise<IApiResponse<BridgeComponentAndAncillaries[]>> => {
    return projectOtherApiSecondService<BridgeComponentAndAncillaries>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const { data: items, isLoading, pagination, handlePageChange, refetch } = usePaginatedFetch<BridgeComponentAndAncillaries[]>({
    queryKey: ['bridgeComponentsAncillaries'],
    fetchFunction: fetchItems
  });

  const toggleDrawer = () => {
    setSelectedRow({} as BridgeComponentAndAncillaries);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as BridgeComponentAndAncillaries);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (item: BridgeComponentAndAncillaries) => {
    toggleDrawer();
    setSelectedRow(item);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<BridgeComponentAndAncillaries>().delete(otherSubMenu?.apiRoute || '', id);
    refetch();
  };

  const handleClickDetail = (item: BridgeComponentAndAncillaries) => {
    toggleDetailDrawer();
    setSelectedRow(item);
  };

  const mapToDetailItems = (item: BridgeComponentAndAncillaries): { title: string; value: string }[] => [
    {
      title: 'Bridge Name',
      value: item?.bridgeBasicData?.name || item?.bridge_id || 'N/A'
    },
    {
      title: 'Expansion Joint Type',
      value: item?.expansionJointType?.title || item?.expansion_joint_type_id || 'N/A'
    },
    {
      title: 'Guard Railing Type',
      value: item?.guardRailType?.title || item?.guard_railing_type_id || 'N/A'
    },
    {
      title: 'Abutment Bearing Type',
      value: item?.abutment_bearing_type_id || 'N/A'
    },
    {
      title: 'Piers Bearing Type',
      value: item?.piers_bearing_type_id || 'N/A'
    },
    {
      title: 'Surface Type',
      value: item?.surfaceType?.title || item?.surface_type_id || 'N/A'
    },
    {
      title: 'Remark',
      value: item?.remark || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: item?.created_at ? formatCreatedAt(item.created_at as any) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: item?.updated_at ? formatCreatedAt(item.updated_at as any) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <BridgeComponentsAncillariesDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          item={selectedRow as BridgeComponentAndAncillaries}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapToDetailItems(selectedRow as BridgeComponentAndAncillaries)}
          hasReference={false}
          id={selectedRow?.id || ''}
          fileType=""
          title="Bridge Components & Ancillaries Details"
        />
      )}

      <ItemsListing
        title="Bridge Components & Ancillaries"
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: bridgeComponentsAncillariesColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <BridgeComponentsAncillariesCard
            onDetail={handleClickDetail}
            item={data}
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
            subject: 'bridgecomponentandancillaries'
          }
        }}
        fetchDataFunction={refetch}
        items={items || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default BridgeComponentsAncillariesList;

