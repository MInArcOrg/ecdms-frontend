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
import type { CulvertStructuralInformation } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import CulvertStructuralInformationCard from './culvert-structural-information-card';
import CulvertStructuralInformationDrawer from './culvert-structural-information-drawer';
import { culvertStructuralInformationColumns } from './culvert-structural-information-row';

interface CulvertStructuralInformationListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const CulvertStructuralInformationList: React.FC<CulvertStructuralInformationListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<CulvertStructuralInformation | null>(null);
  const { t } = useTranslation();

  const fetchCulvertStructuralInformation = (params: GetRequestParam): Promise<IApiResponse<CulvertStructuralInformation[]>> => {
    return projectOtherApiSecondService<CulvertStructuralInformation>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: culvertStructuralInformations,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<CulvertStructuralInformation[]>({
    queryKey: ['culvertStructuralInformations'],
    fetchFunction: fetchCulvertStructuralInformation
  });

  const toggleDrawer = () => {
    setSelectedRow({} as CulvertStructuralInformation);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as CulvertStructuralInformation);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (culvertStructuralInformation: CulvertStructuralInformation) => {
    toggleDrawer();
    setSelectedRow(culvertStructuralInformation);
  };

  const handleDelete = async (culvertStructuralInformationId: string) => {
    await projectOtherApiSecondService<CulvertStructuralInformation>().delete(otherSubMenu?.apiRoute || '', culvertStructuralInformationId);
    refetch();
  };

  const handleClickDetail = (culvertStructuralInformation: CulvertStructuralInformation) => {
    toggleDetailDrawer();
    setSelectedRow(culvertStructuralInformation);
  };

  const mapCulvertStructuralInformationToDetailItems = (
    culvertStructuralInformation: CulvertStructuralInformation
  ): { title: string; value: string }[] => [
      {
        title: t('project.other.culvert-structural-information.details.name'),
        value: culvertStructuralInformation?.name || 'N/A'
      },
      {
        title: t('project.other.culvert-structural-information.details.culvert-type'),
        value: culvertStructuralInformation?.culvert_type || 'N/A'
      },
      {
        title: t('project.other.culvert-structural-information.details.culvert-barrel-length'),
        value: culvertStructuralInformation?.culvert_barrel_length?.toString() || 'N/A'
      },
      {
        title: t('project.other.culvert-structural-information.details.culvert-height'),
        value: culvertStructuralInformation?.culvert_height?.toString() || 'N/A'
      },
      {
        title: t('project.other.culvert-structural-information.details.opening-number'),
        value: culvertStructuralInformation?.opening_number?.toString() || 'N/A'
      },
      {
        title: t('project.other.culvert-structural-information.details.opening-width'),
        value: culvertStructuralInformation?.opening_width?.toString() || 'N/A'
      },
      {
        title: t('project.other.culvert-structural-information.details.total-culvert-width'),
        value: culvertStructuralInformation?.total_culvert_width?.toString() || 'N/A'
      },
      {
        title: t('project.other.culvert-structural-information.details.distance-between-barrels'),
        value: culvertStructuralInformation?.distance_between_barrels?.toString() || 'N/A'
      },
      {
        title: t('project.other.culvert-structural-information.details.head-wall-length'),
        value: culvertStructuralInformation?.head_wall_length?.toString() || 'N/A'
      },
      {
        title: t('project.other.culvert-structural-information.details.pier-type-id'),
        value: culvertStructuralInformation?.pier_type_id || 'N/A'
      },
      {
        title: t('project.other.culvert-structural-information.details.pier-height'),
        value: culvertStructuralInformation?.pier_height?.toString() || 'N/A'
      },
      {
        title: t('project.other.culvert-structural-information.details.abutment-type-id'),
        value: culvertStructuralInformation?.abutment_type_id || 'N/A'
      },
      {
        title: t('project.other.culvert-structural-information.details.abutment-average-height'),
        value: culvertStructuralInformation?.abutment_average_height?.toString() || 'N/A'
      },
      {
        title: t('project.other.culvert-structural-information.details.endwall-type-inlet-id'),
        value: culvertStructuralInformation?.endwall_type_inlet_id || 'N/A'
      },
      {
        title: t('project.other.culvert-structural-information.details.endwall-type-outlet-id'),
        value: culvertStructuralInformation?.endwall_type_outlet_id || 'N/A'
      },
      {
        title: t('project.other.culvert-structural-information.details.wingwall-average-length'),
        value: culvertStructuralInformation?.wingwall_average_length?.toString() || 'N/A'
      },
      {
        title: t('project.other.culvert-structural-information.details.paved-water-way-type-id'),
        value: culvertStructuralInformation?.paved_water_way_type_id || 'N/A'
      },
      {
        title: t('project.other.culvert-structural-information.details.soil-type-id'),
        value: culvertStructuralInformation?.soil_type_id || 'N/A'
      },
      {
        title: t('common.table-columns.created-at'),
        value: culvertStructuralInformation?.created_at ? formatCreatedAt(culvertStructuralInformation.created_at) : 'N/A'
      },
      {
        title: t('common.table-columns.updated-at'),
        value: culvertStructuralInformation?.updated_at ? formatCreatedAt(culvertStructuralInformation.updated_at) : 'N/A'
      }
    ];

  return (
    <Box>
      {showDrawer && (
        <CulvertStructuralInformationDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          culvertStructuralInformation={selectedRow as CulvertStructuralInformation}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapCulvertStructuralInformationToDetailItems(selectedRow as CulvertStructuralInformation)}
          hasReference={false}
          id={selectedRow?.id || ''}
          title={t('project.other.culvert-structural-information.culvert-structural-information-details')}
          fileType=""
        />
      )}

      <ItemsListing
        title={t('project.other.culvert-structural-information.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: culvertStructuralInformationColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <CulvertStructuralInformationCard
            onDetail={handleClickDetail}
            culvertStructuralInformation={data}
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
            subject: 'culvertstructuralinformation'
          }
        }}
        fetchDataFunction={refetch}
        items={culvertStructuralInformations || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default CulvertStructuralInformationList;
