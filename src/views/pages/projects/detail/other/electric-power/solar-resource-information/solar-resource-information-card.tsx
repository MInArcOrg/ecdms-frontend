"use client"

import { Box, Button, Card, CardActions, CardContent, Divider, Typography, Grid } from "@mui/material"
import type React from "react"
import { useTranslation } from "react-i18next"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import type { SolarResourceInformation } from "src/types/project/other"
import FileDrawer from "src/views/components/custom/files-drawer"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"
import { formatCreatedAt } from "src/utils/formatter/date"

interface SolarResourceInformationCardProps {
  solarResourceInformation: SolarResourceInformation
  refetch: () => void
  onEdit: (solarResourceInformation: SolarResourceInformation) => void
  onDelete: (id: string) => void
  onDetail: (solarResourceInformation: SolarResourceInformation) => void
}

const SolarResourceInformationCard: React.FC<SolarResourceInformationCardProps> = ({
  solarResourceInformation,
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
              onClick={() => onDetail(solarResourceInformation)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {t("project.other.solar-resource-information.solar-resource-record")} -{" "}
              {solarResourceInformation?.id.slice(0, 8) + "..."}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Grid container spacing={2} mt={1}>
          {solarResourceInformation?.annual_solar_radiation !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.solar-resource-information.details.annual-solar-radiation")}:{" "}
                {solarResourceInformation.annual_solar_radiation} {t("common.kwh-per-m2")}
              </Typography>
            </Grid>
          )}

          {solarResourceInformation?.solar_panel_efficiency !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.solar-resource-information.details.solar-panel-efficiency")}:{" "}
                {solarResourceInformation.solar_panel_efficiency}%
              </Typography>
            </Grid>
          )}

          {solarResourceInformation?.annual_energy_production !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.solar-resource-information.details.annual-energy-production")}:{" "}
                {solarResourceInformation.annual_energy_production} {t("common.mwh")}
              </Typography>
            </Grid>
          )}

          {solarResourceInformation?.plant_life !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.solar-resource-information.details.plant-life")}:{" "}
                {solarResourceInformation.plant_life} {t("common.years")}
              </Typography>
            </Grid>
          )}
        </Grid>

        {solarResourceInformation?.remark && (
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              {t("project.other.solar-resource-information.details.remark")}: {solarResourceInformation.remark}
            </Typography>
          </Box>
        )}

        {solarResourceInformation?.created_at && (
          <Typography variant="body2" color="text.secondary" mt={2}>
            {t("common.table-columns.created-at")}: {formatCreatedAt(solarResourceInformation.created_at)}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between" }}>
        <FileDrawer id={solarResourceInformation.id} type={uploadableProjectFileTypes.other.solarResourceInformation} />

        <Box display="flex">
          <ModelAction
            model="SolarResourceInformation"
            model_id={solarResourceInformation.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: "delete",
              subject: "solarresourceinformation",
            }}
            editPermissionRule={{
              action: "update",
              subject: "solarresourceinformation",
            }}
            onEdit={() => onEdit(solarResourceInformation)}
            onDelete={() => onDelete(solarResourceInformation.id)}
            item={solarResourceInformation}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  )
}

export default SolarResourceInformationCard

