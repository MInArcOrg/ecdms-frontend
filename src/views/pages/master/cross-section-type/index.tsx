"use client"

import type React from "react"

import { Box } from "@mui/material"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants"
import usePaginatedFetch from "src/hooks/use-paginated-fetch"
import crossSectionTypeApiService from "src/services/master-data/cross-section-type-service"
import masterTypeApiService from "src/services/master-data/master-type-service"
import { defaultCreateActionConfig } from "src/types/general/listing"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import { formatCreatedAt } from "src/utils/formatter/date"
import ItemsListing from "src/views/shared/listing"
import OtherDetailSidebar from "src/views/shared/layouts/other/other-detail-drawer"
import CrossSectionTypeCard from "./cross-section-type-card"
import CrossSectionTypeDrawer from "./cross-section-type-drawer"
import type { CrossSectionType } from "src/types/master/cross-section-type"
import { crossSectionTypeColumns } from "./cross-section-type-row"

const CrossSectionTypeList: React.FC = () => {
  const [showDrawer, setShowDrawer] = useState(false)
  const [showDetailDrawer, setShowDetailDrawer] = useState(false)
  const [selectedRow, setSelectedRow] = useState<CrossSectionType | null>(null)
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

  const fetchCrossSectionTypes = (params: GetRequestParam): Promise<IApiResponse<CrossSectionType[]>> => {
    return crossSectionTypeApiService.getAll(params)
  }

  const {
    data: crossSectionTypes,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<CrossSectionType[]>({
    queryKey: ["crossSectionTypes"],
    fetchFunction: fetchCrossSectionTypes,
  })

  const toggleDrawer = () => {
    setSelectedRow({} as CrossSectionType)
    setShowDrawer(!showDrawer)
  }

  const toggleDetailDrawer = () => {
    setSelectedRow({} as CrossSectionType)
    setShowDetailDrawer(!showDetailDrawer)
  }

  const handleEdit = (crossSectionType: CrossSectionType) => {
    toggleDrawer()
    setSelectedRow(crossSectionType)
  }

  const handleDelete = async (crossSectionTypeId: string) => {
    await crossSectionTypeApiService.delete(crossSectionTypeId)
    refetch()
  }

  const handleClickDetail = (crossSectionType: CrossSectionType) => {
    toggleDetailDrawer()
    setSelectedRow(crossSectionType)
  }

  const mapCrossSectionTypeToDetailItems = (crossSectionType: CrossSectionType): { title: string; value: string }[] => {
    const projectType = projectTypes.find((type) => type.value === crossSectionType.project_type_id)
    return [
      { title: t("master.cross-section-type.title"), value: crossSectionType?.title || "N/A" },
      { title: t("master.cross-section-type.description"), value: crossSectionType?.description || "N/A" },
      {
        title: t("master.cross-section-type.project-type"),
        value: projectType ? projectType.label : "N/A",
      },
      {
        title: t("common.table-columns.created-at"),
        value: crossSectionType?.created_at ? formatCreatedAt(crossSectionType.created_at) : "N/A",
      },
    ]
  }

  return (
    <Box>
      {showDrawer && (
        <CrossSectionTypeDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          refetch={refetch}
          crossSectionType={selectedRow as CrossSectionType}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapCrossSectionTypeToDetailItems(selectedRow as CrossSectionType)}
          id={selectedRow?.id || ""}
          hasReference={true}
          fileType="CROSS_SECTION_TYPE"
          title={t("master.cross-section-type.details")}
        />
      )}

      <ItemsListing
        title={t("master.cross-section-type.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: crossSectionTypeColumns(handleClickDetail, handleEdit, handleDelete, t, projectTypes),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <CrossSectionTypeCard
            onDetail={handleClickDetail}
            crossSectionType={data}
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
            subject: "crosssectiontype",
          },
        }}
        fetchDataFunction={refetch}
        items={crossSectionTypes || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  )
}

export default CrossSectionTypeList

