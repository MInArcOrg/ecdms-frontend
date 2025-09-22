import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { uploadableProjectFileTypes } from "src/services/utils/file-constants";
import { DrainageAssessment } from "src/types/project/other";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface DrainageAssessmentCardProps {
  drainageAssessment: DrainageAssessment;
  refetch: () => void;
  onEdit: (drainageAssessment: DrainageAssessment) => void;
  onDelete: (id: string) => void;
  onDetail: (drainageAssessment: DrainageAssessment) => void;
}

const DrainageAssessmentCard: React.FC<DrainageAssessmentCardProps> = ({
  drainageAssessment,
  refetch,
  onEdit,
  onDelete,
  onDetail,
}) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(drainageAssessment)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {drainageAssessment?.id.slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.drainage-assessment.details.road-segment")}:{" "}
            {drainageAssessment?.road_segment || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.drainage-assessment.details.drainage-type")}:{" "}
            {drainageAssessment?.drainage_type_id || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.drainage-assessment.details.drainage-condition")}:{" "}
            {drainageAssessment?.drainage_condition_id || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.drainage-assessment.details.remark")}:{" "}
            {drainageAssessment?.remark || "N/A"}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <FileDrawer
          id={drainageAssessment.id}
          type={uploadableProjectFileTypes.other.drainageAssessment}
        />
        <ModelAction
          model="DrainageAssessment"
          model_id={drainageAssessment.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: "delete",
            subject: "drainageassessment",
          }}
          editPermissionRule={{
            action: "update",
            subject: "drainageassessment",
          }}
          onEdit={() => onEdit(drainageAssessment)}
          onDelete={() => onDelete(drainageAssessment.id)}
          item={drainageAssessment}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};
export default DrainageAssessmentCard;
