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
import type { RoadMaintenanceActivity } from "src/types/project/other";
import type { GetRequestParam, IApiResponse } from "src/types/requests";
import { formatCreatedAt } from "src/utils/formatter/date";
import ItemsListing from "src/views/shared/listing";
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer";
import RoadMaintenanceActivityCard from "./road-maintenance-activity-card";
import RoadMaintenanceActivityDrawer from "./road-maintenance-activity-drawer";
import { roadMaintenanceActivityColumns } from "./road-maintenance-activity-row";
import { useQuery } from "@tanstack/react-query";
import { projectMasterModels } from "src/constants/master-data/project-general-master-constants";
import projectGeneralMasterDataApiService from "src/services/general/project-general-master-data-service";

interface RoadMaintenanceActivityListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RoadMaintenanceActivityList: React.FC<
  RoadMaintenanceActivityListProps
> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<RoadMaintenanceActivity | null>(null);
  const { t } = useTranslation();

  // Fetch master data for displaying titles instead of IDs
  const { data: maintenanceFrequencies } = useQuery({
    queryKey: ["maintenance-frequencies"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.maintenanceFrequency.model },
      }),
  });

  const { data: maintenanceTypes } = useQuery({
    queryKey: ["maintenance-types"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.maintenanceType.model },
      }),
  });

  const maintenanceFrequencyMap = new Map(
    maintenanceFrequencies?.payload.map((item) => [
      item.id,
      item.title || "",
    ]) || [],
  );

  const maintenanceTypeMap = new Map(
    maintenanceTypes?.payload.map((item) => [item.id, item.title || ""]) || [],
  );

  const fetchRoadMaintenanceActivities = (
    params: GetRequestParam,
  ): Promise<IApiResponse<RoadMaintenanceActivity[]>> => {
    return projectOtherApiSecondService<RoadMaintenanceActivity>().getAll(
      otherSubMenu?.apiRoute || "",
      {
        ...params,
        filter: { ...params.filter, project_id: projectId },
      },
    );
  };

  const {
    data: roadMaintenanceActivities,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<RoadMaintenanceActivity[]>({
    queryKey: ["roadMaintenanceActivities"],
    fetchFunction: fetchRoadMaintenanceActivities,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RoadMaintenanceActivity);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RoadMaintenanceActivity);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (roadMaintenanceActivity: RoadMaintenanceActivity) => {
    toggleDrawer();
    setSelectedRow(roadMaintenanceActivity);
  };

  const handleDelete = async (roadMaintenanceActivityId: string) => {
    await projectOtherApiSecondService<RoadMaintenanceActivity>().delete(
      otherSubMenu?.apiRoute || "",
      roadMaintenanceActivityId,
    );
    refetch();
  };

  const handleClickDetail = (
    roadMaintenanceActivity: RoadMaintenanceActivity,
  ) => {
    toggleDetailDrawer();
    setSelectedRow(roadMaintenanceActivity);
  };

  const mapRoadMaintenanceActivityToDetailItems = (
    roadMaintenanceActivity: RoadMaintenanceActivity,
  ): { title: string; value: string }[] => [
    {
      title: t("project.other.road-maintenance-activity.details.road-segment"),
      value: roadMaintenanceActivity?.road_segment || "N/A",
    },
    {
      title: t(
        "project.other.road-maintenance-activity.details.maintenance-frequency",
      ),
      value: roadMaintenanceActivity?.maintenance_frequency_id
        ? maintenanceFrequencyMap.get(
            roadMaintenanceActivity.maintenance_frequency_id,
          ) || roadMaintenanceActivity.maintenance_frequency_id
        : "N/A",
    },
    {
      title: t(
        "project.other.road-maintenance-activity.details.maintenance-type",
      ),
      value: roadMaintenanceActivity?.maintenance_type_id
        ? maintenanceTypeMap.get(roadMaintenanceActivity.maintenance_type_id) ||
          roadMaintenanceActivity.maintenance_type_id
        : "N/A",
    },
    {
      title: t("project.other.road-maintenance-activity.details.consultant"),
      value: roadMaintenanceActivity?.consultant || "N/A",
    },
    {
      title: t("project.other.road-maintenance-activity.details.remark"),
      value: roadMaintenanceActivity?.remark || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: roadMaintenanceActivity?.created_at
        ? formatCreatedAt(roadMaintenanceActivity.created_at)
        : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: roadMaintenanceActivity?.updated_at
        ? formatCreatedAt(roadMaintenanceActivity.updated_at)
        : "N/A",
    },
  ];

  return (
    <Box>
      {showDrawer && (
        <RoadMaintenanceActivityDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          roadMaintenanceActivity={selectedRow as RoadMaintenanceActivity}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapRoadMaintenanceActivityToDetailItems(
            selectedRow as RoadMaintenanceActivity,
          )}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={uploadableProjectFileTypes.other.maintenanceRecord}
          title={t(
            "project.other.road-maintenance-activity.road-maintenance-activity-details",
          )}
        />
      )}

      <ItemsListing
        title={t("project.other.road-maintenance-activity.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: roadMaintenanceActivityColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            maintenanceFrequencyMap,
            maintenanceTypeMap,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RoadMaintenanceActivityCard
            onDetail={handleClickDetail}
            roadMaintenanceActivity={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
            maintenanceFrequencyMap={maintenanceFrequencyMap}
            maintenanceTypeMap={maintenanceTypeMap}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: "create",
            subject: "roadmaintenanceactivity",
          },
        }}
        fetchDataFunction={refetch}
        items={roadMaintenanceActivities || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RoadMaintenanceActivityList;
