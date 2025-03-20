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
import type { SolarResourceInformation } from "src/types/project/other"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import { formatCreatedAt } from "src/utils/formatter/date"
import ItemsListing from "src/views/shared/listing"
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer"
import SolarResourceInformationCard from "./solar-resource-information-card"
import SolarResourceInformationDrawer from "./solar-resource-information-drawer"
import { solarResourceInformationColumns } from "./solar-resource-information-row"

interface SolarResourceInformationListProps {
  otherSubMenu?: OtherMenuRoute
  typeId: string
  projectId: string
}

const SolarResourceInformationList: React.FC<SolarResourceInformationListProps> = ({
  otherSubMenu,
  projectId,
  typeId,
}) => {
  const [showDrawer, setShowDrawer] = useState(false)
  const [showDetailDrawer, setShowDetailDrawer] = useState(false)
  const [selectedRow, setSelectedRow] = useState<SolarResourceInformation | null>(null)
  const { t } = useTranslation()

  const fetchSolarResourceInformations = (
    params: GetRequestParam,
  ): Promise<IApiResponse<SolarResourceInformation[]>> => {
    return projectOtherApiSecondService<SolarResourceInformation>().getAll(otherSubMenu?.apiRoute || "", {
      ...params,
      filter: { ...params.filter, project_id: projectId },
    })
  }

  const {
    data: solarResourceInformations,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<SolarResourceInformation[]>({
    queryKey: ["solarResourceInformations"],
    fetchFunction: fetchSolarResourceInformations,
  })

  const toggleDrawer = () => {
    setSelectedRow({} as SolarResourceInformation)
    setShowDrawer(!showDrawer)
  }

  const toggleDetailDrawer = () => {
    setSelectedRow({} as SolarResourceInformation)
    setShowDetailDrawer(!showDetailDrawer)
  }

  const handleEdit = (solarResourceInformation: SolarResourceInformation) => {
    toggleDrawer()
    setSelectedRow(solarResourceInformation)
  }

  const handleDelete = async (solarResourceInformationId: string) => {
    await projectOtherApiSecondService<SolarResourceInformation>().delete(
      otherSubMenu?.apiRoute || "",
      solarResourceInformationId,
    )
    refetch()
  }

  const handleClickDetail = (solarResourceInformation: SolarResourceInformation) => {
    toggleDetailDrawer()
    setSelectedRow(solarResourceInformation)
  }

  const mapSolarResourceInformationToDetailItems = (
    solarResourceInformation: SolarResourceInformation,
  ): { title: string; value: string }[] => [
    {
      title: t("project.other.solar-resource-information.details.annual-solar-radiation"),
      value:
        solarResourceInformation?.annual_solar_radiation !== undefined
          ? `${solarResourceInformation.annual_solar_radiation} ${t("common.kwh-per-m2")}`
          : "N/A",
    },
    {
      title: t("project.other.solar-resource-information.details.solar-panel-efficiency"),
      value:
        solarResourceInformation?.solar_panel_efficiency !== undefined
          ? `${solarResourceInformation.solar_panel_efficiency}%`
          : "N/A",
    },
    {
      title: t("project.other.solar-resource-information.details.annual-energy-production"),
      value:
        solarResourceInformation?.annual_energy_production !== undefined
          ? `${solarResourceInformation.annual_energy_production} ${t("common.mwh")}`
          : "N/A",
    },
    {
      title: t("project.other.solar-resource-information.details.plant-life"),
      value:
        solarResourceInformation?.plant_life !== undefined
          ? `${solarResourceInformation.plant_life} ${t("common.years")}`
          : "N/A",
    },
    {
      title: t("project.other.solar-resource-information.details.remark"),
      value: solarResourceInformation?.remark || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: solarResourceInformation?.created_at ? formatCreatedAt(solarResourceInformation.created_at) : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: solarResourceInformation?.updated_at ? formatCreatedAt(solarResourceInformation.updated_at) : "N/A",
    },
  ]

  return (
    <Box>
      {showDrawer && (
        <SolarResourceInformationDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          solarResourceInformation={selectedRow as SolarResourceInformation}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapSolarResourceInformationToDetailItems(selectedRow as SolarResourceInformation)}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={uploadableProjectFileTypes.other.solarResourceInformation}
          title={t("project.other.solar-resource-information.solar-resource-information-details")}
        />
      )}

      <ItemsListing
        title={t("project.other.solar-resource-information.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: solarResourceInformationColumns(handleClickDetail, handleEdit, handleDelete, t, refetch),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <SolarResourceInformationCard
            onDetail={handleClickDetail}
            solarResourceInformation={data}
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
            subject: "solarresourceinformation",
          },
        }}
        fetchDataFunction={refetch}
        items={solarResourceInformations || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  )
}

export default SolarResourceInformationList

