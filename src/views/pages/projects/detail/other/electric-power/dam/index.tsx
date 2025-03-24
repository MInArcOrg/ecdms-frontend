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
import type { Dam } from "src/types/project/other"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import { formatCreatedAt } from "src/utils/formatter/date"
import ItemsListing from "src/views/shared/listing"
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer"
import DamCard from "./dam-card"
import DamDrawer from "./dam-drawer"
import { damColumns } from "./dam-row"
import { useQuery } from "@tanstack/react-query"
import { projectMasterModels } from "src/constants/master-data/project-general-master-constants"
import projectGeneralMasterDataApiService from "src/services/general/project-general-master-data-service"

interface DamListProps {
  otherSubMenu?: OtherMenuRoute
  typeId: string
  projectId: string
}

const DamList: React.FC<DamListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false)
  const [showDetailDrawer, setShowDetailDrawer] = useState(false)
  const [selectedRow, setSelectedRow] = useState<Dam | null>(null)
  const { t } = useTranslation()

  // Fetch master data for displaying titles instead of IDs
  const { data: damTypes } = useQuery({
    queryKey: ["dam-types"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.damType.model },
      }),
  })

  const { data: spillwayTypes } = useQuery({
    queryKey: ["spillway-types"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.spillwayType.model },
      }),
  })

  const { data: turbineTypes } = useQuery({
    queryKey: ["turbine-types"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.turbineType.model },
      }),
  })

  const { data: generatorTypes } = useQuery({
    queryKey: ["generator-types"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.generatorType.model },
      }),
  })

  // Create maps for quick lookup
  const damTypeMap = new Map(damTypes?.payload.map((item) => [item.id, item.title || ""]) || [])
  const spillwayTypeMap = new Map(spillwayTypes?.payload.map((item) => [item.id, item.title || ""]) || [])
  const turbineTypeMap = new Map(turbineTypes?.payload.map((item) => [item.id, item.title || ""]) || [])
  const generatorTypeMap = new Map(generatorTypes?.payload.map((item) => [item.id, item.title || ""]) || [])

  const fetchDams = (params: GetRequestParam): Promise<IApiResponse<Dam[]>> => {
    return projectOtherApiSecondService<Dam>().getAll(otherSubMenu?.apiRoute || "", {
      ...params,
      filter: { ...params.filter, project_id: projectId },
    })
  }

  const {
    data: dams,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<Dam[]>({
    queryKey: ["dams"],
    fetchFunction: fetchDams,
  })

  const toggleDrawer = () => {
    setSelectedRow({} as Dam)
    setShowDrawer(!showDrawer)
  }

  const toggleDetailDrawer = () => {
    setSelectedRow({} as Dam)
    setShowDetailDrawer(!showDetailDrawer)
  }

  const handleEdit = (dam: Dam) => {
    toggleDrawer()
    setSelectedRow(dam)
  }

  const handleDelete = async (damId: string) => {
    await projectOtherApiSecondService<Dam>().delete(otherSubMenu?.apiRoute || "", damId)
    refetch()
  }

  const handleClickDetail = (dam: Dam) => {
    toggleDetailDrawer()
    setSelectedRow(dam)
  }

  const mapDamToDetailItems = (dam: Dam): { title: string; value: string }[] => [
    {
      title: t("project.other.dam.details.dam-type"),
      value: dam?.dam_type_id ? damTypeMap.get(dam.dam_type_id) || "N/A" : "N/A",
    },
    {
      title: t("project.other.dam.details.dam-height"),
      value: dam?.dam_height !== undefined ? `${dam.dam_height} ${t("common.meters")}` : "N/A",
    },
    {
      title: t("project.other.dam.details.spillway-type"),
      value: dam?.spillway_type_id ? spillwayTypeMap.get(dam.spillway_type_id) || "N/A" : "N/A",
    },
    {
      title: t("project.other.dam.details.penstock-length"),
      value: dam?.penstock_length !== undefined ? `${dam.penstock_length} ${t("common.meters")}` : "N/A",
    },
    {
      title: t("project.other.dam.details.turbine-type"),
      value: dam?.turbine_type_id ? turbineTypeMap.get(dam.turbine_type_id) || "N/A" : "N/A",
    },
    {
      title: t("project.other.dam.details.turbine-number"),
      value: dam?.turbine_number !== undefined ? dam.turbine_number.toString() : "N/A",
    },
    {
      title: t("project.other.dam.details.generator-type"),
      value: dam?.generator_type_id ? generatorTypeMap.get(dam.generator_type_id) || "N/A" : "N/A",
    },
    {
      title: t("project.other.dam.details.generator-number"),
      value: dam?.generator_number !== undefined ? dam.generator_number.toString() : "N/A",
    },
    {
      title: t("project.other.dam.details.national-priority-rank"),
      value: dam?.national_priority_rank !== undefined ? dam.national_priority_rank.toString() : "N/A",
    },
    {
      title: t("project.other.dam.details.remark"),
      value: dam?.remark || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: dam?.created_at ? formatCreatedAt(dam.created_at) : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: dam?.updated_at ? formatCreatedAt(dam.updated_at) : "N/A",
    },
  ]

  return (
    <Box>
      {showDrawer && (
        <DamDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          dam={selectedRow as Dam}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapDamToDetailItems(selectedRow as Dam)}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={uploadableProjectFileTypes.other.dam}
          title={t("project.other.dam.dam-details")}
        />
      )}

      <ItemsListing
        title={t("project.other.dam.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: damColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            damTypeMap,
            spillwayTypeMap,
            turbineTypeMap,
            generatorTypeMap,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <DamCard
            onDetail={handleClickDetail}
            dam={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
            damTypeMap={damTypeMap}
            spillwayTypeMap={spillwayTypeMap}
            turbineTypeMap={turbineTypeMap}
            generatorTypeMap={generatorTypeMap}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: true,
          permission: {
            action: "create",
            subject: "dam",
          },
        }}
        fetchDataFunction={refetch}
        items={dams || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  )
}

export default DamList