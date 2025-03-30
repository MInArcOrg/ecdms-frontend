"use client"

import { Box, Button, Card, CardActions, CardContent, Divider, Typography, Grid } from "@mui/material"
import type React from "react"
import { useTranslation } from "react-i18next"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import type { SubstationTransformerAndSwitchgearData } from "src/types/project/other"
import FileDrawer from "src/views/components/custom/files-drawer"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"
import { formatCreatedAt } from "src/utils/formatter/date"

interface SubstationTransformerAndSwitchgearDataCardProps {
  substationTransformerAndSwitchgearData: SubstationTransformerAndSwitchgearData
  refetch: () => void
  onEdit: (substationTransformerAndSwitchgearData: SubstationTransformerAndSwitchgearData) => void
  onDelete: (id: string) => void
  onDetail: (substationTransformerAndSwitchgearData: SubstationTransformerAndSwitchgearData) => void
}

const SubstationTransformerAndSwitchgearDataCard: React.FC<SubstationTransformerAndSwitchgearDataCardProps> = ({
  substationTransformerAndSwitchgearData,
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
              onClick={() => onDetail(substationTransformerAndSwitchgearData)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {substationTransformerAndSwitchgearData?.name || substationTransformerAndSwitchgearData?.id.slice(0, 8) + "..."}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Typography variant="subtitle1" mt={2} fontWeight="bold">
          {t("project.other.substation-transformer-and-switchgear-data.transformer-information")}
        </Typography>

        <Grid container spacing={2} mt={1}>
          {substationTransformerAndSwitchgearData?.transformer_type && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.substation-transformer-and-switchgear-data.details.transformer-type")}:{" "}
                {substationTransformerAndSwitchgearData.transformer_type}
              </Typography>
            </Grid>
          )}

          {substationTransformerAndSwitchgearData?.transformers_number !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.substation-transformer-and-switchgear-data.details.transformers-number")}:{" "}
                {substationTransformerAndSwitchgearData.transformers_number}
              </Typography>
            </Grid>
          )}

          {substationTransformerAndSwitchgearData?.transformer_capacity !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.substation-transformer-and-switchgear-data.details.transformer-capacity")}:{" "}
                {substationTransformerAndSwitchgearData.transformer_capacity} {t("common.mva")}
              </Typography>
            </Grid>
          )}

          {substationTransformerAndSwitchgearData?.input_voltage_level !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.substation-transformer-and-switchgear-data.details.input-voltage-level")}:{" "}
                {substationTransformerAndSwitchgearData.input_voltage_level} {t("common.kv")}
              </Typography>
            </Grid>
          )}

          {substationTransformerAndSwitchgearData?.output_voltage_level !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.substation-transformer-and-switchgear-data.details.output-voltage-level")}:{" "}
                {substationTransformerAndSwitchgearData.output_voltage_level} {t("common.kv")}
              </Typography>
            </Grid>
          )}
        </Grid>

        <Typography variant="subtitle1" mt={2} fontWeight="bold">
          {t("project.other.substation-transformer-and-switchgear-data.switchgear-information")}
        </Typography>

        <Grid container spacing={2} mt={1}>
          {substationTransformerAndSwitchgearData?.other_equipment && (
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.substation-transformer-and-switchgear-data.details.other-equipment")}:{" "}
                {substationTransformerAndSwitchgearData.other_equipment}
              </Typography>
            </Grid>
          )}
        </Grid>

        {substationTransformerAndSwitchgearData?.remark && (
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              {t("project.other.substation-transformer-and-switchgear-data.details.remark")}:{" "}
              {substationTransformerAndSwitchgearData.remark}
            </Typography>
          </Box>
        )}

        {substationTransformerAndSwitchgearData?.created_at && (
          <Typography variant="body2" color="text.secondary" mt={2}>
            {t("common.table-columns.created-at")}: {formatCreatedAt(substationTransformerAndSwitchgearData.created_at)}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between" }}>
        <FileDrawer id={substationTransformerAndSwitchgearData.id} type={uploadableProjectFileTypes.other.SUBSTATION_TRANSFORMER_AND_SWITCH_GEAR_DATA} />

        <Box display="flex">
          <ModelAction
            model="SubstationTransformerAndSwitchgearData"
            model_id={substationTransformerAndSwitchgearData.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: "delete",
              subject: "substationtransformerandswitchgeardata",
            }}
            editPermissionRule={{
              action: "update",
              subject: "substationtransformerandswitchgeardata",
            }}
            onEdit={() => onEdit(substationTransformerAndSwitchgearData)}
            onDelete={() => onDelete(substationTransformerAndSwitchgearData.id)}
            item={substationTransformerAndSwitchgearData}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  )
}

export default SubstationTransformerAndSwitchgearDataCard