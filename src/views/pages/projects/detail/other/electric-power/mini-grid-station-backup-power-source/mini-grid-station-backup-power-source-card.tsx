"use client"

import { Box, Button, Card, CardActions, CardContent, Divider, Typography, Grid } from "@mui/material"
import type React from "react"
import { useTranslation } from "react-i18next"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import type { MiniGridStationBackupPowerSource } from "src/types/project/other"
import FileDrawer from "src/views/components/custom/files-drawer"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"
import { formatCreatedAt, formatDate } from "src/utils/formatter/date"

interface MiniGridStationBackupPowerSourceCardProps {
  miniGridStationBackupPowerSource: MiniGridStationBackupPowerSource
  refetch: () => void
  onEdit: (miniGridStationBackupPowerSource: MiniGridStationBackupPowerSource) => void
  onDelete: (id: string) => void
  onDetail: (miniGridStationBackupPowerSource: MiniGridStationBackupPowerSource) => void
}

const MiniGridStationBackupPowerSourceCard: React.FC<MiniGridStationBackupPowerSourceCardProps> = ({
  miniGridStationBackupPowerSource,
  refetch,
  onEdit,
  onDelete,
  onDetail,
}) => {
  const { t } = useTranslation()

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(miniGridStationBackupPowerSource)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {miniGridStationBackupPowerSource?.name || miniGridStationBackupPowerSource?.id.slice(0, 8) + "..."}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Typography variant="subtitle1" mt={2} fontWeight="bold">
          {t("project.other.mini-grid-station-backup-power-source.technical-specifications")}
        </Typography>

        <Grid container spacing={2} mt={1}>
          {miniGridStationBackupPowerSource?.capacity !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.mini-grid-station-backup-power-source.details.capacity")}:{" "}
                {miniGridStationBackupPowerSource.capacity} {t("common.kw")}
              </Typography>
            </Grid>
          )}

          {miniGridStationBackupPowerSource?.distribution_lines_total_length !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.mini-grid-station-backup-power-source.details.distribution-lines-total-length")}:{" "}
                {miniGridStationBackupPowerSource.distribution_lines_total_length} {t("common.km")}
              </Typography>
            </Grid>
          )}
        </Grid>

        <Typography variant="subtitle1" mt={2} fontWeight="bold">
          {t("project.other.mini-grid-station-backup-power-source.timeline-information")}
        </Typography>

        <Grid container spacing={2} mt={1}>
          {miniGridStationBackupPowerSource?.installation_year !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.mini-grid-station-backup-power-source.details.installation-year")}:{" "}
                {miniGridStationBackupPowerSource.installation_year}
              </Typography>
            </Grid>
          )}

          {miniGridStationBackupPowerSource?.lifetime !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.mini-grid-station-backup-power-source.details.lifetime")}:{" "}
                {miniGridStationBackupPowerSource.lifetime} {t("common.years")}
              </Typography>
            </Grid>
          )}

          {miniGridStationBackupPowerSource?.commissioning_date && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.mini-grid-station-backup-power-source.details.commissioning-date")}:{" "}
                {formatDate(miniGridStationBackupPowerSource.commissioning_date)}
              </Typography>
            </Grid>
          )}
        </Grid>

        {miniGridStationBackupPowerSource?.other && (
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              {t("project.other.mini-grid-station-backup-power-source.details.other")}:{" "}
              {miniGridStationBackupPowerSource.other}
            </Typography>
          </Box>
        )}

        {miniGridStationBackupPowerSource?.remark && (
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              {t("project.other.mini-grid-station-backup-power-source.details.remark")}:{" "}
              {miniGridStationBackupPowerSource.remark}
            </Typography>
          </Box>
        )}

        {miniGridStationBackupPowerSource?.created_at && (
          <Typography variant="body2" color="text.secondary" mt={2}>
            {t("common.table-columns.created-at")}: {formatCreatedAt(miniGridStationBackupPowerSource.created_at)}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between" }}>
        <FileDrawer id={miniGridStationBackupPowerSource.id} type={uploadableProjectFileTypes.other.mini_grid_station_backup_power_source} />

        <Box display="flex">
          <ModelAction
            model="MiniGridStationBackupPowerSource"
            model_id={miniGridStationBackupPowerSource.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: "delete",
              subject: "minigridstationbackuppowersource",
            }}
            editPermissionRule={{
              action: "update",
              subject: "minigridstationbackuppowersource",
            }}
            onEdit={() => onEdit(miniGridStationBackupPowerSource)}
            onDelete={() => onDelete(miniGridStationBackupPowerSource.id)}
            item={miniGridStationBackupPowerSource}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  )
}

export default MiniGridStationBackupPowerSourceCard