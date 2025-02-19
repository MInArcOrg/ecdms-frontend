"use client"

import { Box } from "@mui/material"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants"
import usePaginatedFetch from "src/hooks/use-paginated-fetch"
import functionalClassificationApiService from "src/services/master-data/functional-classification-service"
import masterTypeApiService from "src/services/master-data/master-type-service"
import { defaultCreateActionConfig } from "src/types/general/listing"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import { formatCreatedAt } from "src/utils/formatter/date"
import ItemsListing from "src/views/shared/listing"
import OtherDetailSidebar from "src/views/shared/layouts/other/other-detail-drawer"
import FunctionalClassificationCard from "./functional-classification-card"
import FunctionalClassificationDrawer from "./functional-classification-drawer"
import type { FunctionalClassification } from "src/types/master/functional-classification"
import { functionalClassificationColumns } from "./functional-classification-row"

const FunctionalClassificationList: React.FC = () => {
  const [showDrawer, setShowDrawer] = useState(false)
  const [showDetailDrawer, setShowDetailDrawer] = useState(false)
  const [selectedRow, setSelectedRow] = useState<FunctionalClassification | null>(null)
  const [projectTypes, setProjectTypes] = useState<{ value: string; label: string }[]>([])
  const { t } = useTranslation()

  useEffect(() => {
    const fetchProjectTypes = async () => {
      try {
        const response = await masterTypeApiService.getAll('project', {})
        const types = response.payload.map((type) => ({
          value: type.id,
          label: type.title,
        }))
        setProjectTypes(types)
      } catch (error) {
        console.error('Error fetching project types:', error)
      }
    }

    fetchProjectTypes()
  }, [])

  const fetchFunctionalClassifications = (params: GetRequestParam): Promise<IApiResponse<FunctionalClassification[]>> => {
    return functionalClassificationApiService.getAll(params)
  }

  const {
    data: functionalClassifications,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<FunctionalClassification[]>({
    queryKey: ["functionalClassifications"],
    fetchFunction: fetchFunctionalClassifications,
  })

  const toggleDrawer = () => {
    setSelectedRow({} as FunctionalClassification)
    setShowDrawer(!showDrawer)
  }

  const toggleDetailDrawer = () => {
    setSelectedRow({} as FunctionalClassification)
    setShowDetailDrawer(!showDetailDrawer)
  }

  const handleEdit = (functionalClassification: FunctionalClassification) => {
    toggleDrawer()
    setSelectedRow(functionalClassification)
  }

  const handleDelete = async (functionalClassificationId: string) => {
    await functionalClassificationApiService.delete(functionalClassificationId)
    refetch()
  }

  const handleClickDetail = (functionalClassification: FunctionalClassification) => {
    toggleDetailDrawer()
    setSelectedRow(functionalClassification)
  }

  const mapFunctionalClassificationToDetailItems = (
    functionalClassification: FunctionalClassification,
  ): { title: string; value: string }[] => {
    const projectType = projectTypes.find(type => type.value === functionalClassification.project_type_id)
    return [
      { title: t("master-data.functional-classification.title"), value: functionalClassification?.title || "N/A" },
      { title: t("master-data.functional-classification.description"), value: functionalClassification?.description || "N/A" },
      {
        title: t("master-data.functional-classification.project-type"),
        value: projectType ? projectType.label : "N/A",
      },
      {
        title: t("common.table-columns.created-at"),
        value: functionalClassification?.created_at ? formatCreatedAt(functionalClassification.created_at) : "N/A",
      },
    ]
  }

  return (
    <Box>
      {showDrawer && (
        <FunctionalClassificationDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          refetch={refetch}
          functionalClassification={selectedRow as FunctionalClassification}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapFunctionalClassificationToDetailItems(selectedRow as FunctionalClassification)}
          id={selectedRow?.id || ""}
          hasReference={true}
          fileType="FUNCTIONAL_CLASSIFICATION"
          title={t("master-data.functional-classification.details")}
        />
      )}

      <ItemsListing
        title={t("master-data.functional-classification.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: functionalClassificationColumns(handleClickDetail, handleEdit, handleDelete, t, projectTypes),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <FunctionalClassificationCard
            onDetail={handleClickDetail}
            functionalClassification={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
            projectTypes={projectTypes}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: "create",
            subject: "functionalclassification",
          },
        }}
        fetchDataFunction={refetch}
        items={functionalClassifications || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  )
}

export default FunctionalClassificationList
