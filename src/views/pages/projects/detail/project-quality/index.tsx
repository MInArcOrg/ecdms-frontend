"use client"

import { Box } from "@mui/material"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants"
import usePaginatedFetch from "src/hooks/use-paginated-fetch"
import projectQualityApiService from "src/services/project/project-quality-service"
import { defaultCreateActionConfig } from "src/types/general/listing"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import { formatCreatedAt } from "src/utils/formatter/date"
import ItemsListing from "src/views/shared/listing"
import OtherDetailSidebar from "src/views/shared/layouts/other/other-detail-drawer"
import ProjectQualityCard from "./project-quality-card"
import ProjectQualityDrawer from "./project-quality-drawer"
import type { ProjectQuality } from "src/types/project/project-quality"
import { qualityColumns } from "./project-quality-row"

interface ProjectQualityListProps {
    model: string;
    projectId: string;
    typeId: string;
  }

const ProjectQualityList: React.FC<ProjectQualityListProps> = ({ projectId }) => {
  const [showDrawer, setShowDrawer] = useState(false)
  const [showDetailDrawer, setShowDetailDrawer] = useState(false)
  const [selectedRow, setSelectedRow] = useState<ProjectQuality | null>(null)
  const { t } = useTranslation()

  const fetchQualities = (params: GetRequestParam): Promise<IApiResponse<ProjectQuality[]>> => {
    return projectQualityApiService.getAll({
      ...params,
      filter: { ...params.filter, project_id: projectId },
    })
  }

  const {
    data: qualities,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<ProjectQuality[]>({
    queryKey: ["qualities"],
    fetchFunction: fetchQualities,
  })

  const toggleDrawer = () => {
    setSelectedRow({} as ProjectQuality)
    setShowDrawer(!showDrawer)
  }

  const toggleDetailDrawer = () => {
    setSelectedRow({} as ProjectQuality)
    setShowDetailDrawer(!showDetailDrawer)
  }

  const handleEdit = (quality: ProjectQuality) => {
    toggleDrawer()
    setSelectedRow(quality)
  }

  const handleDelete = async (qualityId: string) => {
    await projectQualityApiService.delete(qualityId)
    refetch()
  }

  const handleClickDetail = (quality: ProjectQuality) => {
    toggleDetailDrawer()
    setSelectedRow(quality)
  }

  const mapQualityToDetailItems = (
    quality: ProjectQuality
  ): { title: string; value: string }[] => [
    { title: t("project.quality.major-quality-problem-encountered"), value: quality?.major_quality_problem_encountered || "N/A" },
    { title: t("project.quality.description"), value: quality?.description || "N/A" },
    { title: t("project.quality.measures-taken"), value: quality?.measures_taken || "N/A" },
    { title: t("project.quality.lesson-learned"), value: quality?.lesson_learned || "N/A" },
    {
      title: t("common.table-columns.created-at"),
      value: quality?.created_at ? formatCreatedAt(quality.created_at) : "N/A",
    },
  ]

  return (
    <Box>
      {showDrawer && (
        <ProjectQualityDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          projectQuality={selectedRow as ProjectQuality}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapQualityToDetailItems(selectedRow as ProjectQuality)}
          id={selectedRow?.id || ""}
          hasReference={true}
          fileType="PROJECT_QUALITY"
          title={t("project.quality.details")}
        />
      )}

      <ItemsListing
        title={t("project.quality.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: qualityColumns(handleClickDetail, handleEdit, handleDelete, t),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <ProjectQualityCard
            onDetail={handleClickDetail}
            quality={data}
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
            subject: "projectquality",
          },
        }}
        fetchDataFunction={refetch}
        items={qualities || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  )
}

export default ProjectQualityList