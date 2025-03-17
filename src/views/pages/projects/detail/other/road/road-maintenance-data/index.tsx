"use client"

import type React from "react"

import { Box } from "@mui/material"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants"
import usePaginatedFetch from "src/hooks/use-paginated-fetch"
import type { OtherMenuRoute } from "src/pages/projects/[typeId]/details/[id]/other/(subMenuItems)"
import projectOtherApiSecondService from "src/services/project/project-other-second-service"
import { defaultCreateActionConfig } from "src/types/general/listing"
import type { RoadMaintenanceData } from "src/types/project/other"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import { formatCreatedAt, formatDate } from "src/utils/formatter/date"
import ItemsListing from "src/views/shared/listing"
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer"
import RoadMaintenanceDataCard from "./road-maintenance-data-card"
import RoadMaintenanceDataDrawer from "./road-maintenance-data-drawer"
import { roadMaintenanceDataColumns } from "./road-maintenance-data-row"

interface RoadMaintenanceDataListProps {
  otherSubMenu?: OtherMenuRoute
  typeId: string
  projectId: string
}

const RoadMaintenanceDataList: React.FC<RoadMaintenanceDataListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false)
  const [showDetailDrawer, setShowDetailDrawer] = useState(false)
  const [selectedRow, setSelectedRow] = useState<RoadMaintenanceData | null>(null)
  const { t } = useTranslation()

  const fetchRoadMaintenanceData = (params: GetRequestParam): Promise<IApiResponse<RoadMaintenanceData[]>> => {
    return projectOtherApiSecondService<RoadMaintenanceData>().getAll(otherSubMenu?.apiRoute || "", {
      ...params,
      filter: { ...params.filter, project_id: projectId },
    })
  }

  const {
    data: roadMaintenanceDataList,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<RoadMaintenanceData[]>({
    queryKey: ["roadMaintenanceData"],
    fetchFunction: fetchRoadMaintenanceData,
  })

  const toggleDrawer = () => {
    setSelectedRow({} as RoadMaintenanceData)
    setShowDrawer(!showDrawer)
  }

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RoadMaintenanceData)
    setShowDetailDrawer(!showDetailDrawer)
  }

  const handleEdit = (roadMaintenanceData: RoadMaintenanceData) => {
    toggleDrawer()
    setSelectedRow(roadMaintenanceData)
  }

  const handleDelete = async (roadMaintenanceDataId: string) => {
    await projectOtherApiSecondService<RoadMaintenanceData>().delete(
      otherSubMenu?.apiRoute || "",
      roadMaintenanceDataId,
    )
    refetch()
  }

  const handleClickDetail = (roadMaintenanceData: RoadMaintenanceData) => {
    toggleDetailDrawer()
    setSelectedRow(roadMaintenanceData)
  }

  const mapRoadMaintenanceDataToDetailItems = (
    roadMaintenanceData: RoadMaintenanceData,
  ): { title: string; value: string }[] => [
    {
      title: t("project.other.road-maintenance-data.details.road-segment"),
      value: roadMaintenanceData?.road_segment || "N/A",
    },
    {
      title: t("project.other.road-maintenance-data.details.maintenance-start-date"),
      value: roadMaintenanceData?.maintenance_start_date
        ? formatDate(roadMaintenanceData.maintenance_start_date)
        : "N/A",
    },
    {
      title: t("project.other.road-maintenance-data.details.maintenance-end-date"),
      value: roadMaintenanceData?.maintenance_end_date ? formatDate(roadMaintenanceData.maintenance_end_date) : "N/A",
    },
    {
      title: t("project.other.road-maintenance-data.details.weather-condition"),
      value: roadMaintenanceData?.weather_condition || "N/A",
    },
    {
      title: t("project.other.road-maintenance-data.details.pavement-condition"),
      value: roadMaintenanceData?.pavement_condition || "N/A",
    },
    {
      title: t("project.other.road-maintenance-data.details.remark"),
      value: roadMaintenanceData?.remark || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: roadMaintenanceData?.created_at ? formatCreatedAt(roadMaintenanceData.created_at) : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: roadMaintenanceData?.updated_at ? formatCreatedAt(roadMaintenanceData.updated_at) : "N/A",
    },
  ]

  return (
    <Box>
      {showDrawer && (
        <RoadMaintenanceDataDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          roadMaintenanceData={selectedRow as RoadMaintenanceData}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapRoadMaintenanceDataToDetailItems(selectedRow as RoadMaintenanceData)}
          hasReference={false}
          id={selectedRow?.id || ""}
          fileType=""
          title={t("project.other.road-maintenance-data.road-maintenance-data-details")}
        />
      )}

      <ItemsListing
        title={t("project.other.road-maintenance-data.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: roadMaintenanceDataColumns(handleClickDetail, handleEdit, handleDelete, t, refetch),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RoadMaintenanceDataCard
            onDetail={handleClickDetail}
            roadMaintenanceData={data}
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
            subject: "roadmaintenancedata",
          },
        }}
        fetchDataFunction={refetch}
        items={roadMaintenanceDataList || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  )
}

export default RoadMaintenanceDataList

