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
import { RailwaySleeperEnvironmentalAndOtherFactor } from "src/types/project/other";
import { formatCreatedAt } from "src/utils/formatter/date";

import RailwaySleeperEnvironmentalAndOtherFactorCard from "./railway-sleeper-environmental-and-other-factor-card";
import RailwaySleeperEnvironmentalAndOtherFactorDrawer from "./railway-sleeper-environmental-and-other-factor-drawer";
import { railwaySleeperEnvironmentalAndOtherFactorColumns } from "./railway-sleeper-environmental-and-other-factor-row";

interface RailwaySleeperEnvironmentalAndOtherFactorListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RailwaySleeperEnvironmentalAndOtherFactorList: React.FC<
  RailwaySleeperEnvironmentalAndOtherFactorListProps
> = ({ otherSubMenu, projectId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<RailwaySleeperEnvironmentalAndOtherFactor | null>(null);
  const { t } = useTranslation();

  const fetchRailwaySleeperEnvironmentalAndOtherFactor = (
    params: GetRequestParam,
  ): Promise<IApiResponse<RailwaySleeperEnvironmentalAndOtherFactor[]>> => {
    return projectOtherApiSecondService<RailwaySleeperEnvironmentalAndOtherFactor>().getAll(
      otherSubMenu?.apiRoute || "",
      {
        ...params,
        filter: { ...params.filter, project_id: projectId },
      },
    );
  };

  const {
    data: railwaySleeperEnvironmentalAndOtherFactor,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<RailwaySleeperEnvironmentalAndOtherFactor[]>({
    queryKey: ["railwaySleeperEnvironmentalAndOtherFactor"],
    fetchFunction: fetchRailwaySleeperEnvironmentalAndOtherFactor,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwaySleeperEnvironmentalAndOtherFactor);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwaySleeperEnvironmentalAndOtherFactor);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (
    railwaySleeperEnvironmentalAndOtherFactor: RailwaySleeperEnvironmentalAndOtherFactor,
  ) => {
    toggleDrawer();
    setSelectedRow(railwaySleeperEnvironmentalAndOtherFactor);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwaySleeperEnvironmentalAndOtherFactor>().delete(
      otherSubMenu?.apiRoute || "",
      id,
    );
    refetch();
  };

  const handleClickDetail = (
    railwaySleeperEnvironmentalAndOtherFactor: RailwaySleeperEnvironmentalAndOtherFactor,
  ) => {
    toggleDetailDrawer();
    setSelectedRow(railwaySleeperEnvironmentalAndOtherFactor);
  };

  const mapRailwaySleeperEnvironmentalAndOtherFactorToDetailItems = (
    railwaySleeperEnvironmentalAndOtherFactor: RailwaySleeperEnvironmentalAndOtherFactor,
  ): { title: string; value: string }[] => [
    {
      title: t("common.table-columns.id"),
      value: railwaySleeperEnvironmentalAndOtherFactor?.project_id || "N/A",
    },
    {
      title: t(
        "project.other.railway-sleeper-environmental-and-other-factor.details.railway_line_section_name",
      ),
      value:
        railwaySleeperEnvironmentalAndOtherFactor?.railway_line_section_name ||
        "N/A",
    },
    {
      title: t(
        "project.other.railway-sleeper-environmental-and-other-factor.details.environmental_compliance_measures",
      ),
      value:
        railwaySleeperEnvironmentalAndOtherFactor?.environmental_compliance_measures ||
        "N/A",
    },
    {
      title: t(
        "project.other.railway-sleeper-environmental-and-other-factor.details.environmental_impact_assessment",
      ),
      value:
        railwaySleeperEnvironmentalAndOtherFactor?.environmental_impact_assessment ||
        "N/A",
    },
    {
      title: t(
        "project.other.railway-sleeper-environmental-and-other-factor.details.remark",
      ),
      value: railwaySleeperEnvironmentalAndOtherFactor?.remark || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: railwaySleeperEnvironmentalAndOtherFactor?.created_at
        ? formatCreatedAt(railwaySleeperEnvironmentalAndOtherFactor.created_at)
        : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: railwaySleeperEnvironmentalAndOtherFactor?.updated_at
        ? formatCreatedAt(railwaySleeperEnvironmentalAndOtherFactor.updated_at)
        : "N/A",
    },
  ];

  return (
    <Box>
      {showDrawer && (
        <RailwaySleeperEnvironmentalAndOtherFactorDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwaySleeperEnvironmentalAndOtherFactor={
            selectedRow as RailwaySleeperEnvironmentalAndOtherFactor
          }
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapRailwaySleeperEnvironmentalAndOtherFactorToDetailItems(
            selectedRow as RailwaySleeperEnvironmentalAndOtherFactor,
          )}
          hasReference={false}
          id={selectedRow?.project_id || ""}
          fileType=""
          title={t(
            "project.other.railway-sleeper-environmental-and-other-factor.detail",
          )}
        />
      )}

      <ItemsListing
        title={t(
          "project.other.railway-sleeper-environmental-and-other-factor.title",
        )}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwaySleeperEnvironmentalAndOtherFactorColumns(
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
          <RailwaySleeperEnvironmentalAndOtherFactorCard
            onDetail={handleClickDetail}
            railwaySleeperEnvironmentalAndOtherFactor={
              data as RailwaySleeperEnvironmentalAndOtherFactor
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
          onlyIcon: true,
          permission: {
            action: "create",
            subject: "railwaysleeperenvironmentalandotherfactor",
          },
        }}
        fetchDataFunction={refetch}
        items={railwaySleeperEnvironmentalAndOtherFactor || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwaySleeperEnvironmentalAndOtherFactorList;
