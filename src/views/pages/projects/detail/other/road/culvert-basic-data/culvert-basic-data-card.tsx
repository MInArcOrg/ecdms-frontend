"use client"

import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from "@mui/material"
import type React from "react"
import { useTranslation } from "react-i18next"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import type { CulvertBasicData } from "src/types/project/other"
import { formatCreatedAt } from "src/utils/formatter/date"
import FileDrawer from "src/views/components/custom/files-drawer"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"
import { useQuery } from "@tanstack/react-query"
import areaTopographyMasterService from "src/services/general/project/area-topography-master-service"

interface CulvertBasicDataCardProps {
  culvertBasicData: CulvertBasicData
  refetch: () => void
  onEdit: (culvertBasicData: CulvertBasicData) => void
  onDelete: (id: string) => void
  onDetail: (culvertBasicData: CulvertBasicData) => void
}

const CulvertBasicDataCard: React.FC<CulvertBasicDataCardProps> = ({
  culvertBasicData,
  refetch,
  onEdit,
  onDelete,
  onDetail,
}) => {
  const { t } = useTranslation()

  // Fetch area topography data
  const { data: areaTopographyData } = useQuery({
    queryKey: ["areaTopography", culvertBasicData?.area_topography_id],
    queryFn: () => areaTopographyMasterService.getOne(culvertBasicData?.area_topography_id || "", {}),
    enabled: !!culvertBasicData?.area_topography_id,
  })

  const areaTopographyName = areaTopographyData?.payload?.title || "N/A"

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Button
              onClick={() => onDetail(culvertBasicData)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {culvertBasicData?.id.slice(0, 5)}...
            </Button>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.culvert-basic-data.details.name")}: {culvertBasicData?.name || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.culvert-basic-data.details.culvert-name")}: {culvertBasicData?.culvert_name || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.culvert-basic-data.details.culvert-number")}:{" "}
            {culvertBasicData?.culvert_number?.toString() || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.culvert-basic-data.details.area-topography-id")}: {areaTopographyName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.culvert-basic-data.details.highest-water-level")}:{" "}
            {culvertBasicData?.highest_water_level?.toString() || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.culvert-basic-data.details.lowest-water-level")}:{" "}
            {culvertBasicData?.lowest_water_level?.toString() || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.culvert-basic-data.details.detour-possibility")}:{" "}
            {culvertBasicData?.detour_possibility ? t("common.yes") : t("common.no")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("common.table-columns.created-at")}:{" "}
            {culvertBasicData?.created_at ? formatCreatedAt(culvertBasicData.created_at) : "N/A"}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <FileDrawer id={culvertBasicData.id} type={uploadableProjectFileTypes.other.culvertBasicData} />
        <ModelAction
          model="CulvertBasicData"
          model_id={culvertBasicData.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          onEdit={() => onEdit(culvertBasicData)}
          onDelete={() => onDelete(culvertBasicData.id)}
          item={culvertBasicData}
          options={[]}
        />
      </CardActions>
    </Card>
  )
}

export default CulvertBasicDataCard

