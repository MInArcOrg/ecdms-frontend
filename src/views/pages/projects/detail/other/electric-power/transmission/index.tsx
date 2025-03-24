"use client"

import type React from "react"

import { Box } from "@mui/material"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants"
import usePaginatedFetch from "src/hooks/use-paginated-fetch"
import type { OtherMenuRoute } from "src/pages/projects/[typeId]/details/[id]/other/(subMenuItems)"
import projectOtherApiSecondService from "src/services/project/project-other-second-service"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import { defaultCreateActionConfig } from "src/types/general/listing"
import type { Transmission } from "src/types/project/other"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import { formatCreatedAt } from "src/utils/formatter/date"
import ItemsListing from "src/views/shared/listing"
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer"
import TransmissionCard from "./transmission-card"
import TransmissionDrawer from "./transmission-drawer"
import { transmissionColumns } from "./transmission-row"

interface TransmissionListProps {
  otherSubMenu?: OtherMenuRoute
  typeId: string
  projectId: string
}

const TransmissionList: React.FC<TransmissionListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false)
  const [showDetailDrawer, setShowDetailDrawer] = useState(false)
  const [selectedRow, setSelectedRow] = useState<Transmission | null>(null)
  const { t } = useTranslation()

  const fetchTransmissions = (params: GetRequestParam): Promise<IApiResponse<Transmission[]>> => {
    return projectOtherApiSecondService<Transmission>().getAll(otherSubMenu?.apiRoute || "", {
      ...params,
      filter: { ...params.filter, project_id: projectId },
    })
  }

  const {
    data: transmissions,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<Transmission[]>({
    queryKey: ["transmissions"],
    fetchFunction: fetchTransmissions,
  })

  const toggleDrawer = () => {
    setSelectedRow({} as Transmission)
    setShowDrawer(!showDrawer)
  }

  const toggleDetailDrawer = () => {
    setSelectedRow({} as Transmission)
    setShowDetailDrawer(!showDetailDrawer)
  }

  const handleEdit = (transmission: Transmission) => {
    toggleDrawer()
    setSelectedRow(transmission)
  }

  const handleDelete = async (transmissionId: string) => {
    await projectOtherApiSecondService<Transmission>().delete(otherSubMenu?.apiRoute || "", transmissionId)
    refetch()
  }

  const handleClickDetail = (transmission: Transmission) => {
    toggleDetailDrawer()
    setSelectedRow(transmission)
  }

  const mapTransmissionToDetailItems = (transmission: Transmission): { title: string; value: string }[] => [
    {
      title: t("project.other.transmission.details.transmission-voltage"),
      value: transmission?.transmission_voltage !== undefined 
        ? `${transmission.transmission_voltage} ${t("common.kv")}` 
        : "N/A",
    },
    {
      title: t("project.other.transmission.details.distance-to-substation"),
      value: transmission?.distance_to_substation !== undefined 
        ? `${transmission.distance_to_substation} ${t("common.kilometers")}` 
        : "N/A",
    },
    {
      title: t("project.other.transmission.details.transmission-lines-number"),
      value: transmission?.transmission_lines_number !== undefined 
        ? transmission.transmission_lines_number.toString() 
        : "N/A",
    },
    {
      title: t("project.other.transmission.details.remark"),
      value: transmission?.remark || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: transmission?.created_at ? formatCreatedAt(transmission.created_at) : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: transmission?.updated_at ? formatCreatedAt(transmission.updated_at) : "N/A",
    },
  ]

  return (
    <Box>
      {showDrawer && (
        <TransmissionDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          transmission={selectedRow as Transmission}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapTransmissionToDetailItems(selectedRow as Transmission)}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={uploadableProjectFileTypes.other.transmission}
          title={t("project.other.transmission.transmission-details")}
        />
      )}

      <ItemsListing
        title={t("project.other.transmission.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: transmissionColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <TransmissionCard
            onDetail={handleClickDetail}
            transmission={data}
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
            subject: "transmission",
          },
        }}
        fetchDataFunction={refetch}
        items={transmissions || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  )
}

export default TransmissionList