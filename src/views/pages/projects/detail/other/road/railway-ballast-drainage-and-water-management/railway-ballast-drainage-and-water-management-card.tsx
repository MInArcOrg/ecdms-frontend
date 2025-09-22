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
import type { RailwayBallastDrainageAndWaterManagement } from "src/types/project/other";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface RailwayBallastDrainageAndWaterManagementCardProps {
  railwayBallastDrainageAndWaterManagement: RailwayBallastDrainageAndWaterManagement;
  refetch: () => void;
  onEdit: (data: RailwayBallastDrainageAndWaterManagement) => void;
  onDelete: (id: string) => void;
  onDetail: (data: RailwayBallastDrainageAndWaterManagement) => void;
}

const RailwayBallastDrainageAndWaterManagementCard: React.FC<
  RailwayBallastDrainageAndWaterManagementCardProps
> = ({
  railwayBallastDrainageAndWaterManagement,
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
    drainage_condition_assessment,
    drainage_infrastructure_type,
    water_management_measures,
    drainage_infrastructure_length,
    remark,
  } = railwayBallastDrainageAndWaterManagement;

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
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(railwayBallastDrainageAndWaterManagement)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {project_id?.toString().slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.railway-ballast-drainage-and-water-management.details.railway-line-section-name",
            )}
            : {railway_line_section_name || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.railway-ballast-drainage-and-water-management.details.drainage-condition-assessment",
            )}
            : {drainage_condition_assessment || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.railway-ballast-drainage-and-water-management.details.drainage-infrastructure-type",
            )}
            : {drainage_infrastructure_type || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.railway-ballast-drainage-and-water-management.details.water-management-measures",
            )}
            : {water_management_measures || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.railway-ballast-drainage-and-water-management.details.drainage-infrastructure-length",
            )}
            : {drainage_infrastructure_length?.toLocaleString() ?? "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.railway-ballast-drainage-and-water-management.details.remark",
            )}
            : {remark ?? "N/A"}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <ModelAction
          model="RailwayBallastDrainageAndWaterManagement"
          model_id={project_id}
          refetchModel={refetch}
          resubmit={refetch}
          title=""
          postAction={refetch}
        />
        <RowOptions
          deletePermissionRule={{
            action: "delete",
            subject: "railwayballastdrainageandwatermanagement",
          }}
          editPermissionRule={{
            action: "update",
            subject: "railwayballastdrainageandwatermanagement",
          }}
          onEdit={() => onEdit(railwayBallastDrainageAndWaterManagement)}
          onDelete={() => onDelete(id)}
          item={railwayBallastDrainageAndWaterManagement}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default RailwayBallastDrainageAndWaterManagementCard;
