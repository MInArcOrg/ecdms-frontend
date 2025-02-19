import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from "@mui/material"
import type React from "react"
import { useTranslation } from "react-i18next"
import { uploadableResourceFileTypes } from "src/services/utils/file-constants"
import type { FunctionalClassification } from "src/types/master/functional-classification"
import FileDrawer from "src/views/components/custom/files-drawer"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"

interface FunctionalClassificationCardProps {
  functionalClassification: FunctionalClassification
  refetch: () => void
  onEdit: (functionalClassification: FunctionalClassification) => void
  onDelete: (id: string) => void
  onDetail: (functionalClassification: FunctionalClassification) => void
  projectTypes: { value: string; label: string }[]
}

const FunctionalClassificationCard: React.FC<FunctionalClassificationCardProps> = ({
  functionalClassification,
  refetch,
  onEdit,
  onDelete,
  onDetail,
  projectTypes,
}) => {
  const { t } = useTranslation()

  const projectType = projectTypes.find((type) => type.value === functionalClassification.project_type_id)

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(functionalClassification)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {functionalClassification.title}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t("master-data.functional-classification.description")}: {functionalClassification.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("master-data.functional-classification.project-type")}: {projectType ? projectType.label : "Unknown"}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <FileDrawer
          id={functionalClassification?.id || ""}
          type={uploadableResourceFileTypes.functional_classification}
        />
        <ModelAction
          model="FunctionalClassification"
          model_id={functionalClassification?.id || ""}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: "delete",
            subject: "functionalclassification",
          }}
          editPermissionRule={{
            action: "edit",
            subject: "functionalclassification",
          }}
          onEdit={() => onEdit(functionalClassification)}
          onDelete={() => onDelete(functionalClassification?.id || "")}
          item={functionalClassification}
          options={[]}
        />
      </CardActions>
    </Card>
  )
}

export default FunctionalClassificationCard

