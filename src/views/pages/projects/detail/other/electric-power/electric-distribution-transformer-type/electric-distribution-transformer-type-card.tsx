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
import type { ElectricDistributionTransformerType } from "src/types/project/other";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";
import { formatCreatedAt } from "src/utils/formatter/date";

interface ElectricDistributionTransformerTypeCardProps {
  electricDistributionTransformerType: ElectricDistributionTransformerType;
  refetch: () => void;
  onEdit: (
    electricDistributionTransformerType: ElectricDistributionTransformerType,
  ) => void;
  onDelete: (id: string) => void;
  onDetail: (
    electricDistributionTransformerType: ElectricDistributionTransformerType,
  ) => void;
  miniGridStationsMap: Map<string, string>;
  transformerTypesMap: Map<string, string>;
  protectionInstalledMap: Map<string, string>;
  safetyProblemsEncounteredMap: Map<string, string>;
}

const ElectricDistributionTransformerTypeCard: React.FC<
  ElectricDistributionTransformerTypeCardProps
> = ({
  electricDistributionTransformerType,
  refetch,
  onEdit,
  onDelete,
  onDetail,
  miniGridStationsMap,
  transformerTypesMap,
  protectionInstalledMap,
  safetyProblemsEncounteredMap,
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
              onClick={() => onDetail(electricDistributionTransformerType)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {electricDistributionTransformerType?.name ||
                electricDistributionTransformerType?.id.slice(0, 8) + "..."}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Typography variant="subtitle1" mt={2} fontWeight="bold">
          {t(
            "project.other.electric-distribution-transformer-type.general-information",
          )}
        </Typography>

        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.electric-distribution-transformer-type.details.mini-grid-station-id",
              )}
              :{" "}
              {electricDistributionTransformerType?.mini_grid_station_id
                ? miniGridStationsMap.get(
                    electricDistributionTransformerType.mini_grid_station_id,
                  ) || electricDistributionTransformerType.mini_grid_station_id
                : t("common.not-available")}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.electric-distribution-transformer-type.details.transformer-type-id",
              )}
              :{" "}
              {electricDistributionTransformerType?.transformer_type_id
                ? transformerTypesMap.get(
                    electricDistributionTransformerType.transformer_type_id,
                  ) || electricDistributionTransformerType.transformer_type_id
                : t("common.not-available")}
            </Typography>
          </Grid>
        </Grid>

        <Typography variant="subtitle1" mt={2} fontWeight="bold">
          {t(
            "project.other.electric-distribution-transformer-type.technical-specifications",
          )}
        </Typography>

        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.electric-distribution-transformer-type.details.cooling-type",
              )}
              :{" "}
              {electricDistributionTransformerType?.cooling_type ||
                t("common.not-available")}
            </Typography>
          </Grid>

          {electricDistributionTransformerType?.transformer_power_rating !==
            undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t(
                  "project.other.electric-distribution-transformer-type.details.transformer-power-rating",
                )}
                : {electricDistributionTransformerType.transformer_power_rating}{" "}
                {t("common.kva")}
              </Typography>
            </Grid>
          )}

          {electricDistributionTransformerType?.lifetime !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t(
                  "project.other.electric-distribution-transformer-type.details.lifetime",
                )}
                : {electricDistributionTransformerType.lifetime}{" "}
                {t("common.years")}
              </Typography>
            </Grid>
          )}
        </Grid>

        <Typography variant="subtitle1" mt={2} fontWeight="bold">
          {t(
            "project.other.electric-distribution-transformer-type.safety-information",
          )}
        </Typography>

        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.electric-distribution-transformer-type.details.protection-installed-id",
              )}
              :{" "}
              {electricDistributionTransformerType?.protection_installed_id
                ? protectionInstalledMap.get(
                    electricDistributionTransformerType.protection_installed_id,
                  ) ||
                  electricDistributionTransformerType.protection_installed_id
                : t("common.not-available")}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.electric-distribution-transformer-type.details.safety-problems-encountered-id",
              )}
              :{" "}
              {electricDistributionTransformerType?.safety_problems_encountered_id
                ? safetyProblemsEncounteredMap.get(
                    electricDistributionTransformerType.safety_problems_encountered_id,
                  ) ||
                  electricDistributionTransformerType.safety_problems_encountered_id
                : t("common.not-available")}
            </Typography>
          </Grid>

          {electricDistributionTransformerType?.work_accidents_number !==
            undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t(
                  "project.other.electric-distribution-transformer-type.details.work-accidents-number",
                )}
                : {electricDistributionTransformerType.work_accidents_number}
              </Typography>
            </Grid>
          )}

          {electricDistributionTransformerType?.on_site_safety_regulation_implemented !==
            undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t(
                  "project.other.electric-distribution-transformer-type.details.on-site-safety-regulation-implemented",
                )}
                :{" "}
                {electricDistributionTransformerType.on_site_safety_regulation_implemented
                  ? t("common.yes")
                  : t("common.no")}
              </Typography>
            </Grid>
          )}
        </Grid>

        {electricDistributionTransformerType?.created_at && (
          <Typography variant="body2" color="text.secondary" mt={2}>
            {t("common.table-columns.created-at")}:{" "}
            {formatCreatedAt(electricDistributionTransformerType.created_at)}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between" }}>
        <FileDrawer
          id={electricDistributionTransformerType.id}
          type={
            uploadableProjectFileTypes.other
              .electric_distribution_transformer_type
          }
        />

        <Box display="flex">
          <ModelAction
            model="ElectricDistributionTransformerType"
            model_id={electricDistributionTransformerType.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: "delete",
              subject: "electricdistributiontransformertype",
            }}
            editPermissionRule={{
              action: "update",
              subject: "electricdistributiontransformertype",
            }}
            onEdit={() => onEdit(electricDistributionTransformerType)}
            onDelete={() => onDelete(electricDistributionTransformerType.id)}
            item={electricDistributionTransformerType}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  );
};

export default ElectricDistributionTransformerTypeCard;
