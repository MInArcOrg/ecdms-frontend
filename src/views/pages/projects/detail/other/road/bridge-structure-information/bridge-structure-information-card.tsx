"use client"

import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from "@mui/material"
import type React from "react"
import { useTranslation } from "react-i18next"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import type { BridgeStructureInformation } from "src/types/project/other"
import { formatCreatedAt } from "src/utils/formatter/date"
import FileDrawer from "src/views/components/custom/files-drawer"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"
import { useQuery } from "@tanstack/react-query"
import bridgeStructureTypeMasterService from "src/services/general/project/bridge-structure-type-master-service"

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

  // Fetch bridge structure type data
  const { data: bridgeStructureTypeData } = useQuery({
    queryKey: ["bridgeStructureType", bridgeStructureInformation?.bridge_structure_type_id],
    queryFn: () =>
      bridgeStructureTypeMasterService.getOne(bridgeStructureInformation?.bridge_structure_type_id || "", {}),
    enabled: !!bridgeStructureInformation?.bridge_structure_type_id,
  })

  const bridgeStructureTypeName = bridgeStructureTypeData?.payload?.title || "N/A"

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Button
              onClick={() => onDetail(bridgeStructureInformation)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {bridgeStructureInformation?.id.slice(0, 5)}...
            </Button>
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
            {bridgeStructureTypeName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.bridge-structure-information.details.east-region")}:{" "}
            {bridgeStructureInformation?.east_region?.toString() || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.bridge-structure-information.details.west-region")}:{" "}
            {bridgeStructureInformation?.west_region?.toString() || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("common.table-columns.created-at")}:{" "}
            {bridgeStructureInformation?.created_at ? formatCreatedAt(bridgeStructureInformation.created_at) : "N/A"}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <FileDrawer
          id={bridgeStructureInformation.id}
          type={uploadableProjectFileTypes.other.bridgeStructureInformation}
        />
        <ModelAction
          model="BridgeStructureInformation"
          model_id={bridgeStructureInformation.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
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
