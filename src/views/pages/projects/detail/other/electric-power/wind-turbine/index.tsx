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
import type { WindTurbine } from "src/types/project/other";
import type { GetRequestParam, IApiResponse } from "src/types/requests";
import { formatCreatedAt } from "src/utils/formatter/date";
import ItemsListing from "src/views/shared/listing";
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer";
import WindTurbineCard from "./wind-turbine-card";
import WindTurbineDrawer from "./wind-turbine-drawer";
import { windTurbineColumns } from "./wind-turbine-row";
import { useQuery } from "@tanstack/react-query";
import { projectMasterModels } from "src/constants/master-data/project-general-master-constants";
import projectGeneralMasterDataApiService from "src/services/general/project-general-master-data-service";

interface WindTurbineListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const WindTurbineList: React.FC<WindTurbineListProps> = ({
  otherSubMenu,
  projectId,
  typeId,
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<WindTurbine | null>(null);
  const { t } = useTranslation();

  // Fetch master data for displaying titles instead of IDs
  const { data: towerTypes } = useQuery({
    queryKey: ["tower-types"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.towerType.model },
      }),
  });

  const { data: generatorTypes } = useQuery({
    queryKey: ["generator-types"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.generatorType.model },
      }),
  });

  // Create maps for quick lookup
  const towerTypeMap = new Map(
    towerTypes?.payload.map((item) => [item.id, item.title || ""]) || [],
  );
  const generatorTypeMap = new Map(
    generatorTypes?.payload.map((item) => [item.id, item.title || ""]) || [],
  );

  const fetchWindTurbines = (
    params: GetRequestParam,
  ): Promise<IApiResponse<WindTurbine[]>> => {
    return projectOtherApiSecondService<WindTurbine>().getAll(
      otherSubMenu?.apiRoute || "",
      {
        ...params,
        filter: { ...params.filter, project_id: projectId },
      },
    );
  };

  const {
    data: windTurbines,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<WindTurbine[]>({
    queryKey: ["windTurbines"],
    fetchFunction: fetchWindTurbines,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as WindTurbine);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as WindTurbine);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (windTurbine: WindTurbine) => {
    toggleDrawer();
    setSelectedRow(windTurbine);
  };

  const handleDelete = async (windTurbineId: string) => {
    await projectOtherApiSecondService<WindTurbine>().delete(
      otherSubMenu?.apiRoute || "",
      windTurbineId,
    );
    refetch();
  };

  const handleClickDetail = (windTurbine: WindTurbine) => {
    toggleDetailDrawer();
    setSelectedRow(windTurbine);
  };

  const mapWindTurbineToDetailItems = (
    windTurbine: WindTurbine,
  ): { title: string; value: string }[] => [
    {
      title: t("project.other.wind-turbine.details.turbine-manufacturer"),
      value: windTurbine?.turbine_manufacturer || "N/A",
    },
    {
      title: t("project.other.wind-turbine.details.turbine-model"),
      value: windTurbine?.turbine_model || "N/A",
    },
    {
      title: t("project.other.wind-turbine.details.rotor-diameter"),
      value:
        windTurbine?.rotor_diameter !== undefined
          ? `${windTurbine.rotor_diameter} ${t("common.meters")}`
          : "N/A",
    },
    {
      title: t("project.other.wind-turbine.details.hub-height"),
      value:
        windTurbine?.hub_height !== undefined
          ? `${windTurbine.hub_height} ${t("common.meters")}`
          : "N/A",
    },
    {
      title: t("project.other.wind-turbine.details.tower-type"),
      value: windTurbine?.tower_type_id
        ? towerTypeMap.get(windTurbine.tower_type_id) ||
          windTurbine.tower_type_id
        : "N/A",
    },
    {
      title: t("project.other.wind-turbine.details.blade-length"),
      value:
        windTurbine?.blade_length !== undefined
          ? `${windTurbine.blade_length} ${t("common.meters")}`
          : "N/A",
    },
    {
      title: t("project.other.wind-turbine.details.blades-number"),
      value:
        windTurbine?.blades_number !== undefined
          ? windTurbine.blades_number.toString()
          : "N/A",
    },
    {
      title: t("project.other.wind-turbine.details.gearbox-type"),
      value: windTurbine?.gearbox_type || "N/A",
    },
    {
      title: t("project.other.wind-turbine.details.generator-type"),
      value: windTurbine?.generator_type_id
        ? generatorTypeMap.get(windTurbine.generator_type_id) ||
          windTurbine.generator_type_id
        : "N/A",
    },
    {
      title: t("project.other.wind-turbine.details.generators-number"),
      value:
        windTurbine?.generators_number !== undefined
          ? windTurbine.generators_number.toString()
          : "N/A",
    },
    {
      title: t("project.other.wind-turbine.details.remark"),
      value: windTurbine?.remark || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: windTurbine?.created_at
        ? formatCreatedAt(windTurbine.created_at)
        : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: windTurbine?.updated_at
        ? formatCreatedAt(windTurbine.updated_at)
        : "N/A",
    },
  ];

  return (
    <Box>
      {showDrawer && (
        <WindTurbineDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          windTurbine={selectedRow as WindTurbine}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapWindTurbineToDetailItems(selectedRow as WindTurbine)}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={uploadableProjectFileTypes.other.windTurbine}
          title={t("project.other.wind-turbine.wind-turbine-details")}
        />
      )}

      <ItemsListing
        title={t("project.other.wind-turbine.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: windTurbineColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            towerTypeMap,
            generatorTypeMap,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <WindTurbineCard
            onDetail={handleClickDetail}
            windTurbine={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
            towerTypeMap={towerTypeMap}
            generatorTypeMap={generatorTypeMap}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: "create",
            subject: "windturbine",
          },
        }}
        fetchDataFunction={refetch}
        items={windTurbines || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default WindTurbineList;
