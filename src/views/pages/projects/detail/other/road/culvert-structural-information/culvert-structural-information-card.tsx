"use client"

import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from "@mui/material"
import type React from "react"
import { useTranslation } from "react-i18next"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import type { CulvertStructuralInformation } from "src/types/project/other"
import { formatCreatedAt } from "src/utils/formatter/date"
import FileDrawer from "src/views/components/custom/files-drawer"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"
import { useQuery } from "@tanstack/react-query"
import pierTypeMasterService from "src/services/general/project/pier-type-master-service"
import abutmentTypeMasterService from "src/services/general/project/abutment-type-master-service"
import endwallTypeMasterService from "src/services/general/project/endwall-type-inlet-master-service"
import pavedWaterWayTypeMasterService from "src/services/general/project/paved-water-way-type-master-service"
import soilTypeMasterService from "src/services/general/project/soil-type-master-service"

interface CulvertStructuralInformationCardProps {
  culvertStructuralInformation: CulvertStructuralInformation
  refetch: () => void
  onEdit: (culvertStructuralInformation: CulvertStructuralInformation) => void
  onDelete: (id: string) => void
  onDetail: (culvertStructuralInformation: CulvertStructuralInformation) => void
}

const CulvertStructuralInformationCard: React.FC<CulvertStructuralInformationCardProps> = ({
  culvertStructuralInformation,
  refetch,
  onEdit,
  onDelete,
  onDetail,
}) => {
  const { t } = useTranslation()

  // Fetch master data
  const { data: pierTypeData } = useQuery({
    queryKey: ["pierType", culvertStructuralInformation?.pier_type_id],
    queryFn: () => pierTypeMasterService.getOne(culvertStructuralInformation?.pier_type_id || "", {}),
    enabled: !!culvertStructuralInformation?.pier_type_id,
  })

  const { data: abutmentTypeData } = useQuery({
    queryKey: ["abutmentType", culvertStructuralInformation?.abutment_type_id],
    queryFn: () => abutmentTypeMasterService.getOne(culvertStructuralInformation?.abutment_type_id || "", {}),
    enabled: !!culvertStructuralInformation?.abutment_type_id,
  })

  const { data: endwallTypeInletData } = useQuery({
    queryKey: ["endwallTypeInlet", culvertStructuralInformation?.endwall_type_inlet_id],
    queryFn: () => endwallTypeMasterService.getOne(culvertStructuralInformation?.endwall_type_inlet_id || "", {}),
    enabled: !!culvertStructuralInformation?.endwall_type_inlet_id,
  })

  const { data: endwallTypeOutletData } = useQuery({
    queryKey: ["endwallTypeOutlet", culvertStructuralInformation?.endwall_type_outlet_id],
    queryFn: () => endwallTypeMasterService.getOne(culvertStructuralInformation?.endwall_type_outlet_id || "", {}),
    enabled: !!culvertStructuralInformation?.endwall_type_outlet_id,
  })

  const { data: pavedWaterWayTypeData } = useQuery({
    queryKey: ["pavedWaterWayType", culvertStructuralInformation?.paved_water_way_type_id],
    queryFn: () =>
      pavedWaterWayTypeMasterService.getOne(culvertStructuralInformation?.paved_water_way_type_id || "", {}),
    enabled: !!culvertStructuralInformation?.paved_water_way_type_id,
  })

  const { data: soilTypeData } = useQuery({
    queryKey: ["soilType", culvertStructuralInformation?.soil_type_id],
    queryFn: () => soilTypeMasterService.getOne(culvertStructuralInformation?.soil_type_id || "", {}),
    enabled: !!culvertStructuralInformation?.soil_type_id,
  })

  const pierTypeName = pierTypeData?.payload?.title || "N/A"
  const abutmentTypeName = abutmentTypeData?.payload?.title || "N/A"
  const endwallTypeInletName = endwallTypeInletData?.payload?.title || "N/A"
  const endwallTypeOutletName = endwallTypeOutletData?.payload?.title || "N/A"
  const pavedWaterWayTypeName = pavedWaterWayTypeData?.payload?.title || "N/A"
  const soilTypeName = soilTypeData?.payload?.title || "N/A"

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Button
              onClick={() => onDetail(culvertStructuralInformation)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {culvertStructuralInformation?.id.slice(0, 5)}...
            </Button>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.culvert-structural-information.details.name")}:{" "}
            {culvertStructuralInformation?.name || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.culvert-structural-information.details.culvert-type")}:{" "}
            {culvertStructuralInformation?.culvert_type || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.culvert-structural-information.details.culvert-barrel-length")}:{" "}
            {culvertStructuralInformation?.culvert_barrel_length?.toString() || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.culvert-structural-information.details.pier-type-id")}: {pierTypeName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.culvert-structural-information.details.abutment-type-id")}: {abutmentTypeName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.culvert-structural-information.details.endwall-type-inlet-id")}: {endwallTypeInletName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.culvert-structural-information.details.endwall-type-outlet-id")}: {endwallTypeOutletName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.culvert-structural-information.details.paved-water-way-type-id")}: {pavedWaterWayTypeName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.culvert-structural-information.details.soil-type-id")}: {soilTypeName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("common.table-columns.created-at")}:{" "}
            {culvertStructuralInformation?.created_at
              ? formatCreatedAt(culvertStructuralInformation.created_at)
              : "N/A"}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <FileDrawer
          id={culvertStructuralInformation.id}
          type={uploadableProjectFileTypes.other.culvertStructuralInformation}
        />
        <ModelAction
          model="CulvertStructuralInformation"
          model_id={culvertStructuralInformation.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          onEdit={() => onEdit(culvertStructuralInformation)}
          onDelete={() => onDelete(culvertStructuralInformation.id)}
          item={culvertStructuralInformation}
          options={[]}
        />
      </CardActions>
    </Card>
  )
}

export default CulvertStructuralInformationCard

