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
import { formatCreatedAt } from "src/utils/formatter/date";
import ItemsListing from "src/views/shared/listing";
import OtherDetailSidebar from "src/views/shared/layouts/other/other-detail-drawer";
import RailwayBallastCard from "./railway-ballast-card";
import RailwayBallastDrawer from "./railway-ballast-drawer";
import { RailwayBallast } from "src/types/project/other";
import { railwayBallastColumns } from "./railway-ballast-row";

interface RailwayBallastListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RailwayBallastList: React.FC<RailwayBallastListProps> = ({
  otherSubMenu,
  projectId,
  typeId,
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RailwayBallast | null>(null);
  const { t } = useTranslation();

  const fetchRailwayBallast = (
    params: GetRequestParam,
  ): Promise<IApiResponse<RailwayBallast[]>> => {
    return projectOtherApiSecondService<RailwayBallast>().getAll(
      otherSubMenu?.apiRoute || "",
      {
        ...params,
        filter: { ...params.filter, project_id: projectId },
      },
    );
  };

  const {
    data: railwayBallastList,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<RailwayBallast[]>({
    queryKey: ["railwayBallast"],
    fetchFunction: fetchRailwayBallast,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwayBallast);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayBallast);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (railwayBallast: RailwayBallast) => {
    toggleDrawer();
    setSelectedRow(railwayBallast);
  };

  const handleDelete = async (railwayBallastId: string) => {
    await projectOtherApiSecondService<RailwayBallast>().delete(
      otherSubMenu?.apiRoute || "",
      railwayBallastId,
    );
    refetch();
  };

  const handleClickDetail = (railwayBallast: RailwayBallast) => {
    toggleDetailDrawer();
    setSelectedRow(railwayBallast);
  };

  const mapRailwayBallastToDetailItems = (
    railwayBallast: RailwayBallast,
  ): { title: string; value: string }[] => [
    {
      title: t("common.table-columns.id"),
      value: railwayBallast?.project_id || "N/A",
    },
    {
      title: t(
        "project.other.railway-ballast.details.railway-line-section-name",
      ),
      value: railwayBallast?.railway_line_section_name || "N/A",
    },
    {
      title: t("project.other.railway-ballast.details.railway-ballast-name"),
      value: railwayBallast?.railway_ballast_name || "N/A",
    },
    {
      title: t("project.other.railway-ballast.details.ballast-id-no"),
      value: railwayBallast?.ballast_id_no || "N/A",
    },
    {
      title: t(
        "project.other.railway-ballast.details.ballast-construction-cost",
      ),
      value:
        railwayBallast?.ballast_construction_cost?.toLocaleString() || "N/A",
    },
    {
      title: t("project.other.railway-ballast.details.remark"),
      value: railwayBallast?.remark || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: railwayBallast?.created_at
        ? formatCreatedAt(railwayBallast.created_at)
        : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: railwayBallast?.updated_at
        ? formatCreatedAt(railwayBallast.updated_at)
        : "N/A",
    },
  ];

  return (
    <Box>
      {showDrawer && (
        <RailwayBallastDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayBallast={selectedRow as RailwayBallast}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapRailwayBallastToDetailItems(selectedRow as RailwayBallast)}
          hasReference={false}
          id={selectedRow?.project_id || ""}
          fileType=""
          title={t("project.other.railway-ballast.detail")}
        />
      )}

      <ItemsListing
        title={t("project.other.railway-ballast.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayBallastColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwayBallastCard
            onDetail={handleClickDetail}
            railwayBallast={data}
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
            subject: "railwayballast",
          },
        }}
        fetchDataFunction={refetch}
        items={railwayBallastList || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwayBallastList;
