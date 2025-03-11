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
import type { RoadProjectQualityControl } from "src/types/project/other"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import { formatCreatedAt } from "src/utils/formatter/date"
import ItemsListing from "src/views/shared/listing"
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer"
import RoadProjectQualityControlCard from "./road-project-quality-control-card"
import RoadProjectQualityControlDrawer from "./road-project-quality-control-drawer"
import { roadProjectQualityControlColumns } from "./road-project-quality-control-row"
import { useQuery } from "@tanstack/react-query"
import projectPhaseMasterService from "src/services/general/project/project-phase-master-service"
import inspectionTypeMasterService from "src/services/general/project/inspection-type-master-service"

interface RoadProjectQualityControlListProps {
  model: string
  typeId: string
  projectId: string
}

const RoadProjectQualityControlList: React.FC<RoadProjectQualityControlListProps> = ({ model, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false)
  const [showDetailDrawer, setShowDetailDrawer] = useState(false)
  const [selectedRow, setSelectedRow] = useState<RoadProjectQualityControl | null>(null)
  const { t } = useTranslation()

  // Fetch master data for lookups
  const { data: projectPhases } = useQuery({
    queryKey: ["masterCategory", "projectPhases"],
    queryFn: () => projectPhaseMasterService.getAll({}),
  })

  const { data: inspectionTypes } = useQuery({
    queryKey: ["masterCategory", "inspectionTypes"],
    queryFn: () => inspectionTypeMasterService.getAll({}),
  })

  // Create lookup maps
  const projectPhaseMap = new Map()
  const inspectionTypeMap = new Map()

  if (projectPhases?.payload) {
    projectPhases.payload.forEach((phase) => {
      projectPhaseMap.set(phase.id, phase.title)
    })
  }

  if (inspectionTypes?.payload) {
    inspectionTypes.payload.forEach((type) => {
      inspectionTypeMap.set(type.id, type.title)
    })
  }

  const fetchRoadProjectQualityControls = (
    params: GetRequestParam,
  ): Promise<IApiResponse<RoadProjectQualityControl[]>> => {
    return projectOtherApiService<RoadProjectQualityControl>().getAll(model, {
      ...params,
      filter: { ...params.filter, project_id: projectId },
    })
  }

  const {
    data: roadProjectQualityControls,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<RoadProjectQualityControl[]>({
    queryKey: ["roadProjectQualityControls"],
    fetchFunction: fetchRoadProjectQualityControls,
  })

  const toggleDrawer = () => {
    setSelectedRow(null)
    setShowDrawer(!showDrawer)
  }

  const toggleDetailDrawer = () => {
    setSelectedRow(null)
    setShowDetailDrawer(!showDetailDrawer)
  }

  const handleEdit = (roadProjectQualityControl: RoadProjectQualityControl) => {
    setSelectedRow(roadProjectQualityControl)
    setShowDrawer(true)
  }

  const handleDelete = async (roadProjectQualityControlId: string) => {
    await projectOtherApiService<RoadProjectQualityControl>().delete(model, roadProjectQualityControlId)
    refetch()
  }

  const handleClickDetail = (roadProjectQualityControl: RoadProjectQualityControl) => {
    setSelectedRow(roadProjectQualityControl)
    setShowDetailDrawer(true)
  }

  const mapRoadProjectQualityControlToDetailItems = (
    roadProjectQualityControl: RoadProjectQualityControl,
  ): { title: string; value: string }[] => [
    {
      title: t("project.other.road-project-quality-control.details.name"),
      value: roadProjectQualityControl?.name || "N/A",
    },
    {
      title: t("project.other.road-project-quality-control.details.project-phase-id"),
      value: projectPhaseMap.get(roadProjectQualityControl?.project_phase_id) || "N/A",
    },
    {
      title: t("project.other.road-project-quality-control.details.inspection-type-id"),
      value: inspectionTypeMap.get(roadProjectQualityControl?.inspection_type_id) || "N/A",
    },
    {
      title: t("project.other.road-project-quality-control.details.defect-encountered"),
      value: roadProjectQualityControl?.defect_encountered || "N/A",
    },
    {
      title: t("project.other.road-project-quality-control.details.remark"),
      value: roadProjectQualityControl?.remark || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: roadProjectQualityControl?.created_at ? formatCreatedAt(roadProjectQualityControl.created_at) : "N/A",
    },
  ]

  return (
    <Box>
      {showDrawer && (
        <RoadProjectQualityControlDrawer
          model={model}
          open={showDrawer}
          toggle={toggleDrawer}
          roadProjectQualityControl={selectedRow as RoadProjectQualityControl}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapRoadProjectQualityControlToDetailItems(selectedRow!)}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={uploadableProjectFileTypes.other.roadProjectQualityControl}
          title={t("project.other.road-project-quality-control.road-project-quality-control-details")}
        />
      )}

      <ItemsListing
        title={t("project.other.road-project-quality-control.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: roadProjectQualityControlColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            projectPhaseMap,
            inspectionTypeMap,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RoadProjectQualityControlCard
            onDetail={handleClickDetail}
            roadProjectQualityControl={data}
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
            subject: "roadprojectqualitycontrol",
          },
        }}
        fetchDataFunction={refetch}
        items={roadProjectQualityControls || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  )
}

export default RoadProjectQualityControlList

