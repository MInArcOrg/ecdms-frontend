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
import { TransmissionLineInformation } from "src/types/project/other";
import { formatCreatedAt } from "src/utils/formatter/date";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface TransmissionLineInformationCardProps {
  transmissionLineInformation: TransmissionLineInformation;
  refetch: () => void;
  onEdit: (transmissionLineInformation: TransmissionLineInformation) => void;
  onDelete: (id: string) => void;
  onDetail: (transmissionLineInformation: TransmissionLineInformation) => void;
}

const TransmissionLineInformationCard: React.FC<
  TransmissionLineInformationCardProps
> = ({ transmissionLineInformation, refetch, onEdit, onDelete, onDetail }) => {
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
              onClick={() => onDetail(transmissionLineInformation)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {transmissionLineInformation?.name ||
                transmissionLineInformation?.id.slice(0, 5) + "..."}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.transmission-line-information.details.transmission-voltage",
            )}
            :{" "}
            {transmissionLineInformation?.transmission_voltage?.toString() ||
              "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.transmission-line-information.details.transmission-line-route-length",
            )}
            :{" "}
            {transmissionLineInformation?.transmission_line_route_length?.toString() ||
              "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.transmission-line-information.details.circuit-number",
            )}
            : {transmissionLineInformation?.circuit_number?.toString() || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.transmission-line-information.details.starting-point-northing",
            )}
            :{" "}
            {transmissionLineInformation?.starting_point_northing?.toString() ||
              "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.transmission-line-information.details.starting-point-easting",
            )}
            :{" "}
            {transmissionLineInformation?.starting_point_easting?.toString() ||
              "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.transmission-line-information.details.ending-point-northing",
            )}
            :{" "}
            {transmissionLineInformation?.ending_point_northing?.toString() ||
              "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.transmission-line-information.details.ending-point-easting",
            )}
            :{" "}
            {transmissionLineInformation?.ending_point_easting?.toString() ||
              "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.transmission-line-information.details.lifetime")}:{" "}
            {transmissionLineInformation?.lifetime?.toString() || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.transmission-line-information.details.remark")}:{" "}
            {transmissionLineInformation?.remark || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("common.table-columns.created-at")}:{" "}
            {transmissionLineInformation?.created_at
              ? formatCreatedAt(transmissionLineInformation.created_at)
              : "N/A"}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <FileDrawer
          id={transmissionLineInformation.id}
          type={uploadableProjectFileTypes.other.transmissionLineInformation}
        />
        <ModelAction
          model="TransmissionLineInformation"
          model_id={transmissionLineInformation.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          onEdit={() => onEdit(transmissionLineInformation)}
          onDelete={() => onDelete(transmissionLineInformation.id)}
          item={transmissionLineInformation}
          deletePermissionRule={{
            action: "delete",
            subject: "transmissionLineInformation",
          }}
          editPermissionRule={{
            action: "update",
            subject: "transmissionLineInformation",
          }}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default TransmissionLineInformationCard;
