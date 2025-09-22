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
import type { SolarPanel } from "src/types/project/other";
import type { GetRequestParam, IApiResponse } from "src/types/requests";
import { formatCreatedAt } from "src/utils/formatter/date";
import ItemsListing from "src/views/shared/listing";
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer";
import SolarPanelCard from "./solar-panel-card";
import SolarPanelDrawer from "./solar-panel-drawer";
import { solarPanelColumns } from "./solar-panel-row";
import { useQuery } from "@tanstack/react-query";
import { projectMasterModels } from "src/constants/master-data/project-general-master-constants";
import projectGeneralMasterDataApiService from "src/services/general/project-general-master-data-service";

interface SolarPanelListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const SolarPanelList: React.FC<SolarPanelListProps> = ({
  otherSubMenu,
  projectId,
  typeId,
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<SolarPanel | null>(null);
  const { t } = useTranslation();

  // Fetch master data for displaying titles instead of IDs
  const { data: solarPanelTypes } = useQuery({
    queryKey: ["solar-panel-types"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.solarPanelType.model },
      }),
  });

  // Create maps for quick lookup
  const solarPanelTypeMap = new Map(
    solarPanelTypes?.payload.map((item) => [item.id, item.title || ""]) || [],
  );

  const fetchSolarPanels = (
    params: GetRequestParam,
  ): Promise<IApiResponse<SolarPanel[]>> => {
    return projectOtherApiSecondService<SolarPanel>().getAll(
      otherSubMenu?.apiRoute || "",
      {
        ...params,
        filter: { ...params.filter, project_id: projectId },
      },
    );
  };

  const {
    data: solarPanels,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<SolarPanel[]>({
    queryKey: ["solarPanels"],
    fetchFunction: fetchSolarPanels,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as SolarPanel);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as SolarPanel);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (solarPanel: SolarPanel) => {
    toggleDrawer();
    setSelectedRow(solarPanel);
  };

  const handleDelete = async (solarPanelId: string) => {
    await projectOtherApiSecondService<SolarPanel>().delete(
      otherSubMenu?.apiRoute || "",
      solarPanelId,
    );
    refetch();
  };

  const handleClickDetail = (solarPanel: SolarPanel) => {
    toggleDetailDrawer();
    setSelectedRow(solarPanel);
  };

  const mapSolarPanelToDetailItems = (
    solarPanel: SolarPanel,
  ): { title: string; value: string }[] => [
    {
      title: t("project.other.solar-panel.details.manufacturer"),
      value: solarPanel?.manufacturer || "N/A",
    },
    {
      title: t("project.other.solar-panel.details.model"),
      value: solarPanel?.model || "N/A",
    },
    {
      title: t("project.other.solar-panel.details.solar-panel-type"),
      value:
        solarPanelTypeMap.get(solarPanel?.solar_panel_type_id) ||
        solarPanel?.solar_panel_type_id ||
        "N/A",
    },
    {
      title: t("project.other.solar-panel.details.solar-panels-number"),
      value:
        solarPanel?.solar_panels_number !== undefined
          ? solarPanel.solar_panels_number.toString()
          : "N/A",
    },
    {
      title: t("project.other.solar-panel.details.each-solar-panel-capacity"),
      value:
        solarPanel?.each_solar_panel_capacity !== undefined
          ? `${solarPanel.each_solar_panel_capacity} ${t("common.watts")}`
          : "N/A",
    },
    {
      title: t("project.other.solar-panel.details.inverter-manufacturer"),
      value: solarPanel?.inverter_manufacturer || "N/A",
    },
    {
      title: t("project.other.solar-panel.details.inverter-model"),
      value: solarPanel?.inverter_model || "N/A",
    },
    {
      title: t("project.other.solar-panel.details.inverters-number"),
      value:
        solarPanel?.inverters_number !== undefined
          ? solarPanel.inverters_number.toString()
          : "N/A",
    },
    {
      title: t("project.other.solar-panel.details.other-equipment"),
      value: solarPanel?.other_equipment || "N/A",
    },
    {
      title: t("project.other.solar-panel.details.remark"),
      value: solarPanel?.remark || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: solarPanel?.created_at
        ? formatCreatedAt(solarPanel.created_at)
        : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: solarPanel?.updated_at
        ? formatCreatedAt(solarPanel.updated_at)
        : "N/A",
    },
  ];

  return (
    <Box>
      {showDrawer && (
        <SolarPanelDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          solarPanel={selectedRow as SolarPanel}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapSolarPanelToDetailItems(selectedRow as SolarPanel)}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={uploadableProjectFileTypes.other.solarPanel}
          title={t("project.other.solar-panel.solar-panel-details")}
        />
      )}

      <ItemsListing
        title={t("project.other.solar-panel.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: solarPanelColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            solarPanelTypeMap,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <SolarPanelCard
            onDetail={handleClickDetail}
            solarPanel={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
            solarPanelTypeMap={solarPanelTypeMap}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: true,
          permission: {
            action: "create",
            subject: "solarpanel",
          },
        }}
        fetchDataFunction={refetch}
        items={solarPanels || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default SolarPanelList;
