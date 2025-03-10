"use client"

import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from "@mui/material"
import type React from "react"
import { useTranslation } from "react-i18next"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import type { BridgeInspection } from "src/types/project/other"
import { formatCreatedAt } from "src/utils/formatter/date"
import FileDrawer from "src/views/components/custom/files-drawer"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"
import { useQuery } from "@tanstack/react-query"
import bridgePartDefectMasterService from "src/services/general/project/bridge-part-defect-master-service"
import damageTypeMasterService from "src/services/general/project/damage-type-master-service"
import damageConditionMasterService from "src/services/general/project/damage-condition-master-service"
import hydrologyDefectMasterService from "src/services/general/project/hydrology-defect-master-service"

interface BridgeInspectionCardProps {
  bridgeInspection: BridgeInspection
  refetch: () => void
  onEdit: (bridgeInspection: BridgeInspection) => void
  onDelete: (id: string) => void
  onDetail: (bridgeInspection: BridgeInspection) => void
}

const BridgeInspectionCard: React.FC<BridgeInspectionCardProps> = ({
  bridgeInspection,
  refetch,
  onEdit,
  onDelete,
  onDetail,
}) => {
  const { t } = useTranslation()

  // Fetch master data
  const { data: bridgePartDefectData } = useQuery({
    queryKey: ["bridgePartDefect", bridgeInspection?.bridge_part_defect_id],
    queryFn: () => bridgePartDefectMasterService.getOne(bridgeInspection?.bridge_part_defect_id || "", {}),
    enabled: !!bridgeInspection?.bridge_part_defect_id,
  })

  const { data: damageTypeData } = useQuery({
    queryKey: ["damageType", bridgeInspection?.damage_type_id],
    queryFn: () => damageTypeMasterService.getOne(bridgeInspection?.damage_type_id || "", {}),
    enabled: !!bridgeInspection?.damage_type_id,
  })

  const { data: damageConditionData } = useQuery({
    queryKey: ["damageCondition", bridgeInspection?.damage_condition_id],
    queryFn: () => damageConditionMasterService.getOne(bridgeInspection?.damage_condition_id || "", {}),
    enabled: !!bridgeInspection?.damage_condition_id,
  })

  const { data: hydrologyDefectData } = useQuery({
    queryKey: ["hydrologyDefect", bridgeInspection?.hydrology_defect_id],
    queryFn: () => hydrologyDefectMasterService.getOne(bridgeInspection?.hydrology_defect_id || "", {}),
    enabled: !!bridgeInspection?.hydrology_defect_id,
  })

  const bridgePartDefectName = bridgePartDefectData?.payload?.title || "N/A"
  const damageTypeName = damageTypeData?.payload?.title || "N/A"
  const damageConditionName = damageConditionData?.payload?.title || "N/A"
  const hydrologyDefectName = hydrologyDefectData?.payload?.title || "N/A"

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Button
              onClick={() => onDetail(bridgeInspection)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {bridgeInspection?.id.slice(0, 5)}...
            </Button>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.bridge-inspection.details.name")}: {bridgeInspection?.name || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.bridge-inspection.details.bridge-name")}: {bridgeInspection?.bridge_name || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.bridge-inspection.details.bridge-part-defect-id")}: {bridgePartDefectName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.bridge-inspection.details.damage-type-id")}: {damageTypeName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.bridge-inspection.details.damage-condition-id")}: {damageConditionName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.bridge-inspection.details.hydrology-defect-id")}: {hydrologyDefectName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("common.table-columns.created-at")}:{" "}
            {bridgeInspection?.created_at ? formatCreatedAt(bridgeInspection.created_at) : "N/A"}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <FileDrawer id={bridgeInspection.id} type={uploadableProjectFileTypes.other.bridgeInspection} />
        <ModelAction
          model="BridgeInspection"
          model_id={bridgeInspection.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          onEdit={() => onEdit(bridgeInspection)}
          onDelete={() => onDelete(bridgeInspection.id)}
          item={bridgeInspection}
          options={[]}
        />
      </CardActions>
    </Card>
  )
}

export default BridgeInspectionCard

