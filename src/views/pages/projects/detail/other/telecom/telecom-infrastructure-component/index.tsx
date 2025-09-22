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
import type { TelecomInfrastructureComponent } from "src/types/project/other";
import type { GetRequestParam, IApiResponse } from "src/types/requests";
import { formatCreatedAt } from "src/utils/formatter/date";
import ItemsListing from "src/views/shared/listing";
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer";
import TelecomInfrastructureComponentCard from "./telecom-infrastructure-component-card";
import TelecomInfrastructureComponentDrawer from "./telecom-infrastructure-component-drawer";
import { telecomInfrastructureComponentColumns } from "./telecom-infrastructure-component-row";
import { useQuery } from "@tanstack/react-query";
import { projectMasterModels } from "src/constants/master-data/project-general-master-constants";
import projectGeneralMasterDataApiService from "src/services/general/project-general-master-data-service";

interface TelecomInfrastructureComponentListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const TelecomInfrastructureComponentList: React.FC<
  TelecomInfrastructureComponentListProps
> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<TelecomInfrastructureComponent | null>(null);
  const { t } = useTranslation();

  // Fetch master data for displaying titles instead of IDs
  const { data: mobileNetworkTypes } = useQuery({
    queryKey: ["mobile-network-types"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.mobileNetworkType.model },
      }),
  });

  // Create maps for quick lookup
  const mobileNetworkTypeMap = new Map(
    mobileNetworkTypes?.payload.map((item) => [item.id, item.title || "N/A"]) ||
      [],
  );

  const fetchTelecomInfrastructureComponents = (
    params: GetRequestParam,
  ): Promise<IApiResponse<TelecomInfrastructureComponent[]>> => {
    return projectOtherApiSecondService<TelecomInfrastructureComponent>().getAll(
      otherSubMenu?.apiRoute || "",
      {
        ...params,
        filter: { ...params.filter, project_id: projectId },
      },
    );
  };

  const {
    data: telecomInfrastructureComponents,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<TelecomInfrastructureComponent[]>({
    queryKey: ["telecomInfrastructureComponents"],
    fetchFunction: fetchTelecomInfrastructureComponents,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as TelecomInfrastructureComponent);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as TelecomInfrastructureComponent);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (
    telecomInfrastructureComponent: TelecomInfrastructureComponent,
  ) => {
    toggleDrawer();
    setSelectedRow(telecomInfrastructureComponent);
  };

  const handleDelete = async (telecomInfrastructureComponentId: string) => {
    await projectOtherApiSecondService<TelecomInfrastructureComponent>().delete(
      otherSubMenu?.apiRoute || "",
      telecomInfrastructureComponentId,
    );
    refetch();
  };

  const handleClickDetail = (
    telecomInfrastructureComponent: TelecomInfrastructureComponent,
  ) => {
    toggleDetailDrawer();
    setSelectedRow(telecomInfrastructureComponent);
  };

  const mapTelecomInfrastructureComponentToDetailItems = (
    telecomInfrastructureComponent: TelecomInfrastructureComponent,
  ): { title: string; value: string }[] => [
    {
      title: t(
        "project.other.telecom-infrastructure-component.details.mobile-network-type",
      ),
      value:
        mobileNetworkTypeMap.get(
          telecomInfrastructureComponent?.mobile_network_type_id,
        ) ||
        telecomInfrastructureComponent?.mobile_network_type_id ||
        "N/A",
    },
    {
      title: t("project.other.telecom-infrastructure-component.details.cables"),
      value: telecomInfrastructureComponent?.cables?.toString() || "N/A",
    },
    {
      title: t("project.other.telecom-infrastructure-component.details.wires"),
      value: telecomInfrastructureComponent?.wires?.toString() || "N/A",
    },
    {
      title: t(
        "project.other.telecom-infrastructure-component.details.routers",
      ),
      value: telecomInfrastructureComponent?.routers?.toString() || "N/A",
    },
    {
      title: t(
        "project.other.telecom-infrastructure-component.details.switches",
      ),
      value: telecomInfrastructureComponent?.switches?.toString() || "N/A",
    },
    {
      title: t("project.other.telecom-infrastructure-component.details.hubs"),
      value: telecomInfrastructureComponent?.hubs?.toString() || "N/A",
    },
    {
      title: t(
        "project.other.telecom-infrastructure-component.details.repeaters",
      ),
      value: telecomInfrastructureComponent?.repeaters?.toString() || "N/A",
    },
    {
      title: t(
        "project.other.telecom-infrastructure-component.details.antennas",
      ),
      value: telecomInfrastructureComponent?.antennas?.toString() || "N/A",
    },
    {
      title: t("project.other.telecom-infrastructure-component.details.towers"),
      value: telecomInfrastructureComponent?.towers?.toString() || "N/A",
    },
    {
      title: t("project.other.telecom-infrastructure-component.details.remark"),
      value: telecomInfrastructureComponent?.remark || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: telecomInfrastructureComponent?.created_at
        ? formatCreatedAt(telecomInfrastructureComponent.created_at)
        : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: telecomInfrastructureComponent?.updated_at
        ? formatCreatedAt(telecomInfrastructureComponent.updated_at)
        : "N/A",
    },
  ];

  return (
    <Box>
      {showDrawer && (
        <TelecomInfrastructureComponentDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          telecomInfrastructureComponent={
            selectedRow as TelecomInfrastructureComponent
          }
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapTelecomInfrastructureComponentToDetailItems(
            selectedRow as TelecomInfrastructureComponent,
          )}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={
            uploadableProjectFileTypes.other.telecomInfrastructureComponent
          }
          title={t(
            "project.other.telecom-infrastructure-component.telecom-infrastructure-component-details",
          )}
        />
      )}

      <ItemsListing
        title={t("project.other.telecom-infrastructure-component.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: telecomInfrastructureComponentColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            mobileNetworkTypeMap,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <TelecomInfrastructureComponentCard
            onDetail={handleClickDetail}
            telecomInfrastructureComponent={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
            mobileNetworkTypeMap={mobileNetworkTypeMap}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: true,
          permission: {
            action: "create",
            subject: "telecominfrastructurecomponent",
          },
        }}
        fetchDataFunction={refetch}
        items={telecomInfrastructureComponents || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default TelecomInfrastructureComponentList;
