"use client"

import type React from "react"

import { Box } from "@mui/material"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants"
import usePaginatedFetch from "src/hooks/use-paginated-fetch"
import designStandardApiService from "src/services/master-data/design-standard-service"
import masterTypeApiService from "src/services/master-data/master-type-service"
import { defaultCreateActionConfig } from "src/types/general/listing"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import { formatCreatedAt } from "src/utils/formatter/date"
import ItemsListing from "src/views/shared/listing"
import OtherDetailSidebar from "src/views/shared/layouts/other/other-detail-drawer"
import DesignStandardCard from "./design-standard-card"
import DesignStandardDrawer from "./design-standard-drawer"
import type { DesignStandard } from "src/types/master/design-standard"
import { designStandardColumns } from "./design-standard-row"

const DesignStandardList: React.FC = () => {
  const [showDrawer, setShowDrawer] = useState(false)
  const [showDetailDrawer, setShowDetailDrawer] = useState(false)
  const [selectedRow, setSelectedRow] = useState<DesignStandard | null>(null)
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

  const fetchDesignStandards = (params: GetRequestParam): Promise<IApiResponse<DesignStandard[]>> => {
    return designStandardApiService.getAll(params)
  }

  const {
    data: designStandards,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<DesignStandard[]>({
    queryKey: ["designStandards"],
    fetchFunction: fetchDesignStandards,
  })

  const toggleDrawer = () => {
    setSelectedRow({} as DesignStandard)
    setShowDrawer(!showDrawer)
  }

  const toggleDetailDrawer = () => {
    setSelectedRow({} as DesignStandard)
    setShowDetailDrawer(!showDetailDrawer)
  }

  const handleEdit = (designStandard: DesignStandard) => {
    toggleDrawer()
    setSelectedRow(designStandard)
  }

  const handleDelete = async (designStandardId: string) => {
    await designStandardApiService.delete(designStandardId)
    refetch()
  }

  const handleClickDetail = (designStandard: DesignStandard) => {
    toggleDetailDrawer()
    setSelectedRow(designStandard)
  }

  const mapDesignStandardToDetailItems = (designStandard: DesignStandard): { title: string; value: string }[] => {
    const projectType = projectTypes.find((type) => type.value === designStandard.project_type_id)
    return [
      { title: t("master-data.design-standard.title"), value: designStandard?.title || "N/A" },
      { title: t("master-data.design-standard.description"), value: designStandard?.description || "N/A" },
      {
        title: t("master-data.design-standard.project-type"),
        value: projectType ? projectType.label : "N/A",
      },
      {
        title: t("common.table-columns.created-at"),
        value: designStandard?.created_at ? formatCreatedAt(designStandard.created_at) : "N/A",
      },
    ]
  }

  return (
    <Box>
      {showDrawer && (
        <DesignStandardDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          refetch={refetch}
          designStandard={selectedRow as DesignStandard}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapDesignStandardToDetailItems(selectedRow as DesignStandard)}
          id={selectedRow?.id || ""}
          hasReference={true}
          fileType="DESIGN_STANDARD"
          title={t("master-data.design-standard.details")}
        />
      )}

      <ItemsListing
        title={t("master-data.design-standard.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: designStandardColumns(handleClickDetail, handleEdit, handleDelete, t, projectTypes),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <DesignStandardCard
            onDetail={handleClickDetail}
            designStandard={data}
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
            subject: "designstandard",
          },
        }}
        fetchDataFunction={refetch}
        items={designStandards || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  )
}

export default DesignStandardList

