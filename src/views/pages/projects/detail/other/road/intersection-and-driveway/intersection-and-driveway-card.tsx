"use client"

import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from "@mui/material"
import type React from "react"
import { useTranslation } from "react-i18next"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import type { IntersectionAndDriveway } from "src/types/project/other"
import { formatCreatedAt } from "src/utils/formatter/date"
import FileDrawer from "src/views/components/custom/files-drawer"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"
import { useQuery } from "@tanstack/react-query"
import intersectionTypeMasterService from "src/services/general/project/intersection-type-master-service"
import drivewayAccessPointMasterService from "src/services/general/project/driveway-access-point-master-service"

interface IntersectionAndDrivewayCardProps {
  intersectionAndDriveway: IntersectionAndDriveway
  refetch: () => void
  onEdit: (intersectionAndDriveway: IntersectionAndDriveway) => void
  onDelete: (id: string) => void
  onDetail: (intersectionAndDriveway: IntersectionAndDriveway) => void
}

const IntersectionAndDrivewayCard: React.FC<IntersectionAndDrivewayCardProps> = ({
  intersectionAndDriveway,
  refetch,
  onEdit,
  onDelete,
  onDetail,
}) => {
  const { t } = useTranslation()

  // Fetch intersection type data
  const { data: intersectionTypeData } = useQuery({
    queryKey: ["intersectionType", intersectionAndDriveway?.intersection_type_id],
    queryFn: () => intersectionTypeMasterService.getOne(intersectionAndDriveway?.intersection_type_id || "", {}),
    enabled: !!intersectionAndDriveway?.intersection_type_id,
  })

  // Fetch driveway access point data
  const { data: drivewayAccessPointData } = useQuery({
    queryKey: ["drivewayAccessPoint", intersectionAndDriveway?.driveway_access_point_id],
    queryFn: () => drivewayAccessPointMasterService.getOne(intersectionAndDriveway?.driveway_access_point_id || "", {}),
    enabled: !!intersectionAndDriveway?.driveway_access_point_id,
  })

  const intersectionTypeName = intersectionTypeData?.payload?.title || "N/A"
  const drivewayAccessPointName = drivewayAccessPointData?.payload?.title || "N/A"

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Button
              onClick={() => onDetail(intersectionAndDriveway)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {intersectionAndDriveway?.id.slice(0, 5)}...
            </Button>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.intersection-and-driveway.details.name")}: {intersectionAndDriveway?.name || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.intersection-and-driveway.details.number-of-intersections")}:{" "}
            {intersectionAndDriveway?.number_of_intersections?.toString() || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.intersection-and-driveway.details.intersection-type-id")}: {intersectionTypeName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.intersection-and-driveway.details.driveway-access-point-id")}: {drivewayAccessPointName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.intersection-and-driveway.details.similar-for-all")}:{" "}
            {intersectionAndDriveway?.similar_for_all ? t("common.yes") : t("common.no")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("common.table-columns.created-at")}:{" "}
            {intersectionAndDriveway?.created_at ? formatCreatedAt(intersectionAndDriveway.created_at) : "N/A"}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <FileDrawer id={intersectionAndDriveway.id} type={uploadableProjectFileTypes.other.intersectionAndDriveway} />
        <ModelAction
          model="IntersectionAndDriveway"
          model_id={intersectionAndDriveway.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          onEdit={() => onEdit(intersectionAndDriveway)}
          onDelete={() => onDelete(intersectionAndDriveway.id)}
          item={intersectionAndDriveway}
          options={[]}
        />
      </CardActions>
    </Card>
  )
}

export default IntersectionAndDrivewayCard

