"use client"

import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from "@mui/material"
import type React from "react"
import { useTranslation } from "react-i18next"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import type { CulvertRoadOverInformation } from "src/types/project/other"
import { formatCreatedAt } from "src/utils/formatter/date"
import FileDrawer from "src/views/components/custom/files-drawer"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"
import { useQuery } from "@tanstack/react-query"
import guardRailTypeMasterService from "src/services/general/project/guard-rail-type-master-service"

interface CulvertRoadOverInformationCardProps {
  culvertRoadOverInformation: CulvertRoadOverInformation
  refetch: () => void
  onEdit: (culvertRoadOverInformation: CulvertRoadOverInformation) => void
  onDelete: (id: string) => void
  onDetail: (culvertRoadOverInformation: CulvertRoadOverInformation) => void
}

const CulvertRoadOverInformationCard: React.FC<CulvertRoadOverInformationCardProps> = ({
  culvertRoadOverInformation,
  refetch,
  onEdit,
  onDelete,
  onDetail,
}) => {
  const { t } = useTranslation()

  // Fetch guard rail type data
  const { data: guardRailTypeData } = useQuery({
    queryKey: ["guardRailType", culvertRoadOverInformation?.guard_rail_type_id],
    queryFn: () => guardRailTypeMasterService.getOne(culvertRoadOverInformation?.guard_rail_type_id || "", {}),
    enabled: !!culvertRoadOverInformation?.guard_rail_type_id,
  })

  const guardRailTypeName = guardRailTypeData?.payload?.title || "N/A"

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Button
              onClick={() => onDetail(culvertRoadOverInformation)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {culvertRoadOverInformation?.id.slice(0, 5)}...
            </Button>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.culvert-road-over-information.details.name")}: {culvertRoadOverInformation?.name || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.culvert-road-over-information.details.carriage-way-width")}:{" "}
            {culvertRoadOverInformation?.carriage_way_width?.toString() || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.culvert-road-over-information.details.side-walk-width")}:{" "}
            {culvertRoadOverInformation?.side_walk_width?.toString() || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.culvert-road-over-information.details.lane-number")}:{" "}
            {culvertRoadOverInformation?.lane_number?.toString() || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.culvert-road-over-information.details.guard-rail-type-id")}: {guardRailTypeName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.culvert-road-over-information.details.parapet-length")}:{" "}
            {culvertRoadOverInformation?.parapet_length?.toString() || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("common.table-columns.created-at")}:{" "}
            {culvertRoadOverInformation?.created_at ? formatCreatedAt(culvertRoadOverInformation.created_at) : "N/A"}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <FileDrawer
          id={culvertRoadOverInformation.id}
          type={uploadableProjectFileTypes.other.culvertRoadOverInformation}
        />
        <ModelAction
          model="CulvertRoadOverInformation"
          model_id={culvertRoadOverInformation.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          onEdit={() => onEdit(culvertRoadOverInformation)}
          onDelete={() => onDelete(culvertRoadOverInformation.id)}
          item={culvertRoadOverInformation}
          options={[]}
        />
      </CardActions>
    </Card>
  )
}

export default CulvertRoadOverInformationCard

