"use client"

import { Box, Button, Card, CardActions, CardContent, Divider, Typography, Grid } from "@mui/material"
import type React from "react"
import { useTranslation } from "react-i18next"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import type { GeothermalPowerWell } from "src/types/project/other"
import FileDrawer from "src/views/components/custom/files-drawer"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"
import { formatCreatedAt, formatDate } from "src/utils/formatter/date"

interface GeothermalPowerWellCardProps {
  geothermalPowerWell: GeothermalPowerWell
  refetch: () => void
  onEdit: (geothermalPowerWell: GeothermalPowerWell) => void
  onDelete: (id: string) => void
  onDetail: (geothermalPowerWell: GeothermalPowerWell) => void
}

const GeothermalPowerWellCard: React.FC<GeothermalPowerWellCardProps> = ({
  geothermalPowerWell,
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
              onClick={() => onDetail(geothermalPowerWell)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {geothermalPowerWell?.wells_name || geothermalPowerWell?.id.slice(0, 8) + "..."}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Grid container spacing={2} mt={1}>
          {geothermalPowerWell?.wells_number !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.geothermal-power-well.details.wells-number")}: {geothermalPowerWell.wells_number}
              </Typography>
            </Grid>
          )}

          {geothermalPowerWell?.depth !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.geothermal-power-well.details.depth")}: {geothermalPowerWell.depth}{" "}
                {t("common.meters")}
              </Typography>
            </Grid>
          )}

          {geothermalPowerWell?.well_diameter !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.geothermal-power-well.details.well-diameter")}: {geothermalPowerWell.well_diameter}{" "}
                {t("common.inches")}
              </Typography>
            </Grid>
          )}

          {geothermalPowerWell?.temperature_at_bottom_hole !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.geothermal-power-well.details.temperature-at-bottom-hole")}:{" "}
                {geothermalPowerWell.temperature_at_bottom_hole} °C
              </Typography>
            </Grid>
          )}

          {geothermalPowerWell?.drilling_period && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.geothermal-power-well.details.drilling-period")}:{" "}
                {formatDate(geothermalPowerWell.drilling_period)}
              </Typography>
            </Grid>
          )}

          {geothermalPowerWell?.plant_life !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.geothermal-power-well.details.plant-life")}: {geothermalPowerWell.plant_life}{" "}
                {t("common.years")}
              </Typography>
            </Grid>
          )}
        </Grid>

        {geothermalPowerWell?.remark && (
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              {t("project.other.geothermal-power-well.details.remark")}: {geothermalPowerWell.remark}
            </Typography>
          </Box>
        )}

        {geothermalPowerWell?.created_at && (
          <Typography variant="body2" color="text.secondary" mt={2}>
            {t("common.table-columns.created-at")}: {formatCreatedAt(geothermalPowerWell.created_at)}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between" }}>
        <FileDrawer id={geothermalPowerWell.id} type={uploadableProjectFileTypes.other.geothermalPowerWell} />

        <Box display="flex">
          <ModelAction
            model="GeothermalPowerWell"
            model_id={geothermalPowerWell.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: "delete",
              subject: "geothermalpowerwell",
            }}
            editPermissionRule={{
              action: "update",
              subject: "geothermalpowerwell",
            }}
            onEdit={() => onEdit(geothermalPowerWell)}
            onDelete={() => onDelete(geothermalPowerWell.id)}
            item={geothermalPowerWell}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  )
}

export default GeothermalPowerWellCard

