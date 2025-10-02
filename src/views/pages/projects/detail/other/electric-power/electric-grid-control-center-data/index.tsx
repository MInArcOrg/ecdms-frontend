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
  ElectricGridControlCenterData,
  MiniGridStation,
} from "src/types/project/other";
import type { GetRequestParam, IApiResponse } from "src/types/requests";
import { formatCreatedAt } from "src/utils/formatter/date";
import ItemsListing from "src/views/shared/listing";
import { useQuery } from "@tanstack/react-query";
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer";
import ElectricGridControlCenterDataCard from "./electric-grid-control-center-data-card";
import ElectricGridControlCenterDataDrawer from "./electric-grid-control-center-data-drawer";
import { electricGridControlCenterDataColumns } from "./electric-grid-control-center-data-row";
import { projectMasterModels } from "src/constants/master-data/project-general-master-constants";
import projectGeneralMasterDataApiService from "src/services/general/project-general-master-data-service";

interface ElectricGridControlCenterDataListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}
const ElectricGridControlCenterDataList: React.FC<
  ElectricGridControlCenterDataListProps
> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<ElectricGridControlCenterData | null>(null);
  const { t } = useTranslation();

  // Fetch mini grid stations
  const { data: miniGridStations } = useQuery({
    queryKey: ["mini-grid-stations", projectId],
    queryFn: () =>
      projectOtherApiSecondService<MiniGridStation>().getAll(
        "mini-grid-stations",
        {
          filter: { project_id: projectId },
        },
      ),
  });

  // Fetch control system types from master data
  const { data: controlSystemTypes } = useQuery({
    queryKey: ["control-system-types"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.controlSystemType.model },
      }),
  });

  // Fetch communication links from master data
  const { data: communicationLinks } = useQuery({
    queryKey: ["communication-links"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.communicationLinks.model },
      }),
  });

  const fetchElectricGridControlCenterData = (
    params: GetRequestParam,
  ): Promise<IApiResponse<ElectricGridControlCenterData[]>> => {
    return projectOtherApiSecondService<ElectricGridControlCenterData>().getAll(
      otherSubMenu?.apiRoute || "",
      {},
    );
  };

  const {
    data: electricGridControlCenterData,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<ElectricGridControlCenterData[]>({
    queryKey: ["electricGridControlCenterData"],
    fetchFunction: fetchElectricGridControlCenterData,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as ElectricGridControlCenterData);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as ElectricGridControlCenterData);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (
    electricGridControlCenterData: ElectricGridControlCenterData,
  ) => {
    toggleDrawer();
    setSelectedRow(electricGridControlCenterData);
  };

  const handleDelete = async (electricGridControlCenterDataId: string) => {
    await projectOtherApiSecondService<ElectricGridControlCenterData>().delete(
      otherSubMenu?.apiRoute || "",
      electricGridControlCenterDataId,
    );
    refetch();
  };

  const handleClickDetail = (
    electricGridControlCenterData: ElectricGridControlCenterData,
  ) => {
    toggleDetailDrawer();
    setSelectedRow(electricGridControlCenterData);
  };

  // Create maps for dropdown values
  const miniGridStationsMap = new Map(
    miniGridStations?.payload.map((item: MiniGridStation) => [
      item.id,
      item.name || "",
    ]) || [],
  );
  const controlSystemTypesMap = new Map(
    controlSystemTypes?.payload.map((item: any) => [
      item.id,
      item.title || "",
    ]) || [],
  );
  const communicationLinksMap = new Map(
    communicationLinks?.payload.map((item: any) => [
      item.id,
      item.title || "",
    ]) || [],
  );

  const mapElectricGridControlCenterDataToDetailItems = (
    electricGridControlCenterData: ElectricGridControlCenterData,
  ): { title: string; value: string }[] => [
    {
      title: t("project.other.electric-grid-control-center-data.details.name"),
      value: electricGridControlCenterData?.name || "N/A",
    },
    {
      title: t(
        "project.other.electric-grid-control-center-data.details.mini-grid-station-id",
      ),
      value: electricGridControlCenterData?.mini_grid_station_id
        ? miniGridStationsMap.get(
            electricGridControlCenterData.mini_grid_station_id,
          ) || electricGridControlCenterData.mini_grid_station_id
        : "N/A",
    },
    {
      title: t(
        "project.other.electric-grid-control-center-data.details.installation-year",
      ),
      value:
        electricGridControlCenterData?.installation_year !== undefined
          ? electricGridControlCenterData.installation_year.toString()
          : "N/A",
    },
    {
      title: t(
        "project.other.electric-grid-control-center-data.details.control-system-type-id",
      ),
      value: electricGridControlCenterData?.control_system_type_id
        ? controlSystemTypesMap.get(
            electricGridControlCenterData.control_system_type_id,
          ) || electricGridControlCenterData.control_system_type_id
        : "N/A",
    },
    {
      title: t(
        "project.other.electric-grid-control-center-data.details.communication-links-id",
      ),
      value: electricGridControlCenterData?.communication_links_id
        ? communicationLinksMap.get(
            electricGridControlCenterData.communication_links_id,
          ) || electricGridControlCenterData.communication_links_id
        : "N/A",
    },
    {
      title: t(
        "project.other.electric-grid-control-center-data.details.energy-management-system-capability",
      ),
      value:
        electricGridControlCenterData?.energy_management_system_capability !==
        undefined
          ? electricGridControlCenterData.energy_management_system_capability
            ? t("common.yes")
            : t("common.no")
          : "N/A",
    },
    {
      title: t(
        "project.other.electric-grid-control-center-data.details.remote-control-capability",
      ),
      value:
        electricGridControlCenterData?.remote_control_capability !== undefined
          ? electricGridControlCenterData.remote_control_capability
            ? t("common.yes")
            : t("common.no")
          : "N/A",
    },
    {
      title: t(
        "project.other.electric-grid-control-center-data.details.average-measured-data-reliability",
      ),
      value:
        electricGridControlCenterData?.average_measured_data_reliability !==
        undefined
          ? electricGridControlCenterData.average_measured_data_reliability.toString()
          : "N/A",
    },
    {
      title: t(
        "project.other.electric-grid-control-center-data.details.remark",
      ),
      value: electricGridControlCenterData?.remark || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: electricGridControlCenterData?.created_at
        ? formatCreatedAt(electricGridControlCenterData.created_at)
        : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: electricGridControlCenterData?.updated_at
        ? formatCreatedAt(electricGridControlCenterData.updated_at)
        : "N/A",
    },
  ];

  return (
    <Box>
      {showDrawer && (
        <ElectricGridControlCenterDataDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          electricGridControlCenterData={
            selectedRow as ElectricGridControlCenterData
          }
          refetch={refetch}
          projectId={projectId}
          miniGridStations={miniGridStations?.payload || []}
          controlSystemTypes={controlSystemTypes?.payload || []}
          communicationLinks={communicationLinks?.payload || []}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapElectricGridControlCenterDataToDetailItems(
            selectedRow as ElectricGridControlCenterData,
          )}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={
            uploadableProjectFileTypes.other.electric_grid_control_center_data
          }
          title={t(
            "project.other.electric-grid-control-center-data.electric-grid-control-center-data-details",
          )}
        />
      )}

      <ItemsListing
        title={t("project.other.electric-grid-control-center-data.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: electricGridControlCenterDataColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            miniGridStationsMap,
            controlSystemTypesMap,
            communicationLinksMap,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <ElectricGridControlCenterDataCard
            onDetail={handleClickDetail}
            electricGridControlCenterData={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
            miniGridStationsMap={miniGridStationsMap}
            controlSystemTypesMap={controlSystemTypesMap}
            communicationLinksMap={communicationLinksMap}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: "create",
            subject: "electricgridcontrolcenterdata",
          },
        }}
        fetchDataFunction={refetch}
        items={electricGridControlCenterData || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default ElectricGridControlCenterDataList;
