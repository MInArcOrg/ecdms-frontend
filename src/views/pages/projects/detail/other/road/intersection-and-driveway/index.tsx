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
import type { IntersectionAndDriveway } from "src/types/project/other"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import { formatCreatedAt } from "src/utils/formatter/date"
import ItemsListing from "src/views/shared/listing"
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer"
import IntersectionAndDrivewayCard from "./intersection-and-driveway-card"
import IntersectionAndDrivewayDrawer from "./intersection-and-driveway-drawer"
import { intersectionAndDrivewayColumns } from "./intersection-and-driveway-row"
import { useQuery } from "@tanstack/react-query"
import intersectionTypeMasterService from "src/services/general/project/intersection-type-master-service"
import drivewayAccessPointMasterService from "src/services/general/project/driveway-access-point-master-service"

interface IntersectionAndDrivewayListProps {
  model: string
  typeId: string
  projectId: string
}

const IntersectionAndDrivewayList: React.FC<IntersectionAndDrivewayListProps> = ({ model, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false)
  const [showDetailDrawer, setShowDetailDrawer] = useState(false)
  const [selectedRow, setSelectedRow] = useState<IntersectionAndDriveway | null>(null)
  const { t } = useTranslation()

  // Fetch master data for lookups
  const { data: intersectionTypes } = useQuery({
    queryKey: ["masterCategory", "intersectionTypes"],
    queryFn: () => intersectionTypeMasterService.getAll({}),
  })

  const { data: drivewayAccessPoints } = useQuery({
    queryKey: ["masterCategory", "drivewayAccessPoints"],
    queryFn: () => drivewayAccessPointMasterService.getAll({}),
  })

  // Create lookup maps
  const intersectionTypeMap = new Map()
  const drivewayAccessPointMap = new Map()

  if (intersectionTypes?.payload) {
    intersectionTypes.payload.forEach((type) => {
      intersectionTypeMap.set(type.id, type.title)
    })
  }

  if (drivewayAccessPoints?.payload) {
    drivewayAccessPoints.payload.forEach((point) => {
      drivewayAccessPointMap.set(point.id, point.title)
    })
  }

  const fetchIntersectionAndDriveways = (params: GetRequestParam): Promise<IApiResponse<IntersectionAndDriveway[]>> => {
    return projectOtherApiService<IntersectionAndDriveway>().getAll(model, {
      ...params,
      filter: { ...params.filter, project_id: projectId },
    })
  }

  const {
    data: intersectionAndDriveways,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<IntersectionAndDriveway[]>({
    queryKey: ["intersectionAndDriveways"],
    fetchFunction: fetchIntersectionAndDriveways,
  })

  const toggleDrawer = () => {
    setSelectedRow(null)
    setShowDrawer(!showDrawer)
  }

  const toggleDetailDrawer = () => {
    setSelectedRow(null)
    setShowDetailDrawer(!showDetailDrawer)
  }

  const handleEdit = (intersectionAndDriveway: IntersectionAndDriveway) => {
    setSelectedRow(intersectionAndDriveway)
    setShowDrawer(true)
  }

  const handleDelete = async (intersectionAndDrivewayId: string) => {
    await projectOtherApiService<IntersectionAndDriveway>().delete(model, intersectionAndDrivewayId)
    refetch()
  }

  const handleClickDetail = (intersectionAndDriveway: IntersectionAndDriveway) => {
    setSelectedRow(intersectionAndDriveway)
    setShowDetailDrawer(true)
  }

  const mapIntersectionAndDrivewayToDetailItems = (
    intersectionAndDriveway: IntersectionAndDriveway,
  ): { title: string; value: string }[] => [
    { title: t("project.other.intersection-and-driveway.details.name"), value: intersectionAndDriveway?.name || "N/A" },
    {
      title: t("project.other.intersection-and-driveway.details.number-of-intersections"),
      value: intersectionAndDriveway?.number_of_intersections?.toString() || "N/A",
    },
    {
      title: t("project.other.intersection-and-driveway.details.intersection-type-id"),
      value: intersectionTypeMap.get(intersectionAndDriveway?.intersection_type_id) || "N/A",
    },
    {
      title: t("project.other.intersection-and-driveway.details.driveway-access-point-id"),
      value: drivewayAccessPointMap.get(intersectionAndDriveway?.driveway_access_point_id) || "N/A",
    },
    {
      title: t("project.other.intersection-and-driveway.details.similar-for-all"),
      value: intersectionAndDriveway?.similar_for_all ? t("common.yes") : t("common.no"),
    },
    {
      title: t("common.table-columns.created-at"),
      value: intersectionAndDriveway?.created_at ? formatCreatedAt(intersectionAndDriveway.created_at) : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: intersectionAndDriveway?.updated_at ? formatCreatedAt(intersectionAndDriveway.updated_at) : "N/A",
    },
  ]

  return (
    <Box>
      {showDrawer && (
        <IntersectionAndDrivewayDrawer
          model={model}
          open={showDrawer}
          toggle={toggleDrawer}
          intersectionAndDriveway={selectedRow as IntersectionAndDriveway}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapIntersectionAndDrivewayToDetailItems(selectedRow!)}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={uploadableProjectFileTypes.other.intersectionAndDriveway}
          title={t("project.other.intersection-and-driveway.intersection-and-driveway-details")}
        />
      )}

      <ItemsListing
        title={t("project.other.intersection-and-driveway.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: intersectionAndDrivewayColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            intersectionTypeMap,
            drivewayAccessPointMap,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <IntersectionAndDrivewayCard
            onDetail={handleClickDetail}
            intersectionAndDriveway={data}
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
            subject: "intersectionanddriveway",
          },
        }}
        fetchDataFunction={refetch}
        items={intersectionAndDriveways || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  )
}

export default IntersectionAndDrivewayList

