"use client"

import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from "@mui/material"
import type React from "react"
import { useTranslation } from "react-i18next"
import type { IntersectionAndDriveway } from "src/types/project/other"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"

interface IntersectionDrivewayCardProps {
  intersectionDriveway: IntersectionAndDriveway
  refetch: () => void
  onEdit: (intersectionDriveway: IntersectionAndDriveway) => void
  onDelete: (id: string) => void
  onDetail: (intersectionDriveway: IntersectionAndDriveway) => void
}

const IntersectionDrivewayCard: React.FC<IntersectionDrivewayCardProps> = ({
  intersectionDriveway,
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
              onClick={() => onDetail(intersectionDriveway)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {intersectionDriveway?.id.slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.intersection-driveway.details.name")}: {intersectionDriveway?.name || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.intersection-driveway.details.number-of-intersections")}:{" "}
            {intersectionDriveway?.number_of_intersections || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.intersection-driveway.details.intersection-type")}:{" "}
            {intersectionDriveway?.intersection_type_id || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.intersection-driveway.details.driveway-access-point")}:{" "}
            {intersectionDriveway?.driveway_access_point_id || "N/A"}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <ModelAction
          model="IntersectionAndDriveway"
          model_id={intersectionDriveway.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: "delete",
            subject: "intersectiondriveway",
          }}
          editPermissionRule={{
            action: "update",
            subject: "intersectiondriveway",
          }}
          onEdit={() => onEdit(intersectionDriveway)}
          onDelete={() => onDelete(intersectionDriveway.id)}
          item={intersectionDriveway}
          options={[]}
        />
      </CardActions>
    </Card>
  )
}
export default IntersectionDrivewayCard

