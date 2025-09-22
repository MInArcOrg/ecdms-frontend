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
import type { TrafficParameter } from "src/types/project/other";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface TrafficParameterCardProps {
  trafficParameter: TrafficParameter;
  refetch: () => void;
  onEdit: (trafficParameter: TrafficParameter) => void;
  onDelete: (id: string) => void;
  onDetail: (trafficParameter: TrafficParameter) => void;
}

const TrafficParameterCard: React.FC<TrafficParameterCardProps> = ({
  trafficParameter,
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
              onClick={() => onDetail(trafficParameter)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {trafficParameter?.id.slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.traffic-parameter.details.name")}:{" "}
            {trafficParameter?.name || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.traffic-parameter.details.pedestrian-facility-id",
            )}
            : {trafficParameter?.pedestrian_facility_id || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.traffic-parameter.details.design-speed")}:{" "}
            {trafficParameter?.design_speed || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.traffic-parameter.details.design-traffic-flow")}:{" "}
            {trafficParameter?.design_traffic_flow || "N/A"}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <ModelAction
          model="TrafficParameter"
          model_id={trafficParameter.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: "delete",
            subject: "trafficparameter",
          }}
          editPermissionRule={{
            action: "update",
            subject: "trafficparameter",
          }}
          onEdit={() => onEdit(trafficParameter)}
          onDelete={() => onDelete(trafficParameter.id)}
          item={trafficParameter}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};
export default TrafficParameterCard;
