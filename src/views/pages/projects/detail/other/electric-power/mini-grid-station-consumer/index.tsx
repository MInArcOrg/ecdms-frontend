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
import type {
  MiniGridStationConsumer,
  MiniGridStation,
} from "src/types/project/other";
import type { GetRequestParam, IApiResponse } from "src/types/requests";
import { formatCreatedAt } from "src/utils/formatter/date";
import ItemsListing from "src/views/shared/listing";
import { useQuery } from "@tanstack/react-query";
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer";
import MiniGridStationConsumerCard from "./mini-grid-station-consumer-card";
import MiniGridStationConsumerDrawer from "./mini-grid-station-consumer-drawer";
import { miniGridStationConsumerColumns } from "./mini-grid-station-consumer-row";

interface MiniGridStationConsumerListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const MiniGridStationConsumerList: React.FC<
  MiniGridStationConsumerListProps
> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<MiniGridStationConsumer | null>(null);
  const { t } = useTranslation();

  const { data: miniGridStations } = useQuery({
    queryKey: ["mini-grid-stations", projectId],
    queryFn: () =>
      projectOtherApiSecondService<MiniGridStation>().getAll(
        "mini-grid-stations",
        {},
      ),
  });

  const fetchMiniGridStationConsumers = (
    params: GetRequestParam,
  ): Promise<IApiResponse<MiniGridStationConsumer[]>> => {
    return projectOtherApiSecondService<MiniGridStationConsumer>().getAll(
      otherSubMenu?.apiRoute || "",
      {},
    );
  };

  const {
    data: miniGridStationConsumers,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<MiniGridStationConsumer[]>({
    queryKey: ["miniGridStationConsumers"],
    fetchFunction: fetchMiniGridStationConsumers,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as MiniGridStationConsumer);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as MiniGridStationConsumer);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (miniGridStationConsumer: MiniGridStationConsumer) => {
    toggleDrawer();
    setSelectedRow(miniGridStationConsumer);
  };

  const handleDelete = async (miniGridStationConsumerId: string) => {
    await projectOtherApiSecondService<MiniGridStationConsumer>().delete(
      otherSubMenu?.apiRoute || "",
      miniGridStationConsumerId,
    );
    refetch();
  };

  const handleClickDetail = (
    miniGridStationConsumer: MiniGridStationConsumer,
  ) => {
    toggleDetailDrawer();
    setSelectedRow(miniGridStationConsumer);
  };

  // Create a map for mini grid stations to display names instead of IDs
  const miniGridStationsMap = new Map(
    miniGridStations?.payload.map((item: MiniGridStation) => [
      item.id,
      item.name || "",
    ]) || [],
  );

  const mapMiniGridStationConsumerToDetailItems = (
    miniGridStationConsumer: MiniGridStationConsumer,
  ): { title: string; value: string }[] => [
    {
      title: t("project.other.mini-grid-station-consumer.details.name"),
      value: miniGridStationConsumer?.name || "N/A",
    },
    {
      title: t(
        "project.other.mini-grid-station-consumer.details.mini-grid-station-id",
      ),
      value: miniGridStationConsumer?.mini_grid_station_id
        ? miniGridStationsMap.get(
            miniGridStationConsumer?.mini_grid_station_id,
          ) || miniGridStationConsumer?.mini_grid_station_id
        : "N/A",
    },
    {
      title: t("project.other.mini-grid-station-consumer.details.residential"),
      value:
        miniGridStationConsumer?.residential !== undefined
          ? miniGridStationConsumer.residential.toString()
          : "N/A",
    },
    {
      title: t("project.other.mini-grid-station-consumer.details.commercial"),
      value:
        miniGridStationConsumer?.commercial !== undefined
          ? miniGridStationConsumer.commercial.toString()
          : "N/A",
    },
    {
      title: t(
        "project.other.mini-grid-station-consumer.details.productive-industrial",
      ),
      value:
        miniGridStationConsumer?.productive_industrial !== undefined
          ? miniGridStationConsumer.productive_industrial.toString()
          : "N/A",
    },
    {
      title: t(
        "project.other.mini-grid-station-consumer.details.health-centers",
      ),
      value:
        miniGridStationConsumer?.health_centers !== undefined
          ? miniGridStationConsumer.health_centers.toString()
          : "N/A",
    },
    {
      title: t("project.other.mini-grid-station-consumer.details.schools"),
      value:
        miniGridStationConsumer?.schools !== undefined
          ? miniGridStationConsumer.schools.toString()
          : "N/A",
    },
    {
      title: t(
        "project.other.mini-grid-station-consumer.details.street-lighting",
      ),
      value:
        miniGridStationConsumer?.street_lighting !== undefined
          ? miniGridStationConsumer.street_lighting.toString()
          : "N/A",
    },
    {
      title: t("project.other.mini-grid-station-consumer.details.other"),
      value:
        miniGridStationConsumer?.other !== undefined
          ? miniGridStationConsumer.other.toString()
          : "N/A",
    },
    {
      title: t(
        "project.other.mini-grid-station-consumer.details.expected-electricity-sales",
      ),
      value:
        miniGridStationConsumer?.expected_electricity_sales !== undefined
          ? `${miniGridStationConsumer.expected_electricity_sales} ${t(
              "common.kwh",
            )}`
          : "N/A",
    },
    {
      title: t(
        "project.other.mini-grid-station-consumer.details.electricity-tariff",
      ),
      value:
        miniGridStationConsumer?.electricity_tariff !== undefined
          ? `${miniGridStationConsumer.electricity_tariff} ${t(
              "common.currency",
            )}`
          : "N/A",
    },
    {
      title: t("project.other.mini-grid-station-consumer.details.remark"),
      value: miniGridStationConsumer?.remark || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: miniGridStationConsumer?.created_at
        ? formatCreatedAt(miniGridStationConsumer.created_at)
        : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: miniGridStationConsumer?.updated_at
        ? formatCreatedAt(miniGridStationConsumer.updated_at)
        : "N/A",
    },
  ];

  return (
    <Box>
      {showDrawer && (
        <MiniGridStationConsumerDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          miniGridStationConsumer={selectedRow as MiniGridStationConsumer}
          refetch={refetch}
          projectId={projectId}
          miniGridStations={miniGridStations?.payload || []}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapMiniGridStationConsumerToDetailItems(
            selectedRow as MiniGridStationConsumer,
          )}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={uploadableProjectFileTypes.other.mini_grid_station_consumer}
          title={t(
            "project.other.mini-grid-station-consumer.mini-grid-station-consumer-details",
          )}
        />
      )}

      <ItemsListing
        title={t("project.other.mini-grid-station-consumer.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: miniGridStationConsumerColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <MiniGridStationConsumerCard
            onDetail={handleClickDetail}
            miniGridStationConsumer={data}
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
            subject: "minigridstationconsumer",
          },
        }}
        fetchDataFunction={refetch}
        items={miniGridStationConsumers || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default MiniGridStationConsumerList;
