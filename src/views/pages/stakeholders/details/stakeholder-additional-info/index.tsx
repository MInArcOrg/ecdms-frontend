import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import stakeholderAdditionalInformationApiService from "src/services/stakeholder/stakeholder-additional-information-service";
import { defaultCreateActionConfig } from "src/types/general/listing";
import type { GetRequestParam, IApiResponse } from "src/types/requests";
import { formatCreatedAt } from "src/utils/formatter/date";
import ItemsListing from "src/views/shared/listing";
import OtherDetailSidebar from "src/views/shared/layouts/other/other-detail-drawer";
import AdditionalInformationCard from "./stakeholder-additional-info-card";
import AdditionalInformationDrawer from "./stakeholder-additional-info-drawer";
import type { StakeholderAdditionalInformation } from "src/types/stakeholder/stakeholder-additional-information";
import { additionalInformationColumns } from "./stakeholder-additional-info-row";

interface AdditionalInformationListProps {
  model: string;
  stakeholderId: string;
  typeId: string;
}

const AdditionalInformationList: React.FC<AdditionalInformationListProps> = ({
  stakeholderId,
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<StakeholderAdditionalInformation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  const fetchAdditionalInformation = (
    params: GetRequestParam,
  ): Promise<IApiResponse<StakeholderAdditionalInformation[]>> => {
    return stakeholderAdditionalInformationApiService.getAll({
      ...params,
      filter: { ...params.filter, stakeholder_id: stakeholderId },
    });
  };

  const {
    data: additionalInformations,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<StakeholderAdditionalInformation[]>({
    queryKey: ["additionalInformations"],
    fetchFunction: fetchAdditionalInformation,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as StakeholderAdditionalInformation);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as StakeholderAdditionalInformation);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (additionalInfo: StakeholderAdditionalInformation) => {
    toggleDrawer();
    setSelectedRow(additionalInfo);
  };

  const handleDelete = async (additionalInfoId: string) => {
    await stakeholderAdditionalInformationApiService.delete(additionalInfoId);
    refetch();
  };

  const handleClickDetail = (
    additionalInfo: StakeholderAdditionalInformation,
  ) => {
    toggleDetailDrawer();
    setSelectedRow(additionalInfo);
  };

  const mapAdditionalInfoToDetailItems = (
    additionalInfo: StakeholderAdditionalInformation,
  ): { title: string; value: string }[] => [
    {
      title: t(
        "stakeholder.stakeholder-additional-information.additionalInformation",
      ),
      value: additionalInfo.additional_information,
    },
    {
      title: t("stakeholder.stakeholder-additional-information.reference"),
      value: additionalInfo.reference || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: additionalInfo?.created_at
        ? formatCreatedAt(additionalInfo.created_at)
        : "N/A",
    },
  ];

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box>
      {showDrawer && (
        <AdditionalInformationDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          additionalInfo={selectedRow as StakeholderAdditionalInformation}
          refetch={refetch}
          stakeholderId={stakeholderId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapAdditionalInfoToDetailItems(
            selectedRow as StakeholderAdditionalInformation,
          )}
          id={selectedRow?.id || ""}
          hasReference={true}
          fileType="STAKEHOLDER_ADDITIONAL_INFORMATION"
          title={t("stakeholder.stakeholder-additional-information.details")}
        />
      )}

      <ItemsListing
        title={t("stakeholder.stakeholder-additional-information.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: additionalInformationColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <AdditionalInformationCard
            onDetail={handleClickDetail}
            additionalInfo={data}
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
            subject: "stakeholderadditionalinformation",
          },
        }}
        fetchDataFunction={refetch}
        items={additionalInformations || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default AdditionalInformationList;
