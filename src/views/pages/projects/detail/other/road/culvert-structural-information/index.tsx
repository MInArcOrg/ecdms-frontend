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
import type { CulvertStructuralInformation } from "src/types/project/other"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import { formatCreatedAt } from "src/utils/formatter/date"
import ItemsListing from "src/views/shared/listing"
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer"
import CulvertStructuralInformationCard from "./culvert-structural-information-card"
import CulvertStructuralInformationDrawer from "./culvert-structural-information-drawer"
import { culvertStructuralInformationColumns } from "./culvert-structural-information-row"
import { useQuery } from "@tanstack/react-query"
import pierTypeMasterService from "src/services/general/project/pier-type-master-service"
import abutmentTypeMasterService from "src/services/general/project/abutment-type-master-service"
import endwallTypeMasterService from "src/services/general/project/endwall-type-inlet-master-service"
import pavedWaterWayTypeMasterService from "src/services/general/project/paved-water-way-type-master-service"
import soilTypeMasterService from "src/services/general/project/soil-type-master-service"

interface CulvertStructuralInformationListProps {
  model: string
  typeId: string
  projectId: string
}

const CulvertStructuralInformationList: React.FC<CulvertStructuralInformationListProps> = ({
  model,
  projectId,
  typeId,
}) => {
  const [showDrawer, setShowDrawer] = useState(false)
  const [showDetailDrawer, setShowDetailDrawer] = useState(false)
  const [selectedRow, setSelectedRow] = useState<CulvertStructuralInformation | null>(null)
  const { t } = useTranslation()

  // Fetch master data for lookups
  const { data: pierTypes } = useQuery({
    queryKey: ["masterCategory", "pierTypes"],
    queryFn: () => pierTypeMasterService.getAll({}),
  })

  const { data: abutmentTypes } = useQuery({
    queryKey: ["masterCategory", "abutmentTypes"],
    queryFn: () => abutmentTypeMasterService.getAll({}),
  })

  const { data: endwallTypes } = useQuery({
    queryKey: ["masterCategory", "endwallTypes"],
    queryFn: () => endwallTypeMasterService.getAll({}),
  })

  const { data: pavedWaterWayTypes } = useQuery({
    queryKey: ["masterCategory", "pavedWaterWayTypes"],
    queryFn: () => pavedWaterWayTypeMasterService.getAll({}),
  })

  const { data: soilTypes } = useQuery({
    queryKey: ["masterCategory", "soilTypes"],
    queryFn: () => soilTypeMasterService.getAll({}),
  })

  // Create lookup maps
  const pierTypeMap = new Map()
  const abutmentTypeMap = new Map()
  const endwallTypeMap = new Map()
  const pavedWaterWayTypeMap = new Map()
  const soilTypeMap = new Map()

  if (pierTypes?.payload) {
    pierTypes.payload.forEach((type) => {
      pierTypeMap.set(type.id, type.title)
    })
  }

  if (abutmentTypes?.payload) {
    abutmentTypes.payload.forEach((type) => {
      abutmentTypeMap.set(type.id, type.title)
    })
  }

  if (endwallTypes?.payload) {
    endwallTypes.payload.forEach((type) => {
      endwallTypeMap.set(type.id, type.title)
    })
  }

  if (pavedWaterWayTypes?.payload) {
    pavedWaterWayTypes.payload.forEach((type) => {
      pavedWaterWayTypeMap.set(type.id, type.title)
    })
  }

  if (soilTypes?.payload) {
    soilTypes.payload.forEach((type) => {
      soilTypeMap.set(type.id, type.title)
    })
  }

  const fetchCulvertStructuralInformation = (
    params: GetRequestParam,
  ): Promise<IApiResponse<CulvertStructuralInformation[]>> => {
    return projectOtherApiService<CulvertStructuralInformation>().getAll(model, {
      ...params,
      filter: { ...params.filter, project_id: projectId },
    })
  }

  const {
    data: culvertStructuralInformation,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<CulvertStructuralInformation[]>({
    queryKey: ["culvertStructuralInformation"],
    fetchFunction: fetchCulvertStructuralInformation,
  })

  const toggleDrawer = () => {
    setSelectedRow(null)
    setShowDrawer(!showDrawer)
  }

  const toggleDetailDrawer = () => {
    setSelectedRow(null)
    setShowDetailDrawer(!showDetailDrawer)
  }

  const handleEdit = (culvertStructuralInformation: CulvertStructuralInformation) => {
    setSelectedRow(culvertStructuralInformation)
    setShowDrawer(true)
  }

  const handleDelete = async (culvertStructuralInformationId: string) => {
    await projectOtherApiService<CulvertStructuralInformation>().delete(model, culvertStructuralInformationId)
    refetch()
  }

  const handleClickDetail = (culvertStructuralInformation: CulvertStructuralInformation) => {
    setSelectedRow(culvertStructuralInformation)
    setShowDetailDrawer(true)
  }

  const mapCulvertStructuralInformationToDetailItems = (
    culvertStructuralInformation: CulvertStructuralInformation,
  ): { title: string; value: string }[] => [
    {
      title: t("project.other.culvert-structural-information.details.name"),
      value: culvertStructuralInformation?.name || "N/A",
    },
    {
      title: t("project.other.culvert-structural-information.details.culvert-type"),
      value: culvertStructuralInformation?.culvert_type || "N/A",
    },
    {
      title: t("project.other.culvert-structural-information.details.culvert-barrel-length"),
      value: culvertStructuralInformation?.culvert_barrel_length?.toString() || "N/A",
    },
    {
      title: t("project.other.culvert-structural-information.details.culvert-height"),
      value: culvertStructuralInformation?.culvert_height?.toString() || "N/A",
    },
    {
      title: t("project.other.culvert-structural-information.details.opening-number"),
      value: culvertStructuralInformation?.opening_number?.toString() || "N/A",
    },
    {
      title: t("project.other.culvert-structural-information.details.opening-width"),
      value: culvertStructuralInformation?.opening_width?.toString() || "N/A",
    },
    {
      title: t("project.other.culvert-structural-information.details.total-culvert-width"),
      value: culvertStructuralInformation?.total_culvert_width?.toString() || "N/A",
    },
    {
      title: t("project.other.culvert-structural-information.details.distance-between-barrels"),
      value: culvertStructuralInformation?.distance_between_barrels?.toString() || "N/A",
    },
    {
      title: t("project.other.culvert-structural-information.details.head-wall-length"),
      value: culvertStructuralInformation?.head_wall_length?.toString() || "N/A",
    },
    {
      title: t("project.other.culvert-structural-information.details.pier-type-id"),
      value: pierTypeMap.get(culvertStructuralInformation?.pier_type_id) || "N/A",
    },
    {
      title: t("project.other.culvert-structural-information.details.pier-height"),
      value: culvertStructuralInformation?.pier_height?.toString() || "N/A",
    },
    {
      title: t("project.other.culvert-structural-information.details.abutment-type-id"),
      value: abutmentTypeMap.get(culvertStructuralInformation?.abutment_type_id) || "N/A",
    },
    {
      title: t("project.other.culvert-structural-information.details.abutment-average-height"),
      value: culvertStructuralInformation?.abutment_average_height?.toString() || "N/A",
    },
    {
      title: t("project.other.culvert-structural-information.details.endwall-type-inlet-id"),
      value: endwallTypeMap.get(culvertStructuralInformation?.endwall_type_inlet_id) || "N/A",
    },
    {
      title: t("project.other.culvert-structural-information.details.endwall-type-outlet-id"),
      value: endwallTypeMap.get(culvertStructuralInformation?.endwall_type_outlet_id) || "N/A",
    },
    {
      title: t("project.other.culvert-structural-information.details.wingwall-average-length"),
      value: culvertStructuralInformation?.wingwall_average_length?.toString() || "N/A",
    },
    {
      title: t("project.other.culvert-structural-information.details.paved-water-way-type-id"),
      value: pavedWaterWayTypeMap.get(culvertStructuralInformation?.paved_water_way_type_id) || "N/A",
    },
    {
      title: t("project.other.culvert-structural-information.details.soil-type-id"),
      value: soilTypeMap.get(culvertStructuralInformation?.soil_type_id) || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: culvertStructuralInformation?.created_at
        ? formatCreatedAt(culvertStructuralInformation.created_at)
        : "N/A",
    },
  ]

  return (
    <Box>
      {showDrawer && (
        <CulvertStructuralInformationDrawer
          model={model}
          open={showDrawer}
          toggle={toggleDrawer}
          culvertStructuralInformation={selectedRow as CulvertStructuralInformation}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapCulvertStructuralInformationToDetailItems(selectedRow!)}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={uploadableProjectFileTypes.other.culvertStructuralInformation}
          title={t("project.other.culvert-structural-information.culvert-structural-information-details")}
        />
      )}

      <ItemsListing
        title={t("project.other.culvert-structural-information.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: culvertStructuralInformationColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            pierTypeMap,
            abutmentTypeMap,
            endwallTypeMap,
            pavedWaterWayTypeMap,
            soilTypeMap,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <CulvertStructuralInformationCard
            onDetail={handleClickDetail}
            culvertStructuralInformation={data}
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
            subject: "culvertstructuralinformation",
          },
        }}
        fetchDataFunction={refetch}
        items={culvertStructuralInformation || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  )
}

export default CulvertStructuralInformationList

