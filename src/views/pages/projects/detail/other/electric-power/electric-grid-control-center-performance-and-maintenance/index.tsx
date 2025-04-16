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
import type { 
  ElectricGridControlCenterPerformanceAndMaintenance, 
  ElectricGridControlCenterData,
} from "src/types/project/other"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import { formatCreatedAt } from "src/utils/formatter/date"
import ItemsListing from "src/views/shared/listing"
import { useQuery } from "@tanstack/react-query"
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer"
import ElectricGridControlCenterPerformanceAndMaintenanceCard from "./electric-grid-control-center-performance-and-maintenance-card"
import ElectricGridControlCenterPerformanceAndMaintenanceDrawer from "./electric-grid-control-center-performance-and-maintenance-drawer"
import { electricGridControlCenterPerformanceAndMaintenanceColumns } from "./electric-grid-control-center-performance-and-maintenance-row"
import { projectMasterModels } from "src/constants/master-data/project-general-master-constants"
import projectGeneralMasterDataApiService from "src/services/general/project-general-master-data-service"

interface ElectricGridControlCenterPerformanceAndMaintenanceListProps {
  otherSubMenu?: OtherMenuRoute
  typeId: string
  projectId: string
}

const ElectricGridControlCenterPerformanceAndMaintenanceList: React.FC<ElectricGridControlCenterPerformanceAndMaintenanceListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false)
  const [showDetailDrawer, setShowDetailDrawer] = useState(false)
  const [selectedRow, setSelectedRow] = useState<ElectricGridControlCenterPerformanceAndMaintenance | null>(null)
  const { t } = useTranslation()

  // Fetch electric grid control center data
  const { data: electricGridControlCenterData } = useQuery({
    queryKey: ["electric-grid-control-center-data", projectId],
    queryFn: () =>
      projectOtherApiSecondService<ElectricGridControlCenterData>().getAll("electric-grid-control-center-data", {
        filter: { project_id: projectId },
      }),
  })

  // Fetch maintenance frequency from master data
  const { data: maintenanceFrequencies } = useQuery({
    queryKey: ["maintenance-frequencies"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.maintenanceFrequency.model },
      }),
  })

  const fetchElectricGridControlCenterPerformanceAndMaintenance = (params: GetRequestParam): Promise<IApiResponse<ElectricGridControlCenterPerformanceAndMaintenance[]>> => {
    return projectOtherApiSecondService<ElectricGridControlCenterPerformanceAndMaintenance>().getAll(otherSubMenu?.apiRoute || "", {})
  }

  const {
    data: electricGridControlCenterPerformanceAndMaintenance,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<ElectricGridControlCenterPerformanceAndMaintenance[]>({
    queryKey: ["electricGridControlCenterPerformanceAndMaintenance"],
    fetchFunction: fetchElectricGridControlCenterPerformanceAndMaintenance,
  })

  const toggleDrawer = () => {
    setSelectedRow({} as ElectricGridControlCenterPerformanceAndMaintenance)
    setShowDrawer(!showDrawer)
  }

  const toggleDetailDrawer = () => {
    setSelectedRow({} as ElectricGridControlCenterPerformanceAndMaintenance)
    setShowDetailDrawer(!showDetailDrawer)
  }

  const handleEdit = (electricGridControlCenterPerformanceAndMaintenance: ElectricGridControlCenterPerformanceAndMaintenance) => {
    toggleDrawer()
    setSelectedRow(electricGridControlCenterPerformanceAndMaintenance)
  }

  const handleDelete = async (electricGridControlCenterPerformanceAndMaintenanceId: string) => {
    await projectOtherApiSecondService<ElectricGridControlCenterPerformanceAndMaintenance>().delete(otherSubMenu?.apiRoute || "", electricGridControlCenterPerformanceAndMaintenanceId)
    refetch()
  }

  const handleClickDetail = (electricGridControlCenterPerformanceAndMaintenance: ElectricGridControlCenterPerformanceAndMaintenance) => {
    toggleDetailDrawer()
    setSelectedRow(electricGridControlCenterPerformanceAndMaintenance)
  }

  // Create maps for dropdown values
  const electricGridControlCenterDataMap = new Map(electricGridControlCenterData?.payload.map((item: ElectricGridControlCenterData) => [item.id, item.name || '']) || []);
  const maintenanceFrequenciesMap = new Map(maintenanceFrequencies?.payload.map((item: any) => [item.id, item.title || '']) || []);

  const mapElectricGridControlCenterPerformanceAndMaintenanceToDetailItems = (electricGridControlCenterPerformanceAndMaintenance: ElectricGridControlCenterPerformanceAndMaintenance): { title: string; value: string }[] => [
    {
      title: t("project.other.electric-grid-control-center-performance-and-maintenance.details.name"),
      value: electricGridControlCenterPerformanceAndMaintenance?.name || "N/A",
    },
    {
      title: t("project.other.electric-grid-control-center-performance-and-maintenance.details.electric-grid-control-center-data-id"),
      value: electricGridControlCenterPerformanceAndMaintenance?.electric_grid_control_center_data_id 
        ? electricGridControlCenterDataMap.get(electricGridControlCenterPerformanceAndMaintenance.electric_grid_control_center_data_id) || electricGridControlCenterPerformanceAndMaintenance.electric_grid_control_center_data_id 
        : "N/A",
    },
    {
      title: t("project.other.electric-grid-control-center-performance-and-maintenance.details.maintenance-frequency-id"),
      value: electricGridControlCenterPerformanceAndMaintenance?.maintenance_frequency_id 
        ? maintenanceFrequenciesMap.get(electricGridControlCenterPerformanceAndMaintenance.maintenance_frequency_id) || electricGridControlCenterPerformanceAndMaintenance.maintenance_frequency_id 
        : "N/A",
    },
    {
      title: t("project.other.electric-grid-control-center-performance-and-maintenance.details.total-system-downtime-outage-duration"),
      value: electricGridControlCenterPerformanceAndMaintenance?.total_system_downtime_outage_duration !== undefined 
        ? electricGridControlCenterPerformanceAndMaintenance.total_system_downtime_outage_duration.toString() 
        : "N/A",
    },
    {
      title: t("project.other.electric-grid-control-center-performance-and-maintenance.details.total-interruptions-number"),
      value: electricGridControlCenterPerformanceAndMaintenance?.total_interruptions_number !== undefined 
        ? electricGridControlCenterPerformanceAndMaintenance.total_interruptions_number.toString() 
        : "N/A",
    },
    {
      title: t("project.other.electric-grid-control-center-performance-and-maintenance.details.saidi"),
      value: electricGridControlCenterPerformanceAndMaintenance?.saidi || "N/A",
    },
    {
      title: t("project.other.electric-grid-control-center-performance-and-maintenance.details.saifi"),
      value: electricGridControlCenterPerformanceAndMaintenance?.saifi || "N/A",
    },
    {
      title: t("project.other.electric-grid-control-center-performance-and-maintenance.details.remark"),
      value: electricGridControlCenterPerformanceAndMaintenance?.remark || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: electricGridControlCenterPerformanceAndMaintenance?.created_at ? formatCreatedAt(electricGridControlCenterPerformanceAndMaintenance.created_at) : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: electricGridControlCenterPerformanceAndMaintenance?.updated_at ? formatCreatedAt(electricGridControlCenterPerformanceAndMaintenance.updated_at) : "N/A",
    },
  ]

  return (
    <Box>
      {showDrawer && (
        <ElectricGridControlCenterPerformanceAndMaintenanceDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          electricGridControlCenterPerformanceAndMaintenance={selectedRow as ElectricGridControlCenterPerformanceAndMaintenance}
          refetch={refetch}
          projectId={projectId}
          electricGridControlCenterData={electricGridControlCenterData?.payload || []}
          maintenanceFrequencies={maintenanceFrequencies?.payload || []}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapElectricGridControlCenterPerformanceAndMaintenanceToDetailItems(selectedRow as ElectricGridControlCenterPerformanceAndMaintenance)}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={uploadableProjectFileTypes.other.electric_grid_control_center_performance_and_maintenance}
          title={t("project.other.electric-grid-control-center-performance-and-maintenance.electric-grid-control-center-performance-and-maintenance-details")}
        />
      )}

      <ItemsListing
        title={t("project.other.electric-grid-control-center-performance-and-maintenance.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: electricGridControlCenterPerformanceAndMaintenanceColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            electricGridControlCenterDataMap,
            maintenanceFrequenciesMap
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <ElectricGridControlCenterPerformanceAndMaintenanceCard
            onDetail={handleClickDetail}
            electricGridControlCenterPerformanceAndMaintenance={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
            electricGridControlCenterDataMap={electricGridControlCenterDataMap}
            maintenanceFrequenciesMap={maintenanceFrequenciesMap}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: true,
          permission: {
            action: "create",
            subject: "electricgridcontrolcenterperformanceandmaintenance",
          },
        }}
        fetchDataFunction={refetch}
        items={electricGridControlCenterPerformanceAndMaintenance || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  )
}

export default ElectricGridControlCenterPerformanceAndMaintenanceList