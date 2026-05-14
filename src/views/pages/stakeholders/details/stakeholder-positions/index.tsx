'use client';

import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import stakeholderPositionApiService from 'src/services/stakeholder/stakeholder-position-service';
import stakeholderDepartmentApiService from 'src/services/stakeholder/stakeholder-department-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import PositionCard from './stakeholder-position-card';
import PositionDrawer from './stakeholder-position-drawer';
import type { StakeholderPosition } from 'src/types/stakeholder/stakeholder-positions';
import type { StakeholderDepartment } from 'src/types/stakeholder/stakeholder-department';
import { positionColumns } from './stakeholder-position-row';

interface PositionListProps {
  stakeholderId: string;
}

const PositionList: React.FC<PositionListProps> = ({ stakeholderId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<StakeholderPosition | null>(null);
  const [departments, setDepartments] = useState<StakeholderDepartment[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await stakeholderDepartmentApiService.getAll({
          filter: { stakeholder_id: stakeholderId }
        });
        setDepartments(response.payload);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, [stakeholderId]);

  const fetchPositions = (params: GetRequestParam): Promise<IApiResponse<StakeholderPosition[]>> => {
    return stakeholderPositionApiService.getAll({
      ...params,
      filter: { ...params.filter, stakeholder_id: stakeholderId }
    });
  };

  const {
    data: positions,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<StakeholderPosition[]>({
    queryKey: ['positions'],
    fetchFunction: fetchPositions
  });

  const toggleDrawer = () => {
    setSelectedRow({} as StakeholderPosition);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as StakeholderPosition);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (position: StakeholderPosition) => {
    toggleDrawer();
    setSelectedRow(position);
  };

  const handleDelete = async (positionId: string) => {
    await stakeholderPositionApiService.delete(positionId);
    refetch();
  };

  const handleClickDetail = (position: StakeholderPosition) => {
    toggleDetailDrawer();
    setSelectedRow(position);
  };

  const getParentDepartmentName = (id: string) => {
    if (!departments) return 'N/A';
    const department = departments.find((d) => d.id === id);
    return department ? department.name : 'N/A';
  };

  const mapPositionToDetailItems = (position: StakeholderPosition): { title: string; value: string }[] => [
    { title: t('stakeholder.position.name'), value: position?.name || 'N/A' },
    {
      title: t('stakeholder.position.department'),
      value: getParentDepartmentName(position?.stakeholder_department_id || '')
    },
    {
      title: t('stakeholder.position.required-education'),
      value: position?.required_education || 'N/A'
    },
    {
      title: t('stakeholder.position.required-work-experience'),
      value: position?.required_work_experience || 'N/A'
    },
    {
      title: t('stakeholder.position.salary'),
      value: position?.salary?.toString() || 'N/A'
    },
    {
      title: t('stakeholder.position.no-of-professionals'),
      value: position?.no_of_professionals?.toString() || 'N/A'
    },
    {
      title: t('stakeholder.position.description'),
      value: position?.description || 'N/A'
    },
    {
      title: t('stakeholder.position.reference'),
      value: position?.reference || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: position?.created_at ? formatCreatedAt(position.created_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <PositionDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          position={selectedRow as StakeholderPosition}
          refetch={refetch}
          stakeholderId={stakeholderId}
          departments={departments}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapPositionToDetailItems(selectedRow as StakeholderPosition)}
          id={selectedRow?.id || ''}
          hasReference={true}
          fileType="stakeholder-position"
          title={t('stakeholder.position.details')}
        />
      )}

      <ItemsListing
        title={t('stakeholder.position.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: positionColumns(handleClickDetail, handleEdit, handleDelete, t, departments)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <PositionCard
            onDetail={handleClickDetail}
            position={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
            departments={departments}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: 'stakeholderposition'
          }
        }}
        fetchDataFunction={refetch}
        items={positions || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default PositionList;
