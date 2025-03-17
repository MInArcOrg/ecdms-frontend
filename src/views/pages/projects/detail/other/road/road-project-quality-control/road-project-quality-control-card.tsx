"use client"

import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from "@mui/material"
import type React from "react"
import { useTranslation } from "react-i18next"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import type { RoadProjectQualityControl } from "src/types/project/other"
import FileDrawer from "src/views/components/custom/files-drawer"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"

interface RoadProjectQualityControlCardProps {
  roadProjectQualityControl: RoadProjectQualityControl
  refetch: () => void
  onEdit: (roadProjectQualityControl: RoadProjectQualityControl) => void
  onDelete: (id: string) => void
  onDetail: (roadProjectQualityControl: RoadProjectQualityControl) => void
}

const RoadProjectQualityControlCard: React.FC<RoadProjectQualityControlCardProps> = ({
  roadProjectQualityControl,
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
              onClick={() => onDetail(roadProjectQualityControl)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {roadProjectQualityControl?.name || roadProjectQualityControl?.id.slice(0, 5) + "..."}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.road-project-quality-control.details.project-phase-id")}:{" "}
            {roadProjectQualityControl?.project_phase_id || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.road-project-quality-control.details.inspection-type-id")}:{" "}
            {roadProjectQualityControl?.inspection_type_id || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.road-project-quality-control.details.defect-encountered")}:{" "}
            {roadProjectQualityControl?.defect_encountered || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.road-project-quality-control.details.remark")}:{" "}
            {roadProjectQualityControl?.remark || "N/A"}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <FileDrawer
          id={roadProjectQualityControl.id}
          type={uploadableProjectFileTypes.other.roadProjectQualityControl}
        />
        <ModelAction
          model="RoadProjectQualityControl"
          model_id={roadProjectQualityControl.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: "delete",
            subject: "roadprojectqualitycontrol",
          }}
          editPermissionRule={{
            action: "update",
            subject: "roadprojectqualitycontrol",
          }}
          onEdit={() => onEdit(roadProjectQualityControl)}
          onDelete={() => onDelete(roadProjectQualityControl.id)}
          item={roadProjectQualityControl}
          options={[]}
        />
      </CardActions>
    </Card>
  )
}

export default RoadProjectQualityControlCard

