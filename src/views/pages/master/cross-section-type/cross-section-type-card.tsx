import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from "@mui/material"
import type React from "react"
import { useTranslation } from "react-i18next"
import { uploadableResourceFileTypes } from "src/services/utils/file-constants"
import type { CrossSectionType } from "src/types/master/cross-section-type"
import FileDrawer from "src/views/components/custom/files-drawer"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"

interface CrossSectionTypeCardProps {
  crossSectionType: CrossSectionType
  refetch: () => void
  onEdit: (crossSectionType: CrossSectionType) => void
  onDelete: (id: string) => void
  onDetail: (crossSectionType: CrossSectionType) => void
  projectTypes: { value: string; label: string }[]
}

const CrossSectionTypeCard: React.FC<CrossSectionTypeCardProps> = ({
  crossSectionType,
  refetch,
  onEdit,
  onDelete,
  onDetail,
  projectTypes,
}) => {
  const { t } = useTranslation()

  const projectType = projectTypes.find((type) => type.value === crossSectionType.project_type_id)

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(crossSectionType)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {crossSectionType.title}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t("master-data.cross-section-type.description")}: {crossSectionType.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("master-data.cross-section-type.project-type")}: {projectType ? projectType.label : "Unknown"}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <FileDrawer id={crossSectionType?.id || ""} type={uploadableResourceFileTypes.cross_section_type} />
        <ModelAction
          model="CrossSectionType"
          model_id={crossSectionType?.id || ""}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: "delete",
            subject: "crosssectiontype",
          }}
          editPermissionRule={{
            action: "edit",
            subject: "crosssectiontype",
          }}
          onEdit={() => onEdit(crossSectionType)}
          onDelete={() => onDelete(crossSectionType?.id || "")}
          item={crossSectionType}
          options={[]}
        />
      </CardActions>
    </Card>
  )
}

export default CrossSectionTypeCard

