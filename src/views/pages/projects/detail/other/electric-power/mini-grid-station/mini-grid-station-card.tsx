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
import type { MiniGridStation } from "src/types/project/other";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";
import { formatCreatedAt } from "src/utils/formatter/date";

interface MiniGridStationCardProps {
  miniGridStation: MiniGridStation;
  refetch: () => void;
  onEdit: (miniGridStation: MiniGridStation) => void;
  onDelete: (id: string) => void;
  onDetail: (miniGridStation: MiniGridStation) => void;
}

const MiniGridStationCard: React.FC<MiniGridStationCardProps> = ({
  miniGridStation,
  refetch,
  onEdit,
  onDelete,
  onDetail,
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
              onClick={() => onDetail(miniGridStation)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {miniGridStation?.name || miniGridStation?.id.slice(0, 8) + "..."}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Typography variant="subtitle1" mt={2} fontWeight="bold">
          {t("project.other.mini-grid-station.technical-specifications")}
        </Typography>

        <Grid container spacing={2} mt={1}>
          {miniGridStation?.minigrid_size !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.mini-grid-station.details.minigrid-size")}:{" "}
                {miniGridStation.minigrid_size} {t("common.kw")}
              </Typography>
            </Grid>
          )}

          {miniGridStation?.battery_size !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.mini-grid-station.details.battery-size")}:{" "}
                {miniGridStation.battery_size} {t("common.kwh")}
              </Typography>
            </Grid>
          )}

          {miniGridStation?.inverter !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.mini-grid-station.details.inverter")}:{" "}
                {miniGridStation.inverter} {t("common.kw")}
              </Typography>
            </Grid>
          )}

          {miniGridStation?.system_voltage !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.mini-grid-station.details.system-voltage")}:{" "}
                {miniGridStation.system_voltage} {t("common.v")}
              </Typography>
            </Grid>
          )}
        </Grid>

        <Typography variant="subtitle1" mt={2} fontWeight="bold">
          {t("project.other.mini-grid-station.power-generation")}
        </Typography>

        <Grid container spacing={2} mt={1}>
          {miniGridStation?.expected_annual_generation !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t(
                  "project.other.mini-grid-station.details.expected-annual-generation",
                )}
                : {miniGridStation.expected_annual_generation} {t("common.kwh")}
              </Typography>
            </Grid>
          )}

          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t("project.other.mini-grid-station.details.diesel-generator")}:{" "}
              {miniGridStation.diesel_generator}
            </Typography>
          </Grid>
        </Grid>

        {miniGridStation?.owner_operator && (
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              {t("project.other.mini-grid-station.details.owner-operator")}:{" "}
              {miniGridStation.owner_operator}
            </Typography>
          </Box>
        )}

        {miniGridStation?.created_at && (
          <Typography variant="body2" color="text.secondary" mt={2}>
            {t("common.table-columns.created-at")}:{" "}
            {formatCreatedAt(miniGridStation.created_at)}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between" }}>
        <FileDrawer
          id={miniGridStation.id}
          type={uploadableProjectFileTypes.other.mini_grid_station}
        />

        <Box display="flex">
          <ModelAction
            model="MiniGridStation"
            model_id={miniGridStation.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: "delete",
              subject: "minigridstation",
            }}
            editPermissionRule={{
              action: "update",
              subject: "minigridstation",
            }}
            onEdit={() => onEdit(miniGridStation)}
            onDelete={() => onDelete(miniGridStation.id)}
            item={miniGridStation}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  );
};

export default MiniGridStationCard;
