import { Box } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import { uploadableProjectFileTypes } from "src/services/utils/file-constants";
import { defaultCreateActionConfig } from "src/types/general/listing";
import { MobileNetworkComponentAge } from "src/types/project/other";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import { formatCreatedAt } from "src/utils/formatter/date";
import ItemsListing from "src/views/shared/listing";
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer";
import MobileNetworkComponentAgeCard from "./mobile-network-component-age-card";
import MobileNetworkComponentAgeDrawer from "./mobile-network-component-age-drawer";
import { mobileNetworkComponentAgeColumns } from "./mobile-network-component-age-row";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";

interface MobileNetworkComponentAgeListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const MobileNetworkComponentAgeList: React.FC<
  MobileNetworkComponentAgeListProps
> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<MobileNetworkComponentAge | null>(null);
  const { t } = useTranslation();

  const fetchMobileNetworkComponentAges = (
    params: GetRequestParam,
  ): Promise<IApiResponse<MobileNetworkComponentAge[]>> => {
    return projectOtherApiSecondService<MobileNetworkComponentAge>().getAll(
      otherSubMenu?.apiRoute || "",
      {
        ...params,
        filter: { ...params.filter, project_id: projectId },
      },
    );
  };

  const {
    data: mobileNetworkComponentAges,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<MobileNetworkComponentAge[]>({
    queryKey: ["mobileNetworkComponentAges"],
    fetchFunction: fetchMobileNetworkComponentAges,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as MobileNetworkComponentAge);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as MobileNetworkComponentAge);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (mobileNetworkComponentAge: MobileNetworkComponentAge) => {
    toggleDrawer();
    setSelectedRow(mobileNetworkComponentAge);
  };

  const handleDelete = async (mobileNetworkComponentAgeId: string) => {
    await projectOtherApiSecondService<MobileNetworkComponentAge>().delete(
      otherSubMenu?.apiRoute || "",
      mobileNetworkComponentAgeId,
    );
    refetch();
  };

  const handleClickDetail = (
    mobileNetworkComponentAge: MobileNetworkComponentAge,
  ) => {
    toggleDetailDrawer();
    setSelectedRow(mobileNetworkComponentAge);
  };

  const mapMobileNetworkComponentAgeToDetailItems = (
    mobileNetworkComponentAge: MobileNetworkComponentAge,
  ): { title: string; value: string }[] => [
    {
      title: t(
        "project.other.mobile-network-component-age.details.mobile-network-id",
      ),
      value: mobileNetworkComponentAge?.mobile_network_id || "N/A",
    },
    {
      title: t("project.other.mobile-network-component-age.details.cell"),
      value: mobileNetworkComponentAge?.cell?.toString() || "N/A",
    },
    {
      title: t("project.other.mobile-network-component-age.details.towers"),
      value: mobileNetworkComponentAge?.towers?.toString() || "N/A",
    },
    {
      title: t("project.other.mobile-network-component-age.details.antennas"),
      value: mobileNetworkComponentAge?.antennas?.toString() || "N/A",
    },
    {
      title: t(
        "project.other.mobile-network-component-age.details.base-stations",
      ),
      value: mobileNetworkComponentAge?.base_stations?.toString() || "N/A",
    },
    {
      title: t("project.other.mobile-network-component-age.details.repeaters"),
      value: mobileNetworkComponentAge?.repeaters?.toString() || "N/A",
    },
    {
      title: t("project.other.mobile-network-component-age.details.switches"),
      value: mobileNetworkComponentAge?.switches?.toString() || "N/A",
    },
    {
      title: t("project.other.mobile-network-component-age.details.others"),
      value: mobileNetworkComponentAge?.others || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: mobileNetworkComponentAge?.created_at
        ? formatCreatedAt(mobileNetworkComponentAge.created_at)
        : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: mobileNetworkComponentAge?.updated_at
        ? formatCreatedAt(mobileNetworkComponentAge.updated_at)
        : "N/A",
    },
  ];

  return (
    <Box>
      {showDrawer && (
        <MobileNetworkComponentAgeDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          mobileNetworkComponentAge={selectedRow as MobileNetworkComponentAge}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapMobileNetworkComponentAgeToDetailItems(
            selectedRow as MobileNetworkComponentAge,
          )}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={uploadableProjectFileTypes.other.mobileNetworkComponentAge}
          title={t(
            "project.other.mobile-network-component-age.mobile-network-component-age-details",
          )}
        />
      )}

      <ItemsListing
        title={t("project.other.mobile-network-component-age.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: mobileNetworkComponentAgeColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <MobileNetworkComponentAgeCard
            onDetail={handleClickDetail}
            mobileNetworkComponentAge={data}
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
            subject: "mobilenetworkcomponentage",
          },
        }}
        fetchDataFunction={refetch}
        items={mobileNetworkComponentAges || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default MobileNetworkComponentAgeList;
