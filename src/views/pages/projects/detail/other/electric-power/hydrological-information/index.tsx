import { Box } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import { uploadableProjectFileTypes } from "src/services/utils/file-constants";
import { defaultCreateActionConfig } from "src/types/general/listing";
import { HydrologicalInformation } from "src/types/project/other";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import { formatCreatedAt } from "src/utils/formatter/date";
import ItemsListing from "src/views/shared/listing";
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer";
import HydrologicalInformationCard from "./hydrological-information-card";
import HydrologicalInformationDrawer from "./hydrological-information-drawer";
import { telecomColumns } from "./hydrological-information-row"; // Updated import
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";

interface HydrologicalInformationListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const HydrologicalInformationList: React.FC<
  HydrologicalInformationListProps
> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<HydrologicalInformation | null>(null); // Updated type
  const { t } = useTranslation();

  const fetchHydrologicalInformations = (
    params: GetRequestParam,
  ): Promise<IApiResponse<HydrologicalInformation[]>> => {
    // Updated type
    return projectOtherApiSecondService<HydrologicalInformation>().getAll(
      otherSubMenu?.apiRoute || "",
      {
        ...params,
        filter: { ...params.filter, project_id: projectId },
      },
    );
  };

  const {
    data: hydrologicalInformations, // Updated variable name
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<HydrologicalInformation[]>({
    queryKey: ["hydrologicalInformations"], // Updated query key
    fetchFunction: fetchHydrologicalInformations,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as HydrologicalInformation);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as HydrologicalInformation);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (hydrologicalInformation: HydrologicalInformation) => {
    toggleDrawer();
    setSelectedRow(hydrologicalInformation);
  };

  const handleDelete = async (telecomId: string) => {
    await projectOtherApiSecondService<HydrologicalInformation>().delete(
      otherSubMenu?.apiRoute || "",
      telecomId,
    );
    refetch();
  };

  const handleClickDetail = (
    hydrologicalInformation: HydrologicalInformation,
  ) => {
    toggleDetailDrawer();
    setSelectedRow(hydrologicalInformation);
  };

  const mapHydrologicalInformationToDetailItems = (
    hydrologicalInformation: HydrologicalInformation,
  ): { title: string; value: string }[] => [
    {
      title: t("project.other.hydrological-information.details.water-source"),
      value: hydrologicalInformation?.water_source || "N/A",
    },
    {
      title: t("project.other.hydrological-information.details.catchment-area"),
      value: hydrologicalInformation?.catchment_area?.toString() || "N/A",
    },
    {
      title: t(
        "project.other.hydrological-information.details.elevation-change",
      ),
      value: hydrologicalInformation?.elevation_change?.toString() || "N/A",
    },
    {
      title: t("project.other.hydrological-information.details.head"),
      value: hydrologicalInformation?.head?.toString() || "N/A",
    },
    {
      title: t("project.other.hydrological-information.details.total-inflow"),
      value: hydrologicalInformation?.total_inflow?.toString() || "N/A",
    },
    {
      title: t(
        "project.other.hydrological-information.details.active-storage-volume",
      ),
      value:
        hydrologicalInformation?.active_storage_volume?.toString() || "N/A",
    },
    {
      title: t("project.other.hydrological-information.details.water-stored"),
      value: hydrologicalInformation?.water_stored?.toString() || "N/A",
    },
    {
      title: t("project.other.hydrological-information.details.remark"),
      value: hydrologicalInformation?.remark || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: hydrologicalInformation?.created_at
        ? formatCreatedAt(hydrologicalInformation?.created_at)
        : "N/A",
    },
  ];

  return (
    <Box>
      {showDrawer && (
        <HydrologicalInformationDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          hydrologicalInformation={selectedRow as HydrologicalInformation}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapHydrologicalInformationToDetailItems(
            selectedRow as HydrologicalInformation,
          )}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={uploadableProjectFileTypes.other.hydrologicalInformation}
          title={t(
            "project.other.hydrological-information.hydrological-information-details",
          )}
        />
      )}

      <ItemsListing
        title={t("project.other.hydrological-information.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: telecomColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <HydrologicalInformationCard
            onDetail={handleClickDetail}
            hydrologicalInformation={data}
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
            subject: "hydrologicalInformation",
          },
        }}
        fetchDataFunction={refetch}
        items={hydrologicalInformations || []} // Updated variable name
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default HydrologicalInformationList;
