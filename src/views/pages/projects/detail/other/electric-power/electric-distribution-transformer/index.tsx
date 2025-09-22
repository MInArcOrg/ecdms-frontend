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
import type { ElectricDistributionTransformer } from "src/types/project/other";
import type { GetRequestParam, IApiResponse } from "src/types/requests";
import { formatCreatedAt } from "src/utils/formatter/date";
import ItemsListing from "src/views/shared/listing";
import { useQuery } from "@tanstack/react-query";
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer";
import ElectricDistributionTransformerCard from "./electric-distribution-transformer-card";
import ElectricDistributionTransformerDrawer from "./electric-distribution-transformer-drawer";
import { electricDistributionTransformerColumns } from "./electric-distribution-transformer-row";
import { projectMasterModels } from "src/constants/master-data/project-general-master-constants";
import projectGeneralMasterDataApiService from "src/services/general/project-general-master-data-service";

interface ElectricDistributionTransformerListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const ElectricDistributionTransformerList: React.FC<
  ElectricDistributionTransformerListProps
> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<ElectricDistributionTransformer | null>(null);
  const { t } = useTranslation();

  // Fetch fire extinguishing technologies from master data
  const { data: fireExtinguishingTechnologies } = useQuery({
    queryKey: ["fire-extinguishing-technologies"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: {
          model: projectMasterModels.fireExtinguishingTechnology.model,
        },
      }),
  });

  const fetchElectricDistributionTransformers = (
    params: GetRequestParam,
  ): Promise<IApiResponse<ElectricDistributionTransformer[]>> => {
    return projectOtherApiSecondService<ElectricDistributionTransformer>().getAll(
      otherSubMenu?.apiRoute || "",
      {},
    );
  };

  const {
    data: electricDistributionTransformers,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<ElectricDistributionTransformer[]>({
    queryKey: ["electricDistributionTransformers"],
    fetchFunction: fetchElectricDistributionTransformers,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as ElectricDistributionTransformer);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as ElectricDistributionTransformer);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (
    electricDistributionTransformer: ElectricDistributionTransformer,
  ) => {
    toggleDrawer();
    setSelectedRow(electricDistributionTransformer);
  };

  const handleDelete = async (electricDistributionTransformerId: string) => {
    await projectOtherApiSecondService<ElectricDistributionTransformer>().delete(
      otherSubMenu?.apiRoute || "",
      electricDistributionTransformerId,
    );
    refetch();
  };

  const handleClickDetail = (
    electricDistributionTransformer: ElectricDistributionTransformer,
  ) => {
    toggleDetailDrawer();
    setSelectedRow(electricDistributionTransformer);
  };

  // Create maps for dropdown values
  const fireExtinguishingTechnologiesMap = new Map(
    fireExtinguishingTechnologies?.payload.map((item: any) => [
      item.id,
      item.title || "",
    ]) || [],
  );

  const mapElectricDistributionTransformerToDetailItems = (
    electricDistributionTransformer: ElectricDistributionTransformer,
  ): { title: string; value: string }[] => [
    {
      title: t("project.other.electric-distribution-transformer.details.name"),
      value: electricDistributionTransformer?.name || "N/A",
    },
    {
      title: t(
        "project.other.electric-distribution-transformer.details.service-area",
      ),
      value:
        electricDistributionTransformer?.service_area !== undefined
          ? `${electricDistributionTransformer.service_area} ${t("common.km2")}`
          : "N/A",
    },
    {
      title: t(
        "project.other.electric-distribution-transformer.details.installation-year",
      ),
      value:
        electricDistributionTransformer?.installation_year?.toString() || "N/A",
    },
    {
      title: t(
        "project.other.electric-distribution-transformer.details.transformers-total-number",
      ),
      value:
        electricDistributionTransformer?.transformers_total_number?.toString() ||
        "N/A",
    },
    {
      title: t(
        "project.other.electric-distribution-transformer.details.gps-x-coordinates",
      ),
      value:
        electricDistributionTransformer?.gps_x_coordinates?.toString() || "N/A",
    },
    {
      title: t(
        "project.other.electric-distribution-transformer.details.gps-y-coordinates",
      ),
      value:
        electricDistributionTransformer?.gps_y_coordinates?.toString() || "N/A",
    },
    {
      title: t(
        "project.other.electric-distribution-transformer.details.fire-extinguishing-technology-id",
      ),
      value: electricDistributionTransformer?.fire_extinguishing_technology_id
        ? fireExtinguishingTechnologiesMap.get(
            electricDistributionTransformer.fire_extinguishing_technology_id,
          ) || electricDistributionTransformer.fire_extinguishing_technology_id
        : "N/A",
    },
    {
      title: t("project.other.electric-distribution-transformer.details.other"),
      value: electricDistributionTransformer?.other || "N/A",
    },
    {
      title: t(
        "project.other.electric-distribution-transformer.details.remark",
      ),
      value: electricDistributionTransformer?.remark || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: electricDistributionTransformer?.created_at
        ? formatCreatedAt(electricDistributionTransformer.created_at)
        : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: electricDistributionTransformer?.updated_at
        ? formatCreatedAt(electricDistributionTransformer.updated_at)
        : "N/A",
    },
  ];

  return (
    <Box>
      {showDrawer && (
        <ElectricDistributionTransformerDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          electricDistributionTransformer={
            selectedRow as ElectricDistributionTransformer
          }
          refetch={refetch}
          projectId={projectId}
          fireExtinguishingTechnologies={
            fireExtinguishingTechnologies?.payload || []
          }
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapElectricDistributionTransformerToDetailItems(
            selectedRow as ElectricDistributionTransformer,
          )}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={
            uploadableProjectFileTypes.other.electric_distribution_transformer
          }
          title={t(
            "project.other.electric-distribution-transformer.electric-distribution-transformer-details",
          )}
        />
      )}

      <ItemsListing
        title={t("project.other.electric-distribution-transformer.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: electricDistributionTransformerColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            fireExtinguishingTechnologiesMap,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <ElectricDistributionTransformerCard
            onDetail={handleClickDetail}
            electricDistributionTransformer={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
            fireExtinguishingTechnologiesMap={fireExtinguishingTechnologiesMap}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: true,
          permission: {
            action: "create",
            subject: "electricdistributiontransformer",
          },
        }}
        fetchDataFunction={refetch}
        items={electricDistributionTransformers || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default ElectricDistributionTransformerList;
