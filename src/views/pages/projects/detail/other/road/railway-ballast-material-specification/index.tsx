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
import RailwayBallastMaterialSpecificationCard from "./railway-ballastm-material-specification-card";
import RailwayBallastMaterialSpecificationDrawer from "./railway-ballastm-material-specification-drawer";
import { RailwayBallastMaterialSpecification } from "src/types/project/other";
import { formatCreatedAt } from "src/utils/formatter/date";
import { railwayBallastMaterialSpecificationColumns } from "./railway-ballastm-material-specification-row";

interface RailwayBallastMaterialSpecificationListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RailwayBallastMaterialSpecificationList: React.FC<
  RailwayBallastMaterialSpecificationListProps
> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<RailwayBallastMaterialSpecification | null>(null);
  const { t } = useTranslation();

  const fetchData = (
    params: GetRequestParam,
  ): Promise<IApiResponse<RailwayBallastMaterialSpecification[]>> => {
    return projectOtherApiSecondService<RailwayBallastMaterialSpecification>().getAll(
      otherSubMenu?.apiRoute || "",
      {
        ...params,
        filter: { ...params.filter, project_id: projectId },
      },
    );
  };

  const { data, isLoading, pagination, handlePageChange, refetch } =
    usePaginatedFetch<RailwayBallastMaterialSpecification[]>({
      queryKey: ["railwayBallastMaterialSpecifications"],
      fetchFunction: fetchData,
    });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwayBallastMaterialSpecification);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayBallastMaterialSpecification);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (row: RailwayBallastMaterialSpecification) => {
    setSelectedRow(row);
    setShowDrawer(true);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwayBallastMaterialSpecification>().delete(
      otherSubMenu?.apiRoute || "",
      id,
    );
    refetch();
  };

  const handleClickDetail = (row: RailwayBallastMaterialSpecification) => {
    setSelectedRow(row);
    setShowDetailDrawer(true);
  };

  const mapToDetailItems = (
    row: RailwayBallastMaterialSpecification,
  ): { title: string; value: string }[] => [
    {
      title: t("common.table-columns.id"),
      value: row?.project_id || "N/A",
    },
    {
      title: t(
        "project.other.railway-ballast-material-specification.details.railway-line-section-name",
      ),
      value: row?.railway_line_section_name || "N/A",
    },
    {
      title: t(
        "project.other.railway-ballast-material-specification.details.ballast-material-type-id",
      ),
      value: row?.ballast_material_type_id || "N/A",
    },
    {
      title: t(
        "project.other.railway-ballast-material-specification.details.specific-gravity",
      ),
      value: row?.specific_gravity?.toLocaleString() ?? "N/A",
    },
    {
      title: t(
        "project.other.railway-ballast-material-specification.details.porosity",
      ),
      value: row?.porosity?.toLocaleString() ?? "N/A",
    },
    {
      title: t(
        "project.other.railway-ballast-material-specification.details.water-absorption",
      ),
      value: row?.water_absorption?.toLocaleString() ?? "N/A",
    },
    {
      title: t(
        "project.other.railway-ballast-material-specification.details.shape",
      ),
      value: row?.shape || "N/A",
    },
    {
      title: t(
        "project.other.railway-ballast-material-specification.details.average-particle-length",
      ),
      value: row?.average_particle_length?.toLocaleString() ?? "N/A",
    },
    {
      title: t(
        "project.other.railway-ballast-material-specification.details.remark",
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
        <RailwayBallastMaterialSpecificationDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayBallastMaterialSpecification={
            selectedRow as RailwayBallastMaterialSpecification
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
            selectedRow as RailwayBallastMaterialSpecification,
          )}
          hasReference={false}
          id={selectedRow?.project_id || ""}
          fileType=""
          title={t(
            "project.other.railway-ballast-material-specification.detail",
          )}
        />
      )}

      <ItemsListing
        title={t("project.other.railway-ballast-material-specification.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayBallastMaterialSpecificationColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwayBallastMaterialSpecificationCard
            onDetail={handleClickDetail}
            railwayBallastMaterialSpecification={data}
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
            subject: "railwayballastmaterialspecification",
          },
        }}
        fetchDataFunction={refetch}
        items={data || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwayBallastMaterialSpecificationList;
