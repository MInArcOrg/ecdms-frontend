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
import type { BridgeFoundation } from "src/types/project/other"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import { formatCreatedAt } from "src/utils/formatter/date"
import ItemsListing from "src/views/shared/listing"
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer"
import BridgeFoundationCard from "./bridge-foundation-card"
import BridgeFoundationDrawer from "./bridge-foundation-drawer"
import { bridgeFoundationColumns } from "./bridge-foundation-row"

interface BridgeFoundationListProps {
  otherSubMenu?: OtherMenuRoute
  typeId: string
  projectId: string
}

const BridgeFoundationList: React.FC<BridgeFoundationListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false)
  const [showDetailDrawer, setShowDetailDrawer] = useState(false)
  const [selectedRow, setSelectedRow] = useState<BridgeFoundation | null>(null)
  const { t } = useTranslation()

  const fetchBridgeFoundations = (params: GetRequestParam): Promise<IApiResponse<BridgeFoundation[]>> => {
    return projectOtherApiSecondService<BridgeFoundation>().getAll(otherSubMenu?.apiRoute || "", {
      ...params,
      filter: { ...params.filter, project_id: projectId },
    })
  }

  const {
    data: bridgeFoundations,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<BridgeFoundation[]>({
    queryKey: ["bridgeFoundations"],
    fetchFunction: fetchBridgeFoundations,
  })

  const toggleDrawer = () => {
    setSelectedRow({} as BridgeFoundation)
    setShowDrawer(!showDrawer)
  }

  const toggleDetailDrawer = () => {
    setSelectedRow({} as BridgeFoundation)
    setShowDetailDrawer(!showDetailDrawer)
  }

  const handleEdit = (bridgeFoundation: BridgeFoundation) => {
    toggleDrawer()
    setSelectedRow(bridgeFoundation)
  }

  const handleDelete = async (bridgeFoundationId: string) => {
    await projectOtherApiSecondService<BridgeFoundation>().delete(otherSubMenu?.apiRoute || "", bridgeFoundationId)
    refetch()
  }

  const handleClickDetail = (bridgeFoundation: BridgeFoundation) => {
    toggleDetailDrawer()
    setSelectedRow(bridgeFoundation)
  }

  const mapBridgeFoundationToDetailItems = (bridgeFoundation: BridgeFoundation): { title: string; value: string }[] => [
    {
      title: t("project.other.bridge-foundation.details.name"),
      value: bridgeFoundation?.name || "N/A",
    },
    {
      title: t("project.other.bridge-foundation.details.bridge-name"),
      value: bridgeFoundation?.bridge_name || "N/A",
    },
    {
      title: t("project.other.bridge-foundation.details.abutment-type-id"),
      value: bridgeFoundation?.abutment_type_id || "N/A",
    },
    {
      title: t("project.other.bridge-foundation.details.pier-type-id"),
      value: bridgeFoundation?.pier_type_id || "N/A",
    },
    {
      title: t("project.other.bridge-foundation.details.abutment-foundation-size"),
      value: bridgeFoundation?.abutment_foundation_size?.toString() || "N/A",
    },
    {
      title: t("project.other.bridge-foundation.details.pier-foundation-size"),
      value: bridgeFoundation?.pier_foundation_size?.toString() || "N/A",
    },
    {
      title: t("project.other.bridge-foundation.details.abutment-pile-number"),
      value: bridgeFoundation?.abutment_pile_number?.toString() || "N/A",
    },
    {
      title: t("project.other.bridge-foundation.details.pier-pile-number"),
      value: bridgeFoundation?.pier_pile_number?.toString() || "N/A",
    },
    {
      title: t("project.other.bridge-foundation.details.abutment-pile-depth"),
      value: bridgeFoundation?.abutment_pile_depth?.toString() || "N/A",
    },
    {
      title: t("project.other.bridge-foundation.details.pier-pile-depth"),
      value: bridgeFoundation?.pier_pile_depth?.toString() || "N/A",
    },
    {
      title: t("project.other.bridge-foundation.details.soil-type-id"),
      value: bridgeFoundation?.soil_type_id || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: bridgeFoundation?.created_at ? formatCreatedAt(bridgeFoundation.created_at) : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: bridgeFoundation?.updated_at ? formatCreatedAt(bridgeFoundation.updated_at) : "N/A",
    },
  ]

  return (
    <Box>
      {showDrawer && (
        <BridgeFoundationDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          bridgeFoundation={selectedRow as BridgeFoundation}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapBridgeFoundationToDetailItems(selectedRow as BridgeFoundation)}
          hasReference={false}
          id={selectedRow?.id || ""}
          fileType=""
          title={t("project.other.bridge-foundation.bridge-foundation-details")}
        />
      )}

      <ItemsListing
        title={t("project.other.bridge-foundation.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: bridgeFoundationColumns(handleClickDetail, handleEdit, handleDelete, t, refetch),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <BridgeFoundationCard
            onDetail={handleClickDetail}
            bridgeFoundation={data}
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
            subject: "bridgefoundation",
          },
        }}
        fetchDataFunction={refetch}
        items={bridgeFoundations || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  )
}

export default BridgeFoundationList

