"use client";

import type React from "react";
import { Box } from "@mui/material";
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
import { RailwayVehicleMaintenanceAndInspection } from "src/types/project/other";
import { formatCreatedAt } from "src/utils/formatter/date";
import RailwayVehicleMaintenanceAndInspectionCard from "./railway-vehicle-maintenance-and-inspection-card";
import RailwayVehicleMaintenanceAndInspectionDrawer from "./railway-vehicle-maintenance-and-inspection-drawer";
import { railwayVehicleMaintenanceAndInspectionColumns } from "./railway-vehicle-maintenance-and-inspection-row";
import FileDrawer from "src/views/components/custom/files-drawer";

interface RailwayVehicleMaintenanceAndInspectionListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RailwayVehicleMaintenanceAndInspectionList: React.FC<
  RailwayVehicleMaintenanceAndInspectionListProps
> = ({ otherSubMenu, projectId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<RailwayVehicleMaintenanceAndInspection | null>(null);
  const { t } = useTranslation();

  const fetchMaintenanceAndInspection = (
    params: GetRequestParam,
  ): Promise<IApiResponse<RailwayVehicleMaintenanceAndInspection[]>> => {
    return projectOtherApiSecondService<RailwayVehicleMaintenanceAndInspection>().getAll(
      otherSubMenu?.apiRoute || "",
      {
        ...params,
        filter: { ...params.filter, project_id: projectId },
      },
    );
  };

  const {
    data: maintenanceAndInspection,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<RailwayVehicleMaintenanceAndInspection[]>({
    queryKey: ["railwayVehicleMaintenanceAndInspection"],
    fetchFunction: fetchMaintenanceAndInspection,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwayVehicleMaintenanceAndInspection);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayVehicleMaintenanceAndInspection);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (
    specs: RailwayVehicleMaintenanceAndInspection,
  ) => {
    toggleDrawer();
    setSelectedRow(specs);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwayVehicleMaintenanceAndInspection>().delete(
      otherSubMenu?.apiRoute || "",
      id,
    );
    refetch();
  };

  const handleClickDetail = (
    specs: RailwayVehicleMaintenanceAndInspection,
  ) => {
    toggleDetailDrawer();
    setSelectedRow(specs);
  };

  const mapMaintenanceAndInspectionToDetailItems = (
    specs: RailwayVehicleMaintenanceAndInspection,
  ): { title: string; value: any }[] => [
      {
        title: t("common.table-columns.id"),
        value: specs?.id || "N/A",
      },
      {
        title: t(
          "project.other.railway-vehicle-maintenance-and-inspection.details.railway_vehicle_identification_id",
        ),
        value: specs?.railwayVehicleIndentification ?
          specs?.railwayVehicleIndentification + " - " + specs?.railwayVehicleIndentification.manufacturer_supplier_name + " - " + specs?.railwayVehicleIndentification.manufacture_year

          : specs?.railway_vehicle_identification_id ||
          "N/A"
      },
      {
        title: t(
          "project.other.railway-vehicle-maintenance-and-inspection.details.maintenance_history_records",
        ),
        value: specs?.maintenance_history_records || "N/A",
      },
      {
        title: t(
          "project.other.railway-vehicle-maintenance-and-inspection.details.vehicle_weight_and_load_capacity",
        ),
        value: specs?.vehicle_weight_and_load_capacity || "N/A",
      },
      {
        title: t(
          "project.other.railway-vehicle-maintenance-and-inspection.details.maximum_speed",
        ),
        value: specs?.maximum_speed?.toString() || "N/A",
      },
      {
        title: t(
          "project.other.railway-vehicle-maintenance-and-inspection.details.braking_system_type",
        ),
        value: specs?.braking_system_type || "N/A",
      },
      {
        title: t(
          "project.other.railway-vehicle-maintenance-and-inspection.details.remark",
        ),
        value: specs?.remark || "N/A",
      },
      {
        title: t("common.form.attachments"),
        value: (
          <FileDrawer
            id={specs.id}
            type={otherSubMenu?.fileType || ""}
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
        <RailwayVehicleMaintenanceAndInspectionDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayVehicleMaintenanceAndInspection={
            selectedRow as RailwayVehicleMaintenanceAndInspection
          }
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapMaintenanceAndInspectionToDetailItems(
            selectedRow as RailwayVehicleMaintenanceAndInspection,
          )}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={"RAILWAY_VEHICLE_MAINTENANCE_AND_INSPECTION"}
          title={t(
            "project.other.railway-vehicle-maintenance-and-inspection.detail",
          )}
        />
      )}

      <ItemsListing
        title={t(
          "project.other.railway-vehicle-maintenance-and-inspection.title",
        )}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayVehicleMaintenanceAndInspectionColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            otherSubMenu,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwayVehicleMaintenanceAndInspectionCard
            onDetail={handleClickDetail}
            railwayVehicleMaintenanceAndInspection={
              data as RailwayVehicleMaintenanceAndInspection
            }
            onEdit={handleEdit}
            refetch={refetch}
            otherSubMenu={otherSubMenu}
            onDelete={handleDelete}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: "create",
            subject: "railwayvehiclemaintenanceandinspection",
          },
        }}
        fetchDataFunction={refetch}
        items={maintenanceAndInspection || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwayVehicleMaintenanceAndInspectionList;