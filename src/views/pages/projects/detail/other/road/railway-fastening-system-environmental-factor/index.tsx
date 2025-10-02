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
import { RailwayFasteningSystemEnvironmentalFactor } from "src/types/project/other";
import { formatCreatedAt } from "src/utils/formatter/date";
import RailwayFasteningSystemEnvironmentalFactorCard from "./railway-fastening-system-environmental-factor-card";
import RailwayFasteningSystemEnvironmentalFactorDrawer from "./railway-fastening-system-environmental-factor-drawer";
import { railwayFasteningSystemEnvironmentalFactorColumns } from "./railway-fastening-system-environmental-factor-row";

interface RailwayFasteningSystemEnvironmentalFactorListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RailwayFasteningSystemEnvironmentalFactorList: React.FC<
  RailwayFasteningSystemEnvironmentalFactorListProps
> = ({ otherSubMenu, projectId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<RailwayFasteningSystemEnvironmentalFactor | null>(null);
  const { t } = useTranslation();

  const fetchRailwayFasteningSystemEnvironmentalFactor = (
    params: GetRequestParam,
  ): Promise<IApiResponse<RailwayFasteningSystemEnvironmentalFactor[]>> => {
    return projectOtherApiSecondService<RailwayFasteningSystemEnvironmentalFactor>().getAll(
      otherSubMenu?.apiRoute || "",
      {
        ...params,
        filter: { ...params.filter, project_id: projectId },
      },
    );
  };

  const {
    data: railwayFasteningSystemEnvironmentalFactors,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<RailwayFasteningSystemEnvironmentalFactor[]>({
    queryKey: ["railwayFasteningSystemEnvironmentalFactors"],
    fetchFunction: fetchRailwayFasteningSystemEnvironmentalFactor,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwayFasteningSystemEnvironmentalFactor);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayFasteningSystemEnvironmentalFactor);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (
    environmentalFactor: RailwayFasteningSystemEnvironmentalFactor,
  ) => {
    toggleDrawer();
    setSelectedRow(environmentalFactor);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwayFasteningSystemEnvironmentalFactor>().delete(
      otherSubMenu?.apiRoute || "",
      id,
    );
    refetch();
  };

  const handleClickDetail = (
    environmentalFactor: RailwayFasteningSystemEnvironmentalFactor,
  ) => {
    toggleDetailDrawer();
    setSelectedRow(environmentalFactor);
  };

  const mapRailwayFasteningSystemEnvironmentalFactorToDetailItems = (
    environmentalFactor: RailwayFasteningSystemEnvironmentalFactor,
  ): { title: string; value: string }[] => [
    {
      title: t("common.table-columns.id"),
      value: environmentalFactor?.id || "N/A",
    },
    {
      title: t(
        "project.other.railway-fastening-system-environmental-factor.details.railway_line_section_name",
      ),
      value: environmentalFactor?.railway_line_section_name || "N/A",
    },
    {
      title: t(
        "project.other.railway-fastening-system-environmental-factor.details.environmental_compliance_measures",
      ),
      value: environmentalFactor?.environmental_compliance_measures || "N/A",
    },
    {
      title: t(
        "project.other.railway-fastening-system-environmental-factor.details.environmental_impact_assessment",
      ),
      value: environmentalFactor?.environmental_impact_assessment || "N/A",
    },
    {
      title: t(
        "project.other.railway-fastening-system-environmental-factor.details.remark",
      ),
      value: environmentalFactor?.remark || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: environmentalFactor?.created_at
        ? formatCreatedAt(environmentalFactor.created_at)
        : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: environmentalFactor?.updated_at
        ? formatCreatedAt(environmentalFactor.updated_at)
        : "N/A",
    },
  ];

  return (
    <Box>
      {showDrawer && (
        <RailwayFasteningSystemEnvironmentalFactorDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayFasteningSystemEnvironmentalFactor={
            selectedRow as RailwayFasteningSystemEnvironmentalFactor
          }
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapRailwayFasteningSystemEnvironmentalFactorToDetailItems(
            selectedRow as RailwayFasteningSystemEnvironmentalFactor,
          )}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={otherSubMenu?.id || "DEFAULT_FILES"}
          title={t(
            "project.other.railway-fastening-system-environmental-factor.detail",
          )}
        />
      )}

      <ItemsListing
        title={t(
          "project.other.railway-fastening-system-environmental-factor.title",
        )}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayFasteningSystemEnvironmentalFactorColumns(
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
          <RailwayFasteningSystemEnvironmentalFactorCard
            onDetail={handleClickDetail}
            railwayFasteningSystemEnvironmentalFactor={
              data as RailwayFasteningSystemEnvironmentalFactor
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
            subject: "railwayfasteningsystemenvironmentalfactor",
          },
        }}
        fetchDataFunction={refetch}
        items={railwayFasteningSystemEnvironmentalFactors || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwayFasteningSystemEnvironmentalFactorList;
