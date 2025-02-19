"use client"

import type React from "react"

import { Box } from "@mui/material"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants"
import usePaginatedFetch from "src/hooks/use-paginated-fetch"
import designClassificationApiService from "src/services/master-data/design-classification-service"
import masterTypeApiService from "src/services/master-data/master-type-service"
import { defaultCreateActionConfig } from "src/types/general/listing"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import { formatCreatedAt } from "src/utils/formatter/date"
import ItemsListing from "src/views/shared/listing"
import OtherDetailSidebar from "src/views/shared/layouts/other/other-detail-drawer"
import DesignClassificationCard from "./design-classification-card"
import DesignClassificationDrawer from "./design-classification-drawer"
import type { DesignClassification } from "src/types/master/design-classification"
import { designClassificationColumns } from "./design-classification-row"

const DesignClassificationList: React.FC = () => {
    const [showDrawer, setShowDrawer] = useState(false)
    const [showDetailDrawer, setShowDetailDrawer] = useState(false)
    const [selectedRow, setSelectedRow] = useState<DesignClassification | null>(null)
    const [projectTypes, setProjectTypes] = useState<{ value: string; label: string }[]>([])
    const { t } = useTranslation()

    useEffect(() => {
        const fetchProjectTypes = async () => {
            try {
                const response = await masterTypeApiService.getAll("project", {})
                const types = response.payload.map((type) => ({
                    value: type.id,
                    label: type.title,
                }))
                setProjectTypes(types)
            } catch (error) {
                console.error("Error fetching project types:", error)
            }
        }

        fetchProjectTypes()
    }, [])

    const fetchDesignClassifications = (params: GetRequestParam): Promise<IApiResponse<DesignClassification[]>> => {
        return designClassificationApiService.getAll(params)
    }

    const {
        data: designClassifications,
        isLoading,
        pagination,
        handlePageChange,
        refetch,
    } = usePaginatedFetch<DesignClassification[]>({
        queryKey: ["designClassifications"],
        fetchFunction: fetchDesignClassifications,
    })

    const toggleDrawer = () => {
        setSelectedRow({} as DesignClassification)
        setShowDrawer(!showDrawer)
    }

    const toggleDetailDrawer = () => {
        setSelectedRow({} as DesignClassification)
        setShowDetailDrawer(!showDetailDrawer)
    }

    const handleEdit = (designClassification: DesignClassification) => {
        toggleDrawer()
        setSelectedRow(designClassification)
    }

    const handleDelete = async (designClassificationId: string) => {
        await designClassificationApiService.delete(designClassificationId)
        refetch()
    }

    const handleClickDetail = (designClassification: DesignClassification) => {
        toggleDetailDrawer()
        setSelectedRow(designClassification)
    }

    const mapDesignClassificationToDetailItems = (
        designClassification: DesignClassification,
    ): { title: string; value: string }[] => {
        const projectType = projectTypes.find((type) => type.value === designClassification.project_type_id)
        return [
            { title: t("master-data.design-classification.title"), value: designClassification?.title || "N/A" },
            { title: t("master-data.design-classification.description"), value: designClassification?.description || "N/A" },
            {
                title: t("master-data.design-classification.project-type"),
                value: projectType ? projectType.label : "N/A",
            },
            {
                title: t("common.table-columns.created-at"),
                value: designClassification?.created_at ? formatCreatedAt(designClassification.created_at) : "N/A",
            },
        ]
    }

    return (
        <Box>
            {showDrawer && (
                <DesignClassificationDrawer
                    open={showDrawer}
                    toggle={toggleDrawer}
                    refetch={refetch}
                    designClassification={selectedRow as DesignClassification}
                />
            )}

            {showDetailDrawer && (
                <OtherDetailSidebar
                    show={showDetailDrawer}
                    toggleDrawer={toggleDetailDrawer}
                    data={mapDesignClassificationToDetailItems(selectedRow as DesignClassification)}
                    id={selectedRow?.id || ""}
                    hasReference={true}
                    fileType="DESIGN_CLASSIFICATION"
                    title={t("master-data.design-classification.details")}
                />
            )}

            <ItemsListing
                title={t("master-data.design-classification.title")}
                pagination={pagination}
                type={ITEMS_LISTING_TYPE.table.value}
                tableProps={{
                    headers: designClassificationColumns(handleClickDetail, handleEdit, handleDelete, t, projectTypes),
                }}
                isLoading={isLoading}
                ItemViewComponent={({ data }) => (
                    <DesignClassificationCard
                        onDetail={handleClickDetail}
                        designClassification={data}
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
                        subject: "designclassification",
                    },
                }}
                fetchDataFunction={refetch}
                items={designClassifications || []}
                onPaginationChange={handlePageChange}
            />
        </Box>
    )
}

export default DesignClassificationList

