"use client"

import { Box, Button, Card, CardActions, CardContent, Divider, Typography, Grid } from "@mui/material"
import type React from "react"
import { useTranslation } from "react-i18next"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import type { MiniGridStationDistributionLine } from "src/types/project/other"
import FileDrawer from "src/views/components/custom/files-drawer"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"
import { formatCreatedAt } from "src/utils/formatter/date"

interface MiniGridStationDistributionLineCardProps {
  miniGridStationDistributionLine: MiniGridStationDistributionLine
  refetch: () => void
  onEdit: (miniGridStationDistributionLine: MiniGridStationDistributionLine) => void
  onDelete: (id: string) => void
  onDetail: (miniGridStationDistributionLine: MiniGridStationDistributionLine) => void
}

const MiniGridStationDistributionLineCard: React.FC<MiniGridStationDistributionLineCardProps> = ({
  miniGridStationDistributionLine,
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
              onClick={() => onDetail(miniGridStationDistributionLine)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {miniGridStationDistributionLine?.name || miniGridStationDistributionLine?.id.slice(0, 8) + "..."}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Typography variant="subtitle1" mt={2} fontWeight="bold">
          {t("project.other.mini-grid-station-distribution-line.line-specifications")}
        </Typography>

        <Grid container spacing={2} mt={1}>
          {miniGridStationDistributionLine?.system_type && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.mini-grid-station-distribution-line.details.system-type")}:{" "}
                {miniGridStationDistributionLine.system_type}
              </Typography>
            </Grid>
          )}

          {miniGridStationDistributionLine?.lines_type && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.mini-grid-station-distribution-line.details.lines-type")}:{" "}
                {miniGridStationDistributionLine.lines_type}
              </Typography>
            </Grid>
          )}

          {miniGridStationDistributionLine?.line_length !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.mini-grid-station-distribution-line.details.line-length")}:{" "}
                {miniGridStationDistributionLine.line_length} {t("common.km")}
              </Typography>
            </Grid>
          )}

          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t("project.other.mini-grid-station-distribution-line.details.poles")}:{" "}
              {miniGridStationDistributionLine.poles}
            </Typography>
          </Grid>
        </Grid>

        <Typography variant="subtitle1" mt={2} fontWeight="bold">
          {t("project.other.mini-grid-station-distribution-line.transformer-information")}
        </Typography>

        <Grid container spacing={2} mt={1}>
          {miniGridStationDistributionLine?.transformers_number !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.mini-grid-station-distribution-line.details.transformers-number")}:{" "}
                {miniGridStationDistributionLine.transformers_number}
              </Typography>
            </Grid>
          )}

          {miniGridStationDistributionLine?.transformers_size !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.mini-grid-station-distribution-line.details.transformers-size")}:{" "}
                {miniGridStationDistributionLine.transformers_size} {t("common.kva")}
              </Typography>
            </Grid>
          )}
        </Grid>

        {miniGridStationDistributionLine?.remark && (
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              {t("project.other.mini-grid-station-distribution-line.details.remark")}:{" "}
              {miniGridStationDistributionLine.remark}
            </Typography>
          </Box>
        )}

        {miniGridStationDistributionLine?.created_at && (
          <Typography variant="body2" color="text.secondary" mt={2}>
            {t("common.table-columns.created-at")}: {formatCreatedAt(miniGridStationDistributionLine.created_at)}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between" }}>
        <FileDrawer id={miniGridStationDistributionLine.id} type={uploadableProjectFileTypes.other.mini_grid_station_distribution_line} />

        <Box display="flex">
          <ModelAction
            model="MiniGridStationDistributionLine"
            model_id={miniGridStationDistributionLine.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: "delete",
              subject: "minigridstationdistributionline",
            }}
            editPermissionRule={{
              action: "update",
              subject: "minigridstationdistributionline",
            }}
            onEdit={() => onEdit(miniGridStationDistributionLine)}
            onDelete={() => onDelete(miniGridStationDistributionLine.id)}
            item={miniGridStationDistributionLine}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  )
}

export default MiniGridStationDistributionLineCard