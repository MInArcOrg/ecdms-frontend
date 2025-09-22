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
import { RailwaySystemConditionAssessment } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import RailwaySystemConditionAssessmentCard from './railway-system-condition-assessment-card';
import RailwaySystemConditionAssessmentDrawer from './railway-system-condition-assessment-drawer';
import { railwaySystemConditionAssessmentColumns } from './railway-system-condition-assessment-row';

interface RailwaySystemConditionAssessmentListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RailwaySystemConditionAssessmentList: React.FC<RailwaySystemConditionAssessmentListProps> = ({
  otherSubMenu,
  projectId
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RailwaySystemConditionAssessment | null>(null);
  const { t } = useTranslation();

  const fetchRailwaySystemConditionAssessment = (
    params: GetRequestParam
  ): Promise<IApiResponse<RailwaySystemConditionAssessment[]>> => {
    return projectOtherApiSecondService<RailwaySystemConditionAssessment>().getAll(
      otherSubMenu?.apiRoute || '',
      {
        ...params,
        filter: { ...params.filter, project_id: projectId }
      }
    );
  };

  const {
    data: railwaySystemConditionAssessments,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<RailwaySystemConditionAssessment[]>({
    queryKey: ['railwaySystemConditionAssessments'],
    fetchFunction: fetchRailwaySystemConditionAssessment
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwaySystemConditionAssessment);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwaySystemConditionAssessment);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (systemConditionAssessment: RailwaySystemConditionAssessment) => {
    toggleDrawer();
    setSelectedRow(systemConditionAssessment);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwaySystemConditionAssessment>().delete(
      otherSubMenu?.apiRoute || '',
      id
    );
    refetch();
  };

  const handleClickDetail = (systemConditionAssessment: RailwaySystemConditionAssessment) => {
    toggleDetailDrawer();
    setSelectedRow(systemConditionAssessment);
  };

  const mapRailwaySystemConditionAssessmentToDetailItems = (
    systemConditionAssessment: RailwaySystemConditionAssessment
  ): { title: string; value: string }[] => [
      {
        title: t('common.table-columns.id'),
        value: systemConditionAssessment?.id || 'N/A'
      },
      {
        title: t(
          'project.other.railway-system-condition-assessment.details.railway_line_section_name'
        ),
        value: systemConditionAssessment?.railway_line_section_name || 'N/A'
      },
      {
        title: t(
          'project.other.railway-system-condition-assessment.details.system_condition_rating_or_assessment'
        ),
        value: systemConditionAssessment?.system_condition_rating_or_assessment || 'N/A'
      },
      {
        title: t(
          'project.other.railway-system-condition-assessment.details.defect_presence'
        ),
        value: systemConditionAssessment?.defect_presence ? 'Yes' : 'No'
      },
      {
        title: t(
          'project.other.railway-system-condition-assessment.details.system_performance_indicators'
        ),
        value: systemConditionAssessment?.system_performance_indicators || 'N/A'
      },
      {
        title: t(
          'project.other.railway-system-condition-assessment.details.power_supply_systems_and_communication'
        ),
        value: systemConditionAssessment?.power_supply_systems_and_communication || 'N/A'
      },
      {
        title: t('project.other.railway-system-condition-assessment.details.remark'),
        value: systemConditionAssessment?.remark || 'N/A'
      },
      {
        title: t('common.table-columns.created-at'),
        value: systemConditionAssessment?.created_at ? formatCreatedAt(systemConditionAssessment.created_at) : 'N/A'
      },
      {
        title: t('common.table-columns.updated-at'),
        value: systemConditionAssessment?.updated_at ? formatCreatedAt(systemConditionAssessment.updated_at) : 'N/A'
      }
    ];

  return (
    <Box>
      {showDrawer && (
        <RailwaySystemConditionAssessmentDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwaySystemConditionAssessment={selectedRow as RailwaySystemConditionAssessment}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapRailwaySystemConditionAssessmentToDetailItems(selectedRow as RailwaySystemConditionAssessment)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={otherSubMenu?.id || ''}
          title={t('project.other.railway-system-condition-assessment.detail')}
        />
      )}

      <ItemsListing
        title={t('project.other.railway-system-condition-assessment.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwaySystemConditionAssessmentColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            otherSubMenu
          )
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwaySystemConditionAssessmentCard
            onDetail={handleClickDetail}
            railwaySystemConditionAssessment={data as RailwaySystemConditionAssessment}
            onEdit={handleEdit}
            refetch={refetch}
            otherSubMenu={otherSubMenu}
            onDelete={handleDelete}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: true,
          permission: {
            action: 'create',
            subject: 'railwaysystemconditionassessment'
          }
        }}
        fetchDataFunction={refetch}
        items={railwaySystemConditionAssessments || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwaySystemConditionAssessmentList;