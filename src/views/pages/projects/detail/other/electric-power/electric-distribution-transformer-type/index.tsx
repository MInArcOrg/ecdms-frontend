"use client";

import type React from "react";

import { Box } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import { uploadableProjectFileTypes } from "src/services/utils/file-constants";
import { defaultCreateActionConfig } from "src/types/general/listing";
import type {
  ElectricDistributionTransformerType,
  MiniGridStation,
} from "src/types/project/other";
import type { GetRequestParam, IApiResponse } from "src/types/requests";
import { formatCreatedAt } from "src/utils/formatter/date";
import ItemsListing from "src/views/shared/listing";
import { useQuery } from "@tanstack/react-query";
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer";
import ElectricDistributionTransformerTypeCard from "./electric-distribution-transformer-type-card";
import ElectricDistributionTransformerTypeDrawer from "./electric-distribution-transformer-type-drawer";
import { electricDistributionTransformerTypeColumns } from "./electric-distribution-transformer-type-row";
import { projectMasterModels } from "src/constants/master-data/project-general-master-constants";
import projectGeneralMasterDataApiService from "src/services/general/project-general-master-data-service";

interface ElectricDistributionTransformerTypeListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const ElectricDistributionTransformerTypeList: React.FC<
  ElectricDistributionTransformerTypeListProps
> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<ElectricDistributionTransformerType | null>(null);
  const { t } = useTranslation();

  // Fetch mini grid stations
  const { data: miniGridStations } = useQuery({
    queryKey: ["mini-grid-stations", projectId],
    queryFn: () =>
      projectOtherApiSecondService<MiniGridStation>().getAll(
        "mini-grid-stations",
        {},
      ),
  });

  // Fetch transformer types from master data
  const { data: transformerTypes } = useQuery({
    queryKey: ["transformer-types"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.transformerType.model },
      }),
  });

  // Fetch protection installed from master data
  const { data: protectionInstalled } = useQuery({
    queryKey: ["protection-installed"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.protectionInstalled.model },
      }),
  });

  // Fetch safety problems encountered from master data
  const { data: safetyProblemsEncountered } = useQuery({
    queryKey: ["safety-problems-encountered"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.safetyProblemsEncountered.model },
      }),
  });

  const fetchElectricDistributionTransformerTypes = (
    params: GetRequestParam,
  ): Promise<IApiResponse<ElectricDistributionTransformerType[]>> => {
    return projectOtherApiSecondService<ElectricDistributionTransformerType>().getAll(
      otherSubMenu?.apiRoute || "",
      {},
    );
  };

  const {
    data: electricDistributionTransformerTypes,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<ElectricDistributionTransformerType[]>({
    queryKey: ["electricDistributionTransformerTypes"],
    fetchFunction: fetchElectricDistributionTransformerTypes,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as ElectricDistributionTransformerType);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as ElectricDistributionTransformerType);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (
    electricDistributionTransformerType: ElectricDistributionTransformerType,
  ) => {
    toggleDrawer();
    setSelectedRow(electricDistributionTransformerType);
  };

  const handleDelete = async (
    electricDistributionTransformerTypeId: string,
  ) => {
    await projectOtherApiSecondService<ElectricDistributionTransformerType>().delete(
      otherSubMenu?.apiRoute || "",
      electricDistributionTransformerTypeId,
    );
    refetch();
  };

  const handleClickDetail = (
    electricDistributionTransformerType: ElectricDistributionTransformerType,
  ) => {
    toggleDetailDrawer();
    setSelectedRow(electricDistributionTransformerType);
  };

  // Create maps for dropdown values
  const miniGridStationsMap = new Map(
    miniGridStations?.payload.map((item: MiniGridStation) => [
      item.id,
      item.name || "",
    ]) || [],
  );
  const transformerTypesMap = new Map(
    transformerTypes?.payload.map((item: any) => [item.id, item.title || ""]) ||
      [],
  );
  const protectionInstalledMap = new Map(
    protectionInstalled?.payload.map((item: any) => [
      item.id,
      item.title || "",
    ]) || [],
  );
  const safetyProblemsEncounteredMap = new Map(
    safetyProblemsEncountered?.payload.map((item: any) => [
      item.id,
      item.title || "",
    ]) || [],
  );

  const mapElectricDistributionTransformerTypeToDetailItems = (
    electricDistributionTransformerType: ElectricDistributionTransformerType,
  ): { title: string; value: string }[] => [
    {
      title: t(
        "project.other.electric-distribution-transformer-type.details.name",
      ),
      value: electricDistributionTransformerType?.name || "N/A",
    },
    {
      title: t(
        "project.other.electric-distribution-transformer-type.details.mini-grid-station-id",
      ),
      value: electricDistributionTransformerType?.mini_grid_station_id
        ? miniGridStationsMap.get(
            electricDistributionTransformerType.mini_grid_station_id,
          ) || electricDistributionTransformerType.mini_grid_station_id
        : "N/A",
    },
    {
      title: t(
        "project.other.electric-distribution-transformer-type.details.transformer-type-id",
      ),
      value: electricDistributionTransformerType?.transformer_type_id
        ? transformerTypesMap.get(
            electricDistributionTransformerType.transformer_type_id,
          ) || electricDistributionTransformerType.transformer_type_id
        : "N/A",
    },
    {
      title: t(
        "project.other.electric-distribution-transformer-type.details.cooling-type",
      ),
      value: electricDistributionTransformerType?.cooling_type || "N/A",
    },
    {
      title: t(
        "project.other.electric-distribution-transformer-type.details.transformer-power-rating",
      ),
      value:
        electricDistributionTransformerType?.transformer_power_rating !==
        undefined
          ? `${
              electricDistributionTransformerType.transformer_power_rating
            } ${t("common.kva")}`
          : "N/A",
    },
    {
      title: t(
        "project.other.electric-distribution-transformer-type.details.lifetime",
      ),
      value:
        electricDistributionTransformerType?.lifetime !== undefined
          ? `${electricDistributionTransformerType.lifetime} ${t(
              "common.years",
            )}`
          : "N/A",
    },
    {
      title: t(
        "project.other.electric-distribution-transformer-type.details.protection-installed-id",
      ),
      value: electricDistributionTransformerType?.protection_installed_id
        ? protectionInstalledMap.get(
            electricDistributionTransformerType.protection_installed_id,
          ) || electricDistributionTransformerType.protection_installed_id
        : "N/A",
    },
    {
      title: t(
        "project.other.electric-distribution-transformer-type.details.safety-problems-encountered-id",
      ),
      value: electricDistributionTransformerType?.safety_problems_encountered_id
        ? safetyProblemsEncounteredMap.get(
            electricDistributionTransformerType.safety_problems_encountered_id,
          ) ||
          electricDistributionTransformerType.safety_problems_encountered_id
        : "N/A",
    },
    {
      title: t(
        "project.other.electric-distribution-transformer-type.details.work-accidents-number",
      ),
      value:
        electricDistributionTransformerType?.work_accidents_number?.toString() ||
        "N/A",
    },
    {
      title: t(
        "project.other.electric-distribution-transformer-type.details.on-site-safety-regulation-implemented",
      ),
      value:
        electricDistributionTransformerType?.on_site_safety_regulation_implemented !==
        undefined
          ? electricDistributionTransformerType.on_site_safety_regulation_implemented
            ? t("common.yes")
            : t("common.no")
          : "N/A",
    },
    {
      title: t(
        "project.other.electric-distribution-transformer-type.details.remark",
      ),
      value: electricDistributionTransformerType?.remark || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: electricDistributionTransformerType?.created_at
        ? formatCreatedAt(electricDistributionTransformerType.created_at)
        : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: electricDistributionTransformerType?.updated_at
        ? formatCreatedAt(electricDistributionTransformerType.updated_at)
        : "N/A",
    },
  ];

  return (
    <Box>
      {showDrawer && (
        <ElectricDistributionTransformerTypeDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          electricDistributionTransformerType={
            selectedRow as ElectricDistributionTransformerType
          }
          refetch={refetch}
          projectId={projectId}
          miniGridStations={miniGridStations?.payload || []}
          transformerTypes={transformerTypes?.payload || []}
          protectionInstalled={protectionInstalled?.payload || []}
          safetyProblemsEncountered={safetyProblemsEncountered?.payload || []}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapElectricDistributionTransformerTypeToDetailItems(
            selectedRow as ElectricDistributionTransformerType,
          )}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={
            uploadableProjectFileTypes.other
              .electric_distribution_transformer_type
          }
          title={t(
            "project.other.electric-distribution-transformer-type.electric-distribution-transformer-type-details",
          )}
        />
      )}

      <ItemsListing
        title={t("project.other.electric-distribution-transformer-type.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: electricDistributionTransformerTypeColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            miniGridStationsMap,
            transformerTypesMap,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <ElectricDistributionTransformerTypeCard
            onDetail={handleClickDetail}
            electricDistributionTransformerType={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
            miniGridStationsMap={miniGridStationsMap}
            transformerTypesMap={transformerTypesMap}
            protectionInstalledMap={protectionInstalledMap}
            safetyProblemsEncounteredMap={safetyProblemsEncounteredMap}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: true,
          permission: {
            action: "create",
            subject: "electricdistributiontransformertype",
          },
        }}
        fetchDataFunction={refetch}
        items={electricDistributionTransformerTypes || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default ElectricDistributionTransformerTypeList;
