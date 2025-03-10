"use client"

import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from "@mui/material"
import type React from "react"
import { useTranslation } from "react-i18next"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import type { BridgeBasicData } from "src/types/project/other"
import { formatCreatedAt } from "src/utils/formatter/date"
import FileDrawer from "src/views/components/custom/files-drawer"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"

interface BridgeBasicDataCardProps {
  bridgeBasicData: BridgeBasicData
  refetch: () => void
  onEdit: (bridgeBasicData: BridgeBasicData) => void
  onDelete: (id: string) => void
  onDetail: (bridgeBasicData: BridgeBasicData) => void
}

const BridgeBasicDataCard: React.FC<BridgeBasicDataCardProps> = ({
  bridgeBasicData,
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
            <Button
              onClick={() => onDetail(bridgeBasicData)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {bridgeBasicData?.id.slice(0, 5)}...
            </Button>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.bridge-basic-data.details.name")}: {bridgeBasicData?.name || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.bridge-basic-data.details.bridge-name")}: {bridgeBasicData?.bridge_name || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.bridge-basic-data.details.bridge-number")}: {bridgeBasicData?.bridge_number || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.bridge-basic-data.details.bridge-length")}:{" "}
            {bridgeBasicData?.bridge_length?.toString() || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.bridge-basic-data.details.bridge-width")}:{" "}
            {bridgeBasicData?.bridge_width?.toString() || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.bridge-basic-data.details.construction-year")}:{" "}
            {bridgeBasicData?.construction_year?.toString() || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("common.table-columns.created-at")}:{" "}
            {bridgeBasicData?.created_at ? formatCreatedAt(bridgeBasicData.created_at) : "N/A"}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <FileDrawer id={bridgeBasicData.id} type={uploadableProjectFileTypes.other.bridgeBasicData} />
        <ModelAction
          model="BridgeBasicData"
          model_id={bridgeBasicData.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          onEdit={() => onEdit(bridgeBasicData)}
          onDelete={() => onDelete(bridgeBasicData.id)}
          item={bridgeBasicData}
          options={[]}
        />
      </CardActions>
    </Card>
  )
}

export default BridgeBasicDataCard

