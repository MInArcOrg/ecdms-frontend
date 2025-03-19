"use client"

import { Box, Button, Card, CardActions, CardContent, Divider, Typography, Grid } from "@mui/material"
import type React from "react"
import { useTranslation } from "react-i18next"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import type { SolarPanel } from "src/types/project/other"
import FileDrawer from "src/views/components/custom/files-drawer"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"
import { formatCreatedAt } from "src/utils/formatter/date"

interface SolarPanelCardProps {
  solarPanel: SolarPanel
  refetch: () => void
  onEdit: (solarPanel: SolarPanel) => void
  onDelete: (id: string) => void
  onDetail: (solarPanel: SolarPanel) => void
  solarPanelTypeMap: Map<string, string>
}

const SolarPanelCard: React.FC<SolarPanelCardProps> = ({
  solarPanel,
  refetch,
  onEdit,
  onDelete,
  onDetail,
  solarPanelTypeMap,
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
              onClick={() => onDetail(solarPanel)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {solarPanel?.manufacturer
                ? `${solarPanel.manufacturer} - ${solarPanel.model || ""}`
                : solarPanel?.id.slice(0, 8) + "..."}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Grid container spacing={2} mt={1}>
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              {t("project.other.solar-panel.details.solar-panel-type")}:{" "}
              {solarPanelTypeMap.get(solarPanel?.solar_panel_type_id) || "N/A"}
            </Typography>
          </Grid>

          {solarPanel?.solar_panels_number !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.solar-panel.details.solar-panels-number")}: {solarPanel.solar_panels_number}
              </Typography>
            </Grid>
          )}

          {solarPanel?.each_solar_panel_capacity !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.solar-panel.details.each-solar-panel-capacity")}:{" "}
                {solarPanel.each_solar_panel_capacity} {t("common.watts")}
              </Typography>
            </Grid>
          )}

          {solarPanel?.inverter_manufacturer && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.solar-panel.details.inverter-manufacturer")}: {solarPanel.inverter_manufacturer}
              </Typography>
            </Grid>
          )}

          {solarPanel?.inverters_number !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.solar-panel.details.inverters-number")}: {solarPanel.inverters_number}
              </Typography>
            </Grid>
          )}
        </Grid>

        {solarPanel?.other_equipment && (
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              {t("project.other.solar-panel.details.other-equipment")}: {solarPanel.other_equipment}
            </Typography>
          </Box>
        )}

        {solarPanel?.created_at && (
          <Typography variant="body2" color="text.secondary" mt={2}>
            {t("common.table-columns.created-at")}: {formatCreatedAt(solarPanel.created_at)}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between" }}>
        <FileDrawer id={solarPanel.id} type={uploadableProjectFileTypes.other.solarPanel} />

        <Box display="flex">
          <ModelAction
            model="SolarPanel"
            model_id={solarPanel.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: "delete",
              subject: "solarpanel",
            }}
            editPermissionRule={{
              action: "update",
              subject: "solarpanel",
            }}
            onEdit={() => onEdit(solarPanel)}
            onDelete={() => onDelete(solarPanel.id)}
            item={solarPanel}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  )
}

export default SolarPanelCard

