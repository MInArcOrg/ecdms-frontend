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
import type { SegmentGeometry } from "src/types/project/other"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import { formatCreatedAt } from "src/utils/formatter/date"
import ItemsListing from "src/views/shared/listing"
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer"
import SegmentGeometryCard from "./segment-geometry-card"
import SegmentGeometryDrawer from "./segment-geometry-drawer"
import { segmentGeometryColumns } from "./segment-geometry-row"
import { useQuery } from "@tanstack/react-query"
import crossSectionTypeMasterService from "src/services/general/project/cross-section-type-master-service"

interface SegmentGeometryListProps {
  model: string
  typeId: string
  projectId: string
}

const SegmentGeometryList: React.FC<SegmentGeometryListProps> = ({ model, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false)
  const [showDetailDrawer, setShowDetailDrawer] = useState(false)
  const [selectedRow, setSelectedRow] = useState<SegmentGeometry | null>(null)
  const { t } = useTranslation()

  // Fetch master data for lookups
  const { data: crossSectionTypes } = useQuery({
    queryKey: ["masterCategory", "crossSectionTypes"],
    queryFn: () => crossSectionTypeMasterService.getAll({}),
  })

  // Create lookup maps
  const crossSectionTypeMap = new Map()

  if (crossSectionTypes?.payload) {
    crossSectionTypes.payload.forEach((type) => {
      crossSectionTypeMap.set(type.id, type.title)
    })
  }

  const fetchSegmentGeometries = (params: GetRequestParam): Promise<IApiResponse<SegmentGeometry[]>> => {
    return projectOtherApiService<SegmentGeometry>().getAll(model, {
      ...params,
      filter: { ...params.filter, project_id: projectId },
    })
  }

  const {
    data: segmentGeometries,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<SegmentGeometry[]>({
    queryKey: ["segmentGeometries"],
    fetchFunction: fetchSegmentGeometries,
  })

  const toggleDrawer = () => {
    setSelectedRow(null)
    setShowDrawer(!showDrawer)
  }

  const toggleDetailDrawer = () => {
    setSelectedRow(null)
    setShowDetailDrawer(!showDetailDrawer)
  }

  const handleEdit = (segmentGeometry: SegmentGeometry) => {
    setSelectedRow(segmentGeometry)
    setShowDrawer(true)
  }

  const handleDelete = async (segmentGeometryId: string) => {
    await projectOtherApiService<SegmentGeometry>().delete(model, segmentGeometryId)
    refetch()
  }

  const handleClickDetail = (segmentGeometry: SegmentGeometry) => {
    setSelectedRow(segmentGeometry)
    setShowDetailDrawer(true)
  }

  const mapSegmentGeometryToDetailItems = (segmentGeometry: SegmentGeometry): { title: string; value: string }[] => [
    { title: t("project.other.segment-geometry.details.name"), value: segmentGeometry?.name || "N/A" },
    {
      title: t("project.other.segment-geometry.details.cross-section-type-id"),
      value: crossSectionTypeMap.get(segmentGeometry?.cross_section_type_id) || "N/A",
    },
    {
      title: t("project.other.segment-geometry.details.carriage-way-width"),
      value: segmentGeometry?.carriage_way_width?.toString() || "N/A",
    },
    {
      title: t("project.other.segment-geometry.details.lane-width"),
      value: segmentGeometry?.lane_width?.toString() || "N/A",
    },
    {
      title: t("project.other.segment-geometry.details.shoulder-width"),
      value: segmentGeometry?.shoulder_width?.toString() || "N/A",
    },
    {
      title: t("project.other.segment-geometry.details.grade-percentage"),
      value: segmentGeometry?.grade_percentage?.toString() || "N/A",
    },
    {
      title: t("project.other.segment-geometry.details.elevation-change"),
      value: segmentGeometry?.elevation_change?.toString() || "N/A",
    },
    {
      title: t("project.other.segment-geometry.details.cross-slope-percentage"),
      value: segmentGeometry?.cross_slope_percentage?.toString() || "N/A",
    },
    {
      title: t("project.other.segment-geometry.details.property-access-control"),
      value: segmentGeometry?.property_access_control ? t("common.yes") : t("common.no"),
    },
    {
      title: t("project.other.segment-geometry.details.similar-for-all-lane"),
      value: segmentGeometry?.similar_for_all_lane ? t("common.yes") : t("common.no"),
    },
    {
      title: t("common.table-columns.created-at"),
      value: segmentGeometry?.created_at ? formatCreatedAt(segmentGeometry.created_at) : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: segmentGeometry?.updated_at ? formatCreatedAt(segmentGeometry.updated_at) : "N/A",
    },
  ]

  return (
    <Box>
      {showDrawer && (
        <SegmentGeometryDrawer
          model={model}
          open={showDrawer}
          toggle={toggleDrawer}
          segmentGeometry={selectedRow as SegmentGeometry}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapSegmentGeometryToDetailItems(selectedRow!)}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={uploadableProjectFileTypes.other.segmentGeometry}
          title={t("project.other.segment-geometry.segment-geometry-details")}
        />
      )}

      <ItemsListing
        title={t("project.other.segment-geometry.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: segmentGeometryColumns(handleClickDetail, handleEdit, handleDelete, t, refetch, crossSectionTypeMap),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <SegmentGeometryCard
            onDetail={handleClickDetail}
            segmentGeometry={data}
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
            subject: "segmentgeometry",
          },
        }}
        fetchDataFunction={refetch}
        items={segmentGeometries || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  )
}

export default SegmentGeometryList

