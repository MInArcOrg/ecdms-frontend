import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from "@mui/material"
import type React from "react"
import { useTranslation } from "react-i18next"
import { uploadableResourceFileTypes } from "src/services/utils/file-constants"
import type { DrivewayAccessPoint } from "src/types/master/driveway-access-point"
import FileDrawer from "src/views/components/custom/files-drawer"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"

interface DrivewayAccessPointCardProps {
  drivewayAccessPoint: DrivewayAccessPoint
  refetch: () => void
  onEdit: (drivewayAccessPoint: DrivewayAccessPoint) => void
  onDelete: (id: string) => void
  onDetail: (drivewayAccessPoint: DrivewayAccessPoint) => void
  projectTypes: { value: string; label: string }[]
}

const DrivewayAccessPointCard: React.FC<DrivewayAccessPointCardProps> = ({
  drivewayAccessPoint,
  refetch,
  onEdit,
  onDelete,
  onDetail,
  projectTypes,
}) => {
  const { t } = useTranslation()

  const projectType = projectTypes.find((type) => type.value === drivewayAccessPoint.project_type_id)

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(drivewayAccessPoint)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {drivewayAccessPoint.title}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t("master-data.driveway-access-point.description")}: {drivewayAccessPoint.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("master-data.driveway-access-point.project-type")}: {projectType ? projectType.label : "Unknown"}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <FileDrawer id={drivewayAccessPoint?.id || ""} type={uploadableResourceFileTypes.driveway_access_point} />
        <ModelAction
          model="DrivewayAccessPoint"
          model_id={drivewayAccessPoint?.id || ""}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: "delete",
            subject: "drivewayaccesspoint",
          }}
          editPermissionRule={{
            action: "edit",
            subject: "drivewayaccesspoint",
          }}
          onEdit={() => onEdit(drivewayAccessPoint)}
          onDelete={() => onDelete(drivewayAccessPoint?.id || "")}
          item={drivewayAccessPoint}
          options={[]}
        />
      </CardActions>
    </Card>
  )
}

export default DrivewayAccessPointCard

