"use client"

import { Box } from "@mui/material"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants"
import usePaginatedFetch from "src/hooks/use-paginated-fetch"
import projectSafetyStatusApiService from "src/services/project/project-safety-status-service"
import { defaultCreateActionConfig } from "src/types/general/listing"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import { formatCreatedAt } from "src/utils/formatter/date"
import ItemsListing from "src/views/shared/listing"
import OtherDetailSidebar from "src/views/shared/layouts/other/other-detail-drawer"
import ProjectSafetyStatusCard from "./project-safety-status-card"
import ProjectSafetyStatusDrawer from "./project-safety-status-drawer"
import type { ProjectSafetyStatus } from "src/types/project/project-safety-status "
import { safetyStatusColumns } from "./project-safety-status-row"

interface ProjectSafetyStatusListProps {
    model: string;
    projectId: string;
    typeId: string;
  }

const ProjectSafetyStatusList: React.FC<ProjectSafetyStatusListProps> = ({ projectId }) => {
  const [showDrawer, setShowDrawer] = useState(false)
  const [showDetailDrawer, setShowDetailDrawer] = useState(false)
  const [selectedRow, setSelectedRow] = useState<ProjectSafetyStatus | null>(null)
  const { t } = useTranslation()

  const fetchSafetyStatuses = (params: GetRequestParam): Promise<IApiResponse<ProjectSafetyStatus[]>> => {
    return projectSafetyStatusApiService.getAll({
      ...params,
      filter: { ...params.filter, project_id: projectId },
    })
  }

  const {
    data: safetyStatuses,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<ProjectSafetyStatus[]>({
    queryKey: ["safetyStatuses"],
    fetchFunction: fetchSafetyStatuses,
  })

  const toggleDrawer = () => {
    setSelectedRow({} as ProjectSafetyStatus)
    setShowDrawer(!showDrawer)
  }

  const toggleDetailDrawer = () => {
    setSelectedRow({} as ProjectSafetyStatus)
    setShowDetailDrawer(!showDetailDrawer)
  }

  const handleEdit = (safetyStatus: ProjectSafetyStatus) => {
    toggleDrawer()
    setSelectedRow(safetyStatus)
  }

  const handleDelete = async (safetyStatusId: string) => {
    await projectSafetyStatusApiService.delete(safetyStatusId)
    refetch()
  }

  const handleClickDetail = (safetyStatus: ProjectSafetyStatus) => {
    toggleDetailDrawer()
    setSelectedRow(safetyStatus)
  }

  const mapSafetyStatusToDetailItems = (
    safetyStatus: ProjectSafetyStatus
  ): { title: string; value: string }[] => [
    { title: t("project.safety-status.fatal-injuries"), value: safetyStatus?.no_of_fatal_injuries?.toString() || "N/A" },
    { title: t("project.safety-status.major-injuries"), value: safetyStatus?.no_of_major_injuries?.toString() || "N/A" },
    { title: t("project.safety-status.minor-injuries"), value: safetyStatus?.no_of_minor_injuries?.toString() || "N/A" },
    { title: t("project.safety-status.measures-taken"), value: safetyStatus?.measures_taken || "N/A" },
    { title: t("project.safety-status.lesson-learned"), value: safetyStatus?.lesson_learned || "N/A" },
    {
      title: t("common.table-columns.created-at"),
      value: safetyStatus?.created_at ? formatCreatedAt(safetyStatus.created_at) : "N/A",
    },
  ]

  return (
    <Box>
      {showDrawer && (
        <ProjectSafetyStatusDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          projectSafetyStatus={selectedRow as ProjectSafetyStatus}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapSafetyStatusToDetailItems(selectedRow as ProjectSafetyStatus)}
          id={selectedRow?.id || ""}
          hasReference={true}
          fileType="PROJECT_SAFETY_STATUS"
          title={t("project.safety-status.details")}
        />
      )}

      <ItemsListing
        title={t("project.safety-status.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: safetyStatusColumns(handleClickDetail, handleEdit, handleDelete, t),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <ProjectSafetyStatusCard
            onDetail={handleClickDetail}
            safetyStatus={data}
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
            action: "create",
            subject: "projectsafetystatus",
          },
        }}
        fetchDataFunction={refetch}
        items={safetyStatuses || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  )
}

export default ProjectSafetyStatusList