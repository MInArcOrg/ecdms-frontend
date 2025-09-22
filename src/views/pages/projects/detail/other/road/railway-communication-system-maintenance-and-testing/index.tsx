"use client";

import type React from "react";
import { Box } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import { defaultCreateActionConfig } from "src/types/general/listing";
import type { GetRequestParam, IApiResponse } from "src/types/requests";
import ItemsListing from "src/views/shared/listing";
import OtherDetailSidebar from "src/views/shared/layouts/other/other-detail-drawer";
import { RailwayCommunicationSystemMaintenanceAndTesting } from "src/types/project/other";
import { formatCreatedAt } from "src/utils/formatter/date";
import RailwayCommunicationSystemMaintenanceAndTestingCard from "./railway-communication-system-maintenance-and-testing-card";
import RailwayCommunicationSystemMaintenanceAndTestingDrawer from "./railway-communication-system-maintenance-and-testing-drawer";
import { railwayCommunicationSystemMaintenanceAndTestingColumns } from "./railway-communication-system-maintenance-and-testing-row";
import FileDrawer from "src/views/components/custom/files-drawer";

interface RailwayCommunicationSystemMaintenanceAndTestingListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RailwayCommunicationSystemMaintenanceAndTestingList: React.FC<
  RailwayCommunicationSystemMaintenanceAndTestingListProps
> = ({ otherSubMenu, projectId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<RailwayCommunicationSystemMaintenanceAndTesting | null>(null);
  const { t } = useTranslation();

  const fetchRailwayCommunicationSystemMaintenanceAndTesting = (
    params: GetRequestParam,
  ): Promise<
    IApiResponse<RailwayCommunicationSystemMaintenanceAndTesting[]>
  > => {
    return projectOtherApiSecondService<RailwayCommunicationSystemMaintenanceAndTesting>().getAll(
      otherSubMenu?.apiRoute || "",
      {
        ...params,
        filter: { ...params.filter, project_id: projectId },
      },
    );
  };

  const {
    data: railwayCommunicationSystemMaintenanceAndTestings,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<RailwayCommunicationSystemMaintenanceAndTesting[]>({
    queryKey: ["railwayCommunicationSystemMaintenanceAndTestings"],
    fetchFunction: fetchRailwayCommunicationSystemMaintenanceAndTesting,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwayCommunicationSystemMaintenanceAndTesting);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayCommunicationSystemMaintenanceAndTesting);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (
    systemMaintenanceAndTesting: RailwayCommunicationSystemMaintenanceAndTesting,
  ) => {
    toggleDrawer();
    setSelectedRow(systemMaintenanceAndTesting);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwayCommunicationSystemMaintenanceAndTesting>().delete(
      otherSubMenu?.apiRoute || "",
      id,
    );
    refetch();
  };

  const handleClickDetail = (
    systemMaintenanceAndTesting: RailwayCommunicationSystemMaintenanceAndTesting,
  ) => {
    toggleDetailDrawer();
    setSelectedRow(systemMaintenanceAndTesting);
  };

  const mapRailwayCommunicationSystemMaintenanceAndTestingToDetailItems = (
    systemMaintenanceAndTesting: RailwayCommunicationSystemMaintenanceAndTesting,
  ): { title: string; value: any }[] => [
    {
      title: t("common.table-columns.id"),
      value: systemMaintenanceAndTesting?.id || "N/A",
    },
    {
      title: t(
        "project.other.railway-communication-system-maintenance-and-testing.details.railway_line_section_name",
      ),
      value: systemMaintenanceAndTesting?.railway_line_section_name || "N/A",
    },
    {
      title: t(
        "project.other.railway-communication-system-maintenance-and-testing.details.scheduled_maintenance_activities",
      ),
      value:
        systemMaintenanceAndTesting?.scheduled_maintenance_activities || "N/A",
    },
    {
      title: t(
        "project.other.railway-communication-system-maintenance-and-testing.details.inspections",
      ),
      value: systemMaintenanceAndTesting?.inspections ? "Yes" : "No",
    },
    {
      title: t(
        "project.other.railway-communication-system-maintenance-and-testing.details.recent_maintenance_records_and_dates",
      ),
      value:
        systemMaintenanceAndTesting?.recent_maintenance_records_and_dates ||
        "N/A",
    },
    {
      title: t(
        "project.other.railway-communication-system-maintenance-and-testing.details.testing_and_verification_procedures_prepared",
      ),
      value:
        systemMaintenanceAndTesting?.testing_and_verification_procedures_prepared
          ? "Yes"
          : "No",
    },
    {
      title: t(
        "project.other.railway-communication-system-maintenance-and-testing.details.maintenance_contracts_or_agreements_made",
      ),
      value:
        systemMaintenanceAndTesting?.maintenance_contracts_or_agreements_made ||
        "N/A",
    },
    {
      title: t(
        "project.other.railway-communication-system-maintenance-and-testing.details.remark",
      ),
      value: systemMaintenanceAndTesting?.remark || "N/A",
    },
    {
      title: t(
        "project.other.railway-communication-system-maintenance-and-testing.details.maintenance-contracts-file-upload",
      ),
      value: (
        <FileDrawer
          id={systemMaintenanceAndTesting.id}
          type={otherSubMenu?.fileType || ""}
        />
      ),
    },
    {
      title: t("common.table-columns.created-at"),
      value: systemMaintenanceAndTesting?.created_at
        ? formatCreatedAt(systemMaintenanceAndTesting.created_at)
        : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: systemMaintenanceAndTesting?.updated_at
        ? formatCreatedAt(systemMaintenanceAndTesting.updated_at)
        : "N/A",
    },
  ];

  return (
    <Box>
      {showDrawer && (
        <RailwayCommunicationSystemMaintenanceAndTestingDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayCommunicationSystemMaintenanceAndTesting={
            selectedRow as RailwayCommunicationSystemMaintenanceAndTesting
          }
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapRailwayCommunicationSystemMaintenanceAndTestingToDetailItems(
            selectedRow as RailwayCommunicationSystemMaintenanceAndTesting,
          )}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={"MAINTENANCE_AND_TESTING_CONTRACTS_AGREEMENT"}
          title={t(
            "project.other.railway-communication-system-maintenance-and-testing.detail",
          )}
        />
      )}

      <ItemsListing
        title={t(
          "project.other.railway-communication-system-maintenance-and-testing.title",
        )}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayCommunicationSystemMaintenanceAndTestingColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            otherSubMenu,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwayCommunicationSystemMaintenanceAndTestingCard
            onDetail={handleClickDetail}
            railwayCommunicationSystemMaintenanceAndTesting={
              data as RailwayCommunicationSystemMaintenanceAndTesting
            }
            onEdit={handleEdit}
            refetch={refetch}
            otherSubMenu={otherSubMenu}
            onDelete={handleDelete}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: true,
          permission: {
            action: "create",
            subject: "railwaycommunicationsystemmaintenanceandtesting",
          },
        }}
        fetchDataFunction={refetch}
        items={railwayCommunicationSystemMaintenanceAndTestings || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwayCommunicationSystemMaintenanceAndTestingList;
