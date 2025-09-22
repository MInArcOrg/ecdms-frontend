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
import type { PowerGenerationCapacity } from "src/types/project/other";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";
import { formatCreatedAt } from "src/utils/formatter/date";

interface PowerGenerationCapacityCardProps {
  powerGenerationCapacity: PowerGenerationCapacity;
  refetch: () => void;
  onEdit: (powerGenerationCapacity: PowerGenerationCapacity) => void;
  onDelete: (id: string) => void;
  onDetail: (powerGenerationCapacity: PowerGenerationCapacity) => void;
}

const PowerGenerationCapacityCard: React.FC<
  PowerGenerationCapacityCardProps
> = ({ powerGenerationCapacity, refetch, onEdit, onDelete, onDetail }) => {
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
              onClick={() => onDetail(powerGenerationCapacity)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {t(
                "project.other.power-generation-capacity.power-generation-record",
              )}{" "}
              - {powerGenerationCapacity?.id.slice(0, 8) + "..."}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Grid container spacing={2} mt={1}>
          {powerGenerationCapacity?.capacity !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.power-generation-capacity.details.capacity")}:{" "}
                {powerGenerationCapacity.capacity} MW
              </Typography>
            </Grid>
          )}

          {powerGenerationCapacity?.annual_generation !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t(
                  "project.other.power-generation-capacity.details.annual-generation",
                )}
                : {powerGenerationCapacity.annual_generation} GWh
              </Typography>
            </Grid>
          )}

          {powerGenerationCapacity?.units_number !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t(
                  "project.other.power-generation-capacity.details.units-number",
                )}
                : {powerGenerationCapacity.units_number}
              </Typography>
            </Grid>
          )}

          {powerGenerationCapacity?.commissioning_date && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t(
                  "project.other.power-generation-capacity.details.commissioning-date",
                )}
                : {formatCreatedAt(powerGenerationCapacity.commissioning_date)}
              </Typography>
            </Grid>
          )}

          {powerGenerationCapacity?.plant_life !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t(
                  "project.other.power-generation-capacity.details.plant-life",
                )}
                : {powerGenerationCapacity.plant_life} {t("common.years")}
              </Typography>
            </Grid>
          )}
        </Grid>

        {powerGenerationCapacity?.others && (
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              {t("project.other.power-generation-capacity.details.others")}:{" "}
              {powerGenerationCapacity.others}
            </Typography>
          </Box>
        )}

        {powerGenerationCapacity?.created_at && (
          <Typography variant="body2" color="text.secondary" mt={2}>
            {t("common.table-columns.created-at")}:{" "}
            {formatCreatedAt(powerGenerationCapacity.created_at)}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between" }}>
        <FileDrawer
          id={powerGenerationCapacity.id}
          type={uploadableProjectFileTypes.other.powerGenerationCapacity}
        />

        <Box display="flex">
          <ModelAction
            model="PowerGenerationCapacity"
            model_id={powerGenerationCapacity.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: "delete",
              subject: "powergenerationcapacity",
            }}
            editPermissionRule={{
              action: "update",
              subject: "powergenerationcapacity",
            }}
            onEdit={() => onEdit(powerGenerationCapacity)}
            onDelete={() => onDelete(powerGenerationCapacity.id)}
            item={powerGenerationCapacity}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  );
};

export default PowerGenerationCapacityCard;
