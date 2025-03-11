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
import type { TrafficVolume } from "src/types/project/other"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import { formatCreatedAt } from "src/utils/formatter/date"
import ItemsListing from "src/views/shared/listing"
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer"
import TrafficVolumeCard from "./traffic-volume-card"
import TrafficVolumeDrawer from "./traffic-volume-drawer"
import { trafficVolumeColumns } from "./traffic-volume-row"
import { useQuery } from "@tanstack/react-query"
import countTypeMasterService from "src/services/general/project/count-type-master-service"

interface TrafficVolumeListProps {
  model: string
  typeId: string
  projectId: string
}

const TrafficVolumeList: React.FC<TrafficVolumeListProps> = ({ model, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false)
  const [showDetailDrawer, setShowDetailDrawer] = useState(false)
  const [selectedRow, setSelectedRow] = useState<TrafficVolume | null>(null)
  const { t } = useTranslation()

  // Fetch master data for lookups
  const { data: countTypes } = useQuery({
    queryKey: ["masterCategory", "countTypes"],
    queryFn: () => countTypeMasterService.getAll({}),
  })

  // Create lookup maps
  const countTypeMap = new Map()

  if (countTypes?.payload) {
    countTypes.payload.forEach((type) => {
      countTypeMap.set(type.id, type.title)
    })
  }

  const fetchTrafficVolumes = (params: GetRequestParam): Promise<IApiResponse<TrafficVolume[]>> => {
    return projectOtherApiService<TrafficVolume>().getAll(model, {
      ...params,
      filter: { ...params.filter, project_id: projectId },
    })
  }

  const {
    data: trafficVolumes,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<TrafficVolume[]>({
    queryKey: ["trafficVolumes"],
    fetchFunction: fetchTrafficVolumes,
  })

  const toggleDrawer = () => {
    setSelectedRow(null)
    setShowDrawer(!showDrawer)
  }

  const toggleDetailDrawer = () => {
    setSelectedRow(null)
    setShowDetailDrawer(!showDetailDrawer)
  }

  const handleEdit = (trafficVolume: TrafficVolume) => {
    setSelectedRow(trafficVolume)
    setShowDrawer(true)
  }

  const handleDelete = async (trafficVolumeId: string) => {
    await projectOtherApiService<TrafficVolume>().delete(model, trafficVolumeId)
    refetch()
  }

  const handleClickDetail = (trafficVolume: TrafficVolume) => {
    setSelectedRow(trafficVolume)
    setShowDetailDrawer(true)
  }

  const mapTrafficVolumeToDetailItems = (trafficVolume: TrafficVolume): { title: string; value: string }[] => [
    { title: t("project.other.traffic-volume.details.name"), value: trafficVolume?.name || "N/A" },
    {
      title: t("project.other.traffic-volume.details.count-type-id"),
      value: countTypeMap.get(trafficVolume?.count_type_id) || "N/A",
    },
    {
      title: t("project.other.traffic-volume.details.count-location-coordinate-x"),
      value: trafficVolume?.count_location_coordinate_x?.toString() || "N/A",
    },
    {
      title: t("project.other.traffic-volume.details.count-location-coordinate-y"),
      value: trafficVolume?.count_location_coordinate_y?.toString() || "N/A",
    },
    {
      title: t("project.other.traffic-volume.details.count-time"),
      value: trafficVolume?.count_time ? formatCreatedAt(trafficVolume.count_time) : "N/A",
    },
    {
      title: t("project.other.traffic-volume.details.lane-number"),
      value: trafficVolume?.lane_number?.toString() || "N/A",
    },
    {
      title: t("project.other.traffic-volume.details.vehicle-number-per-hour"),
      value: trafficVolume?.vehicle_number_per_hour?.toString() || "N/A",
    },
    {
      title: t("project.other.traffic-volume.details.average-daily-traffic-volume"),
      value: trafficVolume?.average_daily_traffic_volume?.toString() || "N/A",
    },
    {
      title: t("project.other.traffic-volume.details.corridor-importance-level"),
      value: trafficVolume?.corridor_importance_level?.toString() || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: trafficVolume?.created_at ? formatCreatedAt(trafficVolume.created_at) : "N/A",
    },
  ]

  return (
    <Box>
      {showDrawer && (
        <TrafficVolumeDrawer
          model={model}
          open={showDrawer}
          toggle={toggleDrawer}
          trafficVolume={selectedRow as TrafficVolume}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapTrafficVolumeToDetailItems(selectedRow!)}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={uploadableProjectFileTypes.other.trafficVolume}
          title={t("project.other.traffic-volume.traffic-volume-details")}
        />
      )}

      <ItemsListing
        title={t("project.other.traffic-volume.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: trafficVolumeColumns(handleClickDetail, handleEdit, handleDelete, t, refetch, countTypeMap),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <TrafficVolumeCard
            onDetail={handleClickDetail}
            trafficVolume={data}
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
            subject: "trafficvolume",
          },
        }}
        fetchDataFunction={refetch}
        items={trafficVolumes || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  )
}

export default TrafficVolumeList

