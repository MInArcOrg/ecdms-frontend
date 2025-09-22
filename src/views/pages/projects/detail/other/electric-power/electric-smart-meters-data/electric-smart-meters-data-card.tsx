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
import type { ElectricSmartMetersData } from "src/types/project/other";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";
import { formatCreatedAt } from "src/utils/formatter/date";

interface ElectricSmartMetersDataCardProps {
  electricSmartMetersData: ElectricSmartMetersData;
  refetch: () => void;
  onEdit: (electricSmartMetersData: ElectricSmartMetersData) => void;
  onDelete: (id: string) => void;
  onDetail: (electricSmartMetersData: ElectricSmartMetersData) => void;
  miniGridStationsMap: Map<string, string>;
  modelMap: Map<string, string>;
  smartMeterTypesMap: Map<string, string>;
}

const ElectricSmartMetersDataCard: React.FC<
  ElectricSmartMetersDataCardProps
> = ({
  electricSmartMetersData,
  refetch,
  onEdit,
  onDelete,
  onDetail,
  miniGridStationsMap,
  modelMap,
  smartMeterTypesMap,
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
              onClick={() => onDetail(electricSmartMetersData)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {electricSmartMetersData?.name ||
                electricSmartMetersData?.id.slice(0, 8) + "..."}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Typography variant="subtitle1" mt={2} fontWeight="bold">
          {t("project.other.electric-smart-meters-data.general-information")}
        </Typography>

        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.electric-smart-meters-data.details.mini-grid-station-id",
              )}
              :{" "}
              {electricSmartMetersData?.mini_grid_station_id
                ? miniGridStationsMap.get(
                    electricSmartMetersData.mini_grid_station_id,
                  ) || electricSmartMetersData.mini_grid_station_id
                : t("common.not-available")}
            </Typography>
          </Grid>

          {electricSmartMetersData?.owner_operator && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t(
                  "project.other.electric-smart-meters-data.details.owner-operator",
                )}
                : {electricSmartMetersData.owner_operator}
              </Typography>
            </Grid>
          )}
        </Grid>

        <Typography variant="subtitle1" mt={2} fontWeight="bold">
          {t(
            "project.other.electric-smart-meters-data.technical-specifications",
          )}
        </Typography>

        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.electric-smart-meters-data.details.facility-type",
              )}
              :{" "}
              {electricSmartMetersData?.facility_type ||
                t("common.not-available")}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t("project.other.electric-smart-meters-data.details.model-id")}:{" "}
              {electricSmartMetersData?.model_id
                ? modelMap.get(electricSmartMetersData.model_id) ||
                  electricSmartMetersData.model_id
                : t("common.not-available")}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.electric-smart-meters-data.details.smart-meter-type-id",
              )}
              :{" "}
              {electricSmartMetersData?.smart_meter_type_id
                ? smartMeterTypesMap.get(
                    electricSmartMetersData.smart_meter_type_id,
                  ) || electricSmartMetersData.smart_meter_type_id
                : t("common.not-available")}
            </Typography>
          </Grid>

          {electricSmartMetersData?.manufacturer && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t(
                  "project.other.electric-smart-meters-data.details.manufacturer",
                )}
                : {electricSmartMetersData.manufacturer}
              </Typography>
            </Grid>
          )}

          {electricSmartMetersData?.service_area !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t(
                  "project.other.electric-smart-meters-data.details.service-area",
                )}
                : {electricSmartMetersData.service_area} {t("common.km2")}
              </Typography>
            </Grid>
          )}

          {electricSmartMetersData?.installation_year !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t(
                  "project.other.electric-smart-meters-data.details.installation-year",
                )}
                : {electricSmartMetersData.installation_year}
              </Typography>
            </Grid>
          )}

          {electricSmartMetersData?.smart_meters_installed_number !==
            undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t(
                  "project.other.electric-smart-meters-data.details.smart-meters-installed-number",
                )}
                : {electricSmartMetersData.smart_meters_installed_number}
              </Typography>
            </Grid>
          )}
        </Grid>

        {electricSmartMetersData?.created_at && (
          <Typography variant="body2" color="text.secondary" mt={2}>
            {t("common.table-columns.created-at")}:{" "}
            {formatCreatedAt(electricSmartMetersData.created_at)}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between" }}>
        <FileDrawer
          id={electricSmartMetersData.id}
          type={uploadableProjectFileTypes.other.electric_smart_meters_data}
        />

        <Box display="flex">
          <ModelAction
            model="ElectricSmartMetersData"
            model_id={electricSmartMetersData.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: "delete",
              subject: "electricsmartmetersdata",
            }}
            editPermissionRule={{
              action: "update",
              subject: "electricsmartmetersdata",
            }}
            onEdit={() => onEdit(electricSmartMetersData)}
            onDelete={() => onDelete(electricSmartMetersData.id)}
            item={electricSmartMetersData}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  );
};

export default ElectricSmartMetersDataCard;
