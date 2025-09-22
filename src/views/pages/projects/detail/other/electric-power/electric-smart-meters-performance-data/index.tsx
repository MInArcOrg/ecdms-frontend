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
  ElectricSmartMetersData,
  ElectricSmartMetersPerformanceData,
} from "src/types/project/other";
import type { GetRequestParam, IApiResponse } from "src/types/requests";
import { formatCreatedAt } from "src/utils/formatter/date";
import ItemsListing from "src/views/shared/listing";
import { useQuery } from "@tanstack/react-query";
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer";
import ElectricSmartMetersPerformanceDataCard from "./electric-smart-meters-performance-data-card";
import ElectricSmartMetersPerformanceDataDrawer from "./electric-smart-meters-performance-data-drawer";
import { electricSmartMetersPerformanceDataColumns } from "./electric-smart-meters-performance-data-row";
import { projectMasterModels } from "src/constants/master-data/project-general-master-constants";
import projectGeneralMasterDataApiService from "src/services/general/project-general-master-data-service";

interface ElectricSmartMetersPerformanceDataListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const ElectricSmartMetersPerformanceDataList: React.FC<
  ElectricSmartMetersPerformanceDataListProps
> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<ElectricSmartMetersPerformanceData | null>(null);
  const { t } = useTranslation();

  // Fetch electric smart meters data
  const { data: electricSmartMetersData } = useQuery({
    queryKey: ["electric-smart-meters-data", projectId],
    queryFn: () =>
      projectOtherApiSecondService<ElectricSmartMetersData>().getAll(
        "electric-smart-meters-data",
        {},
      ),
  });

  // Fetch maintenance frequencies from master data
  const { data: maintenanceFrequencies } = useQuery({
    queryKey: ["maintenance-frequencies"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.maintenanceFrequency.model },
      }),
  });

  const fetchElectricSmartMetersPerformanceData = (
    params: GetRequestParam,
  ): Promise<IApiResponse<ElectricSmartMetersPerformanceData[]>> => {
    return projectOtherApiSecondService<ElectricSmartMetersPerformanceData>().getAll(
      otherSubMenu?.apiRoute || "",
      {},
    );
  };

  const {
    data: electricSmartMetersPerformanceData,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<ElectricSmartMetersPerformanceData[]>({
    queryKey: ["electricSmartMetersPerformanceData"],
    fetchFunction: fetchElectricSmartMetersPerformanceData,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as ElectricSmartMetersPerformanceData);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as ElectricSmartMetersPerformanceData);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (
    electricSmartMetersPerformanceData: ElectricSmartMetersPerformanceData,
  ) => {
    toggleDrawer();
    setSelectedRow(electricSmartMetersPerformanceData);
  };

  const handleDelete = async (electricSmartMetersPerformanceDataId: string) => {
    await projectOtherApiSecondService<ElectricSmartMetersPerformanceData>().delete(
      otherSubMenu?.apiRoute || "",
      electricSmartMetersPerformanceDataId,
    );
    refetch();
  };

  const handleClickDetail = (
    electricSmartMetersPerformanceData: ElectricSmartMetersPerformanceData,
  ) => {
    toggleDetailDrawer();
    setSelectedRow(electricSmartMetersPerformanceData);
  };

  // Create maps for dropdown values
  const electricSmartMetersDataMap = new Map(
    electricSmartMetersData?.payload.map((item: ElectricSmartMetersData) => [
      item.id,
      item.name || "",
    ]) || [],
  );
  const maintenanceFrequenciesMap = new Map(
    maintenanceFrequencies?.payload.map((item: any) => [
      item.id,
      item.title || "",
    ]) || [],
  );

  const mapElectricSmartMetersPerformanceDataToDetailItems = (
    electricSmartMetersPerformanceData: ElectricSmartMetersPerformanceData,
  ): { title: string; value: string }[] => [
    {
      title: t(
        "project.other.electric-smart-meters-performance-data.details.name",
      ),
      value: electricSmartMetersPerformanceData?.name || "N/A",
    },
    {
      title: t(
        "project.other.electric-smart-meters-performance-data.details.electric-smart-meters-data-id",
      ),
      value: electricSmartMetersPerformanceData?.electric_smart_meters_data_id
        ? electricSmartMetersDataMap.get(
            electricSmartMetersPerformanceData.electric_smart_meters_data_id,
          ) || electricSmartMetersPerformanceData.electric_smart_meters_data_id
        : "N/A",
    },
    {
      title: t(
        "project.other.electric-smart-meters-performance-data.details.maintenance-frequency-id",
      ),
      value: electricSmartMetersPerformanceData?.maintenance_frequency_id
        ? maintenanceFrequenciesMap.get(
            electricSmartMetersPerformanceData.maintenance_frequency_id,
          ) || electricSmartMetersPerformanceData.maintenance_frequency_id
        : "N/A",
    },
    {
      title: t(
        "project.other.electric-smart-meters-performance-data.details.average-meter-lifespan",
      ),
      value:
        electricSmartMetersPerformanceData?.average_meter_lifespan !== undefined
          ? electricSmartMetersPerformanceData.average_meter_lifespan.toString()
          : "N/A",
    },
    {
      title: t(
        "project.other.electric-smart-meters-performance-data.details.average-meter-accuracy",
      ),
      value:
        electricSmartMetersPerformanceData?.average_meter_accuracy !== undefined
          ? electricSmartMetersPerformanceData.average_meter_accuracy.toString()
          : "N/A",
    },
    {
      title: t(
        "project.other.electric-smart-meters-performance-data.details.safety-problems-encountered",
      ),
      value:
        electricSmartMetersPerformanceData?.safety_problems_encountered ||
        "N/A",
    },
    {
      title: t(
        "project.other.electric-smart-meters-performance-data.details.work-accidents-number",
      ),
      value:
        electricSmartMetersPerformanceData?.work_accidents_number !== undefined
          ? electricSmartMetersPerformanceData.work_accidents_number.toString()
          : "N/A",
    },
    {
      title: t(
        "project.other.electric-smart-meters-performance-data.details.on-site-safety-regulation-implemented",
      ),
      value:
        electricSmartMetersPerformanceData?.on_site_safety_regulation_implemented !==
        undefined
          ? electricSmartMetersPerformanceData.on_site_safety_regulation_implemented
            ? t("common.yes")
            : t("common.no")
          : "N/A",
    },
    {
      title: t(
        "project.other.electric-smart-meters-performance-data.details.other",
      ),
      value: electricSmartMetersPerformanceData?.other || "N/A",
    },
    {
      title: t(
        "project.other.electric-smart-meters-performance-data.details.remark",
      ),
      value: electricSmartMetersPerformanceData?.remark || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: electricSmartMetersPerformanceData?.created_at
        ? formatCreatedAt(electricSmartMetersPerformanceData.created_at)
        : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: electricSmartMetersPerformanceData?.updated_at
        ? formatCreatedAt(electricSmartMetersPerformanceData.updated_at)
        : "N/A",
    },
  ];

  return (
    <Box>
      {showDrawer && (
        <ElectricSmartMetersPerformanceDataDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          electricSmartMetersPerformanceData={
            selectedRow as ElectricSmartMetersPerformanceData
          }
          refetch={refetch}
          projectId={projectId}
          electricSmartMetersData={electricSmartMetersData?.payload || []}
          maintenanceFrequencies={maintenanceFrequencies?.payload || []}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapElectricSmartMetersPerformanceDataToDetailItems(
            selectedRow as ElectricSmartMetersPerformanceData,
          )}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={
            uploadableProjectFileTypes.other
              .electric_smart_meters_performance_data
          }
          title={t(
            "project.other.electric-smart-meters-performance-data.electric-smart-meters-performance-data-details",
          )}
        />
      )}

      <ItemsListing
        title={t("project.other.electric-smart-meters-performance-data.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: electricSmartMetersPerformanceDataColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            electricSmartMetersDataMap,
            maintenanceFrequenciesMap,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <ElectricSmartMetersPerformanceDataCard
            onDetail={handleClickDetail}
            electricSmartMetersPerformanceData={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
            electricSmartMetersDataMap={electricSmartMetersDataMap}
            maintenanceFrequenciesMap={maintenanceFrequenciesMap}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: true,
          permission: {
            action: "create",
            subject: "electricsmartmetersperformancedata",
          },
        }}
        fetchDataFunction={refetch}
        items={electricSmartMetersPerformanceData || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default ElectricSmartMetersPerformanceDataList;
