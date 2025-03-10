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
import type { BridgeInspection } from "src/types/project/other"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import { formatCreatedAt } from "src/utils/formatter/date"
import ItemsListing from "src/views/shared/listing"
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer"
import BridgeInspectionCard from "./bridge-inspection-card"
import BridgeInspectionDrawer from "./bridge-inspection-drawer"
import { bridgeInspectionColumns } from "./bridge-inspection-row"
import { useQuery } from "@tanstack/react-query"
import bridgePartDefectMasterService from "src/services/general/project/bridge-part-defect-master-service"
import damageTypeMasterService from "src/services/general/project//damage-type-master-service"
import damageConditionMasterService from "src/services/general/project/damage-condition-master-service"
import hydrologyDefectMasterService from "src/services/general/project/hydrology-defect-master-service"

interface BridgeInspectionListProps {
  model: string
  typeId: string
  projectId: string
}

const BridgeInspectionList: React.FC<BridgeInspectionListProps> = ({ model, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false)
  const [showDetailDrawer, setShowDetailDrawer] = useState(false)
  const [selectedRow, setSelectedRow] = useState<BridgeInspection | null>(null)
  const { t } = useTranslation()

  // Fetch master data for lookups
  const { data: bridgePartDefects } = useQuery({
    queryKey: ["masterCategory", "bridgePartDefects"],
    queryFn: () => bridgePartDefectMasterService.getAll({}),
  })

  const { data: damageTypes } = useQuery({
    queryKey: ["masterCategory", "damageTypes"],
    queryFn: () => damageTypeMasterService.getAll({}),
  })

  const { data: damageConditions } = useQuery({
    queryKey: ["masterCategory", "damageConditions"],
    queryFn: () => damageConditionMasterService.getAll({}),
  })

  const { data: hydrologyDefects } = useQuery({
    queryKey: ["masterCategory", "hydrologyDefects"],
    queryFn: () => hydrologyDefectMasterService.getAll({}),
  })

  // Create lookup maps
  const bridgePartDefectMap = new Map()
  const damageTypeMap = new Map()
  const damageConditionMap = new Map()
  const hydrologyDefectMap = new Map()

  if (bridgePartDefects?.payload) {
    bridgePartDefects.payload.forEach((defect) => {
      bridgePartDefectMap.set(defect.id, defect.title)
    })
  }

  if (damageTypes?.payload) {
    damageTypes.payload.forEach((type) => {
      damageTypeMap.set(type.id, type.title)
    })
  }

  if (damageConditions?.payload) {
    damageConditions.payload.forEach((condition) => {
      damageConditionMap.set(condition.id, condition.title)
    })
  }

  if (hydrologyDefects?.payload) {
    hydrologyDefects.payload.forEach((defect) => {
      hydrologyDefectMap.set(defect.id, defect.title)
    })
  }

  const fetchBridgeInspections = (params: GetRequestParam): Promise<IApiResponse<BridgeInspection[]>> => {
    return projectOtherApiService<BridgeInspection>().getAll(model, {
      ...params,
      filter: { ...params.filter, project_id: projectId },
    })
  }

  const {
    data: bridgeInspections,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<BridgeInspection[]>({
    queryKey: ["bridgeInspections"],
    fetchFunction: fetchBridgeInspections,
  })

  const toggleDrawer = () => {
    setSelectedRow(null)
    setShowDrawer(!showDrawer)
  }

  const toggleDetailDrawer = () => {
    setSelectedRow(null)
    setShowDetailDrawer(!showDetailDrawer)
  }

  const handleEdit = (bridgeInspection: BridgeInspection) => {
    setSelectedRow(bridgeInspection)
    setShowDrawer(true)
  }

  const handleDelete = async (bridgeInspectionId: string) => {
    await projectOtherApiService<BridgeInspection>().delete(model, bridgeInspectionId)
    refetch()
  }

  const handleClickDetail = (bridgeInspection: BridgeInspection) => {
    setSelectedRow(bridgeInspection)
    setShowDetailDrawer(true)
  }

  const mapBridgeInspectionToDetailItems = (bridgeInspection: BridgeInspection): { title: string; value: string }[] => [
    { title: t("project.other.bridge-inspection.details.name"), value: bridgeInspection?.name || "N/A" },
    {
      title: t("project.other.bridge-inspection.details.bridge-name"),
      value: bridgeInspection?.bridge_name || "N/A",
    },
    {
      title: t("project.other.bridge-inspection.details.bridge-part-defect-id"),
      value: bridgePartDefectMap.get(bridgeInspection?.bridge_part_defect_id) || "N/A",
    },
    {
      title: t("project.other.bridge-inspection.details.damage-type-id"),
      value: damageTypeMap.get(bridgeInspection?.damage_type_id) || "N/A",
    },
    {
      title: t("project.other.bridge-inspection.details.damage-condition-id"),
      value: damageConditionMap.get(bridgeInspection?.damage_condition_id) || "N/A",
    },
    {
      title: t("project.other.bridge-inspection.details.hydrology-defect-id"),
      value: hydrologyDefectMap.get(bridgeInspection?.hydrology_defect_id) || "N/A",
    },
    {
      title: t("project.other.bridge-inspection.details.maintenance-action"),
      value: bridgeInspection?.maintenance_action || "N/A",
    },
    {
      title: t("project.other.bridge-inspection.details.bridge-history"),
      value: bridgeInspection?.bridge_history || "N/A",
    },
    {
      title: t("project.other.bridge-inspection.details.inspector-remark"),
      value: bridgeInspection?.inspector_remark || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: bridgeInspection?.created_at ? formatCreatedAt(bridgeInspection.created_at) : "N/A",
    },
  ]

  return (
    <Box>
      {showDrawer && (
        <BridgeInspectionDrawer
          model={model}
          open={showDrawer}
          toggle={toggleDrawer}
          bridgeInspection={selectedRow as BridgeInspection}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapBridgeInspectionToDetailItems(selectedRow!)}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={uploadableProjectFileTypes.other.bridgeInspection}
          title={t("project.other.bridge-inspection.bridge-inspection-details")}
        />
      )}

      <ItemsListing
        title={t("project.other.bridge-inspection.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: bridgeInspectionColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            bridgePartDefectMap,
            damageTypeMap,
            damageConditionMap,
            hydrologyDefectMap,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <BridgeInspectionCard
            onDetail={handleClickDetail}
            bridgeInspection={data}
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
            subject: "bridgeinspection",
          },
        }}
        fetchDataFunction={refetch}
        items={bridgeInspections || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  )
}

export default BridgeInspectionList

