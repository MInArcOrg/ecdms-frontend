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
import type { BridgeStructureInformation } from "src/types/project/other"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import { formatCreatedAt } from "src/utils/formatter/date"
import ItemsListing from "src/views/shared/listing"
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer"
import BridgeStructureInformationCard from "./bridge-structure-information-card"
import BridgeStructureInformationDrawer from "./bridge-structure-information-drawer"
import { bridgeStructureInformationColumns } from "./bridge-structure-information-row"
import { useQuery } from "@tanstack/react-query"
import bridgeStructureTypeMasterService from "src/services/general/project/bridge-structure-type-master-service"

interface BridgeStructureInformationListProps {
  model: string
  typeId: string
  projectId: string
}

const BridgeStructureInformationList: React.FC<BridgeStructureInformationListProps> = ({
  model,
  projectId,
  typeId,
}) => {
  const [showDrawer, setShowDrawer] = useState(false)
  const [showDetailDrawer, setShowDetailDrawer] = useState(false)
  const [selectedRow, setSelectedRow] = useState<BridgeStructureInformation | null>(null)
  const { t } = useTranslation()

  // Fetch master data for lookups
  const { data: bridgeStructureTypes } = useQuery({
    queryKey: ["masterCategory", "bridgeStructureTypes"],
    queryFn: () => bridgeStructureTypeMasterService.getAll({}),
  })

  // Create lookup maps
  const bridgeStructureTypeMap = new Map()

  if (bridgeStructureTypes?.payload) {
    bridgeStructureTypes.payload.forEach((type) => {
      bridgeStructureTypeMap.set(type.id, type.title)
    })
  }

  const fetchBridgeStructureInformations = (
    params: GetRequestParam,
  ): Promise<IApiResponse<BridgeStructureInformation[]>> => {
    return projectOtherApiService<BridgeStructureInformation>().getAll(model, {
      ...params,
      filter: { ...params.filter, project_id: projectId },
    })
  }

  const {
    data: bridgeStructureInformations,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<BridgeStructureInformation[]>({
    queryKey: ["bridgeStructureInformations"],
    fetchFunction: fetchBridgeStructureInformations,
  })

  const toggleDrawer = () => {
    setSelectedRow(null)
    setShowDrawer(!showDrawer)
  }

  const toggleDetailDrawer = () => {
    setSelectedRow(null)
    setShowDetailDrawer(!showDetailDrawer)
  }

  const handleEdit = (bridgeStructureInformation: BridgeStructureInformation) => {
    setSelectedRow(bridgeStructureInformation)
    setShowDrawer(true)
  }

  const handleDelete = async (bridgeStructureInformationId: string) => {
    await projectOtherApiService<BridgeStructureInformation>().delete(model, bridgeStructureInformationId)
    refetch()
  }

  const handleClickDetail = (bridgeStructureInformation: BridgeStructureInformation) => {
    setSelectedRow(bridgeStructureInformation)
    setShowDetailDrawer(true)
  }

  const mapBridgeStructureInformationToDetailItems = (
    bridgeStructureInformation: BridgeStructureInformation,
  ): { title: string; value: string }[] => [
    {
      title: t("project.other.bridge-structure-information.details.name"),
      value: bridgeStructureInformation?.name || "N/A",
    },
    {
      title: t("project.other.bridge-structure-information.details.bridge-name"),
      value: bridgeStructureInformation?.bridge_name || "N/A",
    },
    {
      title: t("project.other.bridge-structure-information.details.bridge-structure-type-id"),
      value: bridgeStructureTypeMap.get(bridgeStructureInformation?.bridge_structure_type_id) || "N/A",
    },
    {
      title: t("project.other.bridge-structure-information.details.east-region"),
      value: bridgeStructureInformation?.east_region?.toString() || "N/A",
    },
    {
      title: t("project.other.bridge-structure-information.details.west-region"),
      value: bridgeStructureInformation?.west_region?.toString() || "N/A",
    },
    {
      title: t("project.other.bridge-structure-information.details.central-region"),
      value: bridgeStructureInformation?.central_region?.toString() || "N/A",
    },
    {
      title: t("project.other.bridge-structure-information.details.north-region"),
      value: bridgeStructureInformation?.north_region?.toString() || "N/A",
    },
    {
      title: t("project.other.bridge-structure-information.details.south-region"),
      value: bridgeStructureInformation?.south_region?.toString() || "N/A",
    },
    {
      title: t("project.other.bridge-structure-information.details.ring-road"),
      value: bridgeStructureInformation?.ring_road?.toString() || "N/A",
    },
    {
      title: t("project.other.bridge-structure-information.details.remark"),
      value: bridgeStructureInformation?.remark || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: bridgeStructureInformation?.created_at ? formatCreatedAt(bridgeStructureInformation.created_at) : "N/A",
    },
  ]

  return (
    <Box>
      {showDrawer && (
        <BridgeStructureInformationDrawer
          model={model}
          open={showDrawer}
          toggle={toggleDrawer}
          bridgeStructureInformation={selectedRow as BridgeStructureInformation}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapBridgeStructureInformationToDetailItems(selectedRow!)}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={uploadableProjectFileTypes.other.bridgeStructureInformation}
          title={t("project.other.bridge-structure-information.bridge-structure-information-details")}
        />
      )}

      <ItemsListing
        title={t("project.other.bridge-structure-information.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: bridgeStructureInformationColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            bridgeStructureTypeMap,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <BridgeStructureInformationCard
            onDetail={handleClickDetail}
            bridgeStructureInformation={data}
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
            subject: "bridgestructureinformation",
          },
        }}
        fetchDataFunction={refetch}
        items={bridgeStructureInformations || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  )
}

export default BridgeStructureInformationList

