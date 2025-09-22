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
import { uploadableProjectFileTypes } from "src/services/utils/file-constants";
import type { RoadMaintenanceActivity } from "src/types/project/other";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";
import { formatCreatedAt } from "src/utils/formatter/date";

interface RoadMaintenanceActivityCardProps {
  roadMaintenanceActivity: RoadMaintenanceActivity;
  refetch: () => void;
  onEdit: (roadMaintenanceActivity: RoadMaintenanceActivity) => void;
  onDelete: (id: string) => void;
  onDetail: (roadMaintenanceActivity: RoadMaintenanceActivity) => void;
  maintenanceFrequencyMap: Map<string, string>;
  maintenanceTypeMap: Map<string, string>;
}

const RoadMaintenanceActivityCard: React.FC<
  RoadMaintenanceActivityCardProps
> = ({
  roadMaintenanceActivity,
  refetch,
  onEdit,
  onDelete,
  onDetail,
  maintenanceFrequencyMap,
  maintenanceTypeMap,
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
              onClick={() => onDetail(roadMaintenanceActivity)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {roadMaintenanceActivity?.road_segment ||
                roadMaintenanceActivity?.id.slice(0, 8) + "..."}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          {roadMaintenanceActivity?.maintenance_frequency_id && (
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.road-maintenance-activity.details.maintenance-frequency",
              )}
              :{" "}
              {maintenanceFrequencyMap.get(
                roadMaintenanceActivity.maintenance_frequency_id,
              ) || "N/A"}
            </Typography>
          )}

          {roadMaintenanceActivity?.maintenance_type_id && (
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.road-maintenance-activity.details.maintenance-type",
              )}
              :{" "}
              {maintenanceTypeMap.get(
                roadMaintenanceActivity.maintenance_type_id,
              ) || "N/A"}
            </Typography>
          )}

          {roadMaintenanceActivity?.consultant && (
            <Typography variant="body2" color="text.secondary">
              {t("project.other.road-maintenance-activity.details.consultant")}:{" "}
              {roadMaintenanceActivity.consultant}
            </Typography>
          )}

          {roadMaintenanceActivity?.created_at && (
            <Typography variant="body2" color="text.secondary">
              {t("common.table-columns.created-at")}:{" "}
              {formatCreatedAt(roadMaintenanceActivity.created_at)}
            </Typography>
          )}
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between" }}>
        <FileDrawer
          id={roadMaintenanceActivity.id}
          type={uploadableProjectFileTypes.other.maintenanceRecord}
        />

        <Box display="flex">
          <ModelAction
            model="RoadMaintenanceActivity"
            model_id={roadMaintenanceActivity.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: "delete",
              subject: "roadmaintenanceactivity",
            }}
            editPermissionRule={{
              action: "update",
              subject: "roadmaintenanceactivity",
            }}
            onEdit={() => onEdit(roadMaintenanceActivity)}
            onDelete={() => onDelete(roadMaintenanceActivity.id)}
            item={roadMaintenanceActivity}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  );
};

export default RoadMaintenanceActivityCard;
