import { Box } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import { uploadableProjectFileTypes } from "src/services/utils/file-constants";
import { defaultCreateActionConfig } from "src/types/general/listing";
import { EnvironmentalControl } from "src/types/project/other";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import { formatCreatedAt } from "src/utils/formatter/date";
import ItemsListing from "src/views/shared/listing";
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer";
import EnvironmentalControlCard from "./environmental-control-card";
import EnvironmentalControlDrawer from "./environmental-control-drawer";
import { environmentalControlColumns } from "./environmental-control-row";

interface EnvironmentalControlListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const EnvironmentalControlList: React.FC<EnvironmentalControlListProps> = ({
  otherSubMenu,
  projectId,
  typeId,
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<EnvironmentalControl | null>(
    null,
  );
  const { t } = useTranslation();

  const fetchEnvironmentalControls = (
    params: GetRequestParam,
  ): Promise<IApiResponse<EnvironmentalControl[]>> => {
    return projectOtherApiSecondService<EnvironmentalControl>().getAll(
      otherSubMenu?.apiRoute || "",
      {
        ...params,
      },
    );
  };

  const {
    data: environmentalControls,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<EnvironmentalControl[]>({
    queryKey: ["environmentalControls"],
    fetchFunction: fetchEnvironmentalControls,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as EnvironmentalControl);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as EnvironmentalControl);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (environmentalControl: EnvironmentalControl) => {
    toggleDrawer();
    setSelectedRow(environmentalControl);
  };

  const handleDelete = async (environmentalControlId: string) => {
    await projectOtherApiSecondService<EnvironmentalControl>().delete(
      otherSubMenu?.apiRoute || "",
      environmentalControlId,
    );
    refetch();
  };

  const handleClickDetail = (environmentalControl: EnvironmentalControl) => {
    toggleDetailDrawer();
    setSelectedRow(environmentalControl);
  };

  const mapEnvironmentalControlToDetailItems = (
    environmentalControl: EnvironmentalControl,
  ): { title: string; value: string }[] => [
    {
      title: t("project.other.environmental-control.details.data-center"),
      value: environmentalControl?.data_center_id || "N/A",
    },
    {
      title: t("project.other.environmental-control.details.temperature"),
      value: environmentalControl?.temperature || "N/A",
    },
    {
      title: t("project.other.environmental-control.details.humidity"),
      value: environmentalControl?.humidity || "N/A",
    },
    {
      title: t("project.other.environmental-control.details.air-quality"),
      value: environmentalControl?.air_quality || "N/A",
    },
    {
      title: t("project.other.environmental-control.details.others"),
      value: environmentalControl?.others || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: environmentalControl?.created_at
        ? formatCreatedAt(environmentalControl.created_at)
        : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: environmentalControl?.updated_at
        ? formatCreatedAt(environmentalControl.updated_at)
        : "N/A",
    },
  ];

  return (
    <Box>
      {showDrawer && (
        <EnvironmentalControlDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          environmentalControl={selectedRow as EnvironmentalControl}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapEnvironmentalControlToDetailItems(
            selectedRow as EnvironmentalControl,
          )}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={uploadableProjectFileTypes.other.environmentalControl}
          title={t(
            "project.other.environmental-control.environmental-control-details",
          )}
        />
      )}

      <ItemsListing
        title={t("project.other.environmental-control.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: environmentalControlColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <EnvironmentalControlCard
            onDetail={handleClickDetail}
            environmentalControl={data}
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
            subject: "environmentalcontrol",
          },
        }}
        fetchDataFunction={refetch}
        items={environmentalControls || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default EnvironmentalControlList;
