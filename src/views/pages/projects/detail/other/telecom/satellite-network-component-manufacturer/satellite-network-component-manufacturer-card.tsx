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
import type { SatelliteNetworkComponentManufacturer } from "src/types/project/other";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";
import { formatCreatedAt } from "src/utils/formatter/date";

interface SatelliteNetworkComponentManufacturerCardProps {
  satelliteNetworkComponentManufacturer: SatelliteNetworkComponentManufacturer;
  refetch: () => void;
  onEdit: (
    satelliteNetworkComponentManufacturer: SatelliteNetworkComponentManufacturer,
  ) => void;
  onDelete: (id: string) => void;
  onDetail: (
    satelliteNetworkComponentManufacturer: SatelliteNetworkComponentManufacturer,
  ) => void;
  satelliteNetworkMap: Map<string, string>;
}

const SatelliteNetworkComponentManufacturerCard: React.FC<
  SatelliteNetworkComponentManufacturerCardProps
> = ({
  satelliteNetworkComponentManufacturer,
  refetch,
  onEdit,
  onDelete,
  onDetail,
  satelliteNetworkMap,
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
              onClick={() => onDetail(satelliteNetworkComponentManufacturer)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {satelliteNetworkMap.get(
                satelliteNetworkComponentManufacturer?.satellite_network_id,
              ) ||
                satelliteNetworkComponentManufacturer?.id.slice(0, 8) + "..."}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Grid container spacing={2} mt={1}>
          {satelliteNetworkComponentManufacturer?.satellite && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t(
                  "project.other.satellite-network-component-manufacturer.details.satellite",
                )}
                : {satelliteNetworkComponentManufacturer.satellite}
              </Typography>
            </Grid>
          )}

          {satelliteNetworkComponentManufacturer?.ground_stations && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t(
                  "project.other.satellite-network-component-manufacturer.details.ground-stations",
                )}
                : {satelliteNetworkComponentManufacturer.ground_stations}
              </Typography>
            </Grid>
          )}

          {satelliteNetworkComponentManufacturer?.modems && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t(
                  "project.other.satellite-network-component-manufacturer.details.modems",
                )}
                : {satelliteNetworkComponentManufacturer.modems}
              </Typography>
            </Grid>
          )}

          {satelliteNetworkComponentManufacturer?.routers && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t(
                  "project.other.satellite-network-component-manufacturer.details.routers",
                )}
                : {satelliteNetworkComponentManufacturer.routers}
              </Typography>
            </Grid>
          )}
        </Grid>

        {satelliteNetworkComponentManufacturer?.others && (
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.satellite-network-component-manufacturer.details.others",
              )}
              : {satelliteNetworkComponentManufacturer.others}
            </Typography>
          </Box>
        )}

        {satelliteNetworkComponentManufacturer?.created_at && (
          <Typography variant="body2" color="text.secondary" mt={2}>
            {t("common.table-columns.created-at")}:{" "}
            {formatCreatedAt(satelliteNetworkComponentManufacturer.created_at)}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between" }}>
        <FileDrawer
          id={satelliteNetworkComponentManufacturer.id}
          type={
            uploadableProjectFileTypes.other
              .satelliteNetworkComponentManufacturer
          }
        />

        <Box display="flex">
          <ModelAction
            model="SatelliteNetworkComponentManufacturer"
            model_id={satelliteNetworkComponentManufacturer.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: "delete",
              subject: "satellitenetworkcomponentmanufacturer",
            }}
            editPermissionRule={{
              action: "update",
              subject: "satellitenetworkcomponentmanufacturer",
            }}
            onEdit={() => onEdit(satelliteNetworkComponentManufacturer)}
            onDelete={() => onDelete(satelliteNetworkComponentManufacturer.id)}
            item={satelliteNetworkComponentManufacturer}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  );
};

export default SatelliteNetworkComponentManufacturerCard;
