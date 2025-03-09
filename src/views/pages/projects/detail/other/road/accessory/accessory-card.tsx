"use client"

import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from "@mui/material"
import type React from "react"
import { useTranslation } from "react-i18next"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import type { Accessory } from "src/types/project/other"
import { formatCreatedAt } from "src/utils/formatter/date"
import FileDrawer from "src/views/components/custom/files-drawer"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"

interface AccessoryCardProps {
  accessory: Accessory
  refetch: () => void
  onEdit: (accessory: Accessory) => void
  onDelete: (id: string) => void
  onDetail: (accessory: Accessory) => void
}

const AccessoryCard: React.FC<AccessoryCardProps> = ({ accessory, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation()

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Button
              onClick={() => onDetail(accessory)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {accessory?.id.slice(0, 5)}...
            </Button>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.accessory.details.name")}: {accessory?.name || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.accessory.details.under-passes")}: {accessory?.under_passes?.toString() || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.accessory.details.ramps")}: {accessory?.ramps?.toString() || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.accessory.details.traffic-signals")}: {accessory?.traffic_signals?.toString() || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.accessory.details.repair-stations")}: {accessory?.repair_stations?.toString() || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.accessory.details.bicycle-lanes")}:{" "}
            {accessory?.bicycle_lanes ? t("common.yes") : t("common.no")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.accessory.details.bicycle-signals")}: {accessory?.bicycle_signals?.toString() || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.accessory.details.culvert")}: {accessory?.culvert ? t("common.yes") : t("common.no")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.accessory.details.bridge")}: {accessory?.bridge ? t("common.yes") : t("common.no")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("common.table-columns.created-at")}:{" "}
            {accessory?.created_at ? formatCreatedAt(accessory.created_at) : "N/A"}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <FileDrawer id={accessory.id} type={uploadableProjectFileTypes.other.accessory} />
        <ModelAction
          model="Accessory"
          model_id={accessory.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          onEdit={() => onEdit(accessory)}
          onDelete={() => onDelete(accessory.id)}
          item={accessory}
          options={[]}
        />
      </CardActions>
    </Card>
  )
}

export default AccessoryCard

