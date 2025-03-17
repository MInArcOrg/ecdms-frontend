"use client"

import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from "@mui/material"
import type React from "react"
import { useTranslation } from "react-i18next"
import type { BridgeStructureInformation } from "src/types/project/other"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"

interface BridgeStructureInformationCardProps {
  bridgeStructureInformation: BridgeStructureInformation
  refetch: () => void
  onEdit: (bridgeStructureInformation: BridgeStructureInformation) => void
  onDelete: (id: string) => void
  onDetail: (bridgeStructureInformation: BridgeStructureInformation) => void
}

const BridgeStructureInformationCard: React.FC<BridgeStructureInformationCardProps> = ({
  bridgeStructureInformation,
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
              onClick={() => onDetail(bridgeStructureInformation)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {bridgeStructureInformation?.id.slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.bridge-structure-information.details.name")}: {bridgeStructureInformation?.name || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.bridge-structure-information.details.bridge-name")}:{" "}
            {bridgeStructureInformation?.bridge_name || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.bridge-structure-information.details.bridge-structure-type-id")}:{" "}
            {bridgeStructureInformation?.bridge_structure_type_id || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.bridge-structure-information.details.east-region")}:{" "}
            {bridgeStructureInformation?.east_region || "N/A"}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <ModelAction
          model="BridgeStructureInformation"
          model_id={bridgeStructureInformation.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: "delete",
            subject: "bridgestructureinformation",
          }}
          editPermissionRule={{
            action: "update",
            subject: "bridgestructureinformation",
          }}
          onEdit={() => onEdit(bridgeStructureInformation)}
          onDelete={() => onDelete(bridgeStructureInformation.id)}
          item={bridgeStructureInformation}
          options={[]}
        />
      </CardActions>
    </Card>
  )
}
export default BridgeStructureInformationCard

