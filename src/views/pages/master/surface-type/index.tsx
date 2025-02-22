"use client"

import type React from "react"
import { Box } from "@mui/material"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants"
import usePaginatedFetch from "src/hooks/use-paginated-fetch"
import surfaceTypeApiService from "src/services/master-data/surface-type-service"
import masterTypeApiService from "src/services/master-data/master-type-service"
import { defaultCreateActionConfig } from "src/types/general/listing"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import { formatCreatedAt } from "src/utils/formatter/date"
import ItemsListing from "src/views/shared/listing"
import OtherDetailSidebar from "src/views/shared/layouts/other/other-detail-drawer"
import SurfaceTypeCard from "./surface-type-card"
import SurfaceTypeDrawer from "./surface-type-drawer"
import type { SurfaceType } from "src/types/master/surface-type"
import { surfaceTypeColumns } from "./surface-type-row"

const SurfaceTypeList: React.FC = () => {
  const [showDrawer, setShowDrawer] = useState(false)
  const [showDetailDrawer, setShowDetailDrawer] = useState(false)
  const [selectedRow, setSelectedRow] = useState<SurfaceType | null>(null)
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

  const fetchSurfaceTypes = (params: GetRequestParam): Promise<IApiResponse<SurfaceType[]>> => {
    return surfaceTypeApiService.getAll(params)
  }

  const {
    data: surfaceTypes,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<SurfaceType[]>({
    queryKey: ["surfaceTypes"],
    fetchFunction: fetchSurfaceTypes,
  })

  const toggleDrawer = () => {
    setSelectedRow({} as SurfaceType)
    setShowDrawer(!showDrawer)
  }

  const toggleDetailDrawer = () => {
    setSelectedRow({} as SurfaceType)
    setShowDetailDrawer(!showDetailDrawer)
  }

  const handleEdit = (surfaceType: SurfaceType) => {
    toggleDrawer()
    setSelectedRow(surfaceType)
  }

  const handleDelete = async (surfaceTypeId: string) => {
    await surfaceTypeApiService.delete(surfaceTypeId)
    refetch()
  }

  const handleClickDetail = (surfaceType: SurfaceType) => {
    toggleDetailDrawer()
    setSelectedRow(surfaceType)
  }

  const mapSurfaceTypeToDetailItems = (surfaceType: SurfaceType): { title: string; value: string }[] => {
    const projectType = projectTypes.find((type) => type.value === surfaceType.project_type_id)
    return [
      { title: t("master-data.surface-type.title"), value: surfaceType?.title || "N/A" },
      { title: t("master-data.surface-type.description"), value: surfaceType?.description || "N/A" },
      {
        title: t("master-data.surface-type.project-type"),
        value: projectType ? projectType.label : "N/A",
      },
      {
        title: t("common.table-columns.created-at"),
        value: surfaceType?.created_at ? formatCreatedAt(surfaceType.created_at) : "N/A",
      },
    ]
  }

  return (
    <Box>
      {showDrawer && (
        <SurfaceTypeDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          refetch={refetch}
          surfaceType={selectedRow as SurfaceType}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapSurfaceTypeToDetailItems(selectedRow as SurfaceType)}
          id={selectedRow?.id || ""}
          hasReference={true}
          fileType="SURFACE_TYPE"
          title={t("master-data.surface-type.details")}
        />
      )}

      <ItemsListing
        title={t("master-data.surface-type.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: surfaceTypeColumns(handleClickDetail, handleEdit, handleDelete, t, projectTypes),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <SurfaceTypeCard
            onDetail={handleClickDetail}
            surfaceType={data}
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
            subject: "surfacetype",
          },
        }}
        fetchDataFunction={refetch}
        items={surfaceTypes || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  )
}

export default SurfaceTypeList

