'use client';

import type React from 'react';

import { useQuery } from '@tanstack/react-query';
import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import projectOtherApiService from 'src/services/project/project-other-service';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { TelecomInfrastructureAge, TelecomInfrastructure } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import TelecomInfrastructureAgeCard from './telecom-infrastructure-age-card';
import TelecomInfrastructureAgeDrawer from './telecom-infrastructure-age-drawer';
import { telecomInfrastructureAgeColumns } from './telecom-infrastructure-age-row';

interface TelecomInfrastructureAgeListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const TelecomInfrastructureAgeList: React.FC<TelecomInfrastructureAgeListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<TelecomInfrastructureAge | null>(null);
  const { t } = useTranslation();

  const { data: telecomInfrastructures } = useQuery({
    queryKey: ['telecom-infrastructures', projectId],
    queryFn: () =>
      projectOtherApiService<TelecomInfrastructure>().getAll('telecom_infrastructure', {
        filter: { project_id: projectId }
      })
  });

  const telecomInfrastructureMap = new Map(telecomInfrastructures?.payload.map((item) => [item.id, item.name || 'N/A']) || []);

  const fetchTelecomInfrastructureAges = (params: GetRequestParam): Promise<IApiResponse<TelecomInfrastructureAge[]>> => {
    return projectOtherApiSecondService<TelecomInfrastructureAge>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: telecomInfrastructureAges,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<TelecomInfrastructureAge[]>({
    queryKey: ['telecomInfrastructureAges'],
    fetchFunction: fetchTelecomInfrastructureAges
  });

  const toggleDrawer = () => {
    setSelectedRow({} as TelecomInfrastructureAge);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as TelecomInfrastructureAge);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (telecomInfrastructureAge: TelecomInfrastructureAge) => {
    toggleDrawer();
    setSelectedRow(telecomInfrastructureAge);
  };

  const handleDelete = async (telecomInfrastructureAgeId: string) => {
    await projectOtherApiSecondService<TelecomInfrastructureAge>().delete(otherSubMenu?.apiRoute || '', telecomInfrastructureAgeId);
    refetch();
  };

  const handleClickDetail = (telecomInfrastructureAge: TelecomInfrastructureAge) => {
    toggleDetailDrawer();
    setSelectedRow(telecomInfrastructureAge);
  };

  const mapTelecomInfrastructureAgeToDetailItems = (
    telecomInfrastructureAge: TelecomInfrastructureAge
  ): { title: string; value: string }[] => [
      {
        title: t('project.other.telecom-infrastructure-age.details.cables'),
        value: telecomInfrastructureAge?.cables ? t('common.yes') : t('common.no')
      },
      {
        title: t('project.other.telecom-infrastructure-age.details.wires'),
        value: telecomInfrastructureAge?.wires ? t('common.yes') : t('common.no')
      },
      {
        title: t('project.other.telecom-infrastructure-age.details.routers'),
        value: telecomInfrastructureAge?.routers ? t('common.yes') : t('common.no')
      },
      {
        title: t('project.other.telecom-infrastructure-age.details.switches'),
        value: telecomInfrastructureAge?.switches ? t('common.yes') : t('common.no')
      },
      {
        title: t('project.other.telecom-infrastructure-age.details.hubs'),
        value: telecomInfrastructureAge?.hubs ? t('common.yes') : t('common.no')
      },
      {
        title: t('project.other.telecom-infrastructure-age.details.repeaters'),
        value: telecomInfrastructureAge?.repeaters ? t('common.yes') : t('common.no')
      },
      {
        title: t('project.other.telecom-infrastructure-age.details.antennas'),
        value: telecomInfrastructureAge?.antennas ? t('common.yes') : t('common.no')
      },
      {
        title: t('project.other.telecom-infrastructure-age.details.towers'),
        value: telecomInfrastructureAge?.towers ? t('common.yes') : t('common.no')
      },
      {
        title: t('project.other.telecom-infrastructure-age.details.remark'),
        value: telecomInfrastructureAge?.remark || 'N/A'
      },
      {
        title: t('common.table-columns.created-at'),
        value: telecomInfrastructureAge?.created_at ? formatCreatedAt(telecomInfrastructureAge.created_at) : 'N/A'
      },
      {
        title: t('common.table-columns.updated-at'),
        value: telecomInfrastructureAge?.updated_at ? formatCreatedAt(telecomInfrastructureAge.updated_at) : 'N/A'
      }
    ];

  return (
    <Box>
      {showDrawer && (
        <TelecomInfrastructureAgeDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          telecomInfrastructureAge={selectedRow as TelecomInfrastructureAge}
          refetch={refetch}
          projectId={projectId}
          telecomInfrastructures={telecomInfrastructures?.payload || []}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapTelecomInfrastructureAgeToDetailItems(selectedRow as TelecomInfrastructureAge)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.infrastructureAge}
          title={t('project.other.telecom-infrastructure-age.telecom-infrastructure-age-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.telecom-infrastructure-age.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: telecomInfrastructureAgeColumns(handleClickDetail, handleEdit, handleDelete, t, refetch, telecomInfrastructureMap)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <TelecomInfrastructureAgeCard
            onDetail={handleClickDetail}
            telecomInfrastructureAge={data}
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
            subject: 'telecominfrastructureage'
          }
        }}
        fetchDataFunction={refetch}
        items={telecomInfrastructureAges || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default TelecomInfrastructureAgeList;
