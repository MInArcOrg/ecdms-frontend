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
import type { MiniGridStationDistributionLine, MiniGridStation } from "src/types/project/other"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import { formatCreatedAt } from "src/utils/formatter/date"
import ItemsListing from "src/views/shared/listing"
import { useQuery } from "@tanstack/react-query"
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer"
import MiniGridStationDistributionLineCard from "./mini-grid-station-distribution-line-card"
import MiniGridStationDistributionLineDrawer from "./mini-grid-station-distribution-line-drawer"
import { miniGridStationDistributionLineColumns } from "./mini-grid-station-distribution-line-row"
import { projectMasterModels } from "src/constants/master-data/project-general-master-constants"
import projectGeneralMasterDataApiService from "src/services/general/project-general-master-data-service"

interface MiniGridStationDistributionLineListProps {
    otherSubMenu?: OtherMenuRoute
    typeId: string
    projectId: string
}

const MiniGridStationDistributionLineList: React.FC<MiniGridStationDistributionLineListProps> = ({ otherSubMenu, projectId, typeId }) => {
    const [showDrawer, setShowDrawer] = useState(false)
    const [showDetailDrawer, setShowDetailDrawer] = useState(false)
    const [selectedRow, setSelectedRow] = useState<MiniGridStationDistributionLine | null>(null)
    const { t } = useTranslation()

    const { data: miniGridStations } = useQuery({
        queryKey: ["mini-grid-stations", projectId],
        queryFn: () =>
            projectOtherApiSecondService<MiniGridStation>().getAll("mini-grid-stations", {}),
    })

    // Fetch transformer types for dropdown
    const { data: transformerTypes } = useQuery({
        queryKey: ["transformer-types"],
        queryFn: () =>
            projectGeneralMasterDataApiService.getAll({
                filter: { model: projectMasterModels.transformerType.model },
            }),
    })

    const fetchMiniGridStationDistributionLines = (params: GetRequestParam): Promise<IApiResponse<MiniGridStationDistributionLine[]>> => {
        return projectOtherApiSecondService<MiniGridStationDistributionLine>().getAll(otherSubMenu?.apiRoute || "", {})
    }

    const {
        data: miniGridStationDistributionLines,
        isLoading,
        pagination,
        handlePageChange,
        refetch,
    } = usePaginatedFetch<MiniGridStationDistributionLine[]>({
        queryKey: ["miniGridStationDistributionLines"],
        fetchFunction: fetchMiniGridStationDistributionLines,
    })

    const toggleDrawer = () => {
        setSelectedRow({} as MiniGridStationDistributionLine)
        setShowDrawer(!showDrawer)
    }

    const toggleDetailDrawer = () => {
        setSelectedRow({} as MiniGridStationDistributionLine)
        setShowDetailDrawer(!showDetailDrawer)
    }

    const handleEdit = (miniGridStationDistributionLine: MiniGridStationDistributionLine) => {
        toggleDrawer()
        setSelectedRow(miniGridStationDistributionLine)
    }

    const handleDelete = async (miniGridStationDistributionLineId: string) => {
        await projectOtherApiSecondService<MiniGridStationDistributionLine>().delete(otherSubMenu?.apiRoute || "", miniGridStationDistributionLineId)
        refetch()
    }

    const handleClickDetail = (miniGridStationDistributionLine: MiniGridStationDistributionLine) => {
        toggleDetailDrawer()
        setSelectedRow(miniGridStationDistributionLine)
    }

    const miniGridStationsMap = new Map(miniGridStations?.payload.map((item: MiniGridStation) => [item.id, item.name || '']) || []);
    const transformerTypesMap = new Map(transformerTypes?.payload.map((item: any) => [item.id, item.title || '']) || []);

    const mapMiniGridStationDistributionLineToDetailItems = (miniGridStationDistributionLine: MiniGridStationDistributionLine): { title: string; value: string }[] => [
        {
            title: t("project.other.mini-grid-station-distribution-line.details.name"),
            value: miniGridStationDistributionLine?.name || "N/A",
        },
        {
            title: t("project.other.mini-grid-station-distribution-line.details.mini-grid-station-id"),
            value: miniGridStationDistributionLine?.mini_grid_station_id ? miniGridStationsMap.get(miniGridStationDistributionLine?.mini_grid_station_id) || miniGridStationDistributionLine?.mini_grid_station_id : 'N/A'
        },
        {
            title: t("project.other.mini-grid-station-distribution-line.details.system-type"),
            value: miniGridStationDistributionLine?.system_type || "N/A",
        },
        {
            title: t("project.other.mini-grid-station-distribution-line.details.lines-type"),
            value: miniGridStationDistributionLine?.lines_type || "N/A",
        },
        {
            title: t("project.other.mini-grid-station-distribution-line.details.line-length"),
            value: miniGridStationDistributionLine?.line_length !== undefined
                ? `${miniGridStationDistributionLine.line_length} ${t("common.km")}`
                : "N/A",
        },
        {
            title: t("project.other.mini-grid-station-distribution-line.details.poles"),
            value: miniGridStationDistributionLine?.poles || "N/A",
        },
        {
            title: t("project.other.mini-grid-station-distribution-line.details.transformer-type-id"),
            value: miniGridStationDistributionLine?.transformer_type_id ? transformerTypesMap.get(miniGridStationDistributionLine?.transformer_type_id) || miniGridStationDistributionLine?.transformer_type_id : 'N/A'
        },
        {
            title: t("project.other.mini-grid-station-distribution-line.details.transformers-number"),
            value: miniGridStationDistributionLine?.transformers_number !== undefined
                ? miniGridStationDistributionLine.transformers_number.toString()
                : "N/A",
        },
        {
            title: t("project.other.mini-grid-station-distribution-line.details.transformers-size"),
            value: miniGridStationDistributionLine?.transformers_size !== undefined
                ? `${miniGridStationDistributionLine.transformers_size} ${t("common.kva")}`
                : "N/A",
        },
        {
            title: t("project.other.mini-grid-station-distribution-line.details.remark"),
            value: miniGridStationDistributionLine?.remark || "N/A",
        },
        {
            title: t("common.table-columns.created-at"),
            value: miniGridStationDistributionLine?.created_at ? formatCreatedAt(miniGridStationDistributionLine.created_at) : "N/A",
        },
        {
            title: t("common.table-columns.updated-at"),
            value: miniGridStationDistributionLine?.updated_at ? formatCreatedAt(miniGridStationDistributionLine.updated_at) : "N/A",
        },
    ]

    return (
        <Box>
            {showDrawer && (
                <MiniGridStationDistributionLineDrawer
                    otherSubMenu={otherSubMenu}
                    open={showDrawer}
                    toggle={toggleDrawer}
                    miniGridStationDistributionLine={selectedRow as MiniGridStationDistributionLine}
                    refetch={refetch}
                    projectId={projectId}
                    miniGridStations={miniGridStations?.payload || []}
                />
            )}

            {showDetailDrawer && (
                <OtherDetailSidebar
                    show={showDetailDrawer}
                    toggleDrawer={toggleDetailDrawer}
                    data={mapMiniGridStationDistributionLineToDetailItems(selectedRow as MiniGridStationDistributionLine)}
                    hasReference={true}
                    id={selectedRow?.id || ""}
                    fileType={uploadableProjectFileTypes.other.mini_grid_station_distribution_line}
                    title={t("project.other.mini-grid-station-distribution-line.mini-grid-station-distribution-line-details")}
                />
            )}

            <ItemsListing
                title={t("project.other.mini-grid-station-distribution-line.title")}
                pagination={pagination}
                type={ITEMS_LISTING_TYPE.table.value}
                tableProps={{
                    headers: miniGridStationDistributionLineColumns(
                        handleClickDetail,
                        handleEdit,
                        handleDelete,
                        t,
                        refetch,
                    ),
                }}
                isLoading={isLoading}
                ItemViewComponent={({ data }) => (
                    <MiniGridStationDistributionLineCard
                        onDetail={handleClickDetail}
                        miniGridStationDistributionLine={data}
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
                        subject: "minigridstationdistributionline",
                    },
                }}
                fetchDataFunction={refetch}
                items={miniGridStationDistributionLines || []}
                onPaginationChange={handlePageChange}
            />
        </Box>
    )
}

export default MiniGridStationDistributionLineList