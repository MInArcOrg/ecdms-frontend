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
import { RailwaySleeperConditionAssessment } from "src/types/project/other";
import { formatCreatedAt, formatDynamicDate } from "src/utils/formatter/date";

import RailwaySleeperConditionAssessmentCard from "./railway-sleeper-condition-assessment-card";
import RailwaySleeperConditionAssessmentDrawer from "./railway-sleeper-condition-assessment-drawer";
import { railwaySleeperConditionAssessmentColumns } from "./railway-sleeper-condition-assessment-row";

interface RailwaySleeperConditionAssessmentListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RailwaySleeperConditionAssessmentList: React.FC<
  RailwaySleeperConditionAssessmentListProps
> = ({ otherSubMenu, projectId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<RailwaySleeperConditionAssessment | null>(null);
  const { t } = useTranslation();

  const fetchRailwaySleeperConditionAssessment = (
    params: GetRequestParam,
  ): Promise<IApiResponse<RailwaySleeperConditionAssessment[]>> => {
    return projectOtherApiSecondService<RailwaySleeperConditionAssessment>().getAll(
      otherSubMenu?.apiRoute || "",
      {
        ...params,
        filter: { ...params.filter, project_id: projectId },
      },
    );
  };

  const {
    data: railwaySleeperConditionAssessment,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<RailwaySleeperConditionAssessment[]>({
    queryKey: ["railwaySleeperConditionAssessment"],
    fetchFunction: fetchRailwaySleeperConditionAssessment,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwaySleeperConditionAssessment);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwaySleeperConditionAssessment);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (
    railwaySleeperConditionAssessment: RailwaySleeperConditionAssessment,
  ) => {
    toggleDrawer();
    setSelectedRow(railwaySleeperConditionAssessment);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwaySleeperConditionAssessment>().delete(
      otherSubMenu?.apiRoute || "",
      id,
    );
    refetch();
  };

  const handleClickDetail = (
    railwaySleeperConditionAssessment: RailwaySleeperConditionAssessment,
  ) => {
    toggleDetailDrawer();
    setSelectedRow(railwaySleeperConditionAssessment);
  };

  const mapRailwaySleeperConditionAssessmentToDetailItems = (
    railwaySleeperConditionAssessment: RailwaySleeperConditionAssessment,
  ): { title: string; value: string }[] => [
    {
      title: t("common.table-columns.id"),
      value: railwaySleeperConditionAssessment?.project_id || "N/A",
    },
    {
      title: t(
        "project.other.railway-sleeper-condition-assessment.details.railway_line_section_name",
      ),
      value:
        railwaySleeperConditionAssessment?.railway_line_section_name || "N/A",
    },
    {
      title: t(
        "project.other.railway-sleeper-condition-assessment.details.inspection_dates",
      ),
      value: railwaySleeperConditionAssessment?.inspection_dates
        ? formatDynamicDate(railwaySleeperConditionAssessment?.inspection_dates)
        : "N/A",
    },
    {
      title: t(
        "project.other.railway-sleeper-condition-assessment.details.sleeper_condition_rating",
      ),
      value:
        railwaySleeperConditionAssessment?.sleeper_condition_rating || "N/A",
    },
    {
      title: t(
        "project.other.railway-sleeper-condition-assessment.details.defect_presence",
      ),
      value: railwaySleeperConditionAssessment?.defect_presence || "N/A",
    },
    {
      title: t(
        "project.other.railway-sleeper-condition-assessment.details.sleeper_stability_and_alignment",
      ),
      value:
        railwaySleeperConditionAssessment?.sleeper_stability_and_alignment ||
        "N/A",
    },
    {
      title: t(
        "project.other.railway-sleeper-condition-assessment.details.sleepers_required_number",
      ),
      value:
        railwaySleeperConditionAssessment?.sleepers_required_number != null
          ? railwaySleeperConditionAssessment.sleepers_required_number.toLocaleString()
          : "N/A",
    },
    {
      title: t(
        "project.other.railway-sleeper-condition-assessment.details.supplier_name",
      ),
      value: railwaySleeperConditionAssessment?.supplier_name || "N/A",
    },
    {
      title: t(
        "project.other.railway-sleeper-condition-assessment.details.supplier_phone",
      ),
      value: railwaySleeperConditionAssessment?.supplier_phone || "N/A",
    },
    {
      title: t(
        "project.other.railway-sleeper-condition-assessment.details.remark",
      ),
      value: railwaySleeperConditionAssessment?.remark || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: railwaySleeperConditionAssessment?.created_at
        ? formatCreatedAt(railwaySleeperConditionAssessment.created_at)
        : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: railwaySleeperConditionAssessment?.updated_at
        ? formatCreatedAt(railwaySleeperConditionAssessment.updated_at)
        : "N/A",
    },
  ];

  return (
    <Box>
      {showDrawer && (
        <RailwaySleeperConditionAssessmentDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwaySleeperConditionAssessment={
            selectedRow as RailwaySleeperConditionAssessment
          }
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapRailwaySleeperConditionAssessmentToDetailItems(
            selectedRow as RailwaySleeperConditionAssessment,
          )}
          hasReference={false}
          id={selectedRow?.project_id || ""}
          fileType=""
          title={t("project.other.railway-sleeper-condition-assessment.detail")}
        />
      )}

      <ItemsListing
        title={t("project.other.railway-sleeper-condition-assessment.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwaySleeperConditionAssessmentColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwaySleeperConditionAssessmentCard
            onDetail={handleClickDetail}
            railwaySleeperConditionAssessment={
              data as RailwaySleeperConditionAssessment
            }
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
            subject: "railwaysleeperconditionassessment",
          },
        }}
        fetchDataFunction={refetch}
        items={railwaySleeperConditionAssessment || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwaySleeperConditionAssessmentList;
