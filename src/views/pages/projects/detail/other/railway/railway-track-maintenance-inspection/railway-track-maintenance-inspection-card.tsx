"use client";

import { Grid, Typography } from "@mui/material";
import type { RailwayTrackMaintenanceAndInspection } from "src/types/project/other";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelActionComponent from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";
import SharedItemViewCard from "src/views/shared/listing/shared-item-view-card";

const RailwayTrackMaintenanceAndInspectionCard = ({
  railwayTrackMaintenanceAndInspection,
  onEdit,
  onDelete,
  refetch,
  t,
  onDetail,
}: {
  onDetail: (
    railwayTrackMaintenanceAndInspection: RailwayTrackMaintenanceAndInspection,
  ) => void;
  railwayTrackMaintenanceAndInspection: RailwayTrackMaintenanceAndInspection;
  onEdit: (
    railwayTrackMaintenanceAndInspection: RailwayTrackMaintenanceAndInspection,
  ) => void;
  onDelete: (id: string) => void;
  refetch: () => void;
  t: any;
}) => {
  return (
    <SharedItemViewCard
      createdAt={railwayTrackMaintenanceAndInspection.created_at}
      t={t}
      actions={
        <>
          <FileDrawer
            id={railwayTrackMaintenanceAndInspection.id}
            type="RAILWAY_TRACK_MAINTENANCE_AND_INSPECTION"
          />
          <ModelActionComponent
            model="RailwayTrackMaintenanceAndInspection"
            model_id={railwayTrackMaintenanceAndInspection.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            onEdit={() => onEdit(railwayTrackMaintenanceAndInspection)}
            onDelete={() => onDelete(railwayTrackMaintenanceAndInspection.id)}
            item={railwayTrackMaintenanceAndInspection}
            deletePermissionRule={{
              action: "delete",
              subject: "railwaytrackmaintenanceandinspection",
            }}
            editPermissionRule={{
              action: "update",
              subject: "railwaytrackmaintenanceandinspection",
            }}
            options={[]}
          />
        </>
      }
    >
      <Typography variant="h5" component="div">
        {railwayTrackMaintenanceAndInspection?.project_id ||
          railwayTrackMaintenanceAndInspection?.id?.slice(0, 8) + "..."}
      </Typography>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.railway-track-maintenance-and-inspection.details.project-id",
            )}
            :{" "}
            {railwayTrackMaintenanceAndInspection?.project_id ??
              t("common.not-available")}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.railway-track-maintenance-and-inspection.details.scheduled-maintenance-activity-id",
            )}
            :{" "}
            {railwayTrackMaintenanceAndInspection?.scheduled_maintenance_activity_id ??
              t("common.not-available")}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.railway-track-maintenance-and-inspection.details.maintenance-method",
            )}
            :{" "}
            {railwayTrackMaintenanceAndInspection?.maintenance_method ??
              t("common.not-available")}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.railway-track-maintenance-and-inspection.details.track-maintenance-frequency-id",
            )}
            :{" "}
            {railwayTrackMaintenanceAndInspection?.track_maintenance_frequency_id ??
              t("common.not-available")}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.railway-track-maintenance-and-inspection.details.recent-maintenance-date",
            )}
            :{" "}
            {railwayTrackMaintenanceAndInspection?.recent_maintenance_date ??
              t("common.not-available")}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.railway-track-maintenance-and-inspection.details.inspection-reports-and-findings",
            )}
            :{" "}
            {railwayTrackMaintenanceAndInspection?.inspection_reports_and_findings ??
              t("common.not-available")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.railway-track-maintenance-and-inspection.details.remark",
            )}
            :{" "}
            {railwayTrackMaintenanceAndInspection?.remark ??
              t("common.not-available")}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            {t("common.created-at")}:{" "}
            {railwayTrackMaintenanceAndInspection?.created_at ??
              t("common.not-available")}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            {t("common.updated-at")}:{" "}
            {railwayTrackMaintenanceAndInspection?.updated_at ??
              t("common.not-available")}
          </Typography>
        </Grid>
      </Grid>
    </SharedItemViewCard>
  );
};

export default RailwayTrackMaintenanceAndInspectionCard;
