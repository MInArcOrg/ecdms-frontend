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
import RailwayBallastEnvironmentalAndOtherFactorCard from "./railway-ballast-environmental-and-other-factor-card";
import RailwayBallastEnvironmentalAndOtherFactorDrawer from "./railway-ballast-environmental-and-other-factor-drawer";
import { RailwayBallastEnvironmentalAndOtherFactor } from "src/types/project/other";
import { formatCreatedAt } from "src/utils/formatter/date";
import { railwayBallastEnvironmentalAndOtherFactorColumns } from "./railway-ballast-environmental-and-other-factor-row";

interface RailwayBallastEnvironmentalAndOtherFactorListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RailwayBallastEnvironmentalAndOtherFactorList: React.FC<
  RailwayBallastEnvironmentalAndOtherFactorListProps
> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<RailwayBallastEnvironmentalAndOtherFactor | null>(null);
  const { t } = useTranslation();

  const fetchData = (
    params: GetRequestParam,
  ): Promise<IApiResponse<RailwayBallastEnvironmentalAndOtherFactor[]>> => {
    return projectOtherApiSecondService<RailwayBallastEnvironmentalAndOtherFactor>().getAll(
      otherSubMenu?.apiRoute || "",
      {
        ...params,
        filter: { ...params.filter, project_id: projectId },
      },
    );
  };

  const { data, isLoading, pagination, handlePageChange, refetch } =
    usePaginatedFetch<RailwayBallastEnvironmentalAndOtherFactor[]>({
      queryKey: ["railwayBallastEnvironmentalAndOtherFactors"],
      fetchFunction: fetchData,
    });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwayBallastEnvironmentalAndOtherFactor);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayBallastEnvironmentalAndOtherFactor);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (row: RailwayBallastEnvironmentalAndOtherFactor) => {
    setSelectedRow(row);
    setShowDrawer(true);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwayBallastEnvironmentalAndOtherFactor>().delete(
      otherSubMenu?.apiRoute || "",
      id,
    );
    refetch();
  };

  const handleClickDetail = (
    row: RailwayBallastEnvironmentalAndOtherFactor,
  ) => {
    setSelectedRow(row);
    setShowDetailDrawer(true);
  };

  const mapToDetailItems = (
    row: RailwayBallastEnvironmentalAndOtherFactor,
  ): { title: string; value: string }[] => [
    {
      title: t("common.table-columns.id"),
      value: row?.id || "N/A",
    },
    {
      title: t(
        "project.other.railway-ballast-environmental-and-other-factor.details.railway-line-section-name",
      ),
      value: row?.railway_line_section_name || "N/A",
    },
    {
      title: t(
        "project.other.railway-ballast-environmental-and-other-factor.details.environmental-compliance-measures",
      ),
      value: row?.environmental_compliance_measures || "N/A",
    },
    {
      title: t(
        "project.other.railway-ballast-environmental-and-other-factor.details.environmental-impact-assessment",
      ),
      value: row?.environmental_impact_assessment || "N/A",
    },
    {
      title: t(
        "project.other.railway-ballast-environmental-and-other-factor.details.remark",
      ),
      value: row?.remark || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: row?.created_at ? formatCreatedAt(row.created_at) : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: row?.updated_at ? formatCreatedAt(row.updated_at) : "N/A",
    },
  ];

  return (
    <Box>
      {showDrawer && (
        <RailwayBallastEnvironmentalAndOtherFactorDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayBallastEnvironmentalAndOtherFactor={
            selectedRow as RailwayBallastEnvironmentalAndOtherFactor
          }
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapToDetailItems(
            selectedRow as RailwayBallastEnvironmentalAndOtherFactor,
          )}
          hasReference={false}
          id={selectedRow?.project_id || ""}
          fileType=""
          title={t(
            "project.other.railway-ballast-environmental-and-other-factor.detail",
          )}
        />
      )}

      <ItemsListing
        title={t(
          "project.other.railway-ballast-environmental-and-other-factor.title",
        )}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayBallastEnvironmentalAndOtherFactorColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwayBallastEnvironmentalAndOtherFactorCard
            onDetail={handleClickDetail}
            railwayBallastEnvironmentalAndOtherFactor={data}
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
            subject: "railwayballastenvironmentalandotherfactor",
          },
        }}
        fetchDataFunction={refetch}
        items={data || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwayBallastEnvironmentalAndOtherFactorList;
