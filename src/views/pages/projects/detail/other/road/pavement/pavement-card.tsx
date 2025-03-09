"use client"

import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from "@mui/material"
import type React from "react"
import { useTranslation } from "react-i18next"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import type { Pavement } from "src/types/project/other"
import { formatCreatedAt } from "src/utils/formatter/date"
import FileDrawer from "src/views/components/custom/files-drawer"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"
import { useQuery } from "@tanstack/react-query"
import roadLengthTypeMasterService from "src/services/general/project/road-length-type-master-service"

interface PavementCardProps {
  pavement: Pavement
  refetch: () => void
  onEdit: (pavement: Pavement) => void
  onDelete: (id: string) => void
  onDetail: (pavement: Pavement) => void
}

const PavementCard: React.FC<PavementCardProps> = ({ pavement, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation()

  // Fetch road length type data
  const { data: roadLengthTypeData } = useQuery({
    queryKey: ["roadLengthType", pavement?.road_length_type_id],
    queryFn: () => roadLengthTypeMasterService.getOne(pavement?.road_length_type_id || "", {}),
    enabled: !!pavement?.road_length_type_id,
  })

  const roadLengthTypeName = roadLengthTypeData?.payload?.title || "N/A"

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Button
              onClick={() => onDetail(pavement)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {pavement?.id.slice(0, 5)}...
            </Button>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.pavement.details.name")}: {pavement?.name || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.pavement.details.tangent-length")}: {pavement?.tangent_length?.toString() || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.pavement.details.curve-length")}: {pavement?.curve_length?.toString() || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.pavement.details.road-length-type-id")}: {roadLengthTypeName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.pavement.details.road-pavement-thickness")}:{" "}
            {pavement?.road_pavement_thickness?.toString() || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.pavement.details.paved-road-surface-width")}:{" "}
            {pavement?.paved_road_surface_width?.toString() || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("common.table-columns.created-at")}:{" "}
            {pavement?.created_at ? formatCreatedAt(pavement.created_at) : "N/A"}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <FileDrawer id={pavement.id} type={uploadableProjectFileTypes.other.pavement} />
        <ModelAction
          model="Pavement"
          model_id={pavement.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
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

