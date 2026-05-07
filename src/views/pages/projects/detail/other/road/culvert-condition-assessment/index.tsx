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
import type { CulvertConditionAssessment } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt, formatDynamicDate } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import CulvertConditionAssessmentCard from './culvert-condition-assessment-card';
import CulvertConditionAssessmentDrawer from './culvert-condition-assessment-drawer';
import { culvertConditionAssessmentColumns } from './culvert-condition-assessment-row';

interface CulvertConditionAssessmentListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const CulvertConditionAssessmentList: React.FC<CulvertConditionAssessmentListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<CulvertConditionAssessment | null>(null);
  const { t } = useTranslation();

  const fetchCulvertConditionAssessments = (params: GetRequestParam): Promise<IApiResponse<CulvertConditionAssessment[]>> => {
    return projectOtherApiSecondService<CulvertConditionAssessment>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: culvertConditionAssessments,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<CulvertConditionAssessment[]>({
    queryKey: ['culvertConditionAssessments'],
    fetchFunction: fetchCulvertConditionAssessments
  });

  const toggleDrawer = () => {
    setSelectedRow({} as CulvertConditionAssessment);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as CulvertConditionAssessment);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (culvertConditionAssessment: CulvertConditionAssessment) => {
    toggleDrawer();
    setSelectedRow(culvertConditionAssessment);
  };

  const handleDelete = async (culvertConditionAssessmentId: string) => {
    await projectOtherApiSecondService<CulvertConditionAssessment>().delete(otherSubMenu?.apiRoute || '', culvertConditionAssessmentId);
    refetch();
  };

  const handleClickDetail = (culvertConditionAssessment: CulvertConditionAssessment) => {
    toggleDetailDrawer();
    setSelectedRow(culvertConditionAssessment);
  };

  const mapCulvertConditionAssessmentToDetailItems = (
    culvertConditionAssessment: CulvertConditionAssessment
  ): { title: string; value: string }[] => [
    {
      title: t('project.other.culvert-condition-assessment.details.culvert-basic-data-id'),
      value: culvertConditionAssessment?.culvertBasicData?.name || 'N/A'
    },
    {
      title: t('project.other.culvert-condition-assessment.details.structure-type-id'),
      value: culvertConditionAssessment?.structureType?.title || culvertConditionAssessment?.structure_type_id || 'N/A'
    },
    {
      title: t('project.other.culvert-condition-assessment.details.north-id'),
      value: culvertConditionAssessment?.north?.title || culvertConditionAssessment?.north_id || 'N/A'
    },
    {
      title: t('project.other.culvert-condition-assessment.details.east-id'),
      value: culvertConditionAssessment?.east?.title || culvertConditionAssessment?.east_id || 'N/A'
    },
    {
      title: t('project.other.culvert-condition-assessment.details.west-id'),
      value: culvertConditionAssessment?.west?.title || culvertConditionAssessment?.west_id || 'N/A'
    },
    {
      title: t('project.other.culvert-condition-assessment.details.south-id'),
      value: culvertConditionAssessment?.south?.title || culvertConditionAssessment?.south_id || 'N/A'
    },
    {
      title: t('project.other.culvert-condition-assessment.details.central-id'),
      value: culvertConditionAssessment?.central?.title || culvertConditionAssessment?.central_id || 'N/A'
    },
    {
      title: t('project.other.culvert-condition-assessment.details.assessment-date'),
      value: culvertConditionAssessment?.assessment_date ? formatDynamicDate(culvertConditionAssessment.assessment_date) : 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: culvertConditionAssessment?.created_at ? formatCreatedAt(culvertConditionAssessment.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: culvertConditionAssessment?.updated_at ? formatCreatedAt(culvertConditionAssessment.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <CulvertConditionAssessmentDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          culvertConditionAssessment={selectedRow as CulvertConditionAssessment}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapCulvertConditionAssessmentToDetailItems(selectedRow as CulvertConditionAssessment)}
          hasReference={false}
          id={selectedRow?.id || ''}
          fileType=""
          title={t('project.other.culvert-condition-assessment.culvert-condition-assessment-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.culvert-condition-assessment.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: culvertConditionAssessmentColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <CulvertConditionAssessmentCard
            onDetail={handleClickDetail}
            culvertConditionAssessment={data}
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
            subject: 'culvertconditionassessment'
          }
        }}
        fetchDataFunction={refetch}
        items={culvertConditionAssessments || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default CulvertConditionAssessmentList;

