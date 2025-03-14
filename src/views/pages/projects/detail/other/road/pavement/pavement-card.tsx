"use client"

import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from "@mui/material"
import type React from "react"
import { useTranslation } from "react-i18next"
import type { Pavement } from "src/types/project/other"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"

interface PavementCardProps {
  pavement: Pavement
  refetch: () => void
  onEdit: (pavement: Pavement) => void
  onDelete: (id: string) => void
  onDetail: (pavement: Pavement) => void
}

const PavementCard: React.FC<PavementCardProps> = ({ pavement, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation()

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(pavement)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {pavement?.id.slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.pavement.details.name")}: {pavement?.name || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.pavement.details.tangent-length")}: {pavement?.tangent_length || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.pavement.details.curve-length")}: {pavement?.curve_length || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.pavement.details.road-length-type-id")}: {pavement?.road_length_type_id || "N/A"}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <ModelAction
          model="Pavement"
          model_id={pavement.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: "delete",
            subject: "pavement",
          }}
          editPermissionRule={{
            action: "update",
            subject: "pavement",
          }}
          onEdit={() => onEdit(pavement)}
          onDelete={() => onDelete(pavement.id)}
          item={pavement}
          options={[]}
        />
      </CardActions>
    </Card>
  )
}
export default PavementCard

