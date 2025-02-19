"use client"

import type React from "react"

import { Box } from "@mui/material"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants"
import usePaginatedFetch from "src/hooks/use-paginated-fetch"
import designTrafficFlowApiService from "src/services/master-data/design-traffic-flow-service"
import masterTypeApiService from "src/services/master-data/master-type-service"
import { defaultCreateActionConfig } from "src/types/general/listing"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import { formatCreatedAt } from "src/utils/formatter/date"
import ItemsListing from "src/views/shared/listing"
import OtherDetailSidebar from "src/views/shared/layouts/other/other-detail-drawer"
import DesignTrafficFlowCard from "./design-traffic-flow-card"
import DesignTrafficFlowDrawer from "./design-traffic-flow-drawer"
import type { DesignTrafficFlow } from "src/types/master/design-traffic-flow"
import { designTrafficFlowColumns } from "./design-traffic-flow-row"

const DesignTrafficFlowList: React.FC = () => {
  const [showDrawer, setShowDrawer] = useState(false)
  const [showDetailDrawer, setShowDetailDrawer] = useState(false)
  const [selectedRow, setSelectedRow] = useState<DesignTrafficFlow | null>(null)
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

  const fetchDesignTrafficFlows = (params: GetRequestParam): Promise<IApiResponse<DesignTrafficFlow[]>> => {
    return designTrafficFlowApiService.getAll(params)
  }

  const {
    data: designTrafficFlows,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<DesignTrafficFlow[]>({
    queryKey: ["designTrafficFlows"],
    fetchFunction: fetchDesignTrafficFlows,
  })

  const toggleDrawer = () => {
    setSelectedRow({} as DesignTrafficFlow)
    setShowDrawer(!showDrawer)
  }

  const toggleDetailDrawer = () => {
    setSelectedRow({} as DesignTrafficFlow)
    setShowDetailDrawer(!showDetailDrawer)
  }

  const handleEdit = (designTrafficFlow: DesignTrafficFlow) => {
    toggleDrawer()
    setSelectedRow(designTrafficFlow)
  }

  const handleDelete = async (designTrafficFlowId: string) => {
    await designTrafficFlowApiService.delete(designTrafficFlowId)
    refetch()
  }

  const handleClickDetail = (designTrafficFlow: DesignTrafficFlow) => {
    toggleDetailDrawer()
    setSelectedRow(designTrafficFlow)
  }

  const mapDesignTrafficFlowToDetailItems = (
    designTrafficFlow: DesignTrafficFlow,
  ): { title: string; value: string }[] => {
    const projectType = projectTypes.find((type) => type.value === designTrafficFlow.project_type_id)
    return [
      { title: t("master-data.design-traffic-flow.title"), value: designTrafficFlow?.title || "N/A" },
      { title: t("master-data.design-traffic-flow.description"), value: designTrafficFlow?.description || "N/A" },
      {
        title: t("master-data.design-traffic-flow.project-type"),
        value: projectType ? projectType.label : "N/A",
      },
      {
        title: t("common.table-columns.created-at"),
        value: designTrafficFlow?.created_at ? formatCreatedAt(designTrafficFlow.created_at) : "N/A",
      },
    ]
  }

  return (
    <Box>
      {showDrawer && (
        <DesignTrafficFlowDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          refetch={refetch}
          designTrafficFlow={selectedRow as DesignTrafficFlow}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapDesignTrafficFlowToDetailItems(selectedRow as DesignTrafficFlow)}
          id={selectedRow?.id || ""}
          hasReference={true}
          fileType="DESIGN_TRAFFIC_FLOW"
          title={t("master-data.design-traffic-flow.details")}
        />
      )}

      <ItemsListing
        title={t("master-data.design-traffic-flow.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: designTrafficFlowColumns(handleClickDetail, handleEdit, handleDelete, t, projectTypes),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <DesignTrafficFlowCard
            onDetail={handleClickDetail}
            designTrafficFlow={data}
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
            subject: "designtrafficflow",
          },
        }}
        fetchDataFunction={refetch}
        items={designTrafficFlows || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  )
}

export default DesignTrafficFlowList

