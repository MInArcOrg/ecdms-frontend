'use client';

import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import stakeholderDepartmentApiService from 'src/services/stakeholder/stakeholder-department-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import DepartmentCard from './stakeholder-department-card';
import DepartmentDrawer from './stakeholder-department-drawer';
import type { StakeholderDepartment } from 'src/types/stakeholder/stakeholder-department';
import { departmentColumns } from './stakeholder-department-row';

interface DepartmentListProps {
  model: string;
  stakeholderId: string;
  typeId: string;
}

const DepartmentList: React.FC<DepartmentListProps> = ({ stakeholderId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<StakeholderDepartment | null>(null);
  const [departments, setDepartments] = useState<StakeholderDepartment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchDepartments();
  }, [stakeholderId]);

  const fetchDepartments = (params: GetRequestParam): Promise<IApiResponse<StakeholderDepartment[]>> => {
    return stakeholderDepartmentApiService.getAll({
      ...params,
      filter: { ...params.filter, stakeholder_id: stakeholderId }
    });
  };

  const {
    data: paginatedDepartments,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<StakeholderDepartment[]>({
    queryKey: ['departments'],
    fetchFunction: fetchDepartments
  });

  const toggleDrawer = () => {
    setSelectedRow({} as StakeholderDepartment);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as StakeholderDepartment);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (department: StakeholderDepartment) => {
    toggleDrawer();
    setSelectedRow(department);
  };

  const handleDelete = async (departmentId: string) => {
    await stakeholderDepartmentApiService.delete(departmentId);
    refetch();
  };

  const handleClickDetail = (department: StakeholderDepartment) => {
    toggleDetailDrawer();
    setSelectedRow(department);
  };

  const getParentDepartmentName = (id: string) => {
    if (!departments) return 'N/A';
    const department = departments.find((d) => d.id === id);
    return department ? department.name : 'N/A';
  };

  const mapDepartmentToDetailItems = (department: StakeholderDepartment): { title: string; value: string }[] => [
    {
      title: t('stakeholder.stakeholder-department.name'),
      value: department.name
    },
    {
      title: t('stakeholder.stakeholder-department.parentDepartment'),
      value: getParentDepartmentName(department.parent_department_id || '')
    },
    {
      title: t('stakeholder.stakeholder-department.description'),
      value: department.description
    },
    {
      title: t('stakeholder.stakeholder-department.reference'),
      value: department.reference || 'N/A'
    }
  ];



  return (
    <Box>
      {showDrawer && (
        <DepartmentDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          department={selectedRow as StakeholderDepartment}
          refetch={refetch}
          stakeholderId={stakeholderId}
          departments={departments}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapDepartmentToDetailItems(selectedRow as StakeholderDepartment)}
          id={selectedRow?.id || ''}
          hasReference={true}
          fileType="STAKEHOLDER_DEPARTMENT"
          title={t('stakeholder.stakeholder-department.details')}
        />
      )}

      <ItemsListing
        title={t('stakeholder.stakeholder-department.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: departmentColumns(handleClickDetail, handleEdit, handleDelete, t, departments)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <DepartmentCard
            onDetail={handleClickDetail}
            department={data}
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
            subject: 'stakeholderdepartment'
          }
        }}
        fetchDataFunction={refetch}
        items={paginatedDepartments || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default DepartmentList;
