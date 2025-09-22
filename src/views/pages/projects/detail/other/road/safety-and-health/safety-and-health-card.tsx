import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { uploadableProjectFileTypes } from "src/services/utils/file-constants";
import { SafetyAndHealth } from "src/types/project/other";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface SafetyAndHealthCardProps {
  safetyAndHealth: SafetyAndHealth;
  refetch: () => void;
  onEdit: (safetyAndHealth: SafetyAndHealth) => void;
  onDelete: (id: string) => void;
  onDetail: (safetyAndHealth: SafetyAndHealth) => void;
}

const SafetyAndHealthCard: React.FC<SafetyAndHealthCardProps> = ({
  safetyAndHealth,
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
              onClick={() => onDetail(safetyAndHealth)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {safetyAndHealth?.id.slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.safety-and-health.details.road-segment")}:{" "}
            {safetyAndHealth?.road_segment || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.safety-and-health.details.hazard-type")}:{" "}
            {safetyAndHealth?.hazard_type_id || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.safety-and-health.details.risk-level")}:{" "}
            {safetyAndHealth?.risk_level_id || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.safety-and-health.details.incident-type")}:{" "}
            {safetyAndHealth?.incident_type_id || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.safety-and-health.details.injury-severity")}:{" "}
            {safetyAndHealth?.injury_severity_id || "N/A"}
          </Typography>
          {safetyAndHealth?.remark && (
            <Typography variant="body2" color="text.secondary">
              {t("project.other.safety-and-health.details.remark")}:{" "}
              {safetyAndHealth.remark}
            </Typography>
          )}
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <FileDrawer
          id={safetyAndHealth.id}
          type={uploadableProjectFileTypes.other.safetyAndHealth}
        />
        <ModelAction
          model="SafetyAndHealth"
          model_id={safetyAndHealth.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: "delete",
            subject: "safetyandhealth",
          }}
          editPermissionRule={{
            action: "update",
            subject: "safetyandhealth",
          }}
          onEdit={() => onEdit(safetyAndHealth)}
          onDelete={() => onDelete(safetyAndHealth.id)}
          item={safetyAndHealth}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};
export default SafetyAndHealthCard;
