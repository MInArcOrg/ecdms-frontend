'use client';

import type React from 'react';

import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { GeotechnicalInformation } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import GeotechnicalInformationCard from './geotechnical-information-card';
import GeotechnicalInformationDrawer from './geotechnical-information-drawer';
import { geotechnicalInformationColumns } from './geotechnical-information-row';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import FileDrawer from 'src/views/components/custom/files-drawer';

interface GeotechnicalInformationListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const GeotechnicalInformationList: React.FC<GeotechnicalInformationListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<GeotechnicalInformation | null>(null);
  const { t } = useTranslation();

  const fetchGeotechnicalInformation = (params: GetRequestParam): Promise<IApiResponse<GeotechnicalInformation[]>> => {
    return projectOtherApiSecondService<GeotechnicalInformation>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: geotechnicalInformationList,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<GeotechnicalInformation[]>({
    queryKey: ['geotechnicalInformation'],
    fetchFunction: fetchGeotechnicalInformation
  });

  const toggleDrawer = () => {
    setSelectedRow({} as GeotechnicalInformation);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as GeotechnicalInformation);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (geotechnicalInformation: GeotechnicalInformation) => {
    toggleDrawer();
    setSelectedRow(geotechnicalInformation);
  };

  const handleDelete = async (geotechnicalInformationId: string) => {
    await projectOtherApiSecondService<GeotechnicalInformation>().delete(otherSubMenu?.apiRoute || '', geotechnicalInformationId);
    refetch();
  };

  const handleClickDetail = (geotechnicalInformation: GeotechnicalInformation) => {
    toggleDetailDrawer();
    setSelectedRow(geotechnicalInformation);
  };

  const mapGeotechnicalInformationToDetailItems = (
    geotechnicalInformation: GeotechnicalInformation
  ): { title: string; value: string | React.ReactNode }[] => [
      {
        title: t('project.other.geotechnical-information.details.name'),
        value: geotechnicalInformation?.name || 'N/A'
      },
      {
        title: t('project.other.geotechnical-information.details.soil-type'),
        value: geotechnicalInformation?.soil_type_id || 'N/A'
      },
      {
        title: t('project.other.geotechnical-information.details.ground-water-impact'),
        value: geotechnicalInformation?.ground_water_impact_id || 'N/A'
      },
      {
        title: t('project.other.geotechnical-information.details.soil-bearing-capacity'),
        value: geotechnicalInformation?.soil_bearing_capacity?.toString() || 'N/A'
      },
      {
        title: t('project.other.geotechnical-information.details.slope-stability'),
        value: geotechnicalInformation?.slope_stability_id || 'N/A'
      },
      {
        title: t('project.other.geotechnical-information.details.retaining-walls'),
        value: geotechnicalInformation?.retaining_walls ? 'Yes' : 'No'
      },
      {
        title: t('project.other.geotechnical-information.details.geological-hazard'),
        value: geotechnicalInformation?.geological_hazard || 'N/A'
      },
      {
        title: t('project.other.geotechnical-information.details.remark'),
        value: geotechnicalInformation?.remark || 'N/A'
      },
      {
        title: t('common.table-columns.created-at'),
        value: geotechnicalInformation?.created_at ? formatCreatedAt(geotechnicalInformation.created_at) : 'N/A'
      },
      {
        title: t('common.table-columns.updated-at'),
        value: geotechnicalInformation?.updated_at ? formatCreatedAt(geotechnicalInformation.updated_at) : 'N/A'
      },
      {
        title: t('project.other.geotechnical-information.file-types.seismic-design'),
        value: <FileDrawer id={selectedRow?.id || ''} type={uploadableProjectFileTypes.other.seismicDesign} />
      },
      {
        title: t('project.other.geotechnical-information.file-types.geotechnical-report'),
        value: <FileDrawer id={selectedRow?.id || ''} type={uploadableProjectFileTypes.other.geotechnicalReport} />
      },
      {
        title: t('project.other.geotechnical-information.file-types.foundation-design'),
        value: <FileDrawer id={selectedRow?.id || ''} type={uploadableProjectFileTypes.other.foundationDesign} />
      }
    ];

  return (
    <Box>
      {showDrawer && (
        <GeotechnicalInformationDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          geotechnicalInformation={selectedRow as GeotechnicalInformation}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapGeotechnicalInformationToDetailItems(selectedRow as GeotechnicalInformation)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.geotechnicalInformation}
          title={t('project.other.geotechnical-information.geotechnical-information-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.geotechnical-information.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: geotechnicalInformationColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <GeotechnicalInformationCard
            onDetail={handleClickDetail}
            geotechnicalInformation={data}
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
            subject: 'geotechnicalinformation'
          }
        }}
        fetchDataFunction={refetch}
        items={geotechnicalInformationList || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default GeotechnicalInformationList;
