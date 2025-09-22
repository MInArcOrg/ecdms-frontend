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
import type { WindTurbine } from "src/types/project/other";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";
import { formatCreatedAt } from "src/utils/formatter/date";

interface WindTurbineCardProps {
  windTurbine: WindTurbine;
  refetch: () => void;
  onEdit: (windTurbine: WindTurbine) => void;
  onDelete: (id: string) => void;
  onDetail: (windTurbine: WindTurbine) => void;
  towerTypeMap: Map<string, string>;
  generatorTypeMap: Map<string, string>;
}

const WindTurbineCard: React.FC<WindTurbineCardProps> = ({
  windTurbine,
  refetch,
  onEdit,
  onDelete,
  onDetail,
  towerTypeMap,
  generatorTypeMap,
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
              onClick={() => onDetail(windTurbine)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {windTurbine?.turbine_manufacturer && windTurbine?.turbine_model
                ? `${windTurbine.turbine_manufacturer} - ${windTurbine.turbine_model}`
                : windTurbine?.turbine_manufacturer ||
                  windTurbine?.id.slice(0, 8) + "..."}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Grid container spacing={2} mt={1}>
          {windTurbine?.rotor_diameter !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.wind-turbine.details.rotor-diameter")}:{" "}
                {windTurbine.rotor_diameter} {t("common.meters")}
              </Typography>
            </Grid>
          )}

          {windTurbine?.hub_height !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.wind-turbine.details.hub-height")}:{" "}
                {windTurbine.hub_height} {t("common.meters")}
              </Typography>
            </Grid>
          )}

          {windTurbine?.tower_type_id && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.wind-turbine.details.tower-type")}:{" "}
                {towerTypeMap.get(windTurbine.tower_type_id) || "N/A"}
              </Typography>
            </Grid>
          )}

          {windTurbine?.blade_length !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.wind-turbine.details.blade-length")}:{" "}
                {windTurbine.blade_length} {t("common.meters")}
              </Typography>
            </Grid>
          )}

          {windTurbine?.blades_number !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.wind-turbine.details.blades-number")}:{" "}
                {windTurbine.blades_number}
              </Typography>
            </Grid>
          )}

          {windTurbine?.generator_type_id && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.wind-turbine.details.generator-type")}:{" "}
                {generatorTypeMap.get(windTurbine.generator_type_id) || "N/A"}
              </Typography>
            </Grid>
          )}
        </Grid>

        {windTurbine?.remark && (
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              {t("project.other.wind-turbine.details.remark")}:{" "}
              {windTurbine.remark}
            </Typography>
          </Box>
        )}

        {windTurbine?.created_at && (
          <Typography variant="body2" color="text.secondary" mt={2}>
            {t("common.table-columns.created-at")}:{" "}
            {formatCreatedAt(windTurbine.created_at)}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between" }}>
        <FileDrawer
          id={windTurbine.id}
          type={uploadableProjectFileTypes.other.windTurbine}
        />

        <Box display="flex">
          <ModelAction
            model="WindTurbine"
            model_id={windTurbine.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: "delete",
              subject: "windturbine",
            }}
            editPermissionRule={{
              action: "update",
              subject: "windturbine",
            }}
            onEdit={() => onEdit(windTurbine)}
            onDelete={() => onDelete(windTurbine.id)}
            item={windTurbine}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  );
};

export default WindTurbineCard;
