import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from "@mui/material"
import type React from "react"
import { useTranslation } from "react-i18next"
import { uploadableResourceFileTypes } from "src/services/utils/file-constants"
import type { IntersectionType } from "src/types/master/intersection-type"
import FileDrawer from "src/views/components/custom/files-drawer"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"

interface IntersectionTypeCardProps {
  intersectionType: IntersectionType
  refetch: () => void
  onEdit: (intersectionType: IntersectionType) => void
  onDelete: (id: string) => void
  onDetail: (intersectionType: IntersectionType) => void
  projectTypes: { value: string; label: string }[]
}

const IntersectionTypeCard: React.FC<IntersectionTypeCardProps> = ({
  intersectionType,
  refetch,
  onEdit,
  onDelete,
  onDetail,
  projectTypes,
}) => {
  const { t } = useTranslation()

  const projectType = projectTypes.find((type) => type.value === intersectionType.project_type_id)

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(intersectionType)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {intersectionType.title}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t("master-data.intersection-type.description")}: {intersectionType.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("master-data.intersection-type.project-type")}: {projectType ? projectType.label : "Unknown"}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <FileDrawer id={intersectionType?.id || ""} type={uploadableResourceFileTypes.intersection_type} />
        <ModelAction
          model="IntersectionType"
          model_id={intersectionType?.id || ""}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: "delete",
            subject: "intersectiontype",
          }}
          editPermissionRule={{
            action: "edit",
            subject: "intersectiontype",
          }}
          onEdit={() => onEdit(intersectionType)}
          onDelete={() => onDelete(intersectionType?.id || "")}
          item={intersectionType}
          options={[]}
        />
      </CardActions>
    </Card>
  )
}

export default IntersectionTypeCard

