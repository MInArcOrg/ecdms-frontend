"use client";

import type React from "react";

import { Box } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import { uploadableProjectFileTypes } from "src/services/utils/file-constants";
import { defaultCreateActionConfig } from "src/types/general/listing";
import type { EnvironmentalAndSocialImpact } from "src/types/project/other";
import type { GetRequestParam, IApiResponse } from "src/types/requests";
import { formatCreatedAt } from "src/utils/formatter/date";
import ItemsListing from "src/views/shared/listing";
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer";
import EnvironmentalAndSocialImpactCard from "./environmental-and-social-impact-card";
import EnvironmentalAndSocialImpactDrawer from "./environmental-and-social-impact-drawer";
import { environmentalAndSocialImpactColumns } from "./environmental-and-social-impact-row";

interface EnvironmentalAndSocialImpactListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const EnvironmentalAndSocialImpactList: React.FC<
  EnvironmentalAndSocialImpactListProps
> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<EnvironmentalAndSocialImpact | null>(null);
  const { t } = useTranslation();

  const fetchEnvironmentalAndSocialImpacts = (
    params: GetRequestParam,
  ): Promise<IApiResponse<EnvironmentalAndSocialImpact[]>> => {
    return projectOtherApiSecondService<EnvironmentalAndSocialImpact>().getAll(
      otherSubMenu?.apiRoute || "",
      {
        ...params,
        filter: { ...params.filter, project_id: projectId },
      },
    );
  };

  const {
    data: environmentalAndSocialImpacts,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<EnvironmentalAndSocialImpact[]>({
    queryKey: ["environmentalAndSocialImpacts"],
    fetchFunction: fetchEnvironmentalAndSocialImpacts,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as EnvironmentalAndSocialImpact);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as EnvironmentalAndSocialImpact);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (
    environmentalAndSocialImpact: EnvironmentalAndSocialImpact,
  ) => {
    toggleDrawer();
    setSelectedRow(environmentalAndSocialImpact);
  };

  const handleDelete = async (environmentalAndSocialImpactId: string) => {
    await projectOtherApiSecondService<EnvironmentalAndSocialImpact>().delete(
      otherSubMenu?.apiRoute || "",
      environmentalAndSocialImpactId,
    );
    refetch();
  };

  const handleClickDetail = (
    environmentalAndSocialImpact: EnvironmentalAndSocialImpact,
  ) => {
    toggleDetailDrawer();
    setSelectedRow(environmentalAndSocialImpact);
  };

  const mapEnvironmentalAndSocialImpactToDetailItems = (
    environmentalAndSocialImpact: EnvironmentalAndSocialImpact,
  ): { title: string; value: string }[] => [
    {
      title: t(
        "project.other.environmental-and-social-impact.details.environmental-impact-assessment-conducted",
      ),
      value:
        environmentalAndSocialImpact?.environmental_impact_assessment_conducted
          ? t("common.yes")
          : t("common.no"),
    },
    {
      title: t(
        "project.other.environmental-and-social-impact.details.mitigation-measures-implemented",
      ),
      value: environmentalAndSocialImpact?.mitigation_measures_implemented
        ? t("common.yes")
        : t("common.no"),
    },
    {
      title: t(
        "project.other.environmental-and-social-impact.details.social-impact-assessment-conducted",
      ),
      value: environmentalAndSocialImpact?.social_impact_assessment_conducted
        ? t("common.yes")
        : t("common.no"),
    },
    {
      title: t(
        "project.other.environmental-and-social-impact.details.resettlement-and-compensation-measures-implemented",
      ),
      value:
        environmentalAndSocialImpact?.resettlement_and_compensation_measures_implemented
          ? t("common.yes")
          : t("common.no"),
    },
    {
      title: t("project.other.environmental-and-social-impact.details.remark"),
      value: environmentalAndSocialImpact?.remark || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: environmentalAndSocialImpact?.created_at
        ? formatCreatedAt(environmentalAndSocialImpact.created_at)
        : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: environmentalAndSocialImpact?.updated_at
        ? formatCreatedAt(environmentalAndSocialImpact.updated_at)
        : "N/A",
    },
  ];

  return (
    <Box>
      {showDrawer && (
        <EnvironmentalAndSocialImpactDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          environmentalAndSocialImpact={
            selectedRow as EnvironmentalAndSocialImpact
          }
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapEnvironmentalAndSocialImpactToDetailItems(
            selectedRow as EnvironmentalAndSocialImpact,
          )}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={
            uploadableProjectFileTypes.other.environmentalAndSocialImpact
          }
          title={t(
            "project.other.environmental-and-social-impact.environmental-and-social-impact-details",
          )}
        />
      )}

      <ItemsListing
        title={t("project.other.environmental-and-social-impact.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: environmentalAndSocialImpactColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <EnvironmentalAndSocialImpactCard
            onDetail={handleClickDetail}
            environmentalAndSocialImpact={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: true,
          permission: {
            action: "create",
            subject: "environmentalandsocialimpact",
          },
        }}
        fetchDataFunction={refetch}
        items={environmentalAndSocialImpacts || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default EnvironmentalAndSocialImpactList;
