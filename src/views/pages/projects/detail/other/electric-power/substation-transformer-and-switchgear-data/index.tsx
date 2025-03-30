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
import type { SubstationTransformerAndSwitchgearData, TransmissionLine } from "src/types/project/other"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import { formatCreatedAt } from "src/utils/formatter/date"
import ItemsListing from "src/views/shared/listing"
import { useQuery } from "@tanstack/react-query"
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer"
import SubstationTransformerAndSwitchgearDataCard from "./substation-transformer-and-switchgear-data-card"
import SubstationTransformerAndSwitchgearDataDrawer from "./substation-transformer-and-switchgear-data-drawer"
import { substationTransformerAndSwitchgearDataColumns } from "./substation-transformer-and-switchgear-data-row"

interface SubstationTransformerAndSwitchgearDataListProps {
  otherSubMenu?: OtherMenuRoute
  typeId: string
  projectId: string
}

const SubstationTransformerAndSwitchgearDataList: React.FC<SubstationTransformerAndSwitchgearDataListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false)
  const [showDetailDrawer, setShowDetailDrawer] = useState(false)
  const [selectedRow, setSelectedRow] = useState<SubstationTransformerAndSwitchgearData | null>(null)
  const { t } = useTranslation()

  const { data: transmissionLines } = useQuery({
    queryKey: ["transmission-line-informations", projectId],
    queryFn: () =>
        projectOtherApiSecondService<TransmissionLine>().getAll("transmission-line-informations", {
          filter: { project_id: projectId },
        }),
  })

  const fetchSubstationTransformerAndSwitchgearDatas = (params: GetRequestParam): Promise<IApiResponse<SubstationTransformerAndSwitchgearData[]>> => {
    return projectOtherApiSecondService<SubstationTransformerAndSwitchgearData>().getAll(otherSubMenu?.apiRoute || "", {})
  }

  const {
    data: substationTransformerAndSwitchgearDatas,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<SubstationTransformerAndSwitchgearData[]>({
    queryKey: ["substationTransformerAndSwitchgearDatas"],
    fetchFunction: fetchSubstationTransformerAndSwitchgearDatas,
  })

  const toggleDrawer = () => {
    setSelectedRow({} as SubstationTransformerAndSwitchgearData)
    setShowDrawer(!showDrawer)
  }

  const toggleDetailDrawer = () => {
    setSelectedRow({} as SubstationTransformerAndSwitchgearData)
    setShowDetailDrawer(!showDetailDrawer)
  }

  const handleEdit = (substationTransformerAndSwitchgearData: SubstationTransformerAndSwitchgearData) => {
    toggleDrawer()
    setSelectedRow(substationTransformerAndSwitchgearData)
  }

  const handleDelete = async (substationTransformerAndSwitchgearDataId: string) => {
    await projectOtherApiSecondService<SubstationTransformerAndSwitchgearData>().delete(otherSubMenu?.apiRoute || "", substationTransformerAndSwitchgearDataId)
    refetch()
  }

  const handleClickDetail = (substationTransformerAndSwitchgearData: SubstationTransformerAndSwitchgearData) => {
    toggleDetailDrawer()
    setSelectedRow(substationTransformerAndSwitchgearData)
  }

  const transmissionLinesMap = new Map(transmissionLines?.payload.map((item) => [item.id, item.name || '']) || []);

  const mapSubstationTransformerAndSwitchgearDataToDetailItems = (substationTransformerAndSwitchgearData: SubstationTransformerAndSwitchgearData): { title: string; value: string }[] => [
    {
      title: t("project.other.substation-transformer-and-switchgear-data.details.name"),
      value: substationTransformerAndSwitchgearData?.name || "N/A",
    },
    {
      title: t("project.other.substation-transformer-and-switchgear-data.details.transmission-line-id"),
      value: substationTransformerAndSwitchgearData?.transmission_line_id ? transmissionLinesMap.get(substationTransformerAndSwitchgearData?.transmission_line_id) || substationTransformerAndSwitchgearData?.transmission_line_id : 'N/A'
    },
    {
      title: t("project.other.substation-transformer-and-switchgear-data.details.transformers-number"),
      value: substationTransformerAndSwitchgearData?.transformers_number !== undefined 
        ? substationTransformerAndSwitchgearData.transformers_number.toString() 
        : "N/A",
    },
    {
      title: t("project.other.substation-transformer-and-switchgear-data.details.transformer-type"),
      value: substationTransformerAndSwitchgearData?.transformer_type || "N/A",
    },
    {
      title: t("project.other.substation-transformer-and-switchgear-data.details.transformer-capacity"),
      value: substationTransformerAndSwitchgearData?.transformer_capacity !== undefined 
        ? `${substationTransformerAndSwitchgearData.transformer_capacity} ${t("common.mva")}` 
        : "N/A",
    },
    {
      title: t("project.other.substation-transformer-and-switchgear-data.details.input-voltage-level"),
      value: substationTransformerAndSwitchgearData?.input_voltage_level !== undefined 
        ? `${substationTransformerAndSwitchgearData.input_voltage_level} ${t("common.kv")}` 
        : "N/A",
    },
    {
      title: t("project.other.substation-transformer-and-switchgear-data.details.output-voltage-level"),
      value: substationTransformerAndSwitchgearData?.output_voltage_level !== undefined 
        ? `${substationTransformerAndSwitchgearData.output_voltage_level} ${t("common.kv")}` 
        : "N/A",
    },
    {
      title: t("project.other.substation-transformer-and-switchgear-data.details.switchgear-type-id"),
      value: substationTransformerAndSwitchgearData?.switchgear_type_id || "N/A",
    },
    {
      title: t("project.other.substation-transformer-and-switchgear-data.details.circuit-breaker-type-id"),
      value: substationTransformerAndSwitchgearData?.circuit_breaker_type_id || "N/A",
    },
    {
      title: t("project.other.substation-transformer-and-switchgear-data.details.other-equipment"),
      value: substationTransformerAndSwitchgearData?.other_equipment || "N/A",
    },
    {
      title: t("project.other.substation-transformer-and-switchgear-data.details.remark"),
      value: substationTransformerAndSwitchgearData?.remark || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: substationTransformerAndSwitchgearData?.created_at ? formatCreatedAt(substationTransformerAndSwitchgearData.created_at) : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: substationTransformerAndSwitchgearData?.updated_at ? formatCreatedAt(substationTransformerAndSwitchgearData.updated_at) : "N/A",
    },
  ]

  return (
    <Box>
      {showDrawer && (
        <SubstationTransformerAndSwitchgearDataDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          substationTransformerAndSwitchgearData={selectedRow as SubstationTransformerAndSwitchgearData}
          refetch={refetch}
          projectId={projectId}
          transmissionLines={transmissionLines?.payload || []}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapSubstationTransformerAndSwitchgearDataToDetailItems(selectedRow as SubstationTransformerAndSwitchgearData)}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={uploadableProjectFileTypes.other.SUBSTATION_TRANSFORMER_AND_SWITCH_GEAR_DATA}
          title={t("project.other.substation-transformer-and-switchgear-data.substation-transformer-and-switchgear-data-details")}
        />
      )}

      <ItemsListing
        title={t("project.other.substation-transformer-and-switchgear-data.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: substationTransformerAndSwitchgearDataColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <SubstationTransformerAndSwitchgearDataCard
            onDetail={handleClickDetail}
            substationTransformerAndSwitchgearData={data}
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
            subject: "substationtransformerandswitchgeardata",
          },
        }}
        fetchDataFunction={refetch}
        items={substationTransformerAndSwitchgearDatas || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  )
}

export default SubstationTransformerAndSwitchgearDataList