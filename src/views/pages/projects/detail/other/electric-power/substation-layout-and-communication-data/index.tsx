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
import type { SubstationLayoutAndCommunicationData } from "src/types/project/other"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import { formatCreatedAt } from "src/utils/formatter/date"
import ItemsListing from "src/views/shared/listing"
import { useQuery } from "@tanstack/react-query"
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer"
import SubstationLayoutAndCommunicationDataCard from "./substation-layout-and-communication-data-card"
import SubstationLayoutAndCommunicationDataDrawer from "./substation-layout-and-communication-data-drawer"
import { substationLayoutAndCommunicationDataColumns } from "./substation-layout-and-communication-data-row"
import { projectMasterModels } from "src/constants/master-data/project-general-master-constants"
import projectGeneralMasterDataApiService from "src/services/general/project-general-master-data-service"

interface SubstationLayoutAndCommunicationDataListProps {
  otherSubMenu?: OtherMenuRoute
  typeId: string
  projectId: string
}

const SubstationLayoutAndCommunicationDataList: React.FC<SubstationLayoutAndCommunicationDataListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false)
  const [showDetailDrawer, setShowDetailDrawer] = useState(false)
  const [selectedRow, setSelectedRow] = useState<SubstationLayoutAndCommunicationData | null>(null)
  const { t } = useTranslation()

  const { data: substations } = useQuery({
    queryKey: ["substations", projectId],
    queryFn: () =>
      projectOtherApiSecondService<any>().getAll("substation-transformer-and-switchgear-datas", {}),
  })

  // Fetch communication systems for dropdown
  const { data: communicationSystems } = useQuery({
    queryKey: ["communication-systems"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.substationCommunicationSystem.model },
      }),
  })

  // Fetch grounding systems for dropdown
  const { data: groundingSystems } = useQuery({
    queryKey: ["grounding-systems"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.substationGroundingSystem.model },
      }),
  })


  const fetchSubstationLayoutAndCommunicationDatas = (params: GetRequestParam): Promise<IApiResponse<SubstationLayoutAndCommunicationData[]>> => {
    return projectOtherApiSecondService<SubstationLayoutAndCommunicationData>().getAll(otherSubMenu?.apiRoute || "", {})
  }

  const {
    data: substationLayoutAndCommunicationDatas,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<SubstationLayoutAndCommunicationData[]>({
    queryKey: ["substationLayoutAndCommunicationDatas"],
    fetchFunction: fetchSubstationLayoutAndCommunicationDatas,
  })

  const toggleDrawer = () => {
    setSelectedRow({} as SubstationLayoutAndCommunicationData)
    setShowDrawer(!showDrawer)
  }

  const toggleDetailDrawer = () => {
    setSelectedRow({} as SubstationLayoutAndCommunicationData)
    setShowDetailDrawer(!showDetailDrawer)
  }

  const handleEdit = (substationLayoutAndCommunicationData: SubstationLayoutAndCommunicationData) => {
    toggleDrawer()
    setSelectedRow(substationLayoutAndCommunicationData)
  }

  const handleDelete = async (substationLayoutAndCommunicationDataId: string) => {
    await projectOtherApiSecondService<SubstationLayoutAndCommunicationData>().delete(otherSubMenu?.apiRoute || "", substationLayoutAndCommunicationDataId)
    refetch()
  }

  const handleClickDetail = (substationLayoutAndCommunicationData: SubstationLayoutAndCommunicationData) => {
    toggleDetailDrawer()
    setSelectedRow(substationLayoutAndCommunicationData)
  }

  const substationsMap = new Map(substations?.payload.map((item: any) => [item.id, item.name || '']) || []);
  const communicationSystemsMap = new Map(communicationSystems?.payload.map((item: any) => [item.id, item.title || '']) || []);
  const groundingSystemsMap = new Map(groundingSystems?.payload.map((item: any) => [item.id, item.title || '']) || []);

  const mapSubstationLayoutAndCommunicationDataToDetailItems = (substationLayoutAndCommunicationData: SubstationLayoutAndCommunicationData): { title: string; value: string }[] => [
    {
      title: t("project.other.substation-layout-and-communication-data.details.name"),
      value: substationLayoutAndCommunicationData?.name || "N/A",
    },
    {
      title: t("project.other.substation-layout-and-communication-data.details.substation-id"),
      value: substationLayoutAndCommunicationData?.substation_id ? substationsMap.get(substationLayoutAndCommunicationData?.substation_id) || substationLayoutAndCommunicationData?.substation_id : 'N/A'
    },
    {
      title: t("project.other.substation-layout-and-communication-data.details.substation-layout"),
      value: substationLayoutAndCommunicationData?.substation_layout || "N/A",
    },
    {
      title: t("project.other.substation-layout-and-communication-data.details.equipped-with-standby-diesel-generator"),
      value: substationLayoutAndCommunicationData?.equipped_with_standby_diesel_generator || "N/A",
    },
    {
      title: t("project.other.substation-layout-and-communication-data.details.substation-busbar-type"),
      value: substationLayoutAndCommunicationData?.substation_busbar_type || "N/A",
    },
    {
      title: t("project.other.substation-layout-and-communication-data.details.substation-communication-system-id"),
      value: substationLayoutAndCommunicationData?.substation_communication_system_id ? communicationSystemsMap.get(substationLayoutAndCommunicationData?.substation_communication_system_id) || substationLayoutAndCommunicationData?.substation_communication_system_id : 'N/A'
    },
    {
      title: t("project.other.substation-layout-and-communication-data.details.scada-system"),
      value: substationLayoutAndCommunicationData?.scada_system !== undefined
        ? substationLayoutAndCommunicationData.scada_system ? t("common.yes") : t("common.no")
        : "N/A",
    },
    {
      title: t("project.other.substation-layout-and-communication-data.details.substation-grounding-system-id"),
      value: substationLayoutAndCommunicationData?.substation_grounding_system_id ? groundingSystemsMap.get(substationLayoutAndCommunicationData?.substation_grounding_system_id) || substationLayoutAndCommunicationData?.substation_grounding_system_id : 'N/A'
    },
    {
      title: t("project.other.substation-layout-and-communication-data.details.substation-altitude-level"),
      value: substationLayoutAndCommunicationData?.substation_altitude_level !== undefined
        ? `${substationLayoutAndCommunicationData.substation_altitude_level} ${t("common.meters")}`
        : "N/A",
    },
    {
      title: t("project.other.substation-layout-and-communication-data.details.remark"),
      value: substationLayoutAndCommunicationData?.remark || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: substationLayoutAndCommunicationData?.created_at ? formatCreatedAt(substationLayoutAndCommunicationData.created_at) : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: substationLayoutAndCommunicationData?.updated_at ? formatCreatedAt(substationLayoutAndCommunicationData.updated_at) : "N/A",
    },
  ]

  return (
    <Box>
      {showDrawer && (
        <SubstationLayoutAndCommunicationDataDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          substationLayoutAndCommunicationData={selectedRow as SubstationLayoutAndCommunicationData}
          refetch={refetch}
          projectId={projectId}
          substations={substations?.payload || []}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapSubstationLayoutAndCommunicationDataToDetailItems(selectedRow as SubstationLayoutAndCommunicationData)}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={uploadableProjectFileTypes.other.substation_layout_and_communication_data}
          title={t("project.other.substation-layout-and-communication-data.substation-layout-and-communication-data-details")}
        />
      )}

      <ItemsListing
        title={t("project.other.substation-layout-and-communication-data.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: substationLayoutAndCommunicationDataColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <SubstationLayoutAndCommunicationDataCard
            onDetail={handleClickDetail}
            substationLayoutAndCommunicationData={data}
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
            subject: "substationlayoutandcommunicationdata",
          },
        }}
        fetchDataFunction={refetch}
        items={substationLayoutAndCommunicationDatas || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  )
}

export default SubstationLayoutAndCommunicationDataList