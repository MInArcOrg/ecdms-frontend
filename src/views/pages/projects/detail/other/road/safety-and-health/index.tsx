import { Box } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import { uploadableProjectFileTypes } from "src/services/utils/file-constants";
import { defaultCreateActionConfig } from "src/types/general/listing";
import { SafetyAndHealth } from "src/types/project/other";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import { formatCreatedAt } from "src/utils/formatter/date";
import ItemsListing from "src/views/shared/listing";
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer";
import SafetyAndHealthCard from "./safety-and-health-card";
import SafetyAndHealthDrawer from "./safety-and-health-drawer";
import { safetyAndHealthColumns } from "./safety-and-health-row";

interface SafetyAndHealthListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const SafetyAndHealthList: React.FC<SafetyAndHealthListProps> = ({
  otherSubMenu,
  projectId,
  typeId,
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<SafetyAndHealth | null>(null);
  const { t } = useTranslation();

  const fetchSafetyAndHealths = (
    params: GetRequestParam,
  ): Promise<IApiResponse<SafetyAndHealth[]>> => {
    return projectOtherApiSecondService<SafetyAndHealth>().getAll(
      otherSubMenu?.apiRoute || "",
      {
        ...params,
        filter: { ...params.filter, project_id: projectId },
      },
    );
  };

  const {
    data: safetyAndHealths,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<SafetyAndHealth[]>({
    queryKey: ["safetyAndHealths"],
    fetchFunction: fetchSafetyAndHealths,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as SafetyAndHealth);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as SafetyAndHealth);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (safetyAndHealth: SafetyAndHealth) => {
    toggleDrawer();
    setSelectedRow(safetyAndHealth);
  };

  const handleDelete = async (safetyAndHealthId: string) => {
    await projectOtherApiSecondService<SafetyAndHealth>().delete(
      otherSubMenu?.apiRoute || "",
      safetyAndHealthId,
    );
    refetch();
  };

  const handleClickDetail = (safetyAndHealth: SafetyAndHealth) => {
    toggleDetailDrawer();
    setSelectedRow(safetyAndHealth);
  };

  const mapSafetyAndHealthToDetailItems = (
    safetyAndHealth: SafetyAndHealth,
  ): { title: string; value: string }[] => [
    {
      title: t("project.other.safety-and-health.details.road-segment"),
      value: safetyAndHealth?.road_segment || "N/A",
    },
    {
      title: t("project.other.safety-and-health.details.hazard-type"),
      value: safetyAndHealth?.hazard_type_id || "N/A",
    },
    {
      title: t("project.other.safety-and-health.details.potential-impact"),
      value: safetyAndHealth?.potential_impact_id || "N/A",
    },
    {
      title: t("project.other.safety-and-health.details.risk-level"),
      value: safetyAndHealth?.risk_level_id || "N/A",
    },
    {
      title: t(
        "project.other.safety-and-health.details.immediate-action-taken",
      ),
      value: safetyAndHealth?.immediate_action_taken || "N/A",
    },
    {
      title: t("project.other.safety-and-health.details.incident-type"),
      value: safetyAndHealth?.incident_type_id || "N/A",
    },
    {
      title: t("project.other.safety-and-health.details.incident-time"),
      value: safetyAndHealth?.incident_time
        ? formatCreatedAt(safetyAndHealth.incident_time)
        : "N/A",
    },
    {
      title: t("project.other.safety-and-health.details.medicare-required"),
      value: safetyAndHealth?.medicare_required
        ? t("common.yes")
        : t("common.no"),
    },
    {
      title: t("project.other.safety-and-health.details.total-injury-number"),
      value: safetyAndHealth?.total_injury_number?.toString() || "N/A",
    },
    {
      title: t("project.other.safety-and-health.details.incident-reported-by"),
      value: safetyAndHealth?.incident_reported_by || "N/A",
    },
    {
      title: t("project.other.safety-and-health.details.ppe-type"),
      value: safetyAndHealth?.personal_protective_equipment_type_id || "N/A",
    },
    {
      title: t("project.other.safety-and-health.details.ppe-condition"),
      value:
        safetyAndHealth?.personal_protective_equipment_condition_id || "N/A",
    },
    {
      title: t(
        "project.other.safety-and-health.details.trained-on-equipment-usage",
      ),
      value: safetyAndHealth?.trained_on_equipment_usage
        ? t("common.yes")
        : t("common.no"),
    },
    {
      title: t("project.other.safety-and-health.details.training-hours"),
      value: safetyAndHealth?.training_hours_number?.toString() || "N/A",
    },
    {
      title: t("project.other.safety-and-health.details.weather-condition"),
      value: safetyAndHealth?.weather_condition_during_incident_id || "N/A",
    },
    {
      title: t("project.other.safety-and-health.details.injury-severity"),
      value: safetyAndHealth?.injury_severity_id || "N/A",
    },
    {
      title: t("project.other.safety-and-health.details.fatality-number"),
      value: safetyAndHealth?.fatality_number?.toString() || "N/A",
    },
    {
      title: t("project.other.safety-and-health.details.recommendation"),
      value: safetyAndHealth?.recommendation || "N/A",
    },
    {
      title: t("project.other.safety-and-health.details.remark"),
      value: safetyAndHealth?.remark || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: safetyAndHealth?.created_at
        ? formatCreatedAt(safetyAndHealth.created_at)
        : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: safetyAndHealth?.updated_at
        ? formatCreatedAt(safetyAndHealth.updated_at)
        : "N/A",
    },
  ];

  return (
    <Box>
      {showDrawer && (
        <SafetyAndHealthDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          safetyAndHealth={selectedRow as SafetyAndHealth}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapSafetyAndHealthToDetailItems(selectedRow as SafetyAndHealth)}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={uploadableProjectFileTypes.other.safetyAndHealth}
          title={t("project.other.safety-and-health.safety-and-health-details")}
        />
      )}

      <ItemsListing
        title={t("project.other.safety-and-health.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: safetyAndHealthColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <SafetyAndHealthCard
            onDetail={handleClickDetail}
            safetyAndHealth={data}
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
            subject: "safetyandhealth",
          },
        }}
        fetchDataFunction={refetch}
        items={safetyAndHealths || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default SafetyAndHealthList;
