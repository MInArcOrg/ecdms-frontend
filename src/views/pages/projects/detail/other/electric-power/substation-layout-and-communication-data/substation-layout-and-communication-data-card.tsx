"use client"

import { Box, Button, Card, CardActions, CardContent, Divider, Typography, Grid } from "@mui/material"
import type React from "react"
import { useTranslation } from "react-i18next"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import type { SubstationLayoutAndCommunicationData } from "src/types/project/other"
import FileDrawer from "src/views/components/custom/files-drawer"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"
import { formatCreatedAt } from "src/utils/formatter/date"

interface SubstationLayoutAndCommunicationDataCardProps {
  substationLayoutAndCommunicationData: SubstationLayoutAndCommunicationData
  refetch: () => void
  onEdit: (substationLayoutAndCommunicationData: SubstationLayoutAndCommunicationData) => void
  onDelete: (id: string) => void
  onDetail: (substationLayoutAndCommunicationData: SubstationLayoutAndCommunicationData) => void
}

const SubstationLayoutAndCommunicationDataCard: React.FC<SubstationLayoutAndCommunicationDataCardProps> = ({
  substationLayoutAndCommunicationData,
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
              onClick={() => onDetail(substationLayoutAndCommunicationData)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {substationLayoutAndCommunicationData?.name || substationLayoutAndCommunicationData?.id.slice(0, 8) + "..."}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Typography variant="subtitle1" mt={2} fontWeight="bold">
          {t("project.other.substation-layout-and-communication-data.layout-information")}
        </Typography>

        <Grid container spacing={2} mt={1}>
          {substationLayoutAndCommunicationData?.substation_layout && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.substation-layout-and-communication-data.details.substation-layout")}:{" "}
                {substationLayoutAndCommunicationData.substation_layout}
              </Typography>
            </Grid>
          )}

          {substationLayoutAndCommunicationData?.equipped_with_standby_diesel_generator && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.substation-layout-and-communication-data.details.equipped-with-standby-diesel-generator")}:{" "}
                {substationLayoutAndCommunicationData.equipped_with_standby_diesel_generator}
              </Typography>
            </Grid>
          )}

          {substationLayoutAndCommunicationData?.substation_busbar_type && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.substation-layout-and-communication-data.details.substation-busbar-type")}:{" "}
                {substationLayoutAndCommunicationData.substation_busbar_type}
              </Typography>
            </Grid>
          )}
        </Grid>

        <Typography variant="subtitle1" mt={2} fontWeight="bold">
          {t("project.other.substation-layout-and-communication-data.communication-information")}
        </Typography>

        <Grid container spacing={2} mt={1}>
          {substationLayoutAndCommunicationData?.scada_system !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.substation-layout-and-communication-data.details.scada-system")}:{" "}
                {substationLayoutAndCommunicationData.scada_system ? t("common.yes") : t("common.no")}
              </Typography>
            </Grid>
          )}

          {substationLayoutAndCommunicationData?.substation_altitude_level !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.substation-layout-and-communication-data.details.substation-altitude-level")}:{" "}
                {substationLayoutAndCommunicationData.substation_altitude_level} {t("common.meters")}
              </Typography>
            </Grid>
          )}
        </Grid>

        {substationLayoutAndCommunicationData?.remark && (
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              {t("project.other.substation-layout-and-communication-data.details.remark")}:{" "}
              {substationLayoutAndCommunicationData.remark}
            </Typography>
          </Box>
        )}

        {substationLayoutAndCommunicationData?.created_at && (
          <Typography variant="body2" color="text.secondary" mt={2}>
            {t("common.table-columns.created-at")}: {formatCreatedAt(substationLayoutAndCommunicationData.created_at)}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between" }}>
        <FileDrawer id={substationLayoutAndCommunicationData.id} type={uploadableProjectFileTypes.other.substation_layout_and_communication_data} />

        <Box display="flex">
          <ModelAction
            model="SubstationLayoutAndCommunicationData"
            model_id={substationLayoutAndCommunicationData.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: "delete",
              subject: "substationlayoutandcommunicationdata",
            }}
            editPermissionRule={{
              action: "update",
              subject: "substationlayoutandcommunicationdata",
            }}
            onEdit={() => onEdit(substationLayoutAndCommunicationData)}
            onDelete={() => onDelete(substationLayoutAndCommunicationData.id)}
            item={substationLayoutAndCommunicationData}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  )
}

export default SubstationLayoutAndCommunicationDataCard