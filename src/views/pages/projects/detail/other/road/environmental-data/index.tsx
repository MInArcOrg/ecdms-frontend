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
import type { EnvironmentalData } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import EnvironmentalDataCard from './environmental-data-card';
import EnvironmentalDataDrawer from './environmental-data-drawer';
import { environmentalDataColumns } from './environmental-data-row';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import FileDrawer from 'src/views/components/custom/files-drawer';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';

interface EnvironmentalDataListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const EnvironmentalDataList: React.FC<EnvironmentalDataListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<EnvironmentalData | null>(null);
  const { t } = useTranslation();

  const fetchEnvironmentalData = (params: GetRequestParam): Promise<IApiResponse<EnvironmentalData[]>> => {
    return projectOtherApiSecondService<EnvironmentalData>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: environmentalDataList,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<EnvironmentalData[]>({
    queryKey: ['environmentalData'],
    fetchFunction: fetchEnvironmentalData
  });

  const toggleDrawer = () => {
    setSelectedRow({} as EnvironmentalData);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as EnvironmentalData);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (environmentalData: EnvironmentalData) => {
    toggleDrawer();
    setSelectedRow(environmentalData);
  };

  const handleDelete = async (environmentalDataId: string) => {
    await projectOtherApiSecondService<EnvironmentalData>().delete(otherSubMenu?.apiRoute || '', environmentalDataId);
    refetch();
  };

  const handleClickDetail = (environmentalData: EnvironmentalData) => {
    toggleDetailDrawer();
    setSelectedRow(environmentalData);
  };

  const mapEnvironmentalDataToDetailItems = (environmentalData: EnvironmentalData): { title: string; value: string }[] => [
    {
      title: t('project.other.environmental-data.details.remark'),
      value: environmentalData?.remark || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: environmentalData?.created_at ? formatCreatedAt(environmentalData.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: environmentalData?.updated_at ? formatCreatedAt(environmentalData.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <EnvironmentalDataDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          environmentalData={selectedRow as EnvironmentalData}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          //   data={mapDrainageAssessmentToDetailItems(selectedRow as DrainageAssessment)}
          data={[
            ...mapEnvironmentalDataToDetailItems(selectedRow as EnvironmentalData),
            {
              title: t('project.other.environmental-data.file-types.impact-assessment'),
              value: <FileDrawer id={selectedRow?.id || ''} type={uploadableProjectFileTypes.other.environmentalImpactAssessment} />
            },
            {
              title: t('project.other.environmental-data.file-types.community-feedback'),
              value: <FileDrawer id={selectedRow?.id || ''} type={uploadableProjectFileTypes.other.communityFeedback} />
            },
            {
              title: t('project.other.environmental-data.file-types.mitigation-measures'),
              value: <FileDrawer id={selectedRow?.id || ''} type={uploadableProjectFileTypes.other.mitigationMeasures} />
            }
          ]}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.environmentalData}
          title={t('project.other.environmental-data.environmental-data-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.environmental-data.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: environmentalDataColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <EnvironmentalDataCard
            onDetail={handleClickDetail}
            environmentalData={data}
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
            subject: 'environmentaldata'
          }
        }}
        fetchDataFunction={refetch}
        items={environmentalDataList || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default EnvironmentalDataList;
