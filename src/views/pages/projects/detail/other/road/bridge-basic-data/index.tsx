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
import type { BridgeBasicData } from "src/types/project/other"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import { formatCreatedAt } from "src/utils/formatter/date"
import ItemsListing from "src/views/shared/listing"
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer"
import BridgeBasicDataCard from "./bridge-basic-data-card"
import BridgeBasicDataDrawer from "./bridge-basic-data-drawer"
import { bridgeBasicDataColumns } from "./bridge-basic-data-row"

interface BridgeBasicDataListProps {
  model: string
  typeId: string
  projectId: string
}

const BridgeBasicDataList: React.FC<BridgeBasicDataListProps> = ({ model, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false)
  const [showDetailDrawer, setShowDetailDrawer] = useState(false)
  const [selectedRow, setSelectedRow] = useState<BridgeBasicData | null>(null)
  const { t } = useTranslation()

  const fetchBridgeBasicData = (params: GetRequestParam): Promise<IApiResponse<BridgeBasicData[]>> => {
    return projectOtherApiService<BridgeBasicData>().getAll(model, {
      ...params,
      filter: { ...params.filter, project_id: projectId },
    })
  }

  const {
    data: bridgeBasicData,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<BridgeBasicData[]>({
    queryKey: ["bridgeBasicData"],
    fetchFunction: fetchBridgeBasicData,
  })

  const toggleDrawer = () => {
    setSelectedRow(null)
    setShowDrawer(!showDrawer)
  }

  const toggleDetailDrawer = () => {
    setSelectedRow(null)
    setShowDetailDrawer(!showDetailDrawer)
  }

  const handleEdit = (bridgeBasicData: BridgeBasicData) => {
    setSelectedRow(bridgeBasicData)
    setShowDrawer(true)
  }

  const handleDelete = async (bridgeBasicDataId: string) => {
    await projectOtherApiService<BridgeBasicData>().delete(model, bridgeBasicDataId)
    refetch()
  }

  const handleClickDetail = (bridgeBasicData: BridgeBasicData) => {
    setSelectedRow(bridgeBasicData)
    setShowDetailDrawer(true)
  }

  const mapBridgeBasicDataToDetailItems = (bridgeBasicData: BridgeBasicData): { title: string; value: string }[] => [
    { title: t("project.other.bridge-basic-data.details.name"), value: bridgeBasicData?.name || "N/A" },
    { title: t("project.other.bridge-basic-data.details.bridge-name"), value: bridgeBasicData?.bridge_name || "N/A" },
    {
      title: t("project.other.bridge-basic-data.details.bridge-number"),
      value: bridgeBasicData?.bridge_number || "N/A",
    },
    {
      title: t("project.other.bridge-basic-data.details.bridge-length"),
      value: bridgeBasicData?.bridge_length?.toString() || "N/A",
    },
    {
      title: t("project.other.bridge-basic-data.details.bridge-width"),
      value: bridgeBasicData?.bridge_width?.toString() || "N/A",
    },
    {
      title: t("project.other.bridge-basic-data.details.construction-year"),
      value: bridgeBasicData?.construction_year?.toString() || "N/A",
    },
    { title: t("project.other.bridge-basic-data.details.contractor"), value: bridgeBasicData?.contractor || "N/A" },
    { title: t("project.other.bridge-basic-data.details.designer"), value: bridgeBasicData?.designer || "N/A" },
    {
      title: t("project.other.bridge-basic-data.details.bridge-cost"),
      value: bridgeBasicData?.bridge_cost?.toString() || "N/A",
    },
    {
      title: t("project.other.bridge-basic-data.details.land-capacity"),
      value: bridgeBasicData?.land_capacity?.toString() || "N/A",
    },
    {
      title: t("project.other.bridge-basic-data.details.average-daily-traffic"),
      value: bridgeBasicData?.average_daily_traffic?.toString() || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: bridgeBasicData?.created_at ? formatCreatedAt(bridgeBasicData.created_at) : "N/A",
    },
  ]

  return (
    <Box>
      {showDrawer && (
        <BridgeBasicDataDrawer
          model={model}
          open={showDrawer}
          toggle={toggleDrawer}
          bridgeBasicData={selectedRow as BridgeBasicData}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapBridgeBasicDataToDetailItems(selectedRow!)}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={uploadableProjectFileTypes.other.bridgeBasicData}
          title={t("project.other.bridge-basic-data.bridge-basic-data-details")}
        />
      )}

      <ItemsListing
        title={t("project.other.bridge-basic-data.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: bridgeBasicDataColumns(handleClickDetail, handleEdit, handleDelete, t, refetch),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <BridgeBasicDataCard
            onDetail={handleClickDetail}
            bridgeBasicData={data}
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
            subject: "bridgebasicdata",
          },
        }}
        fetchDataFunction={refetch}
        items={bridgeBasicData || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  )
}

export default BridgeBasicDataList

