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
import type { Pavement } from "src/types/project/other"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import { formatCreatedAt } from "src/utils/formatter/date"
import ItemsListing from "src/views/shared/listing"
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer"
import PavementCard from "./pavement-card"
import PavementDrawer from "./pavement-drawer"
import { pavementColumns } from "./pavement-row"
import { useQuery } from "@tanstack/react-query"
import roadLengthTypeMasterService from "src/services/general/project/road-length-type-master-service"

interface PavementListProps {
  model: string
  typeId: string
  projectId: string
}

const PavementList: React.FC<PavementListProps> = ({ model, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false)
  const [showDetailDrawer, setShowDetailDrawer] = useState(false)
  const [selectedRow, setSelectedRow] = useState<Pavement | null>(null)
  const { t } = useTranslation()

  // Fetch master data for lookups
  const { data: roadLengthTypes } = useQuery({
    queryKey: ["masterCategory", "roadLengthTypes"],
    queryFn: () => roadLengthTypeMasterService.getAll({}),
  })

  // Create lookup maps
  const roadLengthTypeMap = new Map()

  if (roadLengthTypes?.payload) {
    roadLengthTypes.payload.forEach((type) => {
      roadLengthTypeMap.set(type.id, type.title)
    })
  }

  const fetchPavements = (params: GetRequestParam): Promise<IApiResponse<Pavement[]>> => {
    return projectOtherApiService<Pavement>().getAll(model, {
      ...params,
      filter: { ...params.filter, project_id: projectId },
    })
  }

  const {
    data: pavements,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<Pavement[]>({
    queryKey: ["pavements"],
    fetchFunction: fetchPavements,
  })

  const toggleDrawer = () => {
    setSelectedRow(null)
    setShowDrawer(!showDrawer)
  }

  const toggleDetailDrawer = () => {
    setSelectedRow(null)
    setShowDetailDrawer(!showDetailDrawer)
  }

  const handleEdit = (pavement: Pavement) => {
    setSelectedRow(pavement)
    setShowDrawer(true)
  }

  const handleDelete = async (pavementId: string) => {
    await projectOtherApiService<Pavement>().delete(model, pavementId)
    refetch()
  }

  const handleClickDetail = (pavement: Pavement) => {
    setSelectedRow(pavement)
    setShowDetailDrawer(true)
  }

  const mapPavementToDetailItems = (pavement: Pavement): { title: string; value: string }[] => [
    { title: t("project.other.pavement.details.name"), value: pavement?.name || "N/A" },
    {
      title: t("project.other.pavement.details.tangent-length"),
      value: pavement?.tangent_length?.toString() || "N/A",
    },
    {
      title: t("project.other.pavement.details.curve-length"),
      value: pavement?.curve_length?.toString() || "N/A",
    },
    {
      title: t("project.other.pavement.details.road-length-type-id"),
      value: roadLengthTypeMap.get(pavement?.road_length_type_id) || "N/A",
    },
    {
      title: t("project.other.pavement.details.road-pavement-thickness"),
      value: pavement?.road_pavement_thickness?.toString() || "N/A",
    },
    {
      title: t("project.other.pavement.details.paved-road-surface-width"),
      value: pavement?.paved_road_surface_width?.toString() || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: pavement?.created_at ? formatCreatedAt(pavement.created_at) : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: pavement?.updated_at ? formatCreatedAt(pavement.updated_at) : "N/A",
    },
  ]

  return (
    <Box>
      {showDrawer && (
        <PavementDrawer
          model={model}
          open={showDrawer}
          toggle={toggleDrawer}
          pavement={selectedRow as Pavement}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapPavementToDetailItems(selectedRow!)}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={uploadableProjectFileTypes.other.pavement}
          title={t("project.other.pavement.pavement-details")}
        />
      )}

      <ItemsListing
        title={t("project.other.pavement.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: pavementColumns(handleClickDetail, handleEdit, handleDelete, t, refetch, roadLengthTypeMap),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <PavementCard
            onDetail={handleClickDetail}
            pavement={data}
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
            subject: "pavement",
          },
        }}
        fetchDataFunction={refetch}
        items={pavements || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  )
}

export default PavementList

