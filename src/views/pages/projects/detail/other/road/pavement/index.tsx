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
import type { Pavement } from "src/types/project/other";
import type { GetRequestParam, IApiResponse } from "src/types/requests";
import { formatCreatedAt } from "src/utils/formatter/date";
import ItemsListing from "src/views/shared/listing";
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer";
import PavementCard from "./pavement-card";
import PavementDrawer from "./pavement-drawer";
import { pavementColumns } from "./pavement-row";

interface PavementListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const PavementList: React.FC<PavementListProps> = ({
  otherSubMenu,
  projectId,
  typeId,
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Pavement | null>(null);
  const { t } = useTranslation();

  const fetchPavements = (
    params: GetRequestParam,
  ): Promise<IApiResponse<Pavement[]>> => {
    return projectOtherApiSecondService<Pavement>().getAll(
      otherSubMenu?.apiRoute || "",
      {
        ...params,
        filter: { ...params.filter, project_id: projectId },
      },
    );
  };

  const {
    data: pavements,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<Pavement[]>({
    queryKey: ["pavements"],
    fetchFunction: fetchPavements,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as Pavement);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as Pavement);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (pavement: Pavement) => {
    toggleDrawer();
    setSelectedRow(pavement);
  };

  const handleDelete = async (pavementId: string) => {
    await projectOtherApiSecondService<Pavement>().delete(
      otherSubMenu?.apiRoute || "",
      pavementId,
    );
    refetch();
  };

  const handleClickDetail = (pavement: Pavement) => {
    toggleDetailDrawer();
    setSelectedRow(pavement);
  };

  const mapPavementToDetailItems = (
    pavement: Pavement,
  ): { title: string; value: string }[] => [
    {
      title: t("project.other.pavement.details.name"),
      value: pavement?.name || "N/A",
    },
    {
      title: t("project.other.pavement.details.tangent-length"),
      value: pavement?.tangent_length?.toString() || "N/A",
    },
    {
      title: t("project.other.pavement.details.curve-length"),
      value: pavement?.curve_length?.toString() || "N/A",
    },
    {
      title: t("project.other.pavement.details.road-length-type"),
      value: pavement?.road_length_type_id || "N/A",
    },
    {
      title: t("project.other.pavement.details.road-pavement-thickness"),
      value: pavement?.road_pavement_thickness?.toString() || "N/A",
    },
    {
      title: t("project.other.pavement.details.paved-road-surface-width"),
      value: pavement?.paved_road_surface_width?.toString() || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: pavement?.created_at
        ? formatCreatedAt(pavement.created_at)
        : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: pavement?.updated_at
        ? formatCreatedAt(pavement.updated_at)
        : "N/A",
    },
  ];

  return (
    <Box>
      {showDrawer && (
        <PavementDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          pavement={selectedRow as Pavement}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapPavementToDetailItems(selectedRow as Pavement)}
          hasReference={false}
          id={selectedRow?.id || ""}
          title={t("project.other.pavement.pavement-details")}
          fileType=""
        />
      )}

      <ItemsListing
        title={t("project.other.pavement.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: pavementColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <PavementCard
            onDetail={handleClickDetail}
            pavement={data}
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
            subject: "pavement",
          },
        }}
        fetchDataFunction={refetch}
        items={pavements || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default PavementList;
