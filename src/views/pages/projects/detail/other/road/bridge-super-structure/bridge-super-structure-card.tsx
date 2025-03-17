"use client"

import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from "@mui/material"
import type React from "react"
import { useTranslation } from "react-i18next"
import type { BridgeSuperStructure } from "src/types/project/other"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"

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

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(bridgeSuperStructure)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {bridgeSuperStructure?.id.slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.bridge-super-structure.details.name')}: {bridgeSuperStructure?.name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.bridge-super-structure.details.bridge-name')}: {bridgeSuperStructure?.bridge_name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.bridge-super-structure.details.bridge-structure-type')}: {bridgeSuperStructure?.bridge_structure_type_id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.bridge-super-structure.details.span-number')}: {bridgeSuperStructure?.span_number || 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <ModelAction
          model="BridgeSuperStructure"
          model_id={bridgeSuperStructure.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'bridgesuperstructure'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'bridgesuperstructure'
          }}
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
