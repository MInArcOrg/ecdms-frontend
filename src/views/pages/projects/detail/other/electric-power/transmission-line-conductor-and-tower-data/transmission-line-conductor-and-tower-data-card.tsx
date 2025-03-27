"use client"

import { Box, Button, Card, CardActions, CardContent, Divider, Typography, Grid } from "@mui/material"
import type React from "react"
import { useTranslation } from "react-i18next"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import type { TransmissionLineConductorAndTowerData } from "src/types/project/other"
import FileDrawer from "src/views/components/custom/files-drawer"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"
import { formatCreatedAt } from "src/utils/formatter/date"

interface TransmissionLineConductorAndTowerDataCardProps {
  transmissionLineConductorAndTowerData: TransmissionLineConductorAndTowerData
  refetch: () => void
  onEdit: (transmissionLineConductorAndTowerData: TransmissionLineConductorAndTowerData) => void
  onDelete: (id: string) => void
  onDetail: (transmissionLineConductorAndTowerData: TransmissionLineConductorAndTowerData) => void
}

const TransmissionLineConductorAndTowerDataCard: React.FC<TransmissionLineConductorAndTowerDataCardProps> = ({
  transmissionLineConductorAndTowerData,
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
              onClick={() => onDetail(transmissionLineConductorAndTowerData)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {transmissionLineConductorAndTowerData?.name || transmissionLineConductorAndTowerData?.id.slice(0, 8) + "..."}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Grid container spacing={2} mt={1}>
          {transmissionLineConductorAndTowerData?.conductor_type && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.transmission-line-conductor-and-tower-data.details.conductor-type")}:{" "}
                {transmissionLineConductorAndTowerData.conductor_type}
              </Typography>
            </Grid>
          )}

          {transmissionLineConductorAndTowerData?.strands_number !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.transmission-line-conductor-and-tower-data.details.strands-number")}:{" "}
                {transmissionLineConductorAndTowerData.strands_number}
              </Typography>
            </Grid>
          )}

          {transmissionLineConductorAndTowerData?.conductor_size !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.transmission-line-conductor-and-tower-data.details.conductor-size")}:{" "}
                {transmissionLineConductorAndTowerData.conductor_size} {t("common.mm2")}
              </Typography>
            </Grid>
          )}

          {transmissionLineConductorAndTowerData?.conductors_per_phase_number !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.transmission-line-conductor-and-tower-data.details.conductors-per-phase-number")}:{" "}
                {transmissionLineConductorAndTowerData.conductors_per_phase_number}
              </Typography>
            </Grid>
          )}
        </Grid>

        <Typography variant="subtitle1" mt={2} fontWeight="bold">
          {t("project.other.transmission-line-conductor-and-tower-data.tower-information")}
        </Typography>

        <Grid container spacing={2} mt={1}>
          {transmissionLineConductorAndTowerData?.tower_height !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.transmission-line-conductor-and-tower-data.details.tower-height")}:{" "}
                {transmissionLineConductorAndTowerData.tower_height} {t("common.meters")}
              </Typography>
            </Grid>
          )}

          {transmissionLineConductorAndTowerData?.conductor_diameter !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.transmission-line-conductor-and-tower-data.details.conductor-diameter")}:{" "}
                {transmissionLineConductorAndTowerData.conductor_diameter} {t("common.mm")}
              </Typography>
            </Grid>
          )}

          {transmissionLineConductorAndTowerData?.each_strand_diameter !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.transmission-line-conductor-and-tower-data.details.each-strand-diameter")}:{" "}
                {transmissionLineConductorAndTowerData.each_strand_diameter} {t("common.mm")}
              </Typography>
            </Grid>
          )}
        </Grid>

        {transmissionLineConductorAndTowerData?.other_equipment && (
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              {t("project.other.transmission-line-conductor-and-tower-data.details.other-equipment")}:{" "}
              {transmissionLineConductorAndTowerData.other_equipment}
            </Typography>
          </Box>
        )}

        {transmissionLineConductorAndTowerData?.remark && (
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              {t("project.other.transmission-line-conductor-and-tower-data.details.remark")}:{" "}
              {transmissionLineConductorAndTowerData.remark}
            </Typography>
          </Box>
        )}

        {transmissionLineConductorAndTowerData?.created_at && (
          <Typography variant="body2" color="text.secondary" mt={2}>
            {t("common.table-columns.created-at")}: {formatCreatedAt(transmissionLineConductorAndTowerData.created_at)}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between" }}>
        <FileDrawer id={transmissionLineConductorAndTowerData.id} type={uploadableProjectFileTypes.other.transmissionLineConductorAndTowerData} />

        <Box display="flex">
          <ModelAction
            model="TransmissionLineConductorAndTowerData"
            model_id={transmissionLineConductorAndTowerData.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: "delete",
              subject: "transmissionlineconductorandtowerdata",
            }}
            editPermissionRule={{
              action: "update",
              subject: "transmissionlineconductorandtowerdata",
            }}
            onEdit={() => onEdit(transmissionLineConductorAndTowerData)}
            onDelete={() => onDelete(transmissionLineConductorAndTowerData.id)}
            item={transmissionLineConductorAndTowerData}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  )
}

export default TransmissionLineConductorAndTowerDataCard