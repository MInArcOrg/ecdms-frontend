"use client"

import type React from "react"

import { Box } from "@mui/material"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants"
import usePaginatedFetch from "src/hooks/use-paginated-fetch"
import drivewayAccessPointApiService from "src/services/master-data/driveway-access-point-service"
import masterTypeApiService from "src/services/master-data/master-type-service"
import { defaultCreateActionConfig } from "src/types/general/listing"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import { formatCreatedAt } from "src/utils/formatter/date"
import ItemsListing from "src/views/shared/listing"
import OtherDetailSidebar from "src/views/shared/layouts/other/other-detail-drawer"
import DrivewayAccessPointCard from "./driveway-access-point-card"
import DrivewayAccessPointDrawer from "./driveway-access-point-drawer"
import type { DrivewayAccessPoint } from "src/types/master/driveway-access-point"
import { drivewayAccessPointColumns } from "./driveway-access-point-row"

const DrivewayAccessPointList: React.FC = () => {
  const [showDrawer, setShowDrawer] = useState(false)
  const [showDetailDrawer, setShowDetailDrawer] = useState(false)
  const [selectedRow, setSelectedRow] = useState<DrivewayAccessPoint | null>(null)
  const [projectTypes, setProjectTypes] = useState<{ value: string; label: string }[]>([])
  const { t } = useTranslation()

  useEffect(() => {
    const fetchProjectTypes = async () => {
      try {
        const response = await masterTypeApiService.getAll("project", {})
        const types = response.payload.map((type) => ({
          value: type.id,
          label: type.title,
        }))
        setProjectTypes(types)
      } catch (error) {
        console.error("Error fetching project types:", error)
      }
    }

    fetchProjectTypes()
  }, [])

  const fetchDrivewayAccessPoints = (params: GetRequestParam): Promise<IApiResponse<DrivewayAccessPoint[]>> => {
    return drivewayAccessPointApiService.getAll(params)
  }

  const {
    data: drivewayAccessPoints,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<DrivewayAccessPoint[]>({
    queryKey: ["drivewayAccessPoints"],
    fetchFunction: fetchDrivewayAccessPoints,
  })

  const toggleDrawer = () => {
    setSelectedRow({} as DrivewayAccessPoint)
    setShowDrawer(!showDrawer)
  }

  const toggleDetailDrawer = () => {
    setSelectedRow({} as DrivewayAccessPoint)
    setShowDetailDrawer(!showDetailDrawer)
  }

  const handleEdit = (drivewayAccessPoint: DrivewayAccessPoint) => {
    toggleDrawer()
    setSelectedRow(drivewayAccessPoint)
  }

  const handleDelete = async (drivewayAccessPointId: string) => {
    await drivewayAccessPointApiService.delete(drivewayAccessPointId)
    refetch()
  }

  const handleClickDetail = (drivewayAccessPoint: DrivewayAccessPoint) => {
    toggleDetailDrawer()
    setSelectedRow(drivewayAccessPoint)
  }

  const mapDrivewayAccessPointToDetailItems = (
    drivewayAccessPoint: DrivewayAccessPoint,
  ): { title: string; value: string }[] => {
    const projectType = projectTypes.find((type) => type.value === drivewayAccessPoint.project_type_id)
    return [
      { title: t("master-data.driveway-access-point.title"), value: drivewayAccessPoint?.title || "N/A" },
      { title: t("master-data.driveway-access-point.description"), value: drivewayAccessPoint?.description || "N/A" },
      {
        title: t("master-data.driveway-access-point.project-type"),
        value: projectType ? projectType.label : "N/A",
      },
      {
        title: t("common.table-columns.created-at"),
        value: drivewayAccessPoint?.created_at ? formatCreatedAt(drivewayAccessPoint.created_at) : "N/A",
      },
    ]
  }

  return (
    <Box>
      {showDrawer && (
        <DrivewayAccessPointDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          refetch={refetch}
          drivewayAccessPoint={selectedRow as DrivewayAccessPoint}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapDrivewayAccessPointToDetailItems(selectedRow as DrivewayAccessPoint)}
          id={selectedRow?.id || ""}
          hasReference={true}
          fileType="DRIVEWAY_ACCESS_POINT"
          title={t("master-data.driveway-access-point.details")}
        />
      )}

      <ItemsListing
        title={t("master-data.driveway-access-point.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: drivewayAccessPointColumns(handleClickDetail, handleEdit, handleDelete, t, projectTypes),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <DrivewayAccessPointCard
            onDetail={handleClickDetail}
            drivewayAccessPoint={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
            projectTypes={projectTypes}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: "create",
            subject: "drivewayaccesspoint",
          },
        }}
        fetchDataFunction={refetch}
        items={drivewayAccessPoints || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  )
}

export default DrivewayAccessPointList

