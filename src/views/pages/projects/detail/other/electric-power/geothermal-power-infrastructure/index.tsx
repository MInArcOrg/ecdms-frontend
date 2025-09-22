import { Box } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import { uploadableProjectFileTypes } from "src/services/utils/file-constants";
import { defaultCreateActionConfig } from "src/types/general/listing";
import { GeothermalPowerInfrastructure } from "src/types/project/other";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import { formatCreatedAt } from "src/utils/formatter/date";
import ItemsListing from "src/views/shared/listing";
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer";
import GeothermalPowerInfrastructureCard from "./geothermal-power-infrastructure-card";
import GeothermalPowerInfrastructureDrawer from "./geothermal-power-infrastructure-drawer";
import { geothermalPowerInfrastructureColumns } from "./geothermal-power-infrastructure-row";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";

interface GeothermalPowerInfrastructureListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const GeothermalPowerInfrastructureList: React.FC<
  GeothermalPowerInfrastructureListProps
> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<GeothermalPowerInfrastructure | null>(null);
  const { t } = useTranslation();

  const fetchGeothermalPowerInfrastructures = (
    params: GetRequestParam,
  ): Promise<IApiResponse<GeothermalPowerInfrastructure[]>> => {
    return projectOtherApiSecondService<GeothermalPowerInfrastructure>().getAll(
      otherSubMenu?.apiRoute || "",
      {
        ...params,
        filter: { ...params.filter },
      },
    );
  };

  const {
    data: geothermalPowerInfrastructures,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<GeothermalPowerInfrastructure[]>({
    queryKey: ["geothermalPowerInfrastructures"],
    fetchFunction: fetchGeothermalPowerInfrastructures,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as GeothermalPowerInfrastructure);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as GeothermalPowerInfrastructure);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (
    geothermalPowerInfrastructure: GeothermalPowerInfrastructure,
  ) => {
    toggleDrawer();
    setSelectedRow(geothermalPowerInfrastructure);
  };

  const handleDelete = async (geothermalPowerInfrastructureId: string) => {
    await projectOtherApiSecondService<GeothermalPowerInfrastructure>().delete(
      otherSubMenu?.apiRoute || "",
      geothermalPowerInfrastructureId,
    );
    refetch();
  };

  const handleClickDetail = (
    geothermalPowerInfrastructure: GeothermalPowerInfrastructure,
  ) => {
    toggleDetailDrawer();
    setSelectedRow(geothermalPowerInfrastructure);
  };

  const mapGeothermalPowerInfrastructureToDetailItems = (
    geothermalPowerInfrastructure: GeothermalPowerInfrastructure,
  ): { title: string; value: string }[] => [
    {
      title: t(
        "project.other.geothermal-power-infrastructure.details.turbine-manufacturer",
      ),
      value: geothermalPowerInfrastructure?.turbine_manufacturer || "N/A",
    },
    {
      title: t(
        "project.other.geothermal-power-infrastructure.details.turbine-model",
      ),
      value: geothermalPowerInfrastructure?.turbine_model || "N/A",
    },
    {
      title: t(
        "project.other.geothermal-power-infrastructure.details.turbine-type-id",
      ),
      value: geothermalPowerInfrastructure?.turbine_type_id || "N/A",
    },
    {
      title: t(
        "project.other.geothermal-power-infrastructure.details.each-turbine-capacity",
      ),
      value:
        geothermalPowerInfrastructure?.each_turbine_capacity?.toString() ||
        "N/A",
    },
    {
      title: t("project.other.geothermal-power-infrastructure.details.remark"),
      value: geothermalPowerInfrastructure?.remark || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: geothermalPowerInfrastructure?.created_at
        ? formatCreatedAt(geothermalPowerInfrastructure.created_at)
        : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: geothermalPowerInfrastructure?.updated_at
        ? formatCreatedAt(geothermalPowerInfrastructure.updated_at)
        : "N/A",
    },
  ];

  return (
    <Box>
      {showDrawer && (
        <GeothermalPowerInfrastructureDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          geothermalPowerInfrastructure={
            selectedRow as GeothermalPowerInfrastructure
          }
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapGeothermalPowerInfrastructureToDetailItems(
            selectedRow as GeothermalPowerInfrastructure,
          )}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={
            uploadableProjectFileTypes.other.geothermalPowerInfrastructure
          }
          title={t(
            "project.other.geothermal-power-infrastructure.geothermal-power-infrastructure-details",
          )}
        />
      )}

      <ItemsListing
        title={t("project.other.geothermal-power-infrastructure.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: geothermalPowerInfrastructureColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <GeothermalPowerInfrastructureCard
            onDetail={handleClickDetail}
            geothermalPowerInfrastructure={data}
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
            subject: "geothermalPowerInfrastructure",
          },
        }}
        fetchDataFunction={refetch}
        items={geothermalPowerInfrastructures || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default GeothermalPowerInfrastructureList;
