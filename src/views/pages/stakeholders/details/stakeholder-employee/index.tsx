"use client";

import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import stakeholderEmployeeApiService from "src/services/stakeholder/stakeholder-employee-service";
import stakeholderDepartmentApiService from "src/services/stakeholder/stakeholder-department-service";
import stakeholderPositionApiService from "src/services/stakeholder/stakeholder-position-service";
import { defaultCreateActionConfig } from "src/types/general/listing";
import type { GetRequestParam, IApiResponse } from "src/types/requests";
import { formatCreatedAt } from "src/utils/formatter/date";
import ItemsListing from "src/views/shared/listing";
import OtherDetailSidebar from "src/views/shared/layouts/other/other-detail-drawer";
import EmployeeCard from "./stakeholder-employee-card";
import EmployeeDrawer from "./stakeholder-employee-drawer";
import type { StakeholderEmployee } from "src/types/stakeholder/stakeholder-employee";
import type { StakeholderDepartment } from "src/types/stakeholder/stakeholder-department";
import type { StakeholderPosition } from "src/types/stakeholder/stakeholder-positions";
import { employeeColumns } from "./stakeholder-employee-row";

interface EmployeeListProps {
  stakeholderId: string;
}

const EmployeeList: React.FC<EmployeeListProps> = ({ stakeholderId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<StakeholderEmployee | null>(
    null,
  );
  const [departments, setDepartments] = useState<StakeholderDepartment[]>([]);
  const [positions, setPositions] = useState<StakeholderPosition[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await stakeholderDepartmentApiService.getAll({
          filter: { stakeholder_id: stakeholderId },
        });
        setDepartments(response.payload);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, [stakeholderId]);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await stakeholderPositionApiService.getAll({
          filter: { stakeholder_id: stakeholderId },
        });
        setPositions(response.payload);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchPositions();
  }, [stakeholderId]);

  const fetchEmployees = (
    params: GetRequestParam,
  ): Promise<IApiResponse<StakeholderEmployee[]>> => {
    return stakeholderEmployeeApiService.getAll({
      ...params,
      filter: { ...params.filter, stakeholder_id: stakeholderId },
    });
  };

  const {
    data: employees,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<StakeholderEmployee[]>({
    queryKey: ["employees"],
    fetchFunction: fetchEmployees,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as StakeholderEmployee);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as StakeholderEmployee);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (employee: StakeholderEmployee) => {
    toggleDrawer();
    setSelectedRow(employee);
  };

  const handleDelete = async (employeeId: string) => {
    await stakeholderEmployeeApiService.delete(employeeId);
    refetch();
  };

  const handleClickDetail = (employee: StakeholderEmployee) => {
    toggleDetailDrawer();
    setSelectedRow(employee);
  };

  const getDepartmentName = (departmentId: string) => {
    const department = departments.find((dept) => dept.id === departmentId);
    return department ? department.name : "N/A";
  };

  const getPositionName = (positionId: string) => {
    const position = positions.find((pos) => pos.id === positionId);
    return position ? position.name : "N/A";
  };

  const mapEmployeeToDetailItems = (
    employee: StakeholderEmployee,
  ): { title: string; value: string }[] => [
    {
      title: t("stakeholder.employee.firstName"),
      value: employee?.first_name || "N/A",
    },
    {
      title: t("stakeholder.employee.middleName"),
      value: employee?.middle_name || "N/A",
    },
    {
      title: t("stakeholder.employee.lastName"),
      value: employee?.last_name || "N/A",
    },
    {
      title: t("stakeholder.employee.nationalIdNo"),
      value: employee?.national_id_no || "N/A",
    },
    {
      title: t("stakeholder.employee.gender"),
      value: employee?.gender || "N/A",
    },
    { title: t("stakeholder.employee.phone"), value: employee?.phone || "N/A" },
    { title: t("stakeholder.employee.email"), value: employee?.email || "N/A" },
    {
      title: t("stakeholder.employee.department"),
      value: getDepartmentName(employee?.stakeholder_department_id),
    },
    {
      title: t("stakeholder.employee.position"),
      value: getPositionName(employee?.stakeholder_position_id),
    },
    {
      title: t("common.table-columns.created-at"),
      value: employee?.created_at
        ? formatCreatedAt(employee.created_at)
        : "N/A",
    },
  ];

  return (
    <Box>
      {showDrawer && (
        <EmployeeDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          employee={selectedRow as StakeholderEmployee}
          refetch={refetch}
          stakeholderId={stakeholderId}
          departments={departments}
          positions={positions}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapEmployeeToDetailItems(selectedRow as StakeholderEmployee)}
          id={selectedRow?.id || ""}
          hasReference={false}
          fileType="stakeholder-employee"
          title={t("stakeholder.employee.details")}
        />
      )}

      <ItemsListing
        title={t("stakeholder.employee.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: employeeColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            departments,
            positions,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <EmployeeCard
            onDetail={handleClickDetail}
            employee={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
            departments={departments}
            positions={positions}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: "create",
            subject: "stakeholderemployee",
          },
        }}
        fetchDataFunction={refetch}
        items={employees || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default EmployeeList;
