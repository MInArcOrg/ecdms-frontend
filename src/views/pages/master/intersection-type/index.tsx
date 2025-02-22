"use client"

import type React from "react"

import { Box } from "@mui/material"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants"
import usePaginatedFetch from "src/hooks/use-paginated-fetch"
import intersectionTypeApiService from "src/services/master-data/intersection-type-service"
import masterTypeApiService from "src/services/master-data/master-type-service"
import { defaultCreateActionConfig } from "src/types/general/listing"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import { formatCreatedAt } from "src/utils/formatter/date"
import ItemsListing from "src/views/shared/listing"
import OtherDetailSidebar from "src/views/shared/layouts/other/other-detail-drawer"
import IntersectionTypeCard from "./intersection-type-card"
import IntersectionTypeDrawer from "./intersection-type-drawer"
import type { IntersectionType } from "src/types/master/intersection-type"
import { intersectionTypeColumns } from "./intersection-type-row"

const IntersectionTypeList: React.FC = () => {
  const [showDrawer, setShowDrawer] = useState(false)
  const [showDetailDrawer, setShowDetailDrawer] = useState(false)
  const [selectedRow, setSelectedRow] = useState<IntersectionType | null>(null)
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

  const fetchIntersectionTypes = (params: GetRequestParam): Promise<IApiResponse<IntersectionType[]>> => {
    return intersectionTypeApiService.getAll(params)
  }

  const {
    data: intersectionTypes,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<IntersectionType[]>({
    queryKey: ["intersectionTypes"],
    fetchFunction: fetchIntersectionTypes,
  })

  const toggleDrawer = () => {
    setSelectedRow({} as IntersectionType)
    setShowDrawer(!showDrawer)
  }

  const toggleDetailDrawer = () => {
    setSelectedRow({} as IntersectionType)
    setShowDetailDrawer(!showDetailDrawer)
  }

  const handleEdit = (intersectionType: IntersectionType) => {
    toggleDrawer()
    setSelectedRow(intersectionType)
  }

  const handleDelete = async (intersectionTypeId: string) => {
    await intersectionTypeApiService.delete(intersectionTypeId)
    refetch()
  }

  const handleClickDetail = (intersectionType: IntersectionType) => {
    toggleDetailDrawer()
    setSelectedRow(intersectionType)
  }

  const mapIntersectionTypeToDetailItems = (intersectionType: IntersectionType): { title: string; value: string }[] => {
    const projectType = projectTypes.find((type) => type.value === intersectionType.project_type_id)
    return [
      { title: t("master-data.intersection-type.title"), value: intersectionType?.title || "N/A" },
      { title: t("master-data.intersection-type.description"), value: intersectionType?.description || "N/A" },
      {
        title: t("master-data.intersection-type.project-type"),
        value: projectType ? projectType.label : "N/A",
      },
      {
        title: t("common.table-columns.created-at"),
        value: intersectionType?.created_at ? formatCreatedAt(intersectionType.created_at) : "N/A",
      },
    ]
  }

  return (
    <Box>
      {showDrawer && (
        <IntersectionTypeDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          refetch={refetch}
          intersectionType={selectedRow as IntersectionType}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapIntersectionTypeToDetailItems(selectedRow as IntersectionType)}
          id={selectedRow?.id || ""}
          hasReference={true}
          fileType="INTERSECTION_TYPE"
          title={t("master-data.intersection-type.details")}
        />
      )}

      <ItemsListing
        title={t("master-data.intersection-type.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: intersectionTypeColumns(handleClickDetail, handleEdit, handleDelete, t, projectTypes),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <IntersectionTypeCard
            onDetail={handleClickDetail}
            intersectionType={data}
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
            subject: "intersectiontype",
          },
        }}
        fetchDataFunction={refetch}
        items={intersectionTypes || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  )
}

export default IntersectionTypeList

