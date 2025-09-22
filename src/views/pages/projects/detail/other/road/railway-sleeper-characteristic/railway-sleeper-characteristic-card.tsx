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
import type { RailwaySleeperCharacteristic } from "src/types/project/other";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface RailwaySleeperCharacteristicCardProps {
  railwaySleeperCharacteristic: RailwaySleeperCharacteristic;
  refetch: () => void;
  onEdit: (railwaySleeperCharacteristic: RailwaySleeperCharacteristic) => void;
  onDelete: (id: string) => void;
  onDetail: (
    railwaySleeperCharacteristic: RailwaySleeperCharacteristic,
  ) => void;
}

const RailwaySleeperCharacteristicCard: React.FC<
  RailwaySleeperCharacteristicCardProps
> = ({ railwaySleeperCharacteristic, refetch, onEdit, onDelete, onDetail }) => {
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
              onClick={() => onDetail(railwaySleeperCharacteristic)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {railwaySleeperCharacteristic?.project_id?.toString().slice(0, 5)}
              ...
            </Typography>
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.railway-sleeper-characteristic.details.railway_line_section_name",
            )}
            : {railwaySleeperCharacteristic.railway_line_section_name || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.railway-sleeper-characteristic.details.sleeper_type",
            )}
            : {railwaySleeperCharacteristic.sleeper_type || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.railway-sleeper-characteristic.details.sleeper_size_and_dimensions",
            )}
            :{" "}
            {railwaySleeperCharacteristic.sleeper_size_and_dimensions != null
              ? railwaySleeperCharacteristic.sleeper_size_and_dimensions.toLocaleString()
              : "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.railway-sleeper-characteristic.details.sleeper_distance_between_pairs",
            )}
            :{" "}
            {railwaySleeperCharacteristic.sleeper_distance_between_pairs ||
              "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.railway-sleeper-characteristic.details.sleeper_material_specification",
            )}
            :{" "}
            {railwaySleeperCharacteristic.sleeper_material_specification ||
              "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.railway-sleeper-characteristic.details.sleeper_spacing",
            )}
            : {railwaySleeperCharacteristic.sleeper_spacing || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.railway-sleeper-characteristic.details.spacing_between",
            )}
            :{" "}
            {railwaySleeperCharacteristic.spacing_between != null
              ? railwaySleeperCharacteristic.spacing_between.toLocaleString()
              : "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.railway-sleeper-characteristic.details.sleeper_shape",
            )}
            : {railwaySleeperCharacteristic.sleeper_shape || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.railway-sleeper-characteristic.details.remark")}:{" "}
            {railwaySleeperCharacteristic.remark || "N/A"}
          </Typography>
          {railwaySleeperCharacteristic.created_at && (
            <Typography variant="body2" color="text.secondary">
              {t("common.table-columns.created-at")}:{" "}
              {railwaySleeperCharacteristic.created_at}
            </Typography>
          )}
          {railwaySleeperCharacteristic.updated_at && (
            <Typography variant="body2" color="text.secondary">
              {t("common.table-columns.updated-at")}:{" "}
              {railwaySleeperCharacteristic.updated_at}
            </Typography>
          )}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <ModelAction
          model="RailwaySleeperCharacteristic"
          model_id={railwaySleeperCharacteristic.id}
          refetchModel={refetch}
          resubmit={refetch}
          title=""
          postAction={refetch}
        />
        <RowOptions
          deletePermissionRule={{
            action: "delete",
            subject: "railwaysleepercharacteristic",
          }}
          editPermissionRule={{
            action: "update",
            subject: "railwaysleepercharacteristic",
          }}
          onEdit={() => onEdit(railwaySleeperCharacteristic)}
          onDelete={() => onDelete(railwaySleeperCharacteristic.id)}
          item={railwaySleeperCharacteristic}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default RailwaySleeperCharacteristicCard;
