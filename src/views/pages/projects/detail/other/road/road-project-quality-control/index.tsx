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
import type { RoadProjectQualityControl } from "src/types/project/other";
import type { GetRequestParam, IApiResponse } from "src/types/requests";
import { formatCreatedAt } from "src/utils/formatter/date";
import ItemsListing from "src/views/shared/listing";
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer";
import RoadProjectQualityControlCard from "./road-project-quality-control-card";
import RoadProjectQualityControlDrawer from "./road-project-quality-control-drawer";
import { roadProjectQualityControlColumns } from "./road-project-quality-control-row";

interface RoadProjectQualityControlListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RoadProjectQualityControlList: React.FC<
  RoadProjectQualityControlListProps
> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<RoadProjectQualityControl | null>(null);
  const { t } = useTranslation();

  const fetchRoadProjectQualityControls = (
    params: GetRequestParam,
  ): Promise<IApiResponse<RoadProjectQualityControl[]>> => {
    return projectOtherApiSecondService<RoadProjectQualityControl>().getAll(
      otherSubMenu?.apiRoute || "",
      {
        ...params,
        filter: { ...params.filter, project_id: projectId },
      },
    );
  };

  const {
    data: roadProjectQualityControls,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<RoadProjectQualityControl[]>({
    queryKey: ["roadProjectQualityControls"],
    fetchFunction: fetchRoadProjectQualityControls,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RoadProjectQualityControl);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RoadProjectQualityControl);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (roadProjectQualityControl: RoadProjectQualityControl) => {
    toggleDrawer();
    setSelectedRow(roadProjectQualityControl);
  };

  const handleDelete = async (roadProjectQualityControlId: string) => {
    await projectOtherApiSecondService<RoadProjectQualityControl>().delete(
      otherSubMenu?.apiRoute || "",
      roadProjectQualityControlId,
    );
    refetch();
  };

  const handleClickDetail = (
    roadProjectQualityControl: RoadProjectQualityControl,
  ) => {
    toggleDetailDrawer();
    setSelectedRow(roadProjectQualityControl);
  };

  const mapRoadProjectQualityControlToDetailItems = (
    roadProjectQualityControl: RoadProjectQualityControl,
  ): { title: string; value: string }[] => [
    {
      title: t("project.other.road-project-quality-control.details.name"),
      value: roadProjectQualityControl?.name || "N/A",
    },
    {
      title: t(
        "project.other.road-project-quality-control.details.project-phase-id",
      ),
      value: roadProjectQualityControl?.project_phase_id || "N/A",
    },
    {
      title: t(
        "project.other.road-project-quality-control.details.inspection-type-id",
      ),
      value: roadProjectQualityControl?.inspection_type_id || "N/A",
    },
    {
      title: t(
        "project.other.road-project-quality-control.details.defect-encountered",
      ),
      value: roadProjectQualityControl?.defect_encountered || "N/A",
    },
    {
      title: t("project.other.road-project-quality-control.details.remark"),
      value: roadProjectQualityControl?.remark || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: roadProjectQualityControl?.created_at
        ? formatCreatedAt(roadProjectQualityControl.created_at)
        : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: roadProjectQualityControl?.updated_at
        ? formatCreatedAt(roadProjectQualityControl.updated_at)
        : "N/A",
    },
  ];

  return (
    <Box>
      {showDrawer && (
        <RoadProjectQualityControlDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          roadProjectQualityControl={selectedRow as RoadProjectQualityControl}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapRoadProjectQualityControlToDetailItems(
            selectedRow as RoadProjectQualityControl,
          )}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={uploadableProjectFileTypes.other.roadProjectQualityControl}
          title={t(
            "project.other.road-project-quality-control.road-project-quality-control-details",
          )}
        />
      )}

      <ItemsListing
        title={t("project.other.road-project-quality-control.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: roadProjectQualityControlColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RoadProjectQualityControlCard
            onDetail={handleClickDetail}
            roadProjectQualityControl={data}
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
            subject: "roadprojectqualitycontrol",
          },
        }}
        fetchDataFunction={refetch}
        items={roadProjectQualityControls || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RoadProjectQualityControlList;
