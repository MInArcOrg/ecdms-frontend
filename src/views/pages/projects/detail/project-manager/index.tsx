"use client";

import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import projectManagerApiService from "src/services/project/project-manager-service";
import stakeholderApiService from "src/services/stakeholder/stakeholder-service";
import { defaultCreateActionConfig } from "src/types/general/listing";
import type { GetRequestParam, IApiResponse } from "src/types/requests";
import { formatCreatedAt } from "src/utils/formatter/date";
import ItemsListing from "src/views/shared/listing";
import OtherDetailSidebar from "src/views/shared/layouts/other/other-detail-drawer";
import ManagerCard from "./project-manager-card";
import ManagerDrawer from "./project-manager-drawer";
import type { ProjectManager } from "src/types/project/project-manager";
import type { Stakeholder } from "src/types/stakeholder";
import { managerColumns } from "./project-manager-row";

interface ManagerListProps {
  projectId: string;
}

const ManagerList: React.FC<ManagerListProps> = ({ projectId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ProjectManager | null>(null);
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchStakeholders = async () => {
      try {
        const response = await stakeholderApiService.getAll({});
        setStakeholders(response.payload);
      } catch (error) {
        console.error("Error fetching stakeholders:", error);
      }
    };

    fetchStakeholders();
  }, []);

  const fetchManagers = (
    params: GetRequestParam,
  ): Promise<IApiResponse<ProjectManager[]>> => {
    return projectManagerApiService.getAll({
      ...params,
      filter: { ...params.filter, project_id: projectId },
    });
  };

  const {
    data: managers,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<ProjectManager[]>({
    queryKey: ["managers"],
    fetchFunction: fetchManagers,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as ProjectManager);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as ProjectManager);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (manager: ProjectManager) => {
    toggleDrawer();
    setSelectedRow(manager);
  };

  const handleDelete = async (managerId: string) => {
    await projectManagerApiService.delete(managerId);
    refetch();
  };

  const handleClickDetail = (manager: ProjectManager) => {
    toggleDetailDrawer();
    setSelectedRow(manager);
  };

  const getStakeholderName = (stakeholderId: string) => {
    if (!stakeholders) return "N/A";
    const stakeholder = stakeholders.find((s) => s.id === stakeholderId);
    return stakeholder ? stakeholder.trade_name : "N/A";
  };

  const mapManagerToDetailItems = (
    manager: ProjectManager,
  ): { title: string; value: string }[] => [
    {
      title: t("project.other.project-manager.firstName"),
      value: manager?.first_name || "N/A",
    },
    {
      title: t("project.other.project-manager.middleName"),
      value: manager?.middle_name || "N/A",
    },
    {
      title: t("project.other.project-manager.lastName"),
      value: manager?.last_name || "N/A",
    },
    {
      title: t("project.other.project-manager.position"),
      value: manager?.position || "N/A",
    },
    {
      title: t("project.other.project-manager.nationalIdNo"),
      value: manager?.national_id_no || "N/A",
    },
    {
      title: t("project.other.project-manager.gender"),
      value: manager?.gender || "N/A",
    },
    {
      title: t("project.other.project-manager.phone"),
      value: manager?.phone || "N/A",
    },
    {
      title: t("project.other.project-manager.email"),
      value: manager?.email || "N/A",
    },
    {
      title: t("project.other.project-manager.stakeholder"),
      value: getStakeholderName(manager?.stakeholder_id),
    },
    {
      title: t("common.table-columns.created-at"),
      value: manager?.created_at ? formatCreatedAt(manager.created_at) : "N/A",
    },
  ];

  return (
    <Box>
      {showDrawer && (
        <ManagerDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          manager={selectedRow as ProjectManager}
          refetch={refetch}
          projectId={projectId}
          stakeholders={stakeholders}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapManagerToDetailItems(selectedRow as ProjectManager)}
          id={selectedRow?.id || ""}
          hasReference={true}
          fileType="PROJECT_MANAGER"
          title={t("project.other.project-manager.details")}
        />
      )}

      <ItemsListing
        title={t("project.other.project-manager.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: managerColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            stakeholders,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <ManagerCard
            onDetail={handleClickDetail}
            manager={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
            stakeholders={stakeholders}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: "create",
            subject: "projectmanager",
          },
        }}
        fetchDataFunction={refetch}
        items={managers || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default ManagerList;
