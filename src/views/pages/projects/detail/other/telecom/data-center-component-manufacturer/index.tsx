import { Box } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import { uploadableProjectFileTypes } from "src/services/utils/file-constants";
import { defaultCreateActionConfig } from "src/types/general/listing";
import { DataCenterComponentManufacturer } from "src/types/project/other";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import { formatCreatedAt } from "src/utils/formatter/date";
import ItemsListing from "src/views/shared/listing";
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer";
import DataCenterComponentManufacturerCard from "./data-center-component-manufacturer-card";
import DataCenterComponentManufacturerDrawer from "./data-center-component-manufacturer-drawer";
import { dataCenterComponentManufacturerColumns } from "./data-center-component-manufacturer-row";

interface DataCenterComponentManufacturerListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const DataCenterComponentManufacturerList: React.FC<
  DataCenterComponentManufacturerListProps
> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<DataCenterComponentManufacturer | null>(null);
  const { t } = useTranslation();

  const fetchDataCenterComponentManufacturers = (
    params: GetRequestParam,
  ): Promise<IApiResponse<DataCenterComponentManufacturer[]>> => {
    return projectOtherApiSecondService<DataCenterComponentManufacturer>().getAll(
      otherSubMenu?.apiRoute || "",
      {
        ...params,
      },
    );
  };

  const {
    data: dataCenterComponentManufacturers,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<DataCenterComponentManufacturer[]>({
    queryKey: ["dataCenterComponentManufacturers"],
    fetchFunction: fetchDataCenterComponentManufacturers,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as DataCenterComponentManufacturer);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as DataCenterComponentManufacturer);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (
    dataCenterComponentManufacturer: DataCenterComponentManufacturer,
  ) => {
    toggleDrawer();
    setSelectedRow(dataCenterComponentManufacturer);
  };

  const handleDelete = async (dataCenterComponentManufacturerId: string) => {
    await projectOtherApiSecondService<DataCenterComponentManufacturer>().delete(
      otherSubMenu?.apiRoute || "",
      dataCenterComponentManufacturerId,
    );
    refetch();
  };

  const handleClickDetail = (
    dataCenterComponentManufacturer: DataCenterComponentManufacturer,
  ) => {
    toggleDetailDrawer();
    setSelectedRow(dataCenterComponentManufacturer);
  };

  const mapDataCenterComponentManufacturerToDetailItems = (
    dataCenterComponentManufacturer: DataCenterComponentManufacturer,
  ): { title: string; value: string }[] => [
    {
      title: t(
        "project.other.data-center-component-manufacturer.details.data-center-id",
      ),
      value: dataCenterComponentManufacturer?.data_center_id || "N/A",
    },
    {
      title: t(
        "project.other.data-center-component-manufacturer.details.servers",
      ),
      value: dataCenterComponentManufacturer?.servers || "N/A",
    },
    {
      title: t(
        "project.other.data-center-component-manufacturer.details.storage-devices",
      ),
      value: dataCenterComponentManufacturer?.storage_devices || "N/A",
    },
    {
      title: t(
        "project.other.data-center-component-manufacturer.details.networking-equipment",
      ),
      value: dataCenterComponentManufacturer?.networking_equipment || "N/A",
    },
    {
      title: t(
        "project.other.data-center-component-manufacturer.details.cooling-systems",
      ),
      value: dataCenterComponentManufacturer?.cooling_systems || "N/A",
    },
    {
      title: t(
        "project.other.data-center-component-manufacturer.details.backup-generators",
      ),
      value: dataCenterComponentManufacturer?.backup_generators || "N/A",
    },
    {
      title: t(
        "project.other.data-center-component-manufacturer.details.others",
      ),
      value: dataCenterComponentManufacturer?.others || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: dataCenterComponentManufacturer?.created_at
        ? formatCreatedAt(dataCenterComponentManufacturer.created_at)
        : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: dataCenterComponentManufacturer?.updated_at
        ? formatCreatedAt(dataCenterComponentManufacturer.updated_at)
        : "N/A",
    },
  ];

  return (
    <Box>
      {showDrawer && (
        <DataCenterComponentManufacturerDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          dataCenterComponentManufacturer={
            selectedRow as DataCenterComponentManufacturer
          }
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapDataCenterComponentManufacturerToDetailItems(
            selectedRow as DataCenterComponentManufacturer,
          )}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={
            uploadableProjectFileTypes.other.dataCenterComponentManufacturer
          }
          title={t(
            "project.other.data-center-component-manufacturer.data-center-component-manufacturer-details",
          )}
        />
      )}

      <ItemsListing
        title={t("project.other.data-center-component-manufacturer.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: dataCenterComponentManufacturerColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <DataCenterComponentManufacturerCard
            onDetail={handleClickDetail}
            dataCenterComponentManufacturer={data}
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
            subject: "datacentercomponentmanufacturer",
          },
        }}
        fetchDataFunction={refetch}
        items={dataCenterComponentManufacturers || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default DataCenterComponentManufacturerList;
