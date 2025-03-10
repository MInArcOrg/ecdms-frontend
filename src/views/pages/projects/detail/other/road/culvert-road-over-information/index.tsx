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
import type { CulvertRoadOverInformation } from "src/types/project/other"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import { formatCreatedAt } from "src/utils/formatter/date"
import ItemsListing from "src/views/shared/listing"
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer"
import CulvertRoadOverInformationCard from "./culvert-road-over-information-card"
import CulvertRoadOverInformationDrawer from "./culvert-road-over-information-drawer"
import { culvertRoadOverInformationColumns } from "./culvert-road-over-information-row"
import { useQuery } from "@tanstack/react-query"
import guardRailTypeMasterService from "src/services/general/project/guard-rail-type-master-service"

interface CulvertRoadOverInformationListProps {
  model: string
  typeId: string
  projectId: string
}

const CulvertRoadOverInformationList: React.FC<CulvertRoadOverInformationListProps> = ({
  model,
  projectId,
  typeId,
}) => {
  const [showDrawer, setShowDrawer] = useState(false)
  const [showDetailDrawer, setShowDetailDrawer] = useState(false)
  const [selectedRow, setSelectedRow] = useState<CulvertRoadOverInformation | null>(null)
  const { t } = useTranslation()

  // Fetch master data for lookups
  const { data: guardRailTypes } = useQuery({
    queryKey: ["masterCategory", "guardRailTypes"],
    queryFn: () => guardRailTypeMasterService.getAll({}),
  })

  // Create lookup maps
  const guardRailTypeMap = new Map()

  if (guardRailTypes?.payload) {
    guardRailTypes.payload.forEach((type) => {
      guardRailTypeMap.set(type.id, type.title)
    })
  }

  const fetchCulvertRoadOverInformation = (
    params: GetRequestParam,
  ): Promise<IApiResponse<CulvertRoadOverInformation[]>> => {
    return projectOtherApiService<CulvertRoadOverInformation>().getAll(model, {
      ...params,
      filter: { ...params.filter, project_id: projectId },
    })
  }

  const {
    data: culvertRoadOverInformation,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<CulvertRoadOverInformation[]>({
    queryKey: ["culvertRoadOverInformation"],
    fetchFunction: fetchCulvertRoadOverInformation,
  })

  const toggleDrawer = () => {
    setSelectedRow(null)
    setShowDrawer(!showDrawer)
  }

  const toggleDetailDrawer = () => {
    setSelectedRow(null)
    setShowDetailDrawer(!showDetailDrawer)
  }

  const handleEdit = (culvertRoadOverInformation: CulvertRoadOverInformation) => {
    setSelectedRow(culvertRoadOverInformation)
    setShowDrawer(true)
  }

  const handleDelete = async (culvertRoadOverInformationId: string) => {
    await projectOtherApiService<CulvertRoadOverInformation>().delete(model, culvertRoadOverInformationId)
    refetch()
  }

  const handleClickDetail = (culvertRoadOverInformation: CulvertRoadOverInformation) => {
    setSelectedRow(culvertRoadOverInformation)
    setShowDetailDrawer(true)
  }

  const mapCulvertRoadOverInformationToDetailItems = (
    culvertRoadOverInformation: CulvertRoadOverInformation,
  ): { title: string; value: string }[] => [
    {
      title: t("project.other.culvert-road-over-information.details.name"),
      value: culvertRoadOverInformation?.name || "N/A",
    },
    {
      title: t("project.other.culvert-road-over-information.details.carriage-way-width"),
      value: culvertRoadOverInformation?.carriage_way_width?.toString() || "N/A",
    },
    {
      title: t("project.other.culvert-road-over-information.details.side-walk-width"),
      value: culvertRoadOverInformation?.side_walk_width?.toString() || "N/A",
    },
    {
      title: t("project.other.culvert-road-over-information.details.lane-number"),
      value: culvertRoadOverInformation?.lane_number?.toString() || "N/A",
    },
    {
      title: t("project.other.culvert-road-over-information.details.head-wall-to-head-wall"),
      value: culvertRoadOverInformation?.head_wall_to_head_wall?.toString() || "N/A",
    },
    {
      title: t("project.other.culvert-road-over-information.details.average-fill-height"),
      value: culvertRoadOverInformation?.average_fill_height?.toString() || "N/A",
    },
    {
      title: t("project.other.culvert-road-over-information.details.guard-rail-type-id"),
      value: guardRailTypeMap.get(culvertRoadOverInformation?.guard_rail_type_id) || "N/A",
    },
    {
      title: t("project.other.culvert-road-over-information.details.parapet-length"),
      value: culvertRoadOverInformation?.parapet_length?.toString() || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: culvertRoadOverInformation?.created_at ? formatCreatedAt(culvertRoadOverInformation.created_at) : "N/A",
    },
  ]

  return (
    <Box>
      {showDrawer && (
        <CulvertRoadOverInformationDrawer
          model={model}
          open={showDrawer}
          toggle={toggleDrawer}
          culvertRoadOverInformation={selectedRow as CulvertRoadOverInformation}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapCulvertRoadOverInformationToDetailItems(selectedRow!)}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={uploadableProjectFileTypes.other.culvertRoadOverInformation}
          title={t("project.other.culvert-road-over-information.culvert-road-over-information-details")}
        />
      )}

      <ItemsListing
        title={t("project.other.culvert-road-over-information.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: culvertRoadOverInformationColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            guardRailTypeMap,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <CulvertRoadOverInformationCard
            onDetail={handleClickDetail}
            culvertRoadOverInformation={data}
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
            subject: "culvertroadoverinformation",
          },
        }}
        fetchDataFunction={refetch}
        items={culvertRoadOverInformation || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  )
}

export default CulvertRoadOverInformationList

