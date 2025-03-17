"use client"

import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from "@mui/material"
import type React from "react"
import { useTranslation } from "react-i18next"
import type { BridgeBasicData } from "src/types/project/other"
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
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(bridgeBasicData)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {bridgeBasicData?.id.slice(0, 5)}...
            </Typography>
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
            {t('project.other.bridge-basic-data.details.bridge-length')}: {bridgeBasicData?.bridge_length || 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <ModelAction
          model="BridgeBasicData"
          model_id={bridgeBasicData.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: "delete",
            subject: "bridgebasicdata",
          }}
          editPermissionRule={{
            action: "update",
            subject: "bridgebasicdata",
          }}
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

