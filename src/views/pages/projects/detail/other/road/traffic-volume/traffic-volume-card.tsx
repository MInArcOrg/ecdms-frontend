"use client";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import type React from "react";
import { useTranslation } from "react-i18next";
import type { TrafficVolume } from "src/types/project/other";
import { formatCreatedAt } from "src/utils/formatter/date";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface TrafficVolumeCardProps {
  trafficVolume: TrafficVolume;
  refetch: () => void;
  onEdit: (trafficVolume: TrafficVolume) => void;
  onDelete: (id: string) => void;
  onDetail: (trafficVolume: TrafficVolume) => void;
}

const TrafficVolumeCard: React.FC<TrafficVolumeCardProps> = ({
  trafficVolume,
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
              onClick={() => onDetail(trafficVolume)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {trafficVolume?.id.slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.traffic-volume.details.name")}:{" "}
            {trafficVolume?.name || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.traffic-volume.details.count-type-id")}:{" "}
            {trafficVolume?.count_type_id || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.traffic-volume.details.count-time")}:{" "}
            {trafficVolume?.count_time
              ? formatCreatedAt(trafficVolume.count_time)
              : "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.traffic-volume.details.vehicle-number-per-hour")}:{" "}
            {trafficVolume?.vehicle_number_per_hour || "N/A"}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <ModelAction
          model="TrafficVolume"
          model_id={trafficVolume.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: "delete",
            subject: "trafficvolume",
          }}
          editPermissionRule={{
            action: "update",
            subject: "trafficvolume",
          }}
          onEdit={() => onEdit(trafficVolume)}
          onDelete={() => onDelete(trafficVolume.id)}
          item={trafficVolume}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};
export default TrafficVolumeCard;
