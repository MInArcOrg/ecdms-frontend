"use client"

import { Box, Button, Card, CardActions, CardContent, Divider, Typography, Grid } from "@mui/material"
import type React from "react"
import { useTranslation } from "react-i18next"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import type { ElectricGridControlCenterPerformanceAndMaintenance } from "src/types/project/other"
import FileDrawer from "src/views/components/custom/files-drawer"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"
import { formatCreatedAt } from "src/utils/formatter/date"

interface ElectricGridControlCenterPerformanceAndMaintenanceCardProps {
  electricGridControlCenterPerformanceAndMaintenance: ElectricGridControlCenterPerformanceAndMaintenance
  refetch: () => void
  onEdit: (electricGridControlCenterPerformanceAndMaintenance: ElectricGridControlCenterPerformanceAndMaintenance) => void
  onDelete: (id: string) => void
  onDetail: (electricGridControlCenterPerformanceAndMaintenance: ElectricGridControlCenterPerformanceAndMaintenance) => void
  electricGridControlCenterDataMap: Map<string, string>
  maintenanceFrequenciesMap: Map<string, string>
}

const ElectricGridControlCenterPerformanceAndMaintenanceCard: React.FC<ElectricGridControlCenterPerformanceAndMaintenanceCardProps> = ({
  electricGridControlCenterPerformanceAndMaintenance,
  refetch,
  onEdit,
  onDelete,
  onDetail,
  electricGridControlCenterDataMap,
  maintenanceFrequenciesMap
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
              onClick={() => onDetail(electricGridControlCenterPerformanceAndMaintenance)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {electricGridControlCenterPerformanceAndMaintenance?.name || electricGridControlCenterPerformanceAndMaintenance?.id.slice(0, 8) + "..."}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Typography variant="subtitle1" mt={2} fontWeight="bold">
          {t("project.other.electric-grid-control-center-performance-and-maintenance.general-information")}
        </Typography>

        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t("project.other.electric-grid-control-center-performance-and-maintenance.details.electric-grid-control-center-data-id")}:{" "}
              {electricGridControlCenterPerformanceAndMaintenance?.electric_grid_control_center_data_id
                ? electricGridControlCenterDataMap.get(electricGridControlCenterPerformanceAndMaintenance.electric_grid_control_center_data_id) || electricGridControlCenterPerformanceAndMaintenance.electric_grid_control_center_data_id
                : t("common.not-available")}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t("project.other.electric-grid-control-center-performance-and-maintenance.details.maintenance-frequency-id")}:{" "}
              {electricGridControlCenterPerformanceAndMaintenance?.maintenance_frequency_id
                ? maintenanceFrequenciesMap.get(electricGridControlCenterPerformanceAndMaintenance.maintenance_frequency_id) || electricGridControlCenterPerformanceAndMaintenance.maintenance_frequency_id
                : t("common.not-available")}
            </Typography>
          </Grid>
        </Grid>

        <Typography variant="subtitle1" mt={2} fontWeight="bold">
          {t("project.other.electric-grid-control-center-performance-and-maintenance.performance-metrics")}
        </Typography>

        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t("project.other.electric-grid-control-center-performance-and-maintenance.details.total-system-downtime-outage-duration")}:{" "}
              {electricGridControlCenterPerformanceAndMaintenance?.total_system_downtime_outage_duration !== undefined
                ? electricGridControlCenterPerformanceAndMaintenance.total_system_downtime_outage_duration
                : t("common.not-available")}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t("project.other.electric-grid-control-center-performance-and-maintenance.details.total-interruptions-number")}:{" "}
              {electricGridControlCenterPerformanceAndMaintenance?.total_interruptions_number !== undefined
                ? electricGridControlCenterPerformanceAndMaintenance.total_interruptions_number
                : t("common.not-available")}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t("project.other.electric-grid-control-center-performance-and-maintenance.details.saidi")}:{" "}
              {electricGridControlCenterPerformanceAndMaintenance?.saidi || t("common.not-available")}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t("project.other.electric-grid-control-center-performance-and-maintenance.details.saifi")}:{" "}
              {electricGridControlCenterPerformanceAndMaintenance?.saifi || t("common.not-available")}
            </Typography>
          </Grid>
        </Grid>

        {electricGridControlCenterPerformanceAndMaintenance?.created_at && (
          <Typography variant="body2" color="text.secondary" mt={2}>
            {t("common.table-columns.created-at")}: {formatCreatedAt(electricGridControlCenterPerformanceAndMaintenance.created_at)}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between" }}>
        <FileDrawer id={electricGridControlCenterPerformanceAndMaintenance.id} type={uploadableProjectFileTypes.other.electric_grid_control_center_performance_and_maintenance} />

        <Box display="flex">
          <ModelAction
            model="ElectricGridControlCenterPerformanceAndMaintenance"
            model_id={electricGridControlCenterPerformanceAndMaintenance.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: "delete",
              subject: "electricgridcontrolcenterperformanceandmaintenance",
            }}
            editPermissionRule={{
              action: "update",
              subject: "electricgridcontrolcenterperformanceandmaintenance",
            }}
            onEdit={() => onEdit(electricGridControlCenterPerformanceAndMaintenance)}
            onDelete={() => onDelete(electricGridControlCenterPerformanceAndMaintenance.id)}
            item={electricGridControlCenterPerformanceAndMaintenance}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  )
}

export default ElectricGridControlCenterPerformanceAndMaintenanceCard