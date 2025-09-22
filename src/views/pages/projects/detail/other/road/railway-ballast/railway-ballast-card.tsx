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
import type { RailwayBallast } from "src/types/project/other";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface RailwayBallastCardProps {
  railwayBallast: RailwayBallast;
  refetch: () => void;
  onEdit: (railwayBallast: RailwayBallast) => void;
  onDelete: (id: string) => void;
  onDetail: (railwayBallast: RailwayBallast) => void;
}

const RailwayBallastCard: React.FC<RailwayBallastCardProps> = ({
  railwayBallast,
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
          <Typography variant="h6" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(railwayBallast)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {railwayBallast?.id?.toString().slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.railway-ballast.details.railway-line-section-name",
            )}
            : {railwayBallast.railway_line_section_name || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.railway-ballast.details.railway-ballast-name")}:{" "}
            {railwayBallast.railway_ballast_name || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.railway-ballast.details.ballast-id-no")}:{" "}
            {railwayBallast.ballast_id_no || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.railway-ballast.details.ballast-construction-cost",
            )}
            :{" "}
            {railwayBallast.ballast_construction_cost != null
              ? `${railwayBallast.ballast_construction_cost}`
              : "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.railway-ballast.details.remark")}:{" "}
            {railwayBallast.remark || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("common.table-columns.created-at")}:{" "}
            {railwayBallast.created_at || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("common.table-columns.updated-at")}:{" "}
            {railwayBallast.updated_at || "N/A"}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <ModelAction
          model="RailwayBallast"
          model_id={railwayBallast.id}
          refetchModel={refetch}
          resubmit={refetch}
          title=""
          postAction={refetch}
        />
        <RowOptions
          deletePermissionRule={{
            action: "delete",
            subject: "railwayballast",
          }}
          editPermissionRule={{
            action: "update",
            subject: "railwayballast",
          }}
          onEdit={() => onEdit(railwayBallast)}
          onDelete={() => onDelete(railwayBallast.id)}
          item={railwayBallast}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default RailwayBallastCard;
