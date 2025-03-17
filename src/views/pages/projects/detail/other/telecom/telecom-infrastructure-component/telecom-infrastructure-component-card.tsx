"use client"

import { Box, Button, Card, CardActions, CardContent, Divider, Typography, Grid } from "@mui/material"
import type React from "react"
import { useTranslation } from "react-i18next"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import type { TelecomInfrastructureComponent } from "src/types/project/other"
import FileDrawer from "src/views/components/custom/files-drawer"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"

interface TelecomInfrastructureComponentCardProps {
  telecomInfrastructureComponent: TelecomInfrastructureComponent
  refetch: () => void
  onEdit: (telecomInfrastructureComponent: TelecomInfrastructureComponent) => void
  onDelete: (id: string) => void
  onDetail: (telecomInfrastructureComponent: TelecomInfrastructureComponent) => void
  mobileNetworkTypeMap: Map<string, string>
}

const TelecomInfrastructureComponentCard: React.FC<TelecomInfrastructureComponentCardProps> = ({
  telecomInfrastructureComponent,
  refetch,
  onEdit,
  onDelete,
  onDetail,
  mobileNetworkTypeMap,
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
              onClick={() => onDetail(telecomInfrastructureComponent)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {mobileNetworkTypeMap.get(telecomInfrastructureComponent?.mobile_network_type_id) ||
                telecomInfrastructureComponent?.id.slice(0, 8) + "..."}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t("project.other.telecom-infrastructure-component.details.cables")}:{" "}
              {telecomInfrastructureComponent?.cables || 0}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t("project.other.telecom-infrastructure-component.details.wires")}:{" "}
              {telecomInfrastructureComponent?.wires || 0}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t("project.other.telecom-infrastructure-component.details.routers")}:{" "}
              {telecomInfrastructureComponent?.routers || 0}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t("project.other.telecom-infrastructure-component.details.switches")}:{" "}
              {telecomInfrastructureComponent?.switches || 0}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t("project.other.telecom-infrastructure-component.details.antennas")}:{" "}
              {telecomInfrastructureComponent?.antennas || 0}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t("project.other.telecom-infrastructure-component.details.towers")}:{" "}
              {telecomInfrastructureComponent?.towers || 0}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between" }}>
        <FileDrawer
          id={telecomInfrastructureComponent.id}
          type={uploadableProjectFileTypes.other.telecomInfrastructureComponent}
        />

        <Box display="flex">
          <ModelAction
            model="TelecomInfrastructureComponent"
            model_id={telecomInfrastructureComponent.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: "delete",
              subject: "telecominfrastructurecomponent",
            }}
            editPermissionRule={{
              action: "update",
              subject: "telecominfrastructurecomponent",
            }}
            onEdit={() => onEdit(telecomInfrastructureComponent)}
            onDelete={() => onDelete(telecomInfrastructureComponent.id)}
            item={telecomInfrastructureComponent}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  )
}

export default TelecomInfrastructureComponentCard

