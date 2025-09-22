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
  SatelliteNetworkComponentManufacturer,
  SatelliteNetwork,
} from "src/types/project/other";
import type { GetRequestParam, IApiResponse } from "src/types/requests";
import { formatCreatedAt } from "src/utils/formatter/date";
import ItemsListing from "src/views/shared/listing";
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer";
import SatelliteNetworkComponentManufacturerCard from "./satellite-network-component-manufacturer-card";
import SatelliteNetworkComponentManufacturerDrawer from "./satellite-network-component-manufacturer-drawer";
import { satelliteNetworkComponentManufacturerColumns } from "./satellite-network-component-manufacturer-row";
import { useQuery } from "@tanstack/react-query";

interface SatelliteNetworkComponentManufacturerListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const SatelliteNetworkComponentManufacturerList: React.FC<
  SatelliteNetworkComponentManufacturerListProps
> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<SatelliteNetworkComponentManufacturer | null>(null);
  const { t } = useTranslation();

  // Fetch satellite networks for dropdown
  const { data: satelliteNetworks } = useQuery({
    queryKey: ["satellite-networks", projectId],
    queryFn: () =>
      projectOtherApiSecondService<SatelliteNetwork>().getAll(
        "satellite-networks",
        {
          filter: { project_id: projectId },
        },
      ),
  });

  // Create maps for quick lookup
  const satelliteNetworkMap = new Map(
    satelliteNetworks?.payload.map((network) => [network.id, network.name]) ||
      [],
  );

  const fetchSatelliteNetworkComponentManufacturers = (
    params: GetRequestParam,
  ): Promise<IApiResponse<SatelliteNetworkComponentManufacturer[]>> => {
    return projectOtherApiSecondService<SatelliteNetworkComponentManufacturer>().getAll(
      otherSubMenu?.apiRoute || "",
      {
        ...params,
      },
    );
  };

  const {
    data: satelliteNetworkComponentManufacturers,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<SatelliteNetworkComponentManufacturer[]>({
    queryKey: ["satelliteNetworkComponentManufacturers"],
    fetchFunction: fetchSatelliteNetworkComponentManufacturers,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as SatelliteNetworkComponentManufacturer);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as SatelliteNetworkComponentManufacturer);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (
    satelliteNetworkComponentManufacturer: SatelliteNetworkComponentManufacturer,
  ) => {
    toggleDrawer();
    setSelectedRow(satelliteNetworkComponentManufacturer);
  };

  const handleDelete = async (
    satelliteNetworkComponentManufacturerId: string,
  ) => {
    await projectOtherApiSecondService<SatelliteNetworkComponentManufacturer>().delete(
      otherSubMenu?.apiRoute || "",
      satelliteNetworkComponentManufacturerId,
    );
    refetch();
  };

  const handleClickDetail = (
    satelliteNetworkComponentManufacturer: SatelliteNetworkComponentManufacturer,
  ) => {
    toggleDetailDrawer();
    setSelectedRow(satelliteNetworkComponentManufacturer);
  };

  const mapSatelliteNetworkComponentManufacturerToDetailItems = (
    satelliteNetworkComponentManufacturer: SatelliteNetworkComponentManufacturer,
  ): { title: string; value: string }[] => [
    {
      title: t(
        "project.other.satellite-network-component-manufacturer.details.satellite-network",
      ),
      value:
        satelliteNetworkMap.get(
          satelliteNetworkComponentManufacturer?.satellite_network_id,
        ) ||
        satelliteNetworkComponentManufacturer?.satellite_network_id ||
        "N/A",
    },
    {
      title: t(
        "project.other.satellite-network-component-manufacturer.details.satellite",
      ),
      value: satelliteNetworkComponentManufacturer?.satellite || "N/A",
    },
    {
      title: t(
        "project.other.satellite-network-component-manufacturer.details.ground-stations",
      ),
      value: satelliteNetworkComponentManufacturer?.ground_stations || "N/A",
    },
    {
      title: t(
        "project.other.satellite-network-component-manufacturer.details.modems",
      ),
      value: satelliteNetworkComponentManufacturer?.modems || "N/A",
    },
    {
      title: t(
        "project.other.satellite-network-component-manufacturer.details.routers",
      ),
      value: satelliteNetworkComponentManufacturer?.routers || "N/A",
    },
    {
      title: t(
        "project.other.satellite-network-component-manufacturer.details.others",
      ),
      value: satelliteNetworkComponentManufacturer?.others || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: satelliteNetworkComponentManufacturer?.created_at
        ? formatCreatedAt(satelliteNetworkComponentManufacturer.created_at)
        : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: satelliteNetworkComponentManufacturer?.updated_at
        ? formatCreatedAt(satelliteNetworkComponentManufacturer.updated_at)
        : "N/A",
    },
  ];

  return (
    <Box>
      {showDrawer && (
        <SatelliteNetworkComponentManufacturerDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          satelliteNetworkComponentManufacturer={
            selectedRow as SatelliteNetworkComponentManufacturer
          }
          refetch={refetch}
          projectId={projectId}
          satelliteNetworks={satelliteNetworks?.payload || []}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapSatelliteNetworkComponentManufacturerToDetailItems(
            selectedRow as SatelliteNetworkComponentManufacturer,
          )}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={
            uploadableProjectFileTypes.other
              .satelliteNetworkComponentManufacturer
          }
          title={t(
            "project.other.satellite-network-component-manufacturer.satellite-network-component-manufacturer-details",
          )}
        />
      )}

      <ItemsListing
        title={t(
          "project.other.satellite-network-component-manufacturer.title",
        )}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: satelliteNetworkComponentManufacturerColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            satelliteNetworkMap,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <SatelliteNetworkComponentManufacturerCard
            onDetail={handleClickDetail}
            satelliteNetworkComponentManufacturer={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
            satelliteNetworkMap={satelliteNetworkMap}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: true,
          permission: {
            action: "create",
            subject: "satellitenetworkcomponentmanufacturer",
          },
        }}
        fetchDataFunction={refetch}
        items={satelliteNetworkComponentManufacturers || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default SatelliteNetworkComponentManufacturerList;
