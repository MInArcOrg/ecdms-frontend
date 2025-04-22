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
  ElectricGridControlCenterCyberSecurityData, 
  ElectricGridControlCenterData,
} from "src/types/project/other"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import { formatCreatedAt } from "src/utils/formatter/date"
import ItemsListing from "src/views/shared/listing"
import { useQuery } from "@tanstack/react-query"
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer"
import ElectricGridControlCenterCyberSecurityDataCard from "./electric-grid-control-center-cyber-security-data-card"
import ElectricGridControlCenterCyberSecurityDataDrawer from "./electric-grid-control-center-cyber-security-data-drawer"
import { electricGridControlCenterCyberSecurityDataColumns } from "./electric-grid-control-center-cyber-security-data-row"
import { projectMasterModels } from "src/constants/master-data/project-general-master-constants"
import projectGeneralMasterDataApiService from "src/services/general/project-general-master-data-service"

interface ElectricGridControlCenterCyberSecurityDataListProps {
  otherSubMenu?: OtherMenuRoute
  typeId: string
  projectId: string
}

const ElectricGridControlCenterCyberSecurityDataList: React.FC<ElectricGridControlCenterCyberSecurityDataListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false)
  const [showDetailDrawer, setShowDetailDrawer] = useState(false)
  const [selectedRow, setSelectedRow] = useState<ElectricGridControlCenterCyberSecurityData | null>(null)
  const { t } = useTranslation()

  // Fetch electric grid control center data
  const { data: electricGridControlCenterData } = useQuery({
    queryKey: ["electric-grid-control-center-data", projectId],
    queryFn: () =>
      projectOtherApiSecondService<ElectricGridControlCenterData>().getAll("electric-grid-control-center-data", {
        filter: { project_id: projectId },
      }),
  })

  // Fetch cyber security measures types from master data
  const { data: cyberSecurityMeasuresTypes } = useQuery({
    queryKey: ["cyber-security-measures-types"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.cyberSecurityMeasuresType.model },
      }),
  })

  // Fetch cyber security audits frequency from master data
  const { data: cyberSecurityAuditsFrequencies } = useQuery({
    queryKey: ["cyber-security-audits-frequencies"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.cyberSecurityAuditsFrequency.model },
      }),
  })

  const fetchElectricGridControlCenterCyberSecurityData = (params: GetRequestParam): Promise<IApiResponse<ElectricGridControlCenterCyberSecurityData[]>> => {
    return projectOtherApiSecondService<ElectricGridControlCenterCyberSecurityData>().getAll(otherSubMenu?.apiRoute || "", {})
  }

  const {
    data: electricGridControlCenterCyberSecurityData,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<ElectricGridControlCenterCyberSecurityData[]>({
    queryKey: ["electricGridControlCenterCyberSecurityData"],
    fetchFunction: fetchElectricGridControlCenterCyberSecurityData,
  })

  const toggleDrawer = () => {
    setSelectedRow({} as ElectricGridControlCenterCyberSecurityData)
    setShowDrawer(!showDrawer)
  }

  const toggleDetailDrawer = () => {
    setSelectedRow({} as ElectricGridControlCenterCyberSecurityData)
    setShowDetailDrawer(!showDetailDrawer)
  }

  const handleEdit = (electricGridControlCenterCyberSecurityData: ElectricGridControlCenterCyberSecurityData) => {
    toggleDrawer()
    setSelectedRow(electricGridControlCenterCyberSecurityData)
  }

  const handleDelete = async (electricGridControlCenterCyberSecurityDataId: string) => {
    await projectOtherApiSecondService<ElectricGridControlCenterCyberSecurityData>().delete(otherSubMenu?.apiRoute || "", electricGridControlCenterCyberSecurityDataId)
    refetch()
  }

  const handleClickDetail = (electricGridControlCenterCyberSecurityData: ElectricGridControlCenterCyberSecurityData) => {
    toggleDetailDrawer()
    setSelectedRow(electricGridControlCenterCyberSecurityData)
  }

  // Create maps for dropdown values
  const electricGridControlCenterDataMap = new Map(electricGridControlCenterData?.payload.map((item: ElectricGridControlCenterData) => [item.id, item.name || '']) || []);
  const cyberSecurityMeasuresTypesMap = new Map(cyberSecurityMeasuresTypes?.payload.map((item: any) => [item.id, item.title || '']) || []);
  const cyberSecurityAuditsFrequenciesMap = new Map(cyberSecurityAuditsFrequencies?.payload.map((item: any) => [item.id, item.title || '']) || []);

  const mapElectricGridControlCenterCyberSecurityDataToDetailItems = (electricGridControlCenterCyberSecurityData: ElectricGridControlCenterCyberSecurityData): { title: string; value: string }[] => [
    {
      title: t("project.other.electric-grid-control-center-cyber-security-data.details.name"),
      value: electricGridControlCenterCyberSecurityData?.name || "N/A",
    },
    {
      title: t("project.other.electric-grid-control-center-cyber-security-data.details.electric-grid-control-center-data-id"),
      value: electricGridControlCenterCyberSecurityData?.electric_grid_control_center_data_id 
        ? electricGridControlCenterDataMap.get(electricGridControlCenterCyberSecurityData.electric_grid_control_center_data_id) || electricGridControlCenterCyberSecurityData.electric_grid_control_center_data_id 
        : "N/A",
    },
    {
      title: t("project.other.electric-grid-control-center-cyber-security-data.details.cyber-security-measures-implemented"),
      value: electricGridControlCenterCyberSecurityData?.cyber_security_measures_implemented !== undefined 
        ? electricGridControlCenterCyberSecurityData.cyber_security_measures_implemented 
          ? t("common.yes") 
          : t("common.no") 
        : "N/A",
    },
    {
      title: t("project.other.electric-grid-control-center-cyber-security-data.details.cyber-security-measures-type"),
      value: electricGridControlCenterCyberSecurityData?.cyber_security_measures_type 
        ? cyberSecurityMeasuresTypesMap.get(electricGridControlCenterCyberSecurityData.cyber_security_measures_type) || electricGridControlCenterCyberSecurityData.cyber_security_measures_type 
        : "N/A",
    },
    {
      title: t("project.other.electric-grid-control-center-cyber-security-data.details.cyber-security-audits-frequency"),
      value: electricGridControlCenterCyberSecurityData?.cyber_security_audits_frequency 
        ? cyberSecurityAuditsFrequenciesMap.get(electricGridControlCenterCyberSecurityData.cyber_security_audits_frequency) || electricGridControlCenterCyberSecurityData.cyber_security_audits_frequency 
        : "N/A",
    },
    {
      title: t("project.other.electric-grid-control-center-cyber-security-data.details.remark"),
      value: electricGridControlCenterCyberSecurityData?.remark || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: electricGridControlCenterCyberSecurityData?.created_at ? formatCreatedAt(electricGridControlCenterCyberSecurityData.created_at) : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: electricGridControlCenterCyberSecurityData?.updated_at ? formatCreatedAt(electricGridControlCenterCyberSecurityData.updated_at) : "N/A",
    },
  ]

  return (
    <Box>
      {showDrawer && (
        <ElectricGridControlCenterCyberSecurityDataDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          electricGridControlCenterCyberSecurityData={selectedRow as ElectricGridControlCenterCyberSecurityData}
          refetch={refetch}
          projectId={projectId}
          electricGridControlCenterData={electricGridControlCenterData?.payload || []}
          cyberSecurityMeasuresTypes={cyberSecurityMeasuresTypes?.payload || []}
          cyberSecurityAuditsFrequencies={cyberSecurityAuditsFrequencies?.payload || []}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapElectricGridControlCenterCyberSecurityDataToDetailItems(selectedRow as ElectricGridControlCenterCyberSecurityData)}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={uploadableProjectFileTypes.other.electric_grid_control_center_cyber_security_data}
          title={t("project.other.electric-grid-control-center-cyber-security-data.electric-grid-control-center-cyber-security-data-details")}
        />
      )}

      <ItemsListing
        title={t("project.other.electric-grid-control-center-cyber-security-data.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: electricGridControlCenterCyberSecurityDataColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            electricGridControlCenterDataMap,
            cyberSecurityMeasuresTypesMap,
            cyberSecurityAuditsFrequenciesMap
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <ElectricGridControlCenterCyberSecurityDataCard
            onDetail={handleClickDetail}
            electricGridControlCenterCyberSecurityData={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
            electricGridControlCenterDataMap={electricGridControlCenterDataMap}
            cyberSecurityMeasuresTypesMap={cyberSecurityMeasuresTypesMap}
            cyberSecurityAuditsFrequenciesMap={cyberSecurityAuditsFrequenciesMap}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: true,
          permission: {
            action: "create",
            subject: "electricgridcontrolcentercybersecuritydata",
          },
        }}
        fetchDataFunction={refetch}
        items={electricGridControlCenterCyberSecurityData || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  )
}

export default ElectricGridControlCenterCyberSecurityDataList