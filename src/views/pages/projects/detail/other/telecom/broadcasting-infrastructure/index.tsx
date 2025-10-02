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
import type { BroadcastingInfrastructure } from "src/types/project/other";
import type { GetRequestParam, IApiResponse } from "src/types/requests";
import { formatCreatedAt } from "src/utils/formatter/date";
import ItemsListing from "src/views/shared/listing";
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer";
import BroadcastingInfrastructureCard from "./broadcasting-infrastructure-card";
import BroadcastingInfrastructureDrawer from "./broadcasting-infrastructure-drawer";
import { broadcastingInfrastructureColumns } from "./broadcasting-infrastructure-row";
import { useQuery } from "@tanstack/react-query";
import { projectMasterModels } from "src/constants/master-data/project-general-master-constants";
import projectGeneralMasterDataApiService from "src/services/general/project-general-master-data-service";

interface BroadcastingInfrastructureListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const BroadcastingInfrastructureList: React.FC<
  BroadcastingInfrastructureListProps
> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<BroadcastingInfrastructure | null>(null);
  const { t } = useTranslation();

  // Fetch master data for displaying titles instead of IDs
  const { data: broadcastingInfrastructureTypes } = useQuery({
    queryKey: ["broadcasting-infrastructure-types"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: {
          model: projectMasterModels.broadcastingInfrastructureType.model,
        },
      }),
  });

  // Create maps for quick lookup
  const broadcastingInfrastructureTypeMap = new Map<string, string>(
    broadcastingInfrastructureTypes?.payload.map((item) => [
      item.id,
      item.title || "",
    ]) || [],
  );

  const fetchBroadcastingInfrastructures = (
    params: GetRequestParam,
  ): Promise<IApiResponse<BroadcastingInfrastructure[]>> => {
    return projectOtherApiSecondService<BroadcastingInfrastructure>().getAll(
      otherSubMenu?.apiRoute || "",
      {
        ...params,
        filter: { ...params.filter, project_id: projectId },
      },
    );
  };

  const {
    data: broadcastingInfrastructures,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<BroadcastingInfrastructure[]>({
    queryKey: ["broadcastingInfrastructures"],
    fetchFunction: fetchBroadcastingInfrastructures,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as BroadcastingInfrastructure);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as BroadcastingInfrastructure);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (
    broadcastingInfrastructure: BroadcastingInfrastructure,
  ) => {
    toggleDrawer();
    setSelectedRow(broadcastingInfrastructure);
  };

  const handleDelete = async (broadcastingInfrastructureId: string) => {
    await projectOtherApiSecondService<BroadcastingInfrastructure>().delete(
      otherSubMenu?.apiRoute || "",
      broadcastingInfrastructureId,
    );
    refetch();
  };

  const handleClickDetail = (
    broadcastingInfrastructure: BroadcastingInfrastructure,
  ) => {
    toggleDetailDrawer();
    setSelectedRow(broadcastingInfrastructure);
  };

  const mapBroadcastingInfrastructureToDetailItems = (
    broadcastingInfrastructure: BroadcastingInfrastructure,
  ): { title: string; value: string }[] => [
    {
      title: t(
        "project.other.broadcasting-infrastructure.details.broadcasting-infrastructure-type",
      ),
      value:
        broadcastingInfrastructureTypeMap.get(
          broadcastingInfrastructure?.broadcasting_infrastructure_type_id,
        ) ||
        broadcastingInfrastructure?.broadcasting_infrastructure_type_id ||
        "N/A",
    },
    {
      title: t(
        "project.other.broadcasting-infrastructure.details.broadcasting-network",
      ),
      value:
        broadcastingInfrastructure?.broadcasting_network !== undefined
          ? broadcastingInfrastructure.broadcasting_network
            ? t("common.yes")
            : t("common.no")
          : "N/A",
    },
    {
      title: t("project.other.broadcasting-infrastructure.details.antennas"),
      value:
        broadcastingInfrastructure?.antennas !== undefined
          ? broadcastingInfrastructure.antennas
            ? t("common.yes")
            : t("common.no")
          : "N/A",
    },
    {
      title: t(
        "project.other.broadcasting-infrastructure.details.transmitters",
      ),
      value:
        broadcastingInfrastructure?.transmitters !== undefined
          ? broadcastingInfrastructure.transmitters
            ? t("common.yes")
            : t("common.no")
          : "N/A",
    },
    {
      title: t("project.other.broadcasting-infrastructure.details.towers"),
      value:
        broadcastingInfrastructure?.towers !== undefined
          ? broadcastingInfrastructure.towers
            ? t("common.yes")
            : t("common.no")
          : "N/A",
    },
    {
      title: t("project.other.broadcasting-infrastructure.details.cables"),
      value:
        broadcastingInfrastructure?.cables !== undefined
          ? broadcastingInfrastructure.cables
            ? t("common.yes")
            : t("common.no")
          : "N/A",
    },
    {
      title: t("project.other.broadcasting-infrastructure.details.others"),
      value: broadcastingInfrastructure?.others || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: broadcastingInfrastructure?.created_at
        ? formatCreatedAt(broadcastingInfrastructure.created_at)
        : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: broadcastingInfrastructure?.updated_at
        ? formatCreatedAt(broadcastingInfrastructure.updated_at)
        : "N/A",
    },
  ];

  return (
    <Box>
      {showDrawer && (
        <BroadcastingInfrastructureDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          broadcastingInfrastructure={selectedRow as BroadcastingInfrastructure}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapBroadcastingInfrastructureToDetailItems(
            selectedRow as BroadcastingInfrastructure,
          )}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={uploadableProjectFileTypes.other.broadcastingInfrastructure}
          title={t(
            "project.other.broadcasting-infrastructure.broadcasting-infrastructure-details",
          )}
        />
      )}

      <ItemsListing
        title={t("project.other.broadcasting-infrastructure.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: broadcastingInfrastructureColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            broadcastingInfrastructureTypeMap,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <BroadcastingInfrastructureCard
            onDetail={handleClickDetail}
            broadcastingInfrastructure={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
            broadcastingInfrastructureTypeMap={
              broadcastingInfrastructureTypeMap
            }
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: "create",
            subject: "broadcastinginfrastructure",
          },
        }}
        fetchDataFunction={refetch}
        items={broadcastingInfrastructures || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default BroadcastingInfrastructureList;
