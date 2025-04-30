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
import type { BridgeStructureInformation } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import BridgeStructureInformationCard from './bridge-structure-information-card';
import BridgeStructureInformationDrawer from './bridge-structure-information-drawer';
import { bridgeStructureInformationColumns } from './bridge-structure-information-row';

interface BridgeStructureInformationListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const BridgeStructureInformationList: React.FC<BridgeStructureInformationListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<BridgeStructureInformation | null>(null);
  const { t } = useTranslation();

  const fetchBridgeStructureInformations = (params: GetRequestParam): Promise<IApiResponse<BridgeStructureInformation[]>> => {
    return projectOtherApiSecondService<BridgeStructureInformation>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: bridgeStructureInformations,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<BridgeStructureInformation[]>({
    queryKey: ['bridgeStructureInformations'],
    fetchFunction: fetchBridgeStructureInformations
  });

  const toggleDrawer = () => {
    setSelectedRow({} as BridgeStructureInformation);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as BridgeStructureInformation);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (bridgeStructureInformation: BridgeStructureInformation) => {
    toggleDrawer();
    setSelectedRow(bridgeStructureInformation);
  };

  const handleDelete = async (bridgeStructureInformationId: string) => {
    await projectOtherApiSecondService<BridgeStructureInformation>().delete(otherSubMenu?.apiRoute || '', bridgeStructureInformationId);
    refetch();
  };

  const handleClickDetail = (bridgeStructureInformation: BridgeStructureInformation) => {
    toggleDetailDrawer();
    setSelectedRow(bridgeStructureInformation);
  };

  const mapBridgeStructureInformationToDetailItems = (
    bridgeStructureInformation: BridgeStructureInformation
  ): { title: string; value: string }[] => [
    {
      title: t('project.other.bridge-structure-information.details.name'),
      value: bridgeStructureInformation?.name || 'N/A'
    },
    {
      title: t('project.other.bridge-structure-information.details.bridge-name'),
      value: bridgeStructureInformation?.bridge_name || 'N/A'
    },
    {
      title: t('project.other.bridge-structure-information.details.bridge-structure-type-id'),
      value: bridgeStructureInformation?.bridge_structure_type_id || 'N/A'
    },
    {
      title: t('project.other.bridge-structure-information.details.east-region'),
      value: bridgeStructureInformation?.east_region?.toString() || 'N/A'
    },
    {
      title: t('project.other.bridge-structure-information.details.west-region'),
      value: bridgeStructureInformation?.west_region?.toString() || 'N/A'
    },
    {
      title: t('project.other.bridge-structure-information.details.central-region'),
      value: bridgeStructureInformation?.central_region?.toString() || 'N/A'
    },
    {
      title: t('project.other.bridge-structure-information.details.north-region'),
      value: bridgeStructureInformation?.north_region?.toString() || 'N/A'
    },
    {
      title: t('project.other.bridge-structure-information.details.south-region'),
      value: bridgeStructureInformation?.south_region?.toString() || 'N/A'
    },
    {
      title: t('project.other.bridge-structure-information.details.ring-road'),
      value: bridgeStructureInformation?.ring_road?.toString() || 'N/A'
    },
    {
      title: t('project.other.bridge-structure-information.details.remark'),
      value: bridgeStructureInformation?.remark || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: bridgeStructureInformation?.created_at ? formatCreatedAt(bridgeStructureInformation.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: bridgeStructureInformation?.updated_at ? formatCreatedAt(bridgeStructureInformation.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <BridgeStructureInformationDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          bridgeStructureInformation={selectedRow as BridgeStructureInformation}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapBridgeStructureInformationToDetailItems(selectedRow as BridgeStructureInformation)}
          hasReference={false}
          id={selectedRow?.id || ''}
          fileType=""
          title={t('project.other.bridge-structure-information.bridge-structure-information-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.bridge-structure-information.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: bridgeStructureInformationColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <BridgeStructureInformationCard
            onDetail={handleClickDetail}
            bridgeStructureInformation={data}
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
            subject: 'bridgestructureinformation'
          }
        }}
        fetchDataFunction={refetch}
        items={bridgeStructureInformations || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default BridgeStructureInformationList;
