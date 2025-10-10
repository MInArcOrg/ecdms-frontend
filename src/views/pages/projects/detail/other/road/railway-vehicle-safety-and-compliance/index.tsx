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
import { RailwayVehicleSafetyAndCompliance } from "src/types/project/other";
import { formatCreatedAt } from "src/utils/formatter/date";
import RailwayVehicleSafetyAndComplianceCard from "./railway-vehicle-safety-and-compliance-card";
import RailwayVehicleSafetyAndComplianceDrawer from "./railway-vehicle-safety-and-compliance-drawer";
import { railwayVehicleSafetyAndComplianceColumns } from "./railway-vehicle-safety-and-compliance-row";
import FileDrawer from "src/views/components/custom/files-drawer";

interface RailwayVehicleSafetyAndComplianceListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RailwayVehicleSafetyAndComplianceList: React.FC<
  RailwayVehicleSafetyAndComplianceListProps
> = ({ otherSubMenu, projectId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<RailwayVehicleSafetyAndCompliance | null>(null);
  const { t } = useTranslation();

  const fetchSafetyAndCompliance = (
    params: GetRequestParam,
  ): Promise<IApiResponse<RailwayVehicleSafetyAndCompliance[]>> => {
    return projectOtherApiSecondService<RailwayVehicleSafetyAndCompliance>().getAll(
      otherSubMenu?.apiRoute || "",
      {
        ...params,
        filter: { ...params.filter, project_id: projectId },
      },
    );
  };

  const {
    data: safetyAndCompliance,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<RailwayVehicleSafetyAndCompliance[]>({
    queryKey: ["railwayVehicleSafetyAndCompliance"],
    fetchFunction: fetchSafetyAndCompliance,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwayVehicleSafetyAndCompliance);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayVehicleSafetyAndCompliance);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (
    specs: RailwayVehicleSafetyAndCompliance,
  ) => {
    toggleDrawer();
    setSelectedRow(specs);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwayVehicleSafetyAndCompliance>().delete(
      otherSubMenu?.apiRoute || "",
      id,
    );
    refetch();
  };

  const handleClickDetail = (
    specs: RailwayVehicleSafetyAndCompliance,
  ) => {
    toggleDetailDrawer();
    setSelectedRow(specs);
  };

  const mapSafetyAndComplianceToDetailItems = (
    specs: RailwayVehicleSafetyAndCompliance,
  ): { title: string; value: any }[] => [
      {
        title: t("common.table-columns.id"),
        value: specs?.id || "N/A",
      },
      {
        title: t(
          "project.other.railway-vehicle-safety-and-compliance.details.railway_vehicle_identification_id",
        ),
        value: specs?.railwayVehicleIndentification ?
          specs?.railwayVehicleIndentification + " - " + specs?.railwayVehicleIndentification.manufacturer_supplier_name + " - " + specs?.railwayVehicleIndentification.manufacture_year

          : specs?.railway_vehicle_identification_id ||
          "N/A"
      },
      {
        title: t(
          "project.other.railway-vehicle-safety-and-compliance.details.safety_features_and_systems",
        ),
        value: specs?.safety_features_and_systems || "N/A",
      },
      {
        title: t(
          "project.other.railway-vehicle-safety-and-compliance.details.comply_with_regulatory_standards_and_certifications",
        ),
        value: specs?.comply_with_regulatory_standards_and_certifications
          ? t("common.yes")
          : t("common.no"),
      },
      {
        title: t(
          "project.other.railway-vehicle-safety-and-compliance.details.incident_records_number",
        ),
        value: specs?.incident_records_number?.toString() || "N/A",
      },
      {
        title: t(
          "project.other.railway-vehicle-safety-and-compliance.details.action_taken_to_accidents",
        ),
        value: specs?.action_taken_to_accidents || "N/A",
      },
      {
        title: t(
          "project.other.railway-vehicle-safety-and-compliance.details.remark",
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
        <RailwayVehicleSafetyAndComplianceDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayVehicleSafetyAndCompliance={
            selectedRow as RailwayVehicleSafetyAndCompliance
          }
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapSafetyAndComplianceToDetailItems(
            selectedRow as RailwayVehicleSafetyAndCompliance,
          )}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={"RAILWAY_VEHICLE_SAFETY_AND_COMPLIANCE"}
          title={t(
            "project.other.railway-vehicle-safety-and-compliance.detail",
          )}
        />
      )}

      <ItemsListing
        title={t(
          "project.other.railway-vehicle-safety-and-compliance.title",
        )}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayVehicleSafetyAndComplianceColumns(
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
          <RailwayVehicleSafetyAndComplianceCard
            onDetail={handleClickDetail}
            railwayVehicleSafetyAndCompliance={
              data as RailwayVehicleSafetyAndCompliance
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
            subject: "railwayvehiclesafetyandcompliance",
          },
        }}
        fetchDataFunction={refetch}
        items={safetyAndCompliance || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwayVehicleSafetyAndComplianceList;