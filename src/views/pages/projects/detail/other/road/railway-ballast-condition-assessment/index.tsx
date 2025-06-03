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
import RailwayBallastConditionAssessmentCard from './railway-ballast-condition-assessment-card';
import RailwayBallastConditionAssessmentDrawer from './railway-ballast-condition-assessment-drawer';
import {
  RailwayBallastConditionAssessment,
  BallastConditionRating,
  FoulingPresence,
  BallastDegradationIndicators,
  BallastQualityTestingMethod,
  BallastDegradationRate,
  DrainagePerformance
} from 'src/types/project/other'; // Ensure all enums are imported
import { formatCreatedAt, formatDynamicDate } from 'src/utils/formatter/date';
import { railwayBallastConditionAssessmentColumns } from './railway-ballast-condition-assessment-row';

interface RailwayBallastConditionAssessmentListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RailwayBallastConditionAssessmentList: React.FC<RailwayBallastConditionAssessmentListProps> = ({
  otherSubMenu,
  projectId,
  typeId
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RailwayBallastConditionAssessment | null>(null);
  const { t } = useTranslation();

  const fetchData = (params: GetRequestParam): Promise<IApiResponse<RailwayBallastConditionAssessment[]>> => {
    return projectOtherApiSecondService<RailwayBallastConditionAssessment>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<RailwayBallastConditionAssessment[]>({
    queryKey: ['railwayBallastConditionAssessments'],
    fetchFunction: fetchData
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwayBallastConditionAssessment);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayBallastConditionAssessment);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (row: RailwayBallastConditionAssessment) => {
    setSelectedRow(row);
    setShowDrawer(true);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwayBallastConditionAssessment>().delete(otherSubMenu?.apiRoute || '', id);
    refetch();
  };

  const handleClickDetail = (row: RailwayBallastConditionAssessment) => {
    setSelectedRow(row);
    setShowDetailDrawer(true);
  };

  const mapToDetailItems = (row: RailwayBallastConditionAssessment): { title: string; value: string }[] => [
    {
      title: t('common.table-columns.id'),
      value: row?.project_id || 'N/A'
    },
    {
      title: t('project.other.railway-ballast-condition-assessment.details.railway-line-section-name'),
      value: row?.railway_line_section_name || 'N/A'
    },
    {
      title: t('project.other.railway-ballast-condition-assessment.details.inspection-dates'),
      value: row?.inspection_dates ? formatDynamicDate(row.inspection_dates) : 'N/A'
    },
    {
      title: t('project.other.railway-ballast-condition-assessment.details.ballast-condition-rating'),
      value: row?.ballast_condition_rating || 'N/A'
    },
    {
      title: t('project.other.railway-ballast-condition-assessment.details.fouling-presence'),
      value: row?.fouling_presence || 'N/A'
    },
    {
      title: t('project.other.railway-ballast-condition-assessment.details.ballast-degradation-indicators'),
      value: row?.ballast_degradation_indicators || 'N/A'
    },
    {
      title: t('project.other.railway-ballast-condition-assessment.details.ballast-quality-testing-method'),
      value: row?.ballast_quality_testing_method || 'N/A'
    },
    {
      title: t('project.other.railway-ballast-condition-assessment.details.testing-frequency'),
      value: row?.testing_frequency?.toLocaleString() ?? 'N/A'
    },
    {
      title: t('project.other.railway-ballast-condition-assessment.details.ballast-resistance'),
      value: row?.ballast_resistance || 'N/A'
    },
    {
      title: t('project.other.railway-ballast-condition-assessment.details.ballast-degradation-rate'),
      value: row?.ballast_degradation_rate || 'N/A'
    },
    {
      title: t('project.other.railway-ballast-condition-assessment.details.drainage-performance'),
      value: row?.drainage_performance || 'N/A'
    },
    {
      title: t('project.other.railway-ballast-condition-assessment.details.remark'),
      value: row?.remark || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: row?.created_at ? formatCreatedAt(row.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: row?.updated_at ? formatCreatedAt(row.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <RailwayBallastConditionAssessmentDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayBallastConditionAssessment={selectedRow as RailwayBallastConditionAssessment}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapToDetailItems(selectedRow as RailwayBallastConditionAssessment)}
          hasReference={false}
          id={selectedRow?.project_id || ''}
          fileType=""
          title={t('project.other.railway-ballast-condition-assessment.detail')}
        />
      )}

      <ItemsListing
        title={t('project.other.railway-ballast-condition-assessment.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayBallastConditionAssessmentColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwayBallastConditionAssessmentCard
            onDetail={handleClickDetail}
            railwayBallastConditionAssessment={data}
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
            subject: 'railwayballastconditionassessment'
          }
        }}
        fetchDataFunction={refetch}
        items={data || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwayBallastConditionAssessmentList;