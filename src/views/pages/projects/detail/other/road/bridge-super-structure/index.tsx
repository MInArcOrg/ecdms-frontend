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
import type { BridgeSuperStructure } from "src/types/project/other"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import { formatCreatedAt } from "src/utils/formatter/date"
import ItemsListing from "src/views/shared/listing"
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer"
import BridgeSuperStructureCard from "./bridge-super-structure-card"
import BridgeSuperStructureDrawer from "./bridge-super-structure-drawer"
import { bridgeSuperStructureColumns } from "./bridge-super-structure-row"
import { useQuery } from "@tanstack/react-query"
import bridgeStructureTypeMasterService from "src/services/general/project/bridge-structure-type-master-service"
import spanSupportTypeMasterService from "src/services/general/project/span-support-type-master-service"
import deckSlabTypeMasterService from "src/services/general/project/deck-slab-type-master-service "

interface BridgeSuperStructureListProps {
  model: string
  typeId: string
  projectId: string
}

const BridgeSuperStructureList: React.FC<BridgeSuperStructureListProps> = ({ model, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false)
  const [showDetailDrawer, setShowDetailDrawer] = useState(false)
  const [selectedRow, setSelectedRow] = useState<BridgeSuperStructure | null>(null)
  const { t } = useTranslation()

  // Fetch master data for lookups
  const { data: bridgeStructureTypes } = useQuery({
    queryKey: ["masterCategory", "bridgeStructureTypes"],
    queryFn: () => bridgeStructureTypeMasterService.getAll({}),
  })

  const { data: spanSupportTypes } = useQuery({
    queryKey: ["masterCategory", "spanSupportTypes"],
    queryFn: () => spanSupportTypeMasterService.getAll({}),
  })

  const { data: deckSlabTypes } = useQuery({
    queryKey: ["masterCategory", "deckSlabTypes"],
    queryFn: () => deckSlabTypeMasterService.getAll({}),
  })

  // Create lookup maps
  const bridgeStructureTypeMap = new Map()
  const spanSupportTypeMap = new Map()
  const deckSlabTypeMap = new Map()

  if (bridgeStructureTypes?.payload) {
    bridgeStructureTypes.payload.forEach((type) => {
      bridgeStructureTypeMap.set(type.id, type.title)
    })
  }

  if (spanSupportTypes?.payload) {
    spanSupportTypes.payload.forEach((type) => {
      spanSupportTypeMap.set(type.id, type.title)
    })
  }

  if (deckSlabTypes?.payload) {
    deckSlabTypes.payload.forEach((type) => {
      deckSlabTypeMap.set(type.id, type.title)
    })
  }

  const fetchBridgeSuperStructures = (params: GetRequestParam): Promise<IApiResponse<BridgeSuperStructure[]>> => {
    return projectOtherApiService<BridgeSuperStructure>().getAll(model, {
      ...params,
      filter: { ...params.filter, project_id: projectId },
    })
  }

  const {
    data: bridgeSuperStructures,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<BridgeSuperStructure[]>({
    queryKey: ["bridgeSuperStructures"],
    fetchFunction: fetchBridgeSuperStructures,
  })

  const toggleDrawer = () => {
    setSelectedRow(null)
    setShowDrawer(!showDrawer)
  }

  const toggleDetailDrawer = () => {
    setSelectedRow(null)
    setShowDetailDrawer(!showDetailDrawer)
  }

  const handleEdit = (bridgeSuperStructure: BridgeSuperStructure) => {
    setSelectedRow(bridgeSuperStructure)
    setShowDrawer(true)
  }

  const handleDelete = async (bridgeSuperStructureId: string) => {
    await projectOtherApiService<BridgeSuperStructure>().delete(model, bridgeSuperStructureId)
    refetch()
  }

  const handleClickDetail = (bridgeSuperStructure: BridgeSuperStructure) => {
    setSelectedRow(bridgeSuperStructure)
    setShowDetailDrawer(true)
  }

  const mapBridgeSuperStructureToDetailItems = (
    bridgeSuperStructure: BridgeSuperStructure,
  ): { title: string; value: string }[] => [
    { title: t("project.other.bridge-super-structure.details.name"), value: bridgeSuperStructure?.name || "N/A" },
    {
      title: t("project.other.bridge-super-structure.details.bridge-name"),
      value: bridgeSuperStructure?.bridge_name || "N/A",
    },
    {
      title: t("project.other.bridge-super-structure.details.bridge-structure-type-id"),
      value: bridgeStructureTypeMap.get(bridgeSuperStructure?.bridge_structure_type_id) || "N/A",
    },
    {
      title: t("project.other.bridge-super-structure.details.span-number"),
      value: bridgeSuperStructure?.span_number?.toString() || "N/A",
    },
    {
      title: t("project.other.bridge-super-structure.details.span-composition"),
      value: bridgeSuperStructure?.span_composition || "N/A",
    },
    {
      title: t("project.other.bridge-super-structure.details.total-span-length"),
      value: bridgeSuperStructure?.total_span_length?.toString() || "N/A",
    },
    {
      title: t("project.other.bridge-super-structure.details.carriage-width"),
      value: bridgeSuperStructure?.carriage_width?.toString() || "N/A",
    },
    {
      title: t("project.other.bridge-super-structure.details.side-walk-width"),
      value: bridgeSuperStructure?.side_walk_width?.toString() || "N/A",
    },
    {
      title: t("project.other.bridge-super-structure.details.lane-number"),
      value: bridgeSuperStructure?.lane_number?.toString() || "N/A",
    },
    {
      title: t("project.other.bridge-super-structure.details.span-support-type-id"),
      value: spanSupportTypeMap.get(bridgeSuperStructure?.span_support_type_id) || "N/A",
    },
    {
      title: t("project.other.bridge-super-structure.details.deck-slab-type-id"),
      value: deckSlabTypeMap.get(bridgeSuperStructure?.deck_slab_type_id) || "N/A",
    },
    {
      title: t("project.other.bridge-super-structure.details.girder-number"),
      value: bridgeSuperStructure?.girder_number?.toString() || "N/A",
    },
    {
      title: t("project.other.bridge-super-structure.details.girder-depth"),
      value: bridgeSuperStructure?.girder_depth?.toString() || "N/A",
    },
    {
      title: t("project.other.bridge-super-structure.details.girder-spacing"),
      value: bridgeSuperStructure?.girder_spacing?.toString() || "N/A",
    },
    {
      title: t("project.other.bridge-super-structure.details.girder-width"),
      value: bridgeSuperStructure?.girder_width?.toString() || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: bridgeSuperStructure?.created_at ? formatCreatedAt(bridgeSuperStructure.created_at) : "N/A",
    },
  ]

  return (
    <Box>
      {showDrawer && (
        <BridgeSuperStructureDrawer
          model={model}
          open={showDrawer}
          toggle={toggleDrawer}
          bridgeSuperStructure={selectedRow as BridgeSuperStructure}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapBridgeSuperStructureToDetailItems(selectedRow!)}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={uploadableProjectFileTypes.other.bridgeSuperStructure}
          title={t("project.other.bridge-super-structure.bridge-super-structure-details")}
        />
      )}

      <ItemsListing
        title={t("project.other.bridge-super-structure.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: bridgeSuperStructureColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            bridgeStructureTypeMap,
            spanSupportTypeMap,
            deckSlabTypeMap,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <BridgeSuperStructureCard
            onDetail={handleClickDetail}
            bridgeSuperStructure={data}
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
            subject: "bridgesuperstructure",
          },
        }}
        fetchDataFunction={refetch}
        items={bridgeSuperStructures || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  )
}

export default BridgeSuperStructureList

