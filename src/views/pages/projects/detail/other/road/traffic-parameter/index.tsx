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
import type { TrafficParameter } from "src/types/project/other";
import type { GetRequestParam, IApiResponse } from "src/types/requests";
import { formatCreatedAt } from "src/utils/formatter/date";
import ItemsListing from "src/views/shared/listing";
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer";
import TrafficParameterCard from "./traffic-parameter-card";
import TrafficParameterDrawer from "./traffic-parameter-drawer";
import { trafficParameterColumns } from "./traffic-parameter-row";

interface TrafficParameterListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const TrafficParameterList: React.FC<TrafficParameterListProps> = ({
  otherSubMenu,
  projectId,
  typeId,
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<TrafficParameter | null>(null);
  const { t } = useTranslation();

  const fetchTrafficParameters = (
    params: GetRequestParam,
  ): Promise<IApiResponse<TrafficParameter[]>> => {
    return projectOtherApiSecondService<TrafficParameter>().getAll(
      otherSubMenu?.apiRoute || "",
      {
        ...params,
        filter: { ...params.filter, project_id: projectId },
      },
    );
  };

  const {
    data: trafficParameters,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<TrafficParameter[]>({
    queryKey: ["trafficParameters"],
    fetchFunction: fetchTrafficParameters,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as TrafficParameter);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as TrafficParameter);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (trafficParameter: TrafficParameter) => {
    toggleDrawer();
    setSelectedRow(trafficParameter);
  };

  const handleDelete = async (trafficParameterId: string) => {
    await projectOtherApiSecondService<TrafficParameter>().delete(
      otherSubMenu?.apiRoute || "",
      trafficParameterId,
    );
    refetch();
  };

  const handleClickDetail = (trafficParameter: TrafficParameter) => {
    toggleDetailDrawer();
    setSelectedRow(trafficParameter);
  };

  const mapTrafficParameterToDetailItems = (
    trafficParameter: TrafficParameter,
  ): { title: string; value: string }[] => [
    {
      title: t("project.other.traffic-parameter.details.name"),
      value: trafficParameter?.name || "N/A",
    },
    {
      title: t(
        "project.other.traffic-parameter.details.pedestrian-facility-id",
      ),
      value: trafficParameter?.pedestrian_facility_id || "N/A",
    },
    {
      title: t("project.other.traffic-parameter.details.parking"),
      value: trafficParameter?.parking?.toString() || "N/A",
    },
    {
      title: t("project.other.traffic-parameter.details.design-traffic-flow"),
      value: trafficParameter?.design_traffic_flow?.toString() || "N/A",
    },
    {
      title: t("project.other.traffic-parameter.details.design-speed"),
      value: trafficParameter?.design_speed?.toString() || "N/A",
    },
    {
      title: t("project.other.traffic-parameter.details.similar-for-all"),
      value: trafficParameter?.similar_for_all
        ? t("common.yes")
        : t("common.no"),
    },
    {
      title: t("common.table-columns.created-at"),
      value: trafficParameter?.created_at
        ? formatCreatedAt(trafficParameter.created_at)
        : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: trafficParameter?.updated_at
        ? formatCreatedAt(trafficParameter.updated_at)
        : "N/A",
    },
  ];

  return (
    <Box>
      {showDrawer && (
        <TrafficParameterDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          trafficParameter={selectedRow as TrafficParameter}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapTrafficParameterToDetailItems(
            selectedRow as TrafficParameter,
          )}
          hasReference={false}
          id={selectedRow?.id || ""}
          fileType=""
          title={t("project.other.traffic-parameter.traffic-parameter-details")}
        />
      )}

      <ItemsListing
        title={t("project.other.traffic-parameter.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: trafficParameterColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <TrafficParameterCard
            onDetail={handleClickDetail}
            trafficParameter={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: "create",
            subject: "trafficparameter",
          },
        }}
        fetchDataFunction={refetch}
        items={trafficParameters || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default TrafficParameterList;
