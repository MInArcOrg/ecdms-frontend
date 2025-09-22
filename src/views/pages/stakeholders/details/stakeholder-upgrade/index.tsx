import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import stakeholderUpgradeApiService from "src/services/stakeholder/stakeholder-upgrade-service";
import { defaultCreateActionConfig } from "src/types/general/listing";
import type { GetRequestParam, IApiResponse } from "src/types/requests";
import { formatCreatedAt } from "src/utils/formatter/date";
import ItemsListing from "src/views/shared/listing";
import OtherDetailSidebar from "src/views/shared/layouts/other/other-detail-drawer";
import UpgradeCard from "./stakeholder-upgrade-card";
import UpgradeDrawer from "./stakeholder-upgrade-drawer";
import type { StakeholderUpgrade } from "src/types/stakeholder/stakeholder-upgrade";
import { upgradeColumns } from "./stakeholder-upgrade-row";

interface StakeholderUpgradeListProps {
  model: string;
  stakeholderId: string;
  typeId: string;
}

const StakeholderUpgradeList: React.FC<StakeholderUpgradeListProps> = ({
  stakeholderId,
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<StakeholderUpgrade | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  const fetchUpgrades = (
    params: GetRequestParam,
  ): Promise<IApiResponse<StakeholderUpgrade[]>> => {
    return stakeholderUpgradeApiService.getAll({
      ...params,
      filter: { ...params.filter, stakeholder_id: stakeholderId },
    });
  };

  const {
    data: upgrades,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<StakeholderUpgrade[]>({
    queryKey: ["upgrades"],
    fetchFunction: fetchUpgrades,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as StakeholderUpgrade);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as StakeholderUpgrade);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (upgrade: StakeholderUpgrade) => {
    toggleDrawer();
    setSelectedRow(upgrade);
  };

  const handleDelete = async (upgradeId: string) => {
    await stakeholderUpgradeApiService.delete(upgradeId);
    refetch();
  };

  const handleClickDetail = (upgrade: StakeholderUpgrade) => {
    toggleDetailDrawer();
    setSelectedRow(upgrade);
  };

  const mapUpgradeToDetailItems = (
    upgrade: StakeholderUpgrade,
  ): { title: string; value: string }[] => [
    {
      title: t("stakeholder.stakeholder-upgrade.form.stakeholder-id"),
      value: upgrade.stakeholder_id || "N/A",
    },
    {
      title: t("stakeholder.stakeholder-upgrade.form.upgrade-type"),
      value: upgrade.upgrade_type || "N/A",
    },
    {
      title: t("stakeholder.stakeholder-upgrade.form.previous-level"),
      value: upgrade.previous_level || "N/A",
    },
    {
      title: t("stakeholder.stakeholder-upgrade.form.upgraded-level"),
      value: upgrade.upgraded_level || "N/A",
    },
    {
      title: t("stakeholder.stakeholder-upgrade.form.ownership-percentage"),
      value:
        upgrade.ownership_percentage !== undefined
          ? upgrade.ownership_percentage.toString()
          : "N/A",
    },
    {
      title: t("stakeholder.stakeholder-upgrade.form.description"),
      value: upgrade.description || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: upgrade?.created_at ? formatCreatedAt(upgrade.created_at) : "N/A",
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
        <UpgradeDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          upgrade={selectedRow as StakeholderUpgrade}
          refetch={refetch}
          stakeholderId={stakeholderId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapUpgradeToDetailItems(selectedRow as StakeholderUpgrade)}
          id={selectedRow?.id || ""}
          hasReference={true}
          fileType="STAKEHOLDER_UPGRADE"
          title={t("stakeholder.stakeholder-upgrade.details")}
        />
      )}

      <ItemsListing
        title={t("stakeholder.stakeholder-upgrade.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: upgradeColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <UpgradeCard
            onDetail={handleClickDetail}
            upgrade={data}
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
            subject: "stakeholderupgrade",
          },
        }}
        fetchDataFunction={refetch}
        items={upgrades || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default StakeholderUpgradeList;
