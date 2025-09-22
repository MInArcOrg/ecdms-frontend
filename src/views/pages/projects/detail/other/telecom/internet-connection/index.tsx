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
import type { InternetConnection } from "src/types/project/other";
import type { GetRequestParam, IApiResponse } from "src/types/requests";
import { formatCreatedAt } from "src/utils/formatter/date";
import ItemsListing from "src/views/shared/listing";
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer";
import InternetConnectionCard from "./internet-connection-card";
import InternetConnectionDrawer from "./internet-connection-drawer";
import { internetConnectionColumns } from "./internet-connection-row";
import { useQuery } from "@tanstack/react-query";
import { projectMasterModels } from "src/constants/master-data/project-general-master-constants";
import projectGeneralMasterDataApiService from "src/services/general/project-general-master-data-service";

interface InternetConnectionListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const InternetConnectionList: React.FC<InternetConnectionListProps> = ({
  otherSubMenu,
  projectId,
  typeId,
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<InternetConnection | null>(
    null,
  );
  const { t } = useTranslation();

  // Fetch master data for displaying titles instead of IDs
  const { data: internetConnectionTypes } = useQuery({
    queryKey: ["internet-connection-types"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.internetConnectionType.model },
      }),
  });

  // Create maps for quick lookup
  const internetConnectionTypeMap = new Map(
    internetConnectionTypes?.payload.map((item) => [
      item.id,
      item.title || "N/A",
    ]) || [],
  );

  const fetchInternetConnections = (
    params: GetRequestParam,
  ): Promise<IApiResponse<InternetConnection[]>> => {
    return projectOtherApiSecondService<InternetConnection>().getAll(
      otherSubMenu?.apiRoute || "",
      {
        ...params,
        filter: { ...params.filter, project_id: projectId },
      },
    );
  };

  const {
    data: internetConnections,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<InternetConnection[]>({
    queryKey: ["internetConnections"],
    fetchFunction: fetchInternetConnections,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as InternetConnection);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as InternetConnection);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (internetConnection: InternetConnection) => {
    toggleDrawer();
    setSelectedRow(internetConnection);
  };

  const handleClickDetail = (internetConnection: InternetConnection) => {
    toggleDetailDrawer();
    setSelectedRow(internetConnection);
  };

  const mapInternetConnectionToDetailItems = (
    internetConnection: InternetConnection,
  ): { title: string; value: string }[] => [
    {
      title: t(
        "project.other.internet-connection.details.internet-connection-type",
      ),
      value:
        internetConnectionTypeMap.get(
          internetConnection?.internet_connection_type_id,
        ) ||
        internetConnection?.internet_connection_type_id ||
        "N/A",
    },
    {
      title: t("project.other.internet-connection.details.routers"),
      value:
        internetConnection?.routers !== undefined
          ? internetConnection.routers
            ? t("common.yes")
            : t("common.no")
          : "N/A",
    },
    {
      title: t("project.other.internet-connection.details.switches"),
      value:
        internetConnection?.switches !== undefined
          ? internetConnection.switches
            ? t("common.yes")
            : t("common.no")
          : "N/A",
    },
    {
      title: t("project.other.internet-connection.details.modems"),
      value:
        internetConnection?.modems !== undefined
          ? internetConnection.modems
            ? t("common.yes")
            : t("common.no")
          : "N/A",
    },
    {
      title: t("project.other.internet-connection.details.cables"),
      value:
        internetConnection?.cables !== undefined
          ? internetConnection.cables
            ? t("common.yes")
            : t("common.no")
          : "N/A",
    },
    {
      title: t("project.other.internet-connection.details.others"),
      value: internetConnection?.others || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: internetConnection?.created_at
        ? formatCreatedAt(internetConnection.created_at)
        : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: internetConnection?.updated_at
        ? formatCreatedAt(internetConnection.updated_at)
        : "N/A",
    },
  ];

  return (
    <Box>
      {showDrawer && (
        <InternetConnectionDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          internetConnection={selectedRow as InternetConnection}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapInternetConnectionToDetailItems(
            selectedRow as InternetConnection,
          )}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={uploadableProjectFileTypes.other.internetConnection}
          title={t(
            "project.other.internet-connection.internet-connection-details",
          )}
        />
      )}

      <ItemsListing
        title={t("project.other.internet-connection.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: internetConnectionColumns(
            handleClickDetail,
            handleEdit,
            null, // No delete function as per CRU requirement
            t,
            refetch,
            internetConnectionTypeMap,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <InternetConnectionCard
            onDetail={handleClickDetail}
            internetConnection={data}
            onEdit={handleEdit}
            refetch={refetch}
            internetConnectionTypeMap={internetConnectionTypeMap}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: true,
          permission: {
            action: "create",
            subject: "internetconnection",
          },
        }}
        fetchDataFunction={refetch}
        items={internetConnections || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default InternetConnectionList;
