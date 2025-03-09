"use client"

import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from "@mui/material"
import type React from "react"
import { useTranslation } from "react-i18next"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import type { TrafficParameter } from "src/types/project/other"
import { formatCreatedAt } from "src/utils/formatter/date"
import FileDrawer from "src/views/components/custom/files-drawer"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"
import { useQuery } from "@tanstack/react-query"
import pedestrianFacilityMasterService from "src/services/general/project/pedestrian-facility-master-service"

interface TrafficParameterCardProps {
  trafficParameter: TrafficParameter
  refetch: () => void
  onEdit: (trafficParameter: TrafficParameter) => void
  onDelete: (id: string) => void
  onDetail: (trafficParameter: TrafficParameter) => void
}

const TrafficParameterCard: React.FC<TrafficParameterCardProps> = ({
  trafficParameter,
  refetch,
  onEdit,
  onDelete,
  onDetail,
}) => {
  const { t } = useTranslation()

  // Fetch pedestrian facility data
  const { data: pedestrianFacilityData } = useQuery({
    queryKey: ["pedestrianFacility", trafficParameter?.pedestrian_facility_id],
    queryFn: () => pedestrianFacilityMasterService.getOne(trafficParameter?.pedestrian_facility_id || "", {}),
    enabled: !!trafficParameter?.pedestrian_facility_id,
  })

  const pedestrianFacilityName = pedestrianFacilityData?.payload?.title || "N/A"

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Button
              onClick={() => onDetail(trafficParameter)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {trafficParameter?.id.slice(0, 5)}...
            </Button>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.traffic-parameter.details.name")}: {trafficParameter?.name || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.traffic-parameter.details.pedestrian-facility-id")}: {pedestrianFacilityName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.traffic-parameter.details.parking")}: {trafficParameter?.parking?.toString() || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.traffic-parameter.details.design-traffic-flow")}:{" "}
            {trafficParameter?.design_traffic_flow?.toString() || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.traffic-parameter.details.design-speed")}:{" "}
            {trafficParameter?.design_speed?.toString() || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.traffic-parameter.details.similar-for-all")}:{" "}
            {trafficParameter?.similar_for_all ? t("common.yes") : t("common.no")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("common.table-columns.created-at")}:{" "}
            {trafficParameter?.created_at ? formatCreatedAt(trafficParameter.created_at) : "N/A"}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <FileDrawer id={trafficParameter.id} type={uploadableProjectFileTypes.other.trafficParameter} />
        <ModelAction
          model="TrafficParameter"
          model_id={trafficParameter.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          onEdit={() => onEdit(trafficParameter)}
          onDelete={() => onDelete(trafficParameter.id)}
          item={trafficParameter}
          options={[]}
        />
      </CardActions>
    </Card>
  )
}

export default TrafficParameterCard

