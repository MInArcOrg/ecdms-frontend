"use client"

import type React from "react"
import { Box } from "@mui/material"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants"
import usePaginatedFetch from "src/hooks/use-paginated-fetch"
import projectOtherApiService from "src/services/project/project-other-service"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import { defaultCreateActionConfig } from "src/types/general/listing"
import type { RoadDrainage } from "src/types/project/other"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import { formatCreatedAt } from "src/utils/formatter/date"
import ItemsListing from "src/views/shared/listing"
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer"
import RoadDrainageCard from "./road-drainage-card"
import RoadDrainageDrawer from "./road-drainage-drawer"
import { roadDrainageColumns } from "./road-drainage-row"
import { useQuery } from "@tanstack/react-query"
import currentConditionMasterService from "src/services/general/project/current-condition-master-service"

interface RoadDrainageListProps {
  model: string
  typeId: string
  projectId: string
}

const RoadDrainageList: React.FC<RoadDrainageListProps> = ({ model, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false)
  const [showDetailDrawer, setShowDetailDrawer] = useState(false)
  const [selectedRow, setSelectedRow] = useState<RoadDrainage | null>(null)
  const { t } = useTranslation()

  // Fetch master data for lookups
  const { data: currentConditions } = useQuery({
    queryKey: ["masterCategory", "currentConditions"],
    queryFn: () => currentConditionMasterService.getAll({}),
  })

  // Create lookup maps
  const currentConditionMap = new Map()

  if (currentConditions?.payload) {
    currentConditions.payload.forEach((condition) => {
      currentConditionMap.set(condition.id, condition.title)
    })
  }

  const fetchRoadDrainages = (params: GetRequestParam): Promise<IApiResponse<RoadDrainage[]>> => {
    return projectOtherApiService<RoadDrainage>().getAll(model, {
      ...params,
      filter: { ...params.filter, project_id: projectId },
    })
  }

  const {
    data: roadDrainages,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<RoadDrainage[]>({
    queryKey: ["roadDrainages"],
    fetchFunction: fetchRoadDrainages,
  })

  const toggleDrawer = () => {
    setSelectedRow(null)
    setShowDrawer(!showDrawer)
  }

  const toggleDetailDrawer = () => {
    setSelectedRow(null)
    setShowDetailDrawer(!showDetailDrawer)
  }

  const handleEdit = (roadDrainage: RoadDrainage) => {
    setSelectedRow(roadDrainage)
    setShowDrawer(true)
  }

  const handleDelete = async (roadDrainageId: string) => {
    await projectOtherApiService<RoadDrainage>().delete(model, roadDrainageId)
    refetch()
  }

  const handleClickDetail = (roadDrainage: RoadDrainage) => {
    setSelectedRow(roadDrainage)
    setShowDetailDrawer(true)
  }

  const mapRoadDrainageToDetailItems = (roadDrainage: RoadDrainage): { title: string; value: string }[] => [
    { title: t("project.other.road-drainage.details.name"), value: roadDrainage?.name || "N/A" },
    { title: t("project.other.road-drainage.details.length"), value: roadDrainage?.length?.toString() || "N/A" },
    { title: t("project.other.road-drainage.details.height"), value: roadDrainage?.height?.toString() || "N/A" },
    { title: t("project.other.road-drainage.details.width"), value: roadDrainage?.width?.toString() || "N/A" },
    {
      title: t("project.other.road-drainage.details.current-condition-id"),
      value: currentConditionMap.get(roadDrainage?.current_condition_id) || "N/A",
    },
    {
      title: t("project.other.road-drainage.details.weight-limit"),
      value: roadDrainage?.weight_limit?.toString() || "N/A",
    },
    {
      title: t("project.other.road-drainage.details.design-life-span"),
      value: roadDrainage?.design_life_span?.toString() || "N/A",
    },
    {
      title: t("project.other.road-drainage.details.inspection-frequency"),
      value: roadDrainage?.inspection_frequency?.toString() || "N/A",
    },
    {
      title: t("project.other.road-drainage.details.construction-completion-year"),
      value: roadDrainage?.construction_completion_year?.toString() || "N/A",
    },
    { title: t("project.other.road-drainage.details.remark"), value: roadDrainage?.remark || "N/A" },
    {
      title: t("common.table-columns.created-at"),
      value: roadDrainage?.created_at ? formatCreatedAt(roadDrainage.created_at) : "N/A",
    },
  ]

  return (
    <Box>
      {showDrawer && (
        <RoadDrainageDrawer
          model={model}
          open={showDrawer}
          toggle={toggleDrawer}
          roadDrainage={selectedRow as RoadDrainage}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapRoadDrainageToDetailItems(selectedRow!)}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={uploadableProjectFileTypes.other.roadDrainage}
          title={t("project.other.road-drainage.road-drainage-details")}
        />
      )}

      <ItemsListing
        title={t("project.other.road-drainage.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: roadDrainageColumns(handleClickDetail, handleEdit, handleDelete, t, refetch, currentConditionMap),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RoadDrainageCard
            onDetail={handleClickDetail}
            roadDrainage={data}
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
            action: "create",
            subject: "roaddrainage",
          },
        }}
        fetchDataFunction={refetch}
        items={roadDrainages || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  )
}

export default RoadDrainageList

