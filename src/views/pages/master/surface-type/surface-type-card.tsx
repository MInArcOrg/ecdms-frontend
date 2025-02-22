import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from "@mui/material"
import type React from "react"
import { useTranslation } from "react-i18next"
import { uploadableResourceFileTypes } from "src/services/utils/file-constants"
import type { SurfaceType } from "src/types/master/surface-type"
import FileDrawer from "src/views/components/custom/files-drawer"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"

interface SurfaceTypeCardProps {
  surfaceType: SurfaceType
  refetch: () => void
  onEdit: (surfaceType: SurfaceType) => void
  onDelete: (id: string) => void
  onDetail: (surfaceType: SurfaceType) => void
  projectTypes: { value: string; label: string }[]
}

const SurfaceTypeCard: React.FC<SurfaceTypeCardProps> = ({
  surfaceType,
  refetch,
  onEdit,
  onDelete,
  onDetail,
  projectTypes,
}) => {
  const { t } = useTranslation()

  const projectType = projectTypes.find((type) => type.value === surfaceType.project_type_id)

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(surfaceType)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {surfaceType.title}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t("master-data.surface-type.description")}: {surfaceType.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("master-data.surface-type.project-type")}: {projectType ? projectType.label : "Unknown"}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <FileDrawer id={surfaceType?.id || ""} type={uploadableResourceFileTypes.surface_type} />
        <ModelAction
          model="SurfaceType"
          model_id={surfaceType?.id || ""}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: "delete",
            subject: "surfacetype",
          }}
          editPermissionRule={{
            action: "edit",
            subject: "surfacetype",
          }}
          onEdit={() => onEdit(surfaceType)}
          onDelete={() => onDelete(surfaceType?.id || "")}
          item={surfaceType}
          options={[]}
        />
      </CardActions>
    </Card>
  )
}

export default SurfaceTypeCard

