"use client"

import { Box, Button, Card, CardActions, CardContent, Divider, Typography, Grid } from "@mui/material"
import type React from "react"
import { useTranslation } from "react-i18next"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import type { TransmissionLineEquipmentData } from "src/types/project/other"
import FileDrawer from "src/views/components/custom/files-drawer"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"
import { formatCreatedAt } from "src/utils/formatter/date"

interface TransmissionLineEquipmentDataCardProps {
  transmissionLineEquipmentData: TransmissionLineEquipmentData
  refetch: () => void
  onEdit: (transmissionLineEquipmentData: TransmissionLineEquipmentData) => void
  onDelete: (id: string) => void
  onDetail: (transmissionLineEquipmentData: TransmissionLineEquipmentData) => void
}

const TransmissionLineEquipmentDataCard: React.FC<TransmissionLineEquipmentDataCardProps> = ({
  transmissionLineEquipmentData,
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
              onClick={() => onDetail(transmissionLineEquipmentData)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {transmissionLineEquipmentData?.name || transmissionLineEquipmentData?.id.slice(0, 8) + "..."}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Grid container spacing={2} mt={1}>
          {transmissionLineEquipmentData?.insulator_type && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.transmission-line-equipment-data.details.insulator-type")}:{" "}
                {transmissionLineEquipmentData.insulator_type}
              </Typography>
            </Grid>
          )}

          {transmissionLineEquipmentData?.ground_wire_type && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.transmission-line-equipment-data.details.ground-wire-type")}:{" "}
                {transmissionLineEquipmentData.ground_wire_type}
              </Typography>
            </Grid>
          )}

          {transmissionLineEquipmentData?.fiber_optics_number !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.transmission-line-equipment-data.details.fiber-optics-number")}:{" "}
                {transmissionLineEquipmentData.fiber_optics_number}
              </Typography>
            </Grid>
          )}

          {transmissionLineEquipmentData?.opgw_uts !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.transmission-line-equipment-data.details.opgw-uts")}:{" "}
                {transmissionLineEquipmentData.opgw_uts}
              </Typography>
            </Grid>
          )}
        </Grid>

        <Typography variant="subtitle1" mt={2} fontWeight="bold">
          {t("project.other.transmission-line-equipment-data.tower-information")}
        </Typography>

        <Grid container spacing={2} mt={1}>
          {transmissionLineEquipmentData?.tower_grounding && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.transmission-line-equipment-data.details.tower-grounding")}:{" "}
                {transmissionLineEquipmentData.tower_grounding}
              </Typography>
            </Grid>
          )}

          {transmissionLineEquipmentData?.tower_circuit_arrangement && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.transmission-line-equipment-data.details.tower-circuit-arrangement")}:{" "}
                {transmissionLineEquipmentData.tower_circuit_arrangement}
              </Typography>
            </Grid>
          )}

          {transmissionLineEquipmentData?.owner_operator && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.transmission-line-equipment-data.details.owner-operator")}:{" "}
                {transmissionLineEquipmentData.owner_operator}
              </Typography>
            </Grid>
          )}
        </Grid>

        {transmissionLineEquipmentData?.other_equipment && (
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              {t("project.other.transmission-line-equipment-data.details.other-equipment")}:{" "}
              {transmissionLineEquipmentData.other_equipment}
            </Typography>
          </Box>
        )}

        {transmissionLineEquipmentData?.remark && (
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              {t("project.other.transmission-line-equipment-data.details.remark")}:{" "}
              {transmissionLineEquipmentData.remark}
            </Typography>
          </Box>
        )}

        {transmissionLineEquipmentData?.created_at && (
          <Typography variant="body2" color="text.secondary" mt={2}>
            {t("common.table-columns.created-at")}: {formatCreatedAt(transmissionLineEquipmentData.created_at)}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between" }}>
        <FileDrawer
          id={transmissionLineEquipmentData.id}
          type={uploadableProjectFileTypes.other.transmissionLineEquipmentData}
        />

        <Box display="flex">
          <ModelAction
            model="TransmissionLineEquipmentData"
            model_id={transmissionLineEquipmentData.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: "delete",
              subject: "transmissionlineequipmentdata",
            }}
            editPermissionRule={{
              action: "update",
              subject: "transmissionlineequipmentdata",
            }}
            onEdit={() => onEdit(transmissionLineEquipmentData)}
            onDelete={() => onDelete(transmissionLineEquipmentData.id)}
            item={transmissionLineEquipmentData}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  )
}

export default TransmissionLineEquipmentDataCard

