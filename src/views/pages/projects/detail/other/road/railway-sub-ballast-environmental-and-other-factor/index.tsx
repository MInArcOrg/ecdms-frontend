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
import { RailwaySubBallastEnvironmentalAndOtherFactor } from "src/types/project/other"; // Updated type import
import { formatCreatedAt } from "src/utils/formatter/date";

// Renamed imports for related components (assuming these files will also be renamed and updated)
import RailwaySubBallastEnvironmentalAndOtherFactorCard from "./railway-sub-ballast-environmental-and-other-factor-card";
import RailwaySubBallastEnvironmentalAndOtherFactorDrawer from "./railway-sub-ballast-environmental-and-other-factor-drawer";
import { railwaySubBallastEnvironmentalAndOtherFactorColumns } from "./railway-sub-ballast-environmental-and-other-factor-row";

interface RailwaySubBallastEnvironmentalAndOtherFactorListProps {
  // Renamed interface
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RailwaySubBallastEnvironmentalAndOtherFactorList: React.FC<
  RailwaySubBallastEnvironmentalAndOtherFactorListProps
> = ({
  // Renamed component
  otherSubMenu,
  projectId,
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<RailwaySubBallastEnvironmentalAndOtherFactor | null>(null); // Updated state type
  const { t } = useTranslation();

  const fetchRailwaySubBallastEnvironmentalAndOtherFactor = (
    // Renamed fetch function
    params: GetRequestParam,
  ): Promise<IApiResponse<RailwaySubBallastEnvironmentalAndOtherFactor[]>> => {
    // Updated generic type
    return projectOtherApiSecondService<RailwaySubBallastEnvironmentalAndOtherFactor>().getAll(
      otherSubMenu?.apiRoute || "",
      {
        // Updated generic type
        ...params,
        filter: { ...params.filter, project_id: projectId },
      },
    );
  };

  const {
    data: railwaySubBallastEnvironmentalAndOtherFactor, // Renamed data variable
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<RailwaySubBallastEnvironmentalAndOtherFactor[]>({
    // Updated generic type
    queryKey: ["railwaySubBallastEnvironmentalAndOtherFactor"], // Updated query key
    fetchFunction: fetchRailwaySubBallastEnvironmentalAndOtherFactor, // Using renamed fetch function
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwaySubBallastEnvironmentalAndOtherFactor); // Updated type
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwaySubBallastEnvironmentalAndOtherFactor); // Updated type
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (
    railwaySubBallastEnvironmentalAndOtherFactor: RailwaySubBallastEnvironmentalAndOtherFactor,
  ) => {
    // Updated parameter type
    toggleDrawer();
    setSelectedRow(railwaySubBallastEnvironmentalAndOtherFactor);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwaySubBallastEnvironmentalAndOtherFactor>().delete(
      otherSubMenu?.apiRoute || "",
      id,
    ); // Updated generic type
    refetch();
  };

  const handleClickDetail = (
    railwaySubBallastEnvironmentalAndOtherFactor: RailwaySubBallastEnvironmentalAndOtherFactor,
  ) => {
    // Updated parameter type
    toggleDetailDrawer();
    setSelectedRow(railwaySubBallastEnvironmentalAndOtherFactor);
  };

  const mapRailwaySubBallastEnvironmentalAndOtherFactorToDetailItems = (
    // Renamed map function
    railwaySubBallastEnvironmentalAndOtherFactor: RailwaySubBallastEnvironmentalAndOtherFactor, // Updated parameter type
  ): { title: string; value: string }[] => [
    {
      title: t("common.table-columns.id"),
      value: railwaySubBallastEnvironmentalAndOtherFactor?.project_id || "N/A", // project_id is required
    },
    {
      title: t(
        "project.other.railway-sub-ballast-environmental-and-other-factor.details.railway_line_section_name",
      ), // Updated translation key
      value:
        railwaySubBallastEnvironmentalAndOtherFactor?.railway_line_section_name ||
        "N/A", // railway_line_section_name is required
    },
    {
      title: t(
        "project.other.railway-sub-ballast-environmental-and-other-factor.details.environmental_compliance_measures",
      ), // New translation key
      value:
        railwaySubBallastEnvironmentalAndOtherFactor?.environmental_compliance_measures ||
        "N/A", // environmental_compliance_measures is not required
    },
    {
      title: t(
        "project.other.railway-sub-ballast-environmental-and-other-factor.details.environmental_impact_assessment",
      ), // New translation key
      value:
        railwaySubBallastEnvironmentalAndOtherFactor?.environmental_impact_assessment ||
        "N/A", // environmental_impact_assessment is not required
    },
    {
      title: t(
        "project.other.railway-sub-ballast-environmental-and-other-factor.details.remark",
      ), // Updated translation key
      value: railwaySubBallastEnvironmentalAndOtherFactor?.remark || "N/A", // remark is not required
    },
    {
      title: t("common.table-columns.created-at"),
      value: railwaySubBallastEnvironmentalAndOtherFactor?.created_at
        ? formatCreatedAt(
            railwaySubBallastEnvironmentalAndOtherFactor.created_at,
          )
        : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: railwaySubBallastEnvironmentalAndOtherFactor?.updated_at
        ? formatCreatedAt(
            railwaySubBallastEnvironmentalAndOtherFactor.updated_at,
          )
        : "N/A",
    },
  ];

  return (
    <Box>
      {showDrawer && (
        <RailwaySubBallastEnvironmentalAndOtherFactorDrawer // Renamed Drawer component
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwaySubBallastEnvironmentalAndOtherFactor={
            selectedRow as RailwaySubBallastEnvironmentalAndOtherFactor
          } // Updated prop name and type
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapRailwaySubBallastEnvironmentalAndOtherFactorToDetailItems(
            selectedRow as RailwaySubBallastEnvironmentalAndOtherFactor,
          )} // Using renamed map function and updated type
          hasReference={false}
          id={selectedRow?.project_id || ""} // Using project_id as ID
          fileType=""
          title={t(
            "project.other.railway-sub-ballast-environmental-and-other-factor.detail",
          )} // Updated translation key
        />
      )}

      <ItemsListing
        title={t(
          "project.other.railway-sub-ballast-environmental-and-other-factor.title",
        )} // Updated translation key
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwaySubBallastEnvironmentalAndOtherFactorColumns(
            // Using renamed columns function
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwaySubBallastEnvironmentalAndOtherFactorCard // Renamed Card component
            onDetail={handleClickDetail}
            railwaySubBallastEnvironmentalAndOtherFactor={
              data as RailwaySubBallastEnvironmentalAndOtherFactor
            } // Updated prop name and type
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
            subject: "railwaysubballastenvironmentalandotherfactor", // Updated subject
          },
        }}
        fetchDataFunction={refetch}
        items={railwaySubBallastEnvironmentalAndOtherFactor || []} // Using renamed data variable
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwaySubBallastEnvironmentalAndOtherFactorList; // Renamed export
