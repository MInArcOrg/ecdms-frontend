"use client";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  Grid,
} from "@mui/material";
import type React from "react";
import { useTranslation } from "react-i18next";
import { uploadableProjectFileTypes } from "src/services/utils/file-constants";
import type { ElectricSmartMetersPerformanceData } from "src/types/project/other";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";
import { formatCreatedAt } from "src/utils/formatter/date";

interface ElectricSmartMetersPerformanceDataCardProps {
  electricSmartMetersPerformanceData: ElectricSmartMetersPerformanceData;
  refetch: () => void;
  onEdit: (
    electricSmartMetersPerformanceData: ElectricSmartMetersPerformanceData,
  ) => void;
  onDelete: (id: string) => void;
  onDetail: (
    electricSmartMetersPerformanceData: ElectricSmartMetersPerformanceData,
  ) => void;
  electricSmartMetersDataMap: Map<string, string>;
  maintenanceFrequenciesMap: Map<string, string>;
}

const ElectricSmartMetersPerformanceDataCard: React.FC<
  ElectricSmartMetersPerformanceDataCardProps
> = ({
  electricSmartMetersPerformanceData,
  refetch,
  onEdit,
  onDelete,
  onDetail,
  electricSmartMetersDataMap,
  maintenanceFrequenciesMap,
}) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(electricSmartMetersPerformanceData)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {electricSmartMetersPerformanceData?.name ||
                electricSmartMetersPerformanceData?.id.slice(0, 8) + "..."}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Typography variant="subtitle1" mt={2} fontWeight="bold">
          {t(
            "project.other.electric-smart-meters-performance-data.general-information",
          )}
        </Typography>

        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.electric-smart-meters-performance-data.details.electric-smart-meters-data-id",
              )}
              :{" "}
              {electricSmartMetersPerformanceData?.electric_smart_meters_data_id
                ? electricSmartMetersDataMap.get(
                    electricSmartMetersPerformanceData.electric_smart_meters_data_id,
                  ) ||
                  electricSmartMetersPerformanceData.electric_smart_meters_data_id
                : t("common.not-available")}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.electric-smart-meters-performance-data.details.maintenance-frequency-id",
              )}
              :{" "}
              {electricSmartMetersPerformanceData?.maintenance_frequency_id
                ? maintenanceFrequenciesMap.get(
                    electricSmartMetersPerformanceData.maintenance_frequency_id,
                  ) ||
                  electricSmartMetersPerformanceData.maintenance_frequency_id
                : t("common.not-available")}
            </Typography>
          </Grid>
        </Grid>

        <Typography variant="subtitle1" mt={2} fontWeight="bold">
          {t(
            "project.other.electric-smart-meters-performance-data.technical-specifications",
          )}
        </Typography>

        <Grid container spacing={2} mt={1}>
          {electricSmartMetersPerformanceData?.average_meter_lifespan !==
            undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t(
                  "project.other.electric-smart-meters-performance-data.details.average-meter-lifespan",
                )}
                : {electricSmartMetersPerformanceData.average_meter_lifespan}
              </Typography>
            </Grid>
          )}

          {electricSmartMetersPerformanceData?.average_meter_accuracy !==
            undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t(
                  "project.other.electric-smart-meters-performance-data.details.average-meter-accuracy",
                )}
                : {electricSmartMetersPerformanceData.average_meter_accuracy}
              </Typography>
            </Grid>
          )}
        </Grid>

        <Typography variant="subtitle1" mt={2} fontWeight="bold">
          {t(
            "project.other.electric-smart-meters-performance-data.safety-information",
          )}
        </Typography>

        <Grid container spacing={2} mt={1}>
          {electricSmartMetersPerformanceData?.safety_problems_encountered && (
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                {t(
                  "project.other.electric-smart-meters-performance-data.details.safety-problems-encountered",
                )}
                :{" "}
                {electricSmartMetersPerformanceData.safety_problems_encountered}
              </Typography>
            </Grid>
          )}

          {electricSmartMetersPerformanceData?.work_accidents_number !==
            undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t(
                  "project.other.electric-smart-meters-performance-data.details.work-accidents-number",
                )}
                : {electricSmartMetersPerformanceData.work_accidents_number}
              </Typography>
            </Grid>
          )}

          {electricSmartMetersPerformanceData?.on_site_safety_regulation_implemented !==
            undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t(
                  "project.other.electric-smart-meters-performance-data.details.on-site-safety-regulation-implemented",
                )}
                :{" "}
                {electricSmartMetersPerformanceData.on_site_safety_regulation_implemented
                  ? t("common.yes")
                  : t("common.no")}
              </Typography>
            </Grid>
          )}
        </Grid>

        {electricSmartMetersPerformanceData?.created_at && (
          <Typography variant="body2" color="text.secondary" mt={2}>
            {t("common.table-columns.created-at")}:{" "}
            {formatCreatedAt(electricSmartMetersPerformanceData.created_at)}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between" }}>
        <FileDrawer
          id={electricSmartMetersPerformanceData.id}
          type={
            uploadableProjectFileTypes.other
              .electric_smart_meters_performance_data
          }
        />

        <Box display="flex">
          <ModelAction
            model="ElectricSmartMetersPerformanceData"
            model_id={electricSmartMetersPerformanceData.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: "delete",
              subject: "electricsmartmetersperformancedata",
            }}
            editPermissionRule={{
              action: "update",
              subject: "electricsmartmetersperformancedata",
            }}
            onEdit={() => onEdit(electricSmartMetersPerformanceData)}
            onDelete={() => onDelete(electricSmartMetersPerformanceData.id)}
            item={electricSmartMetersPerformanceData}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  );
};

export default ElectricSmartMetersPerformanceDataCard;
