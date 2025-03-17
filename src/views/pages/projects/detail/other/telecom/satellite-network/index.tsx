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
import type { SatelliteNetwork } from "src/types/project/other"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import { formatCreatedAt } from "src/utils/formatter/date"
import ItemsListing from "src/views/shared/listing"
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer"
import SatelliteNetworkCard from "./satellite-network-card"
import SatelliteNetworkDrawer from "./satellite-network-drawer"
import { satelliteNetworkColumns } from "./satellite-network-row"
import { useQuery } from "@tanstack/react-query"
import { projectMasterModels } from "src/constants/master-data/project-general-master-constants"
import projectGeneralMasterDataApiService from "src/services/general/project-general-master-data-service"

interface SatelliteNetworkListProps {
  otherSubMenu?: OtherMenuRoute
  typeId: string
  projectId: string
}

const SatelliteNetworkList: React.FC<SatelliteNetworkListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false)
  const [showDetailDrawer, setShowDetailDrawer] = useState(false)
  const [selectedRow, setSelectedRow] = useState<SatelliteNetwork | null>(null)
  const { t } = useTranslation()

  // Fetch master data for displaying titles instead of IDs
  const { data: satelliteNetworkTypes } = useQuery({
    queryKey: ["satellite-network-types"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.satelliteNetworkType.model },
      }),
  })

  // Create maps for quick lookup
  const satelliteNetworkTypeMap = new Map(satelliteNetworkTypes?.payload.map((item) => [item.id, item.title]) || [])

  const fetchSatelliteNetworks = (params: GetRequestParam): Promise<IApiResponse<SatelliteNetwork[]>> => {
    return projectOtherApiSecondService<SatelliteNetwork>().getAll(otherSubMenu?.apiRoute || "", {
      ...params,
      filter: { ...params.filter, project_id: projectId },
    })
  }

  const {
    data: satelliteNetworks,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<SatelliteNetwork[]>({
    queryKey: ["satelliteNetworks"],
    fetchFunction: fetchSatelliteNetworks,
  })

  const toggleDrawer = () => {
    setSelectedRow({} as SatelliteNetwork)
    setShowDrawer(!showDrawer)
  }

  const toggleDetailDrawer = () => {
    setSelectedRow({} as SatelliteNetwork)
    setShowDetailDrawer(!showDetailDrawer)
  }

  const handleEdit = (satelliteNetwork: SatelliteNetwork) => {
    toggleDrawer()
    setSelectedRow(satelliteNetwork)
  }

  const handleDelete = async (satelliteNetworkId: string) => {
    await projectOtherApiSecondService<SatelliteNetwork>().delete(otherSubMenu?.apiRoute || "", satelliteNetworkId)
    refetch()
  }

  const handleClickDetail = (satelliteNetwork: SatelliteNetwork) => {
    toggleDetailDrawer()
    setSelectedRow(satelliteNetwork)
  }

  const mapSatelliteNetworkToDetailItems = (satelliteNetwork: SatelliteNetwork): { title: string; value: string }[] => [
    {
      title: t("project.other.satellite-network.details.satellite-network-type"),
      value:
        satelliteNetworkTypeMap.get(satelliteNetwork?.satellite_network_type_id) ||
        satelliteNetwork?.satellite_network_type_id ||
        "N/A",
    },
    {
      title: t("project.other.satellite-network.details.satellite"),
      value:
        satelliteNetwork?.satellite !== undefined
          ? satelliteNetwork.satellite
            ? t("common.yes")
            : t("common.no")
          : "N/A",
    },
    {
      title: t("project.other.satellite-network.details.ground-stations"),
      value:
        satelliteNetwork?.ground_stations !== undefined
          ? satelliteNetwork.ground_stations
            ? t("common.yes")
            : t("common.no")
          : "N/A",
    },
    {
      title: t("project.other.satellite-network.details.modems"),
      value:
        satelliteNetwork?.modems !== undefined ? (satelliteNetwork.modems ? t("common.yes") : t("common.no")) : "N/A",
    },
    {
      title: t("project.other.satellite-network.details.routers"),
      value:
        satelliteNetwork?.routers !== undefined ? (satelliteNetwork.routers ? t("common.yes") : t("common.no")) : "N/A",
    },
    {
      title: t("project.other.satellite-network.details.others"),
      value: satelliteNetwork?.others || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: satelliteNetwork?.created_at ? formatCreatedAt(satelliteNetwork.created_at) : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: satelliteNetwork?.updated_at ? formatCreatedAt(satelliteNetwork.updated_at) : "N/A",
    },
  ]

  return (
    <Box>
      {showDrawer && (
        <SatelliteNetworkDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          satelliteNetwork={selectedRow as SatelliteNetwork}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapSatelliteNetworkToDetailItems(selectedRow as SatelliteNetwork)}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={uploadableProjectFileTypes.other.satelliteNetwork}
          title={t("project.other.satellite-network.satellite-network-details")}
        />
      )}

      <ItemsListing
        title={t("project.other.satellite-network.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: satelliteNetworkColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            satelliteNetworkTypeMap,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <SatelliteNetworkCard
            onDetail={handleClickDetail}
            satelliteNetwork={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
            satelliteNetworkTypeMap={satelliteNetworkTypeMap}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: true,
          permission: {
            action: "create",
            subject: "satellitenetwork",
          },
        }}
        fetchDataFunction={refetch}
        items={satelliteNetworks || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  )
}

export default SatelliteNetworkList

