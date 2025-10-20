"use client";

import type React from "react";
import { Box, Chip } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import { defaultCreateActionConfig } from "src/types/general/listing";
import type { GetRequestParam, IApiResponse } from "src/types/requests";
import ItemsListing from "src/views/shared/listing";
import OtherDetailSidebar from "src/views/shared/layouts/other/other-detail-drawer";
import { RailwayPowerSubstationAndEquipment } from "src/types/project/other";
import { formatCreatedAt } from "src/utils/formatter/date";
import RailwayPowerSubstationAndEquipmentCard from "./railway-power-substations-and-equipment-card";
import RailwayPowerSubstationAndEquipmentDrawer from "./railway-power-substations-and-equipment-drawer";
import { railwayPowerSubstationAndEquipmentColumns } from "./railway-power-substations-and-equipment-row";
import FileDrawer from "src/views/components/custom/files-drawer";

interface RailwayPowerSubstationAndEquipmentListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}



const RailwayPowerSubstationAndEquipmentList: React.FC<
  RailwayPowerSubstationAndEquipmentListProps
> = ({ otherSubMenu, projectId }) => {
  const RAILWAY_POWER_SUBSTATION_FILE_TYPES = [
    otherSubMenu?.fileType || '',
    "TRANSFORMER_SWITCHGEAR_OTHER_COMPONENT_FILE",
  ];
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<RailwayPowerSubstationAndEquipment | null>(null);
  const { t } = useTranslation();

  const fetchSubstation = (
    params: GetRequestParam,
  ): Promise<IApiResponse<RailwayPowerSubstationAndEquipment[]>> => {
    return projectOtherApiSecondService<RailwayPowerSubstationAndEquipment>().getAll(
      otherSubMenu?.apiRoute || "",
      {
        ...params,
        filter: { ...params.filter, project_id: projectId },
      },
    );
  };

  const {
    data: substations,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<RailwayPowerSubstationAndEquipment[]>({
    queryKey: ["railwayPowerSubstationAndEquipment"],
    fetchFunction: fetchSubstation,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwayPowerSubstationAndEquipment);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayPowerSubstationAndEquipment);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (
    specs: RailwayPowerSubstationAndEquipment,
  ) => {
    toggleDrawer();
    setSelectedRow(specs);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwayPowerSubstationAndEquipment>().delete(
      otherSubMenu?.apiRoute || "",
      id,
    );
    refetch();
  };

  const handleClickDetail = (
    specs: RailwayPowerSubstationAndEquipment,
  ) => {
    toggleDetailDrawer();
    setSelectedRow(specs);
  };

  const mapSubstationToDetailItems = (
    specs: RailwayPowerSubstationAndEquipment,
  ): { title: string; value: any }[] => [
      {
        title: t("common.table-columns.id"),
        value: specs?.id || "N/A",
      },
      {
        title: t(
          "project.other.railway-power-substations-and-equipment.details.railway_station_platform_layout_id",
        ),
        value: specs?.railwayStationPlatformLayout?.name || specs?.railway_station_platform_layout_id || "N/A",
      },
      {
        title: t(
          "project.other.railway-power-substations-and-equipment.details.substation_capacity_and_equipment_specifications",
        ),
        value: specs?.substation_capacity_and_equipment_specifications || "N/A",
      },
      {
        title: t(
          "project.other.railway-power-substations-and-equipment.details.remark",
        ),
        value: specs?.remark || "N/A",
      },
      {
        title: t("common.form.attachment"),
        value: (

          <FileDrawer
            id={specs.id}
            type={RAILWAY_POWER_SUBSTATION_FILE_TYPES[1]} // Pass all types to the generic drawer for listing
          />
        ),
      },
      {
        title: t("project.other.railway-power-substations-and-equipment.details.transformer-component-document-upload"),
        value: (

          <FileDrawer
            id={specs.id}
            type={RAILWAY_POWER_SUBSTATION_FILE_TYPES[1]} // Pass all types to the generic drawer for listing
          />
        ),
      },
      {
        title: t("common.table-columns.created-at"),
        value: specs?.created_at
          ? formatCreatedAt(specs.created_at)
          : "N/A",
      },
      {
        title: t("common.table-columns.updated-at"),
        value: specs?.updated_at
          ? formatCreatedAt(specs.updated_at)
          : "N/A",
      },
    ];

  return (
    <Box>
      {showDrawer && (
        <RailwayPowerSubstationAndEquipmentDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayPowerSubstationAndEquipment={
            selectedRow as RailwayPowerSubstationAndEquipment
          }
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapSubstationToDetailItems(
            selectedRow as RailwayPowerSubstationAndEquipment,
          )}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={RAILWAY_POWER_SUBSTATION_FILE_TYPES.join(',')}
          title={t(
            "project.other.railway-power-substations-and-equipment.detail",
          )}
        />
      )}

      <ItemsListing
        title={t(
          "project.other.railway-power-substations-and-equipment.title",
        )}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayPowerSubstationAndEquipmentColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            otherSubMenu,
            RAILWAY_POWER_SUBSTATION_FILE_TYPES || [],
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwayPowerSubstationAndEquipmentCard
            onDetail={handleClickDetail}
            railwayPowerSubstationAndEquipment={
              data as RailwayPowerSubstationAndEquipment
            }
            onEdit={handleEdit}
            refetch={refetch}
            otherSubMenu={otherSubMenu}
            onDelete={handleDelete}
            fileTypes={RAILWAY_POWER_SUBSTATION_FILE_TYPES}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: "create",
            subject: "railwaypowersubstationandequipment",
          },
        }}
        fetchDataFunction={refetch}
        items={substations || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwayPowerSubstationAndEquipmentList;