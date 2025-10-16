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
import { RailwayStationPlatformStructuralElement } from "src/types/project/other";
import { formatCreatedAt } from "src/utils/formatter/date";
import RailwayStationPlatformStructuralElementCard from "./railway-station-platform-structural-element-card";
import RailwayStationPlatformStructuralElementDrawer from "./railway-station-platform-structural-element-drawer";
import { railwayStationPlatformStructuralElementColumns } from "./railway-station-platform-structural-element-row";
import FileDrawer from "src/views/components/custom/files-drawer";

interface RailwayStationPlatformStructuralElementListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RailwayStationPlatformStructuralElementList: React.FC<
  RailwayStationPlatformStructuralElementListProps
> = ({ otherSubMenu, projectId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<RailwayStationPlatformStructuralElement | null>(null);
  const { t } = useTranslation();

  const fetchStructuralElement = (
    params: GetRequestParam,
  ): Promise<IApiResponse<RailwayStationPlatformStructuralElement[]>> => {
    return projectOtherApiSecondService<RailwayStationPlatformStructuralElement>().getAll(
      otherSubMenu?.apiRoute || "",
      {
        ...params,
        filter: { ...params.filter, project_id: projectId },
      },
    );
  };

  const {
    data: structuralElement,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<RailwayStationPlatformStructuralElement[]>({
    queryKey: ["railwayStationPlatformStructuralElement"],
    fetchFunction: fetchStructuralElement,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwayStationPlatformStructuralElement);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayStationPlatformStructuralElement);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (
    specs: RailwayStationPlatformStructuralElement,
  ) => {
    toggleDrawer();
    setSelectedRow(specs);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwayStationPlatformStructuralElement>().delete(
      otherSubMenu?.apiRoute || "",
      id,
    );
    refetch();
  };

  const handleClickDetail = (
    specs: RailwayStationPlatformStructuralElement,
  ) => {
    toggleDetailDrawer();
    setSelectedRow(specs);
  };

  const mapStructuralElementToDetailItems = (
    specs: RailwayStationPlatformStructuralElement,
  ): { title: string; value: any }[] => [
      {
        title: t("common.table-columns.id"),
        value: specs?.id || "N/A",
      },
      {
        title: t(
          "project.other.railway-station-platform-structural-element.details.railway_station_platform_layout_id",
        ),
        value: specs?.railway_station_platform_layout_id || "N/A",
      },
      {
        title: t(
          "project.other.railway-station-platform-structural-element.details.materials_used",
        ),
        value: specs?.materials_used || "N/A",
      },
      {
        title: t(
          "project.other.railway-station-platform-structural-element.details.roofing_type_and_design",
        ),
        value: specs?.roofing_type_and_design || "N/A",
      },
      {
        title: t(
          "project.other.railway-station-platform-structural-element.details.lighting_fixtures",
        ),
        value: specs?.lighting_fixtures ? t("common.yes") : t("common.no"),
      },
      {
        title: t(
          "project.other.railway-station-platform-structural-element.details.accessibility_features",
        ),
        value: specs?.accessibility_features || "N/A",
      },
      {
        title: t(
          "project.other.railway-station-platform-structural-element.details.remark",
        ),
        value: specs?.remark || "N/A",
      },
      {
        title: t("project.other.railway-station-platform-structural-element.details.canopy-or-shelter-detail-upload"),
        value: <FileDrawer
          id={specs.id}
          type={"CANOPY_OR_SHELTER_DETAIL"}
        />,
      },
      {
        title: t("common.form.attachments"),
        value: (
          <FileDrawer
            id={specs.id}
            type={otherSubMenu?.fileType || "RAILWAY_STATION_PLATFORM_STRUCTURAL_ELEMENT"}
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
        <RailwayStationPlatformStructuralElementDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayStationPlatformStructuralElement={
            selectedRow as RailwayStationPlatformStructuralElement
          }
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapStructuralElementToDetailItems(
            selectedRow as RailwayStationPlatformStructuralElement,
          )}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={"RAILWAY_STATION_PLATFORM_STRUCTURAL_ELEMENT"}
          title={t(
            "project.other.railway-station-platform-structural-element.detail",
          )}
        />
      )}

      <ItemsListing
        title={t(
          "project.other.railway-station-platform-structural-element.title",
        )}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayStationPlatformStructuralElementColumns(
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
          <RailwayStationPlatformStructuralElementCard
            onDetail={handleClickDetail}
            railwayStationPlatformStructuralElement={
              data as RailwayStationPlatformStructuralElement
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
            subject: "railwaystationplatformstructuralelement",
          },
        }}
        fetchDataFunction={refetch}
        items={structuralElement || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwayStationPlatformStructuralElementList;