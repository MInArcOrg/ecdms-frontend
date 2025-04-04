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
  ElectricSmartMetersData, 
  ElectricSmartMetersPrivacyAndSecurityData, 
} from "src/types/project/other"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import { formatCreatedAt } from "src/utils/formatter/date"
import ItemsListing from "src/views/shared/listing"
import { useQuery } from "@tanstack/react-query"
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer"
import ElectricSmartMetersPrivacyAndSecurityDataCard from "./electric-smart-meters-privacy-and-security-data-card"
import ElectricSmartMetersPrivacyAndSecurityDataDrawer from "./electric-smart-meters-privacy-and-security-data-drawer"
import { electricSmartMetersPrivacyAndSecurityDataColumns } from "./electric-smart-meters-privacy-and-security-data-row"
import { projectMasterModels } from "src/constants/master-data/project-general-master-constants"
import projectGeneralMasterDataApiService from "src/services/general/project-general-master-data-service"

interface ElectricSmartMetersPrivacyAndSecurityDataListProps {
  otherSubMenu?: OtherMenuRoute
  typeId: string
  projectId: string
}

const ElectricSmartMetersPrivacyAndSecurityDataList: React.FC<ElectricSmartMetersPrivacyAndSecurityDataListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false)
  const [showDetailDrawer, setShowDetailDrawer] = useState(false)
  const [selectedRow, setSelectedRow] = useState<ElectricSmartMetersPrivacyAndSecurityData | null>(null)
  const { t } = useTranslation()

  // Fetch electric smart meters data
  const { data: electricSmartMetersData } = useQuery({
    queryKey: ["electric-smart-meters-data", projectId],
    queryFn: () =>
      projectOtherApiSecondService<ElectricSmartMetersData>().getAll("electric-smart-meters-data", {}),
  })

  // Fetch privacy measures types from master data
  const { data: privacyMeasuresTypes } = useQuery({
    queryKey: ["privacy-measures-types"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.privacyMeasuresType.model },
      }),
  })

  // Fetch customer engagement frequencies from master data
  const { data: customerEngagementFrequencies } = useQuery({
    queryKey: ["customer-engagement-frequencies"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.customerEngagementFrequency.model },
      }),
  })

  // Fetch customer engagement program types from master data
  const { data: customerEngagementProgramTypes } = useQuery({
    queryKey: ["customer-engagement-program-types"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.customerEngagementProgramsType.model },
      }),
  })

  const fetchElectricSmartMetersPrivacyAndSecurityData = (params: GetRequestParam): Promise<IApiResponse<ElectricSmartMetersPrivacyAndSecurityData[]>> => {
    return projectOtherApiSecondService<ElectricSmartMetersPrivacyAndSecurityData>().getAll(otherSubMenu?.apiRoute || "", {})
  }

  const {
    data: electricSmartMetersPrivacyAndSecurityData,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<ElectricSmartMetersPrivacyAndSecurityData[]>({
    queryKey: ["electricSmartMetersPrivacyAndSecurityData"],
    fetchFunction: fetchElectricSmartMetersPrivacyAndSecurityData,
  })

  const toggleDrawer = () => {
    setSelectedRow({} as ElectricSmartMetersPrivacyAndSecurityData)
    setShowDrawer(!showDrawer)
  }

  const toggleDetailDrawer = () => {
    setSelectedRow({} as ElectricSmartMetersPrivacyAndSecurityData)
    setShowDetailDrawer(!showDetailDrawer)
  }

  const handleEdit = (electricSmartMetersPrivacyAndSecurityData: ElectricSmartMetersPrivacyAndSecurityData) => {
    toggleDrawer()
    setSelectedRow(electricSmartMetersPrivacyAndSecurityData)
  }

  const handleDelete = async (electricSmartMetersPrivacyAndSecurityDataId: string) => {
    await projectOtherApiSecondService<ElectricSmartMetersPrivacyAndSecurityData>().delete(otherSubMenu?.apiRoute || "", electricSmartMetersPrivacyAndSecurityDataId)
    refetch()
  }

  const handleClickDetail = (electricSmartMetersPrivacyAndSecurityData: ElectricSmartMetersPrivacyAndSecurityData) => {
    toggleDetailDrawer()
    setSelectedRow(electricSmartMetersPrivacyAndSecurityData)
  }

  // Create maps for dropdown values
  const electricSmartMetersDataMap = new Map(electricSmartMetersData?.payload.map((item: ElectricSmartMetersData) => [item.id, item.name || '']) || []);
  const privacyMeasuresTypesMap = new Map(privacyMeasuresTypes?.payload.map((item: any) => [item.id, item.title || '']) || []);
  const customerEngagementFrequenciesMap = new Map(customerEngagementFrequencies?.payload.map((item: any) => [item.id, item.title || '']) || []);
  const customerEngagementProgramTypesMap = new Map(customerEngagementProgramTypes?.payload.map((item: any) => [item.id, item.title || '']) || []);

  const mapElectricSmartMetersPrivacyAndSecurityDataToDetailItems = (electricSmartMetersPrivacyAndSecurityData: ElectricSmartMetersPrivacyAndSecurityData): { title: string; value: string }[] => [
    {
      title: t("project.other.electric-smart-meters-privacy-and-security-data.details.name"),
      value: electricSmartMetersPrivacyAndSecurityData?.name || "N/A",
    },
    {
      title: t("project.other.electric-smart-meters-privacy-and-security-data.details.electric-smart-meters-data-id"),
      value: electricSmartMetersPrivacyAndSecurityData?.electric_smart_meters_data_id 
        ? electricSmartMetersDataMap.get(electricSmartMetersPrivacyAndSecurityData.electric_smart_meters_data_id) || electricSmartMetersPrivacyAndSecurityData.electric_smart_meters_data_id 
        : "N/A",
    },
    {
      title: t("project.other.electric-smart-meters-privacy-and-security-data.details.privacy-measures-implemented"),
      value: electricSmartMetersPrivacyAndSecurityData?.privacy_measures_implemented !== undefined 
        ? electricSmartMetersPrivacyAndSecurityData.privacy_measures_implemented 
          ? t("common.yes") 
          : t("common.no") 
        : "N/A",
    },
    {
      title: t("project.other.electric-smart-meters-privacy-and-security-data.details.privacy-measures-type-id"),
      value: electricSmartMetersPrivacyAndSecurityData?.privacy_measures_type_id 
        ? privacyMeasuresTypesMap.get(electricSmartMetersPrivacyAndSecurityData.privacy_measures_type_id) || electricSmartMetersPrivacyAndSecurityData.privacy_measures_type_id 
        : "N/A",
    },
    {
      title: t("project.other.electric-smart-meters-privacy-and-security-data.details.customer-engagement-frequency-id"),
      value: electricSmartMetersPrivacyAndSecurityData?.customer_engagement_frequency_id 
        ? customerEngagementFrequenciesMap.get(electricSmartMetersPrivacyAndSecurityData.customer_engagement_frequency_id) || electricSmartMetersPrivacyAndSecurityData.customer_engagement_frequency_id 
        : "N/A",
    },
    {
      title: t("project.other.electric-smart-meters-privacy-and-security-data.details.customer-engagement-programs-implemented"),
      value: electricSmartMetersPrivacyAndSecurityData?.customer_engagement_programs_implemented !== undefined 
        ? electricSmartMetersPrivacyAndSecurityData.customer_engagement_programs_implemented 
          ? t("common.yes") 
          : t("common.no") 
        : "N/A",
    },
    {
      title: t("project.other.electric-smart-meters-privacy-and-security-data.details.customer-engagement-programs-type-id"),
      value: electricSmartMetersPrivacyAndSecurityData?.customer_engagement_programs_type_id 
        ? customerEngagementProgramTypesMap.get(electricSmartMetersPrivacyAndSecurityData.customer_engagement_programs_type_id) || electricSmartMetersPrivacyAndSecurityData.customer_engagement_programs_type_id 
        : "N/A",
    },
    {
      title: t("project.other.electric-smart-meters-privacy-and-security-data.details.social-impact-assessment-conducted"),
      value: electricSmartMetersPrivacyAndSecurityData?.social_impact_assessment_conducted !== undefined 
        ? electricSmartMetersPrivacyAndSecurityData.social_impact_assessment_conducted 
          ? t("common.yes") 
          : t("common.no") 
        : "N/A",
    },
    {
      title: t("project.other.electric-smart-meters-privacy-and-security-data.details.resettlement-and-compensation-measures-implemented"),
      value: electricSmartMetersPrivacyAndSecurityData?.resettlement_and_compensation_measures_implemented !== undefined 
        ? electricSmartMetersPrivacyAndSecurityData.resettlement_and_compensation_measures_implemented 
          ? t("common.yes") 
          : t("common.no") 
        : "N/A",
    },
    {
      title: t("project.other.electric-smart-meters-privacy-and-security-data.details.remark"),
      value: electricSmartMetersPrivacyAndSecurityData?.remark || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: electricSmartMetersPrivacyAndSecurityData?.created_at ? formatCreatedAt(electricSmartMetersPrivacyAndSecurityData.created_at) : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: electricSmartMetersPrivacyAndSecurityData?.updated_at ? formatCreatedAt(electricSmartMetersPrivacyAndSecurityData.updated_at) : "N/A",
    },
  ]

  return (
    <Box>
      {showDrawer && (
        <ElectricSmartMetersPrivacyAndSecurityDataDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          electricSmartMetersPrivacyAndSecurityData={selectedRow as ElectricSmartMetersPrivacyAndSecurityData}
          refetch={refetch}
          projectId={projectId}
          electricSmartMetersData={electricSmartMetersData?.payload || []}
          privacyMeasuresTypes={privacyMeasuresTypes?.payload || []}
          customerEngagementFrequencies={customerEngagementFrequencies?.payload || []}
          customerEngagementProgramTypes={customerEngagementProgramTypes?.payload || []}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapElectricSmartMetersPrivacyAndSecurityDataToDetailItems(selectedRow as ElectricSmartMetersPrivacyAndSecurityData)}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={uploadableProjectFileTypes.other.electric_smart_meters_privacy_and_security_data}
          title={t("project.other.electric-smart-meters-privacy-and-security-data.electric-smart-meters-privacy-and-security-data-details")}
        />
      )}

      <ItemsListing
        title={t("project.other.electric-smart-meters-privacy-and-security-data.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: electricSmartMetersPrivacyAndSecurityDataColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            electricSmartMetersDataMap,
            privacyMeasuresTypesMap,
            customerEngagementFrequenciesMap,
            customerEngagementProgramTypesMap
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <ElectricSmartMetersPrivacyAndSecurityDataCard
            onDetail={handleClickDetail}
            electricSmartMetersPrivacyAndSecurityData={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
            electricSmartMetersDataMap={electricSmartMetersDataMap}
            privacyMeasuresTypesMap={privacyMeasuresTypesMap}
            customerEngagementFrequenciesMap={customerEngagementFrequenciesMap}
            customerEngagementProgramTypesMap={customerEngagementProgramTypesMap}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: true,
          permission: {
            action: "create",
            subject: "electricsmartmetersprivacyandsecuritydata",
          },
        }}
        fetchDataFunction={refetch}
        items={electricSmartMetersPrivacyAndSecurityData || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  )
}

export default ElectricSmartMetersPrivacyAndSecurityDataList