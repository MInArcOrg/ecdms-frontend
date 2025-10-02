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
import { RailwayFasteningSystemConditionAssessment } from "src/types/project/other";
import { formatCreatedAt, formatDynamicDate } from "src/utils/formatter/date";

import RailwayFasteningSystemConditionAssessmentCard from "./railway-fastening-system-condition-assessment-card";
import RailwayFasteningSystemConditionAssessmentDrawer from "./railway-fastening-system-condition-assessment-drawer";
import { railwayFasteningSystemConditionAssessmentColumns } from "./railway-fastening-system-condition-assessment-row";

interface RailwayFasteningSystemConditionAssessmentListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string; // Not directly used but kept for consistency with other list components
  projectId: string;
}

const RailwayFasteningSystemConditionAssessmentList: React.FC<
  RailwayFasteningSystemConditionAssessmentListProps
> = ({ otherSubMenu, projectId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<RailwayFasteningSystemConditionAssessment | null>(null);
  const { t } = useTranslation();

  const fetchRailwayFasteningSystemConditionAssessment = (
    params: GetRequestParam,
  ): Promise<IApiResponse<RailwayFasteningSystemConditionAssessment[]>> => {
    return projectOtherApiSecondService<RailwayFasteningSystemConditionAssessment>().getAll(
      otherSubMenu?.apiRoute || "",
      {
        ...params,
        filter: { ...params.filter, project_id: projectId },
      },
    );
  };

  const {
    data: railwayFasteningSystemConditionAssessment,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<RailwayFasteningSystemConditionAssessment[]>({
    queryKey: ["railwayFasteningSystemConditionAssessment"],
    fetchFunction: fetchRailwayFasteningSystemConditionAssessment,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwayFasteningSystemConditionAssessment); // Reset selected row for new creation
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayFasteningSystemConditionAssessment); // Reset selected row on detail close
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (
    characteristic: RailwayFasteningSystemConditionAssessment,
  ) => {
    toggleDrawer();
    setSelectedRow(characteristic);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwayFasteningSystemConditionAssessment>().delete(
      otherSubMenu?.apiRoute || "",
      id,
    );
    refetch();
  };

  const handleClickDetail = (
    characteristic: RailwayFasteningSystemConditionAssessment,
  ) => {
    toggleDetailDrawer();
    setSelectedRow(characteristic);
  };

  const mapRailwayFasteningSystemConditionAssessmentToDetailItems = (
    characteristic: RailwayFasteningSystemConditionAssessment,
  ): { title: string; value: string }[] => [
    {
      title: t("common.table-columns.id"),
      value: characteristic?.id || "N/A",
    },
    {
      title: t(
        "project.other.railway-fastening-system-condition-assessment.details.railway_line_section_name",
      ),
      value: characteristic?.railway_line_section_name || "N/A",
    },
    {
      title: t(
        "project.other.railway-fastening-system-condition-assessment.details.inspection_date",
      ),
      value: characteristic?.inspection_date
        ? formatDynamicDate(characteristic.inspection_date)
        : "N/A",
    },
    {
      title: t(
        "project.other.railway-fastening-system-condition-assessment.details.fastening_system_condition_rating",
      ),
      value: characteristic?.fastening_system_condition_rating || "N/A",
    },
    {
      title: t(
        "project.other.railway-fastening-system-condition-assessment.details.defect_presence",
      ),
      value: characteristic?.defect_presence || "N/A",
    },
    {
      title: t(
        "project.other.railway-fastening-system-condition-assessment.details.fastening_system_stability_and_alignment",
      ),
      value: characteristic?.fastening_system_stability_and_alignment || "N/A",
    },
    {
      title: t(
        "project.other.railway-fastening-system-condition-assessment.details.rail_fastening_model_number",
      ),
      value: characteristic?.rail_fastening_model_number || "N/A",
    },
    {
      title: t(
        "project.other.railway-fastening-system-condition-assessment.details.rail_fastening_needed_quantity",
      ),
      value:
        characteristic?.rail_fastening_needed_quantity?.toString() || "N/A",
    },
    {
      title: t(
        "project.other.railway-fastening-system-condition-assessment.details.rail_fastening_expected_lifespan",
      ),
      value:
        characteristic?.rail_fastening_expected_lifespan?.toString() || "N/A",
    },
    {
      title: t(
        "project.other.railway-fastening-system-condition-assessment.details.rail_fastening_availability",
      ),
      value:
        typeof characteristic?.rail_fastening_availability === "boolean"
          ? characteristic.rail_fastening_availability
            ? t("common.options.yes")
            : t("common.options.no")
          : "N/A",
    },
    {
      title: t(
        "project.other.railway-fastening-system-condition-assessment.details.remark",
      ),
      value: characteristic?.remark || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: characteristic?.created_at
        ? formatCreatedAt(characteristic.created_at)
        : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: characteristic?.updated_at
        ? formatCreatedAt(characteristic.updated_at)
        : "N/A",
    },
  ];

  return (
    <Box>
      {showDrawer && (
        <RailwayFasteningSystemConditionAssessmentDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayFasteningSystemConditionAssessment={
            selectedRow as RailwayFasteningSystemConditionAssessment
          }
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapRailwayFasteningSystemConditionAssessmentToDetailItems(
            selectedRow as RailwayFasteningSystemConditionAssessment,
          )}
          hasReference={Boolean(otherSubMenu?.fileType)} // True if fileType is defined
          id={selectedRow?.id || ""}
          fileType={otherSubMenu?.fileType || ""} // Pass fileType to FileDrawer
          title={t(
            "project.other.railway-fastening-system-condition-assessment.detail",
          )}
        />
      )}

      <ItemsListing
        title={t(
          "project.other.railway-fastening-system-condition-assessment.title",
        )}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayFasteningSystemConditionAssessmentColumns(
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
          <RailwayFasteningSystemConditionAssessmentCard
            onDetail={handleClickDetail}
            railwayFasteningSystemConditionAssessment={
              data as RailwayFasteningSystemConditionAssessment
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
            subject: "railwayfasteningsystemconditionassessment", // Subject for permission control
          },
        }}
        fetchDataFunction={refetch}
        items={railwayFasteningSystemConditionAssessment || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwayFasteningSystemConditionAssessmentList;
