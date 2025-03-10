"use client"

import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from "@mui/material"
import type React from "react"
import { useTranslation } from "react-i18next"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import type { BridgeSuperStructure } from "src/types/project/other"
import { formatCreatedAt } from "src/utils/formatter/date"
import FileDrawer from "src/views/components/custom/files-drawer"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"
import { useQuery } from "@tanstack/react-query"
import bridgeStructureTypeMasterService from "src/services/general/project/bridge-structure-type-master-service"
import spanSupportTypeMasterService from "src/services/general/project/span-support-type-master-service"
import deckSlabTypeMasterService from "src/services/general/project/deck-slab-type-master-service "

interface BridgeSuperStructureCardProps {
  bridgeSuperStructure: BridgeSuperStructure
  refetch: () => void
  onEdit: (bridgeSuperStructure: BridgeSuperStructure) => void
  onDelete: (id: string) => void
  onDetail: (bridgeSuperStructure: BridgeSuperStructure) => void
}

const BridgeSuperStructureCard: React.FC<BridgeSuperStructureCardProps> = ({
  bridgeSuperStructure,
  refetch,
  onEdit,
  onDelete,
  onDetail,
}) => {
  const { t } = useTranslation()

  // Fetch master data
  const { data: bridgeStructureTypeData } = useQuery({
    queryKey: ["bridgeStructureType", bridgeSuperStructure?.bridge_structure_type_id],
    queryFn: () => bridgeStructureTypeMasterService.getOne(bridgeSuperStructure?.bridge_structure_type_id || "", {}),
    enabled: !!bridgeSuperStructure?.bridge_structure_type_id,
  })

  const { data: spanSupportTypeData } = useQuery({
    queryKey: ["spanSupportType", bridgeSuperStructure?.span_support_type_id],
    queryFn: () => spanSupportTypeMasterService.getOne(bridgeSuperStructure?.span_support_type_id || "", {}),
    enabled: !!bridgeSuperStructure?.span_support_type_id,
  })

  const { data: deckSlabTypeData } = useQuery({
    queryKey: ["deckSlabType", bridgeSuperStructure?.deck_slab_type_id],
    queryFn: () => deckSlabTypeMasterService.getOne(bridgeSuperStructure?.deck_slab_type_id || "", {}),
    enabled: !!bridgeSuperStructure?.deck_slab_type_id,
  })

  const bridgeStructureTypeName = bridgeStructureTypeData?.payload?.title || "N/A"
  const spanSupportTypeName = spanSupportTypeData?.payload?.title || "N/A"
  const deckSlabTypeName = deckSlabTypeData?.payload?.title || "N/A"

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Button
              onClick={() => onDetail(bridgeSuperStructure)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {bridgeSuperStructure?.id.slice(0, 5)}...
            </Button>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.bridge-super-structure.details.name")}: {bridgeSuperStructure?.name || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.bridge-super-structure.details.bridge-name")}:{" "}
            {bridgeSuperStructure?.bridge_name || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.bridge-super-structure.details.bridge-structure-type-id")}: {bridgeStructureTypeName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.bridge-super-structure.details.span-support-type-id")}: {spanSupportTypeName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.bridge-super-structure.details.deck-slab-type-id")}: {deckSlabTypeName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.bridge-super-structure.details.span-number")}:{" "}
            {bridgeSuperStructure?.span_number?.toString() || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("common.table-columns.created-at")}:{" "}
            {bridgeSuperStructure?.created_at ? formatCreatedAt(bridgeSuperStructure.created_at) : "N/A"}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <FileDrawer id={bridgeSuperStructure.id} type={uploadableProjectFileTypes.other.bridgeSuperStructure} />
        <ModelAction
          model="BridgeSuperStructure"
          model_id={bridgeSuperStructure.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          onEdit={() => onEdit(bridgeSuperStructure)}
          onDelete={() => onDelete(bridgeSuperStructure.id)}
          item={bridgeSuperStructure}
          options={[]}
        />
      </CardActions>
    </Card>
  )
}

export default BridgeSuperStructureCard

