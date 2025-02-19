import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from "@mui/material"
import type React from "react"
import { useTranslation } from "react-i18next"
import { uploadableResourceFileTypes } from "src/services/utils/file-constants"
import type { DesignTrafficFlow } from "src/types/master/design-traffic-flow"
import FileDrawer from "src/views/components/custom/files-drawer"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"

interface DesignTrafficFlowCardProps {
  designTrafficFlow: DesignTrafficFlow
  refetch: () => void
  onEdit: (designTrafficFlow: DesignTrafficFlow) => void
  onDelete: (id: string) => void
  onDetail: (designTrafficFlow: DesignTrafficFlow) => void
  projectTypes: { value: string; label: string }[]
}

const DesignTrafficFlowCard: React.FC<DesignTrafficFlowCardProps> = ({
  designTrafficFlow,
  refetch,
  onEdit,
  onDelete,
  onDetail,
  projectTypes,
}) => {
  const { t } = useTranslation()

  const projectType = projectTypes.find((type) => type.value === designTrafficFlow.project_type_id)

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(designTrafficFlow)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {designTrafficFlow.title}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t("master-data.design-traffic-flow.description")}: {designTrafficFlow.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("master-data.design-traffic-flow.project-type")}: {projectType ? projectType.label : "Unknown"}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <FileDrawer id={designTrafficFlow?.id || ""} type={uploadableResourceFileTypes.design_traffic_flow} />
        <ModelAction
          model="DesignTrafficFlow"
          model_id={designTrafficFlow?.id || ""}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: "delete",
            subject: "designtrafficflow",
          }}
          editPermissionRule={{
            action: "edit",
            subject: "designtrafficflow",
          }}
          onEdit={() => onEdit(designTrafficFlow)}
          onDelete={() => onDelete(designTrafficFlow?.id || "")}
          item={designTrafficFlow}
          options={[]}
        />
      </CardActions>
    </Card>
  )
}

export default DesignTrafficFlowCard

