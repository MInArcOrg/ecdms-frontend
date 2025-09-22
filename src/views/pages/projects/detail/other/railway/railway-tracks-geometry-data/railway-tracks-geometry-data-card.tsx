"use client";

import { Typography, Grid } from "@mui/material";
import type { RailwayTracksGeometryData } from "src/types/project/other";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelActionComponent from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";
import SharedItemViewCard from "src/views/shared/listing/shared-item-view-card";

const RailwayTracksGeometryDataCard = ({
  railwayTracksGeometryData,
  onEdit,
  onDelete,
  refetch,
  t,
}: {
  onDetail: (railwayTracksGeometryData: RailwayTracksGeometryData) => void;
  railwayTracksGeometryData: RailwayTracksGeometryData;
  onEdit: (railwayTracksGeometryData: RailwayTracksGeometryData) => void;
  onDelete: (id: string) => void;
  refetch: () => void;
  t: any;
}) => {
  return (
    <SharedItemViewCard
      createdAt={railwayTracksGeometryData.created_at}
      t={t}
      actions={
        <>
          <FileDrawer
            id={railwayTracksGeometryData.id}
            type="RAILWAY_TRACKS_GEOMETRY_DATA"
          />
          <ModelActionComponent
            model="RailwayTracksGeometryData"
            model_id={railwayTracksGeometryData.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            onEdit={() => onEdit(railwayTracksGeometryData)}
            onDelete={() => onDelete(railwayTracksGeometryData.id)}
            item={railwayTracksGeometryData}
            deletePermissionRule={{
              action: "delete",
              subject: "railwaytracksgeometryrailwayTracksGeometryData",
            }}
            editPermissionRule={{
              action: "update",
              subject: "railwaytracksgeometryrailwayTracksGeometryData",
            }}
            options={[]}
          />
        </>
      }
    >
      <Typography variant="h5" component="div">
        {railwayTracksGeometryData?.alignment ||
          railwayTracksGeometryData?.id?.slice(0, 8) + "..."}
      </Typography>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            {t("project.railway.geometry.alignment")}:{" "}
            {railwayTracksGeometryData?.alignment ?? t("common.not-available")}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            {t("project.railway.geometry.gradient")}:{" "}
            {railwayTracksGeometryData?.gradient ?? t("common.not-available")}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            {t("project.railway.geometry.curvature-radius")}:{" "}
            {railwayTracksGeometryData?.curvature_radius ??
              t("common.not-available")}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            {t("project.railway.geometry.cant")}:{" "}
            {railwayTracksGeometryData?.cant ?? t("common.not-available")}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            {t("project.railway.geometry.track-gauge")}:{" "}
            {railwayTracksGeometryData?.track_gauge ??
              t("common.not-available")}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            {t("project.railway.geometry.cross-level")}:{" "}
            {railwayTracksGeometryData?.cross_level ??
              t("common.not-available")}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            {t("project.railway.geometry.track-surface-profile")}:{" "}
            {railwayTracksGeometryData?.track_surface_profile ??
              t("common.not-available")}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            {t("project.railway.geometry.twist")}:{" "}
            {railwayTracksGeometryData?.twist ?? t("common.not-available")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" color="text.secondary">
            {t("project.railway.geometry.remark")}:{" "}
            {railwayTracksGeometryData?.remark ?? t("common.not-available")}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            {t("common.created-at")}:{" "}
            {railwayTracksGeometryData?.created_at ?? t("common.not-available")}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            {t("common.updated-at")}:{" "}
            {railwayTracksGeometryData?.updated_at ?? t("common.not-available")}
          </Typography>
        </Grid>
      </Grid>
    </SharedItemViewCard>
  );
};

export default RailwayTracksGeometryDataCard;
