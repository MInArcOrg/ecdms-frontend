import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from "@mui/material"
import type React from "react"
import { useTranslation } from "react-i18next"
import { uploadableResourceFileTypes } from "src/services/utils/file-constants"
import type { DesignStandard } from "src/types/master/design-standard"
import FileDrawer from "src/views/components/custom/files-drawer"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"

interface DesignStandardCardProps {
  designStandard: DesignStandard
  refetch: () => void
  onEdit: (designStandard: DesignStandard) => void
  onDelete: (id: string) => void
  onDetail: (designStandard: DesignStandard) => void
  projectTypes: { value: string; label: string }[]
}

const DesignStandardCard: React.FC<DesignStandardCardProps> = ({
  designStandard,
  refetch,
  onEdit,
  onDelete,
  onDetail,
  projectTypes,
}) => {
  const { t } = useTranslation()

  const projectType = projectTypes.find((type) => type.value === designStandard.project_type_id)

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(designStandard)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {designStandard.title}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t("master-data.design-standard.description")}: {designStandard.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("master-data.design-standard.project-type")}: {projectType ? projectType.label : "Unknown"}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <FileDrawer id={designStandard?.id || ""} type={uploadableResourceFileTypes.design_standard} />
        <ModelAction
          model="DesignStandard"
          model_id={designStandard?.id || ""}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: "delete",
            subject: "designstandard",
          }}
          editPermissionRule={{
            action: "edit",
            subject: "designstandard",
          }}
          onEdit={() => onEdit(designStandard)}
          onDelete={() => onDelete(designStandard?.id || "")}
          item={designStandard}
          options={[]}
        />
      </CardActions>
    </Card>
  )
}

export default DesignStandardCard

