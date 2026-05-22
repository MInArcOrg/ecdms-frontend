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
import type { RailwayTrackConditionAssessment } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import RailwayTrackConditionAssessmentCard from './railway-track-condition-assessment-card';
import RailwayTrackDataDrawer from './railway-track-condition-assessment-drawer';
import { railwayTrackConditionAssessmentColumns } from './railway-track-condition-assessment-row';
import { formatDynamicDate } from 'src/utils/formatter/date';

interface RailwayTrackConditionAssesmentListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}
const RailwayTrackConditionAssesmentList: React.FC<RailwayTrackConditionAssesmentListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RailwayTrackConditionAssessment | null>(null);
  const { t } = useTranslation();

  const fetchRailwayTrackConditionAssessment = (params: GetRequestParam): Promise<IApiResponse<RailwayTrackConditionAssessment[]>> => {
    return projectOtherApiSecondService<RailwayTrackConditionAssessment>().getAll(otherSubMenu?.apiRoute || '', {});
  };

  const {
    data: railwayTrackConditionAssessment,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<RailwayTrackConditionAssessment[]>({
    queryKey: ['railwayTrackConditionAssessment'],
    fetchFunction: fetchRailwayTrackConditionAssessment
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwayTrackConditionAssessment);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayTrackConditionAssessment);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (assessment: RailwayTrackConditionAssessment) => {
    toggleDrawer();
    setSelectedRow(assessment);
  };

  const handleDelete = async (assessmentId: string) => {
    await projectOtherApiSecondService<RailwayTrackConditionAssessment>().delete(otherSubMenu?.apiRoute || '', assessmentId);
    refetch();
  };

  const handleClickDetail = (assessment: RailwayTrackConditionAssessment) => {
    toggleDetailDrawer();
    setSelectedRow(assessment);
  };

  const mapAssessmentToDetailItems = (assessment: RailwayTrackConditionAssessment): { title: string; value: string }[] => [
    {
      title: t('project.other.railway-track-condition-assessment.details.railway-track-data-id'),
      value: assessment?.railwayTrackData?.name || assessment?.railway_track_data_id || 'N/A'
    },
    {
      title: t('project.other.railway-track-condition-assessment.details.inspection-dates'),
      value: formatDynamicDate(assessment?.inspection_dates) || 'N/A'
    },
    {
      title: t('project.other.railway-track-condition-assessment.details.track-condition-rating-id'),
      value: assessment?.trackConditionRating?.title || assessment?.track_condition_rating_id || 'N/A'
    },
    {
      title: t('project.other.railway-track-condition-assessment.details.observed-defects-id'),
      value: assessment?.observedDefects?.title || assessment?.observed_defects_id || 'N/A'
    },
    {
      title: t('project.other.railway-track-condition-assessment.details.track-settlement-irregularities'),
      value: assessment?.track_settlement_irregularities || 'N/A'
    },
    {
      title: t('project.other.railway-track-condition-assessment.details.remark'),
      value: assessment?.remark || 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <RailwayTrackDataDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          assessment={selectedRow as RailwayTrackConditionAssessment}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapAssessmentToDetailItems(selectedRow as RailwayTrackConditionAssessment)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.electric_grid_control_center_data}
          title={t('project.other.railway-track-condition-assessment.railway-track-condition-assessment-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.railway-track-condition-assessment.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayTrackConditionAssessmentColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwayTrackConditionAssessmentCard
            onDetail={handleClickDetail}
            assessment={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
            t={t}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: 'railwaytrackconditionassessment'
          }
        }}
        fetchDataFunction={refetch}
        items={railwayTrackConditionAssessment || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwayTrackConditionAssesmentList;
