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
import { RailwayCommunicationSystemSafetyAndCompliance } from 'src/types/project/other';
import { formatCreatedAt, formatDate } from 'src/utils/formatter/date';
import RailwayCommunicationSystemSafetyAndComplianceCard from './railway-communication-system-safety-and-compliance-card';
import RailwayCommunicationSystemSafetyAndComplianceDrawer from './railway-communication-system-safety-and-compliance-drawer';
import { railwayCommunicationSystemSafetyAndComplianceColumns } from './railway-communication-system-safety-and-compliance-row';

interface RailwayCommunicationSystemSafetyAndComplianceListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RailwayCommunicationSystemSafetyAndComplianceList: React.FC<RailwayCommunicationSystemSafetyAndComplianceListProps> = ({
  otherSubMenu,
  projectId
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RailwayCommunicationSystemSafetyAndCompliance | null>(null);
  const { t } = useTranslation();

  const fetchRailwayCommunicationSystemSafetyAndCompliance = (
    params: GetRequestParam
  ): Promise<IApiResponse<RailwayCommunicationSystemSafetyAndCompliance[]>> => {
    return projectOtherApiSecondService<RailwayCommunicationSystemSafetyAndCompliance>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: safetyAndCompliances,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<RailwayCommunicationSystemSafetyAndCompliance[]>({
    queryKey: ['railwayCommunicationSystemSafetyAndCompliances'],
    fetchFunction: fetchRailwayCommunicationSystemSafetyAndCompliance
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwayCommunicationSystemSafetyAndCompliance);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayCommunicationSystemSafetyAndCompliance);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (safetyAndCompliance: RailwayCommunicationSystemSafetyAndCompliance) => {
    toggleDrawer();
    setSelectedRow(safetyAndCompliance);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwayCommunicationSystemSafetyAndCompliance>().delete(otherSubMenu?.apiRoute || '', id);
    refetch();
  };

  const handleClickDetail = (safetyAndCompliance: RailwayCommunicationSystemSafetyAndCompliance) => {
    toggleDetailDrawer();
    setSelectedRow(safetyAndCompliance);
  };

  const mapSafetyAndComplianceToDetailItems = (
    safetyAndCompliance: RailwayCommunicationSystemSafetyAndCompliance
  ): { title: string; value: string }[] => [
      {
        title: t('common.table-columns.id'),
        value: safetyAndCompliance?.id || 'N/A'
      },
      {
        title: t('project.other.railway-communication-system-safety-and-compliance.details.railway_line_section_name'),
        value: safetyAndCompliance?.railway_line_section_name || 'N/A'
      },
      {
        title: t('project.other.railway-communication-system-safety-and-compliance.details.safety_measures_and_protocols_done'),
        value: safetyAndCompliance?.safety_measures_and_protocols_done ? 'Yes' : 'No'
      },
      {
        title: t(
          'project.other.railway-communication-system-safety-and-compliance.details.compliance_with_signaling_and_communication_standards'
        ),
        value: safetyAndCompliance?.compliance_with_signaling_and_communication_standards ? 'Yes' : 'No'
      },
      {
        title: t('project.other.railway-communication-system-safety-and-compliance.details.incident_or_accident_records'),
        value: safetyAndCompliance?.incident_or_accident_records ? 'Yes' : 'No'
      },
      {
        title: t('project.other.railway-communication-system-safety-and-compliance.details.incident_date'),
        value: safetyAndCompliance?.incident_date ? formatDate(safetyAndCompliance.incident_date) : 'N/A'
      },
      {
        title: t('project.other.railway-communication-system-safety-and-compliance.details.remark'),
        value: safetyAndCompliance?.remark || 'N/A'
      },
      {
        title: t('common.table-columns.created-at'),
        value: safetyAndCompliance?.created_at ? formatCreatedAt(safetyAndCompliance.created_at) : 'N/A'
      },
      {
        title: t('common.table-columns.updated-at'),
        value: safetyAndCompliance?.updated_at ? formatCreatedAt(safetyAndCompliance.updated_at) : 'N/A'
      }
    ];

  return (
    <Box>
      {showDrawer && (
        <RailwayCommunicationSystemSafetyAndComplianceDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayCommunicationSystemSafetyAndCompliance={selectedRow as RailwayCommunicationSystemSafetyAndCompliance}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapSafetyAndComplianceToDetailItems(selectedRow as RailwayCommunicationSystemSafetyAndCompliance)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={otherSubMenu?.fileType || ''}
          title={t('project.other.railway-communication-system-safety-and-compliance.detail')}
        />
      )}

      <ItemsListing
        title={t('project.other.railway-communication-system-safety-and-compliance.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayCommunicationSystemSafetyAndComplianceColumns(
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
          <RailwayCommunicationSystemSafetyAndComplianceCard
            onDetail={handleClickDetail}
            railwayCommunicationSystemSafetyAndCompliance={data as RailwayCommunicationSystemSafetyAndCompliance}
            onEdit={handleEdit}
            refetch={refetch}
            otherSubMenu={otherSubMenu}
            onDelete={handleDelete}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: 'railwaycommunicationsystemsafetyandcompliance'
          }
        }}
        fetchDataFunction={refetch}
        items={safetyAndCompliances || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwayCommunicationSystemSafetyAndComplianceList;
