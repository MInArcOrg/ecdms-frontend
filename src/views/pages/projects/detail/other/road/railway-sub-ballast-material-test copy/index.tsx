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

// Updated import to the new model
import type { RailwaySubBallastConditionAssessment } from 'src/types/project/other';

// Renamed imports for related components (assuming these files will also be renamed and updated)
import RailwaySubBallastConditionAssessmentCard from './railway-sub-ballast-condition-assessment-card';
import RailwaySubBallastConditionAssessmentDrawer from './railway-sub-ballast-condition-assessment-drawer';
import { railwaySubBallastConditionAssessmentColumns } from './railway-sub-ballast-condition-assessment-row';

import { formatCreatedAt, formatDynamicDate } from 'src/utils/formatter/date';

interface RailwaySubBallastConditionAssessmentListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RailwaySubBallastConditionAssessmentList: React.FC<RailwaySubBallastConditionAssessmentListProps> = ({
  otherSubMenu,
  projectId
}) => {
  const [showCreateEditDrawer, setShowCreateEditDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  // Updated state type and initial value
  const [selectedRailwaySubBallastConditionAssessment, setSelectedRailwaySubBallastConditionAssessment] =
    useState<RailwaySubBallastConditionAssessment | null>(null);
  const { t } = useTranslation();

  const fetchData = (params: GetRequestParam): Promise<IApiResponse<RailwaySubBallastConditionAssessment[]>> => {
    return projectOtherApiSecondService<RailwaySubBallastConditionAssessment>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    // Updated data variable name
    data: railwaySubBallastConditionAssessmentData,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<RailwaySubBallastConditionAssessment[]>({
    // Updated query key
    queryKey: ['railwaySubBallastConditionAssessments', projectId],
    fetchFunction: fetchData
  });

  const toggleCreateEditDrawer = () => {
    // Use new state setter and type for initial value
    setSelectedRailwaySubBallastConditionAssessment({} as RailwaySubBallastConditionAssessment);
    setShowCreateEditDrawer(!showCreateEditDrawer);
  };

  const toggleDetailDrawer = () => {
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (assessmentData: RailwaySubBallastConditionAssessment) => {
    // Use new state setter
    setSelectedRailwaySubBallastConditionAssessment(assessmentData);
    setShowCreateEditDrawer(true);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwaySubBallastConditionAssessment>().delete(otherSubMenu?.apiRoute || '', id);
    refetch();
  };

  const handleClickDetail = (assessmentData: RailwaySubBallastConditionAssessment) => {
    // Use new state setter
    setSelectedRailwaySubBallastConditionAssessment(assessmentData);
    setShowDetailDrawer(true);
  };

  // Updated parameter type and locale keys for all fields
  const mapToDetailItems = (assessmentData: RailwaySubBallastConditionAssessment): { title: string; value: string }[] => [
    {
      title: t('common.table-columns.id'),
      value: assessmentData?.id || 'N/A'
    },
    {
      title: t('project.other.railway-sub-ballast-condition-assessment.details.project_id', 'Project ID'),
      value: assessmentData?.project_id || 'N/A'
    },
    {
      title: t('project.other.railway-sub-ballast-condition-assessment.details.railway_line_section_name', 'Railway Line Section Name'),
      value: assessmentData?.railway_line_section_name || 'N/A'
    },
    {
      title: t('project.other.railway-sub-ballast-condition-assessment.details.sub_ballast_material_type_id', 'Sub-Ballast Material Type'),
      value: assessmentData?.sub_ballast_material_type_id || 'N/A'
    },
    {
      title: t('project.other.railway-sub-ballast-condition-assessment.details.inspection_dates', 'Inspection Dates'),
      value: assessmentData?.inspection_dates ? formatDynamicDate(assessmentData?.inspection_dates) : 'N/A'
    },
    {
      title: t('project.other.railway-sub-ballast-condition-assessment.details.sub_ballast_condition_rating', 'Sub-Ballast Condition Rating'),
      value: assessmentData?.sub_ballast_condition_rating || 'N/A'
    },
    {
      title: t('project.other.railway-sub-ballast-condition-assessment.details.cracking_observations', 'Cracking Observations'),
      value: assessmentData?.cracking_observations || 'N/A'
    },
    {
      title: t('project.other.railway-sub-ballast-condition-assessment.details.erosion_issues', 'Erosion Issues'),
      value: assessmentData?.erosion_issues || 'N/A'
    },
    {
      title: t('project.other.railway-sub-ballast-condition-assessment.details.unwanted_vegetation_presence', 'Unwanted Vegetation Presence'),
      value: assessmentData?.unwanted_vegetation_presence || 'N/A'
    },
    {
      title: t('project.other.railway-sub-ballast-condition-assessment.details.testing_frequency_per_year', 'Testing Frequency Per Year'),
      value: assessmentData?.testing_frequency_per_year?.toLocaleString() ?? 'N/A'
    },
    {
      title: t('project.other.railway-sub-ballast-condition-assessment.details.sub_ballast_resistance', 'Sub-Ballast Resistance'),
      value: assessmentData?.sub_ballast_resistance || 'N/A'
    },
    {
      title: t('project.other.railway-sub-ballast-condition-assessment.details.sub_ballast_degradation_rate', 'Sub-Ballast Degradation Rate'),
      value: assessmentData?.sub_ballast_degradation_rate || 'N/A'
    },
    {
      title: t('project.other.railway-sub-ballast-condition-assessment.details.drainage_performance', 'Drainage Performance'),
      value: assessmentData?.drainage_performance || 'N/A'
    },
    {
      title: t('project.other.railway-sub-ballast-condition-assessment.details.remark', 'Remark'),
      value: assessmentData?.remark || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: assessmentData?.created_at ? formatCreatedAt(assessmentData.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: assessmentData?.updated_at ? formatCreatedAt(assessmentData.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showCreateEditDrawer && selectedRailwaySubBallastConditionAssessment && (
        <RailwaySubBallastConditionAssessmentDrawer
          otherSubMenu={otherSubMenu}
          open={showCreateEditDrawer}
          toggle={toggleCreateEditDrawer}
          // Prop name updated
          railwaySubBallastConditionAssessment={selectedRailwaySubBallastConditionAssessment}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && selectedRailwaySubBallastConditionAssessment && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapToDetailItems(selectedRailwaySubBallastConditionAssessment)}
          hasReference={false}
          id={selectedRailwaySubBallastConditionAssessment?.id || ''}
          fileType=""
          // Updated locale key
          title={t('project.other.railway-sub-ballast-condition-assessment.detail', 'Railway Sub Ballast Condition Assessment Details')}
        />
      )}

      <ItemsListing
        // Updated locale key
        title={t('project.other.railway-sub-ballast-condition-assessment.title', 'Railway Sub Ballast Condition Assessments')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          // Updated header function import and call
          headers: railwaySubBallastConditionAssessmentColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        // Updated ItemViewComponent to use the new card component and prop name
        ItemViewComponent={({ data: itemData }) => (
          <RailwaySubBallastConditionAssessmentCard
            onDetail={handleClickDetail}
            railwaySubBallastConditionAssessment={itemData as RailwaySubBallastConditionAssessment}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleCreateEditDrawer,
          onlyIcon: true,
          permission: {
            action: 'create',
            // Updated subject
            subject: 'railwaysubballastconditionassessment'
          }
        }}
        fetchDataFunction={refetch}
        // Updated items variable name
        items={railwaySubBallastConditionAssessmentData || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

// Renamed component export
export default RailwaySubBallastConditionAssessmentList;