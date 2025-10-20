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
import { RailwayStationPlatformEnvironmentalAndOtherFactor } from "src/types/project/other";
import { formatCreatedAt } from "src/utils/formatter/date";
import RailwayStationPlatformEnvironmentalAndOtherFactorCard from "./railway-station-platform-environmental-and-other-factor-card";
import RailwayStationPlatformEnvironmentalAndOtherFactorDrawer from "./railway-station-platform-environmental-and-other-factor-drawer";
import { railwayStationPlatformEnvironmentalAndOtherFactorColumns } from "./railway-station-platform-environmental-and-other-factor-row";
import FileDrawer from "src/views/components/custom/files-drawer";

interface RailwayStationPlatformEnvironmentalAndOtherFactorListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RailwayStationPlatformEnvironmentalAndOtherFactorList: React.FC<
  RailwayStationPlatformEnvironmentalAndOtherFactorListProps
> = ({ otherSubMenu, projectId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<RailwayStationPlatformEnvironmentalAndOtherFactor | null>(null);
  const { t } = useTranslation();

  const fetchEnvironmentalFactor = (
    params: GetRequestParam,
  ): Promise<IApiResponse<RailwayStationPlatformEnvironmentalAndOtherFactor[]>> => {
    return projectOtherApiSecondService<RailwayStationPlatformEnvironmentalAndOtherFactor>().getAll(
      otherSubMenu?.apiRoute || "",
      {
        ...params,
        filter: { ...params.filter, project_id: projectId },
      },
    );
  };

  const {
    data: environmentalFactor,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<RailwayStationPlatformEnvironmentalAndOtherFactor[]>({
    queryKey: ["railwayStationPlatformEnvironmentalAndOtherFactor"],
    fetchFunction: fetchEnvironmentalFactor,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwayStationPlatformEnvironmentalAndOtherFactor);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayStationPlatformEnvironmentalAndOtherFactor);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (
    specs: RailwayStationPlatformEnvironmentalAndOtherFactor,
  ) => {
    toggleDrawer();
    setSelectedRow(specs);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwayStationPlatformEnvironmentalAndOtherFactor>().delete(
      otherSubMenu?.apiRoute || "",
      id,
    );
    refetch();
  };

  const handleClickDetail = (
    specs: RailwayStationPlatformEnvironmentalAndOtherFactor,
  ) => {
    toggleDetailDrawer();
    setSelectedRow(specs);
  };

  const mapEnvironmentalFactorToDetailItems = (
    specs: RailwayStationPlatformEnvironmentalAndOtherFactor,
  ): { title: string; value: any }[] => [
      {
        title: t("common.table-columns.id"),
        value: specs?.id || "N/A",
      },
      {
        title: t(
          "project.other.railway-station-platform-environmental-and-other-factor.details.railway_station_platform_layout_id",
        ),
        value: specs?.railwayStationPlatformLayout?.name || specs?.railway_station_platform_layout_id || "N/A",
      },
      {
        title: t(
          "project.other.railway-station-platform-environmental-and-other-factor.details.environmental_compliance_measures",
        ),
        value: specs?.environmental_compliance_measures || "N/A",
      },
      {
        title: t(
          "project.other.railway-station-platform-environmental-and-other-factor.details.noise_and_vibration_control_measures",
        ),
        value: specs?.noise_and_vibration_control_measures || "N/A",
      },
      {
        title: t(
          "project.other.railway-station-platform-environmental-and-other-factor.details.sustainable_design_features",
        ),
        value: specs?.sustainable_design_features || "N/A",
      },
      {
        title: t(
          "project.other.railway-station-platform-environmental-and-other-factor.details.remark",
        ),
        value: specs?.remark || "N/A",
      },
      {
        title: t("common.form.attachments"),
        value: (
          <FileDrawer
            id={specs.id}
            type={otherSubMenu?.fileType || "RAILWAY_STATION_PLATFORM_ENVIRONMENTAL_AND_OTHER_FACTOR"}
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
        <RailwayStationPlatformEnvironmentalAndOtherFactorDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayStationPlatformEnvironmentalAndOtherFactor={
            selectedRow as RailwayStationPlatformEnvironmentalAndOtherFactor
          }
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapEnvironmentalFactorToDetailItems(
            selectedRow as RailwayStationPlatformEnvironmentalAndOtherFactor,
          )}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={"RAILWAY_STATION_PLATFORM_ENVIRONMENTAL_AND_OTHER_FACTOR"}
          title={t(
            "project.other.railway-station-platform-environmental-and-other-factor.detail",
          )}
        />
      )}

      <ItemsListing
        title={t(
          "project.other.railway-station-platform-environmental-and-other-factor.title",
        )}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayStationPlatformEnvironmentalAndOtherFactorColumns(
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
          <RailwayStationPlatformEnvironmentalAndOtherFactorCard
            onDetail={handleClickDetail}
            railwayStationPlatformEnvironmentalAndOtherFactor={
              data as RailwayStationPlatformEnvironmentalAndOtherFactor
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
            subject: "railwaystationplatformenvironmentalandotherfactor",
          },
        }}
        fetchDataFunction={refetch}
        items={environmentalFactor || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwayStationPlatformEnvironmentalAndOtherFactorList;