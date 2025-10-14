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
import { RailwayEnvironmentalAndOtherFactor } from "src/types/project/other";
import { formatCreatedAt, formatDate } from "src/utils/formatter/date";
import RailwayEnvironmentalAndOtherFactorCard from "./railway-environmental-and-other-factor-card";
import RailwayEnvironmentalAndOtherFactorDrawer from "./railway-environmental-and-other-factor-drawer";
import FileDrawer from "src/views/components/custom/files-drawer";
import { railwayEnvironmentalAndOtherFactorColumns } from "./railway-environmental-and-other-factor-row";

interface RailwayEnvironmentalAndOtherFactorListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RailwayEnvironmentalAndOtherFactorList: React.FC<
  RailwayEnvironmentalAndOtherFactorListProps
> = ({ otherSubMenu, projectId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<RailwayEnvironmentalAndOtherFactor | null>(null);
  const { t } = useTranslation();

  const fetchRailwayEnvironmentalAndOtherFactor = (
    params: GetRequestParam,
  ): Promise<IApiResponse<RailwayEnvironmentalAndOtherFactor[]>> => {
    return projectOtherApiSecondService<RailwayEnvironmentalAndOtherFactor>().getAll(
      otherSubMenu?.apiRoute || "",
      {
        ...params,
        filter: { ...params.filter, project_id: projectId },
      },
    );
  };

  const {
    data: environmentalFactors,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<RailwayEnvironmentalAndOtherFactor[]>({
    queryKey: ["railwayEnvironmentalAndOtherFactors"],
    fetchFunction: fetchRailwayEnvironmentalAndOtherFactor,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwayEnvironmentalAndOtherFactor);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayEnvironmentalAndOtherFactor);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (
    environmentalFactor: RailwayEnvironmentalAndOtherFactor,
  ) => {
    toggleDrawer();
    setSelectedRow(environmentalFactor);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwayEnvironmentalAndOtherFactor>().delete(
      otherSubMenu?.apiRoute || "",
      id,
    );
    refetch();
  };

  const handleClickDetail = (
    environmentalFactor: RailwayEnvironmentalAndOtherFactor,
  ) => {
    toggleDetailDrawer();
    setSelectedRow(environmentalFactor);
  };

  const mapEnvironmentalFactorToDetailItems = (
    environmentalFactor: RailwayEnvironmentalAndOtherFactor,
  ): { title: string; value: any }[] => [
      {
        title: t("common.table-columns.id"),
        value: environmentalFactor?.id || "N/A",
      },
      {
        title: t(
          "project.other.railway-environmental-and-other-factor.details.railway_line_section_name",
        ),
        value: environmentalFactor?.railway_line_section_name || "N/A",
      },
      {
        title: t(
          "project.other.railway-environmental-and-other-factor.details.environmental_compliance_measures",
        ),
        value: environmentalFactor?.environmental_compliance_measures ? 'Yes' : 'No',
      },
      {
        title: t(
          "project.other.railway-environmental-and-other-factor.details.environmental_impact_assessment",
        ),
        value: environmentalFactor?.environmental_impact_assessment ? 'Yes' : 'No',
      },
      {
        title: t(
          "project.other.railway-environmental-and-other-factor.details.data_recording_date",
        ),
        value: environmentalFactor?.data_recording_date
          ? formatDate(environmentalFactor.data_recording_date)
          : "N/A",
      },
      {
        title: t(
          "project.other.railway-environmental-and-other-factor.details.remark",
        ),
        value: environmentalFactor?.remark || "N/A",
      },
      {
        title: t(
          "project.other.railway-environmental-and-other-factor.details.compliance-document-file-upload",
        ),
        value: (
          <FileDrawer
            id={environmentalFactor.id}
            type={otherSubMenu?.fileType || ""} // Using fileType from menu as per your example
          />
        ),
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
        <RailwayEnvironmentalAndOtherFactorDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayEnvironmentalAndOtherFactor={
            selectedRow as RailwayEnvironmentalAndOtherFactor
          }
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapEnvironmentalFactorToDetailItems(
            selectedRow as RailwayEnvironmentalAndOtherFactor,
          )}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={"RAILWAY_ENVIRONMENTAL_AND_OTHER_FACTOR"}
          title={t(
            "project.other.railway-environmental-and-other-factor.detail",
          )}
        />
      )}

      <ItemsListing
        title={t(
          "project.other.railway-environmental-and-other-factor.title",
        )}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayEnvironmentalAndOtherFactorColumns(
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
          <RailwayEnvironmentalAndOtherFactorCard
            onDetail={handleClickDetail}
            railwayEnvironmentalAndOtherFactor={
              data as RailwayEnvironmentalAndOtherFactor
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
            subject: "railwayenvironmentalandotherfactor",
          },
        }}
        fetchDataFunction={refetch}
        items={environmentalFactors || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwayEnvironmentalAndOtherFactorList;