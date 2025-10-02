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
import type { CulvertRoadOverInformation } from "src/types/project/other";
import type { GetRequestParam, IApiResponse } from "src/types/requests";
import { formatCreatedAt } from "src/utils/formatter/date";
import ItemsListing from "src/views/shared/listing";
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer";
import CulvertRoadOverInformationCard from "./culvert-road-over-information-card";
import CulvertRoadOverInformationDrawer from "./culvert-road-over-information-drawer";
import { culvertRoadOverInformationColumns } from "./culvert-road-over-information-row";

interface CulvertRoadOverInformationListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const CulvertRoadOverInformationList: React.FC<
  CulvertRoadOverInformationListProps
> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<CulvertRoadOverInformation | null>(null);
  const { t } = useTranslation();

  const fetchCulvertRoadOverInformation = (
    params: GetRequestParam,
  ): Promise<IApiResponse<CulvertRoadOverInformation[]>> => {
    return projectOtherApiSecondService<CulvertRoadOverInformation>().getAll(
      otherSubMenu?.apiRoute || "",
      {
        ...params,
        filter: { ...params.filter, project_id: projectId },
      },
    );
  };

  const {
    data: culvertRoadOverInformations,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<CulvertRoadOverInformation[]>({
    queryKey: ["culvertRoadOverInformations"],
    fetchFunction: fetchCulvertRoadOverInformation,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as CulvertRoadOverInformation);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as CulvertRoadOverInformation);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (
    culvertRoadOverInformation: CulvertRoadOverInformation,
  ) => {
    toggleDrawer();
    setSelectedRow(culvertRoadOverInformation);
  };

  const handleDelete = async (culvertRoadOverInformationId: string) => {
    await projectOtherApiSecondService<CulvertRoadOverInformation>().delete(
      otherSubMenu?.apiRoute || "",
      culvertRoadOverInformationId,
    );
    refetch();
  };

  const handleClickDetail = (
    culvertRoadOverInformation: CulvertRoadOverInformation,
  ) => {
    toggleDetailDrawer();
    setSelectedRow(culvertRoadOverInformation);
  };

  const mapCulvertRoadOverInformationToDetailItems = (
    culvertRoadOverInformation: CulvertRoadOverInformation,
  ): { title: string; value: string }[] => [
    {
      title: t("project.other.culvert-road-over-information.details.name"),
      value: culvertRoadOverInformation?.name || "N/A",
    },
    {
      title: t(
        "project.other.culvert-road-over-information.details.carriage-way-width",
      ),
      value:
        culvertRoadOverInformation?.carriage_way_width?.toString() || "N/A",
    },
    {
      title: t(
        "project.other.culvert-road-over-information.details.side-walk-width",
      ),
      value: culvertRoadOverInformation?.side_walk_width?.toString() || "N/A",
    },
    {
      title: t(
        "project.other.culvert-road-over-information.details.lane-number",
      ),
      value: culvertRoadOverInformation?.lane_number?.toString() || "N/A",
    },
    {
      title: t(
        "project.other.culvert-road-over-information.details.head-wall-to-head-wall",
      ),
      value:
        culvertRoadOverInformation?.head_wall_to_head_wall?.toString() || "N/A",
    },
    {
      title: t(
        "project.other.culvert-road-over-information.details.average-fill-height",
      ),
      value:
        culvertRoadOverInformation?.average_fill_height?.toString() || "N/A",
    },
    {
      title: t(
        "project.other.culvert-road-over-information.details.guard-rail-type-id",
      ),
      value: culvertRoadOverInformation?.guard_rail_type_id || "N/A",
    },
    {
      title: t(
        "project.other.culvert-road-over-information.details.parapet-length",
      ),
      value: culvertRoadOverInformation?.parapet_length?.toString() || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: culvertRoadOverInformation?.created_at
        ? formatCreatedAt(culvertRoadOverInformation.created_at)
        : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: culvertRoadOverInformation?.updated_at
        ? formatCreatedAt(culvertRoadOverInformation.updated_at)
        : "N/A",
    },
  ];

  return (
    <Box>
      {showDrawer && (
        <CulvertRoadOverInformationDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          culvertRoadOverInformation={selectedRow as CulvertRoadOverInformation}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapCulvertRoadOverInformationToDetailItems(
            selectedRow as CulvertRoadOverInformation,
          )}
          hasReference={false}
          id={selectedRow?.id || ""}
          title={t(
            "project.other.culvert-road-over-information.culvert-road-over-information-details",
          )}
          fileType=""
        />
      )}

      <ItemsListing
        title={t("project.other.culvert-road-over-information.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: culvertRoadOverInformationColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <CulvertRoadOverInformationCard
            onDetail={handleClickDetail}
            culvertRoadOverInformation={data}
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
            subject: "culvertroadoverinformation",
          },
        }}
        fetchDataFunction={refetch}
        items={culvertRoadOverInformations || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default CulvertRoadOverInformationList;
