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
import type { RailwayBallastConditionAssessment } from "src/types/project/other";
import { formatDynamicDate } from "src/utils/formatter/date";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface RailwayBallastConditionAssessmentCardProps {
  railwayBallastConditionAssessment: RailwayBallastConditionAssessment;
  refetch: () => void;
  onEdit: (data: RailwayBallastConditionAssessment) => void;
  onDelete: (id: string) => void;
  onDetail: (data: RailwayBallastConditionAssessment) => void;
}

const RailwayBallastConditionAssessmentCard: React.FC<
  RailwayBallastConditionAssessmentCardProps
> = ({
  railwayBallastConditionAssessment,
  refetch,
  onEdit,
  onDelete,
  onDetail,
}) => {
  const { t } = useTranslation();

  const {
    id,
    project_id,
    railway_line_section_name,
    inspection_dates,
    ballast_condition_rating,
    fouling_presence,
    ballast_degradation_indicators,
    ballast_quality_testing_method,
    testing_frequency,
    ballast_resistance,
    ballast_degradation_rate,
    drainage_performance,
    remark,
  } = railwayBallastConditionAssessment;

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography variant="h6" fontWeight="bold">
            <Button
              onClick={() => onDetail(railwayBallastConditionAssessment)}
              sx={{
                fontWeight: 500,
                textTransform: "none",
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {project_id.slice(0, 8)}...
            </Button>
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.railway-ballast-condition-assessment.details.railway-line-section-name",
            )}
            : {railway_line_section_name || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.railway-ballast-condition-assessment.details.inspection-dates",
            )}
            : {formatDynamicDate(inspection_dates) ?? "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.railway-ballast-condition-assessment.details.ballast-condition-rating",
            )}
            : {ballast_condition_rating || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.railway-ballast-condition-assessment.details.fouling-presence",
            )}
            : {fouling_presence || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.railway-ballast-condition-assessment.details.ballast-degradation-indicators",
            )}
            : {ballast_degradation_indicators || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.railway-ballast-condition-assessment.details.ballast-quality-testing-method",
            )}
            : {ballast_quality_testing_method || "N/A"}
          </Typography>
          {testing_frequency !== undefined && (
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.railway-ballast-condition-assessment.details.testing-frequency",
              )}
              : {testing_frequency.toLocaleString()}
            </Typography>
          )}
          {ballast_resistance && (
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.railway-ballast-condition-assessment.details.ballast-resistance",
              )}
              : {ballast_resistance}
            </Typography>
          )}
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.railway-ballast-condition-assessment.details.ballast-degradation-rate",
            )}
            : {ballast_degradation_rate || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.railway-ballast-condition-assessment.details.drainage-performance",
            )}
            : {drainage_performance || "N/A"}
          </Typography>
          {remark && (
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.railway-ballast-condition-assessment.details.remark",
              )}
              : {remark}
            </Typography>
          )}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <ModelAction
          model="RailwayBallastConditionAssessment"
          model_id={project_id}
          refetchModel={refetch}
          resubmit={refetch}
          title=""
          postAction={refetch}
        />
        <RowOptions
          deletePermissionRule={{
            action: "delete",
            subject: "railwayballastconditionassessment",
          }}
          editPermissionRule={{
            action: "update",
            subject: "railwayballastconditionassessment",
          }}
          onEdit={() => onEdit(railwayBallastConditionAssessment)}
          onDelete={() => onDelete(id)}
          item={railwayBallastConditionAssessment}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default RailwayBallastConditionAssessmentCard;
