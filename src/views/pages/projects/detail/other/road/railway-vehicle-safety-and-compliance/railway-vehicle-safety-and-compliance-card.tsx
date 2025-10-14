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
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";
import type { RailwayVehicleSafetyAndCompliance } from "src/types/project/other";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface RailwayVehicleSafetyAndComplianceCardProps {
  railwayVehicleSafetyAndCompliance: RailwayVehicleSafetyAndCompliance;
  refetch: () => void;
  onEdit: (
    specs: RailwayVehicleSafetyAndCompliance,
  ) => void;
  onDelete: (id: string) => void;
  onDetail: (
    specs: RailwayVehicleSafetyAndCompliance,
  ) => void;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayVehicleSafetyAndComplianceCard: React.FC<
  RailwayVehicleSafetyAndComplianceCardProps
> = ({
  railwayVehicleSafetyAndCompliance,
  refetch,
  onEdit,
  onDelete,
  onDetail,
  otherSubMenu,
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
                onClick={() =>
                  onDetail(railwayVehicleSafetyAndCompliance)
                }
                sx={{
                  fontWeight: 500,
                  textDecoration: "none",
                  color: "text.secondary",
                  "&:hover": { color: "primary.main" },
                }}
              >
                {railwayVehicleSafetyAndCompliance?.id
                  ?.toString()
                  .slice(0, 5)}
                ...
              </Typography>
            </Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Box display="flex" flexDirection="column" gap={1} mt={2}>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.railway-vehicle-safety-and-compliance.details.railway_vehicle_identification_id",
              )}
              :{" "}
              {railwayVehicleSafetyAndCompliance?.railwayVehicleIndentification ?
                railwayVehicleSafetyAndCompliance?.railwayVehicleIndentification + " - " + railwayVehicleSafetyAndCompliance?.railwayVehicleIndentification.manufacturer_supplier_name + " - " + railwayVehicleSafetyAndCompliance?.railwayVehicleIndentification.manufacture_year

                : railwayVehicleSafetyAndCompliance?.id ||
                "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.railway-vehicle-safety-and-compliance.details.safety_features_and_systems",
              )}
              :{" "}
              {railwayVehicleSafetyAndCompliance.safety_features_and_systems ||
                "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.railway-vehicle-safety-and-compliance.details.comply_with_regulatory_standards_and_certifications",
              )}
              :{" "}
              {railwayVehicleSafetyAndCompliance.comply_with_regulatory_standards_and_certifications
                ? t("common.yes")
                : t("common.no")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.railway-vehicle-safety-and-compliance.details.incident_records_number",
              )}
              :{" "}
              {railwayVehicleSafetyAndCompliance.incident_records_number ||
                "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.railway-vehicle-safety-and-compliance.details.action_taken_to_accidents",
              )}
              :{" "}
              {railwayVehicleSafetyAndCompliance.action_taken_to_accidents ||
                "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.railway-vehicle-safety-and-compliance.details.remark",
              )}
              : {railwayVehicleSafetyAndCompliance.remark || "N/A"}
            </Typography>
            {railwayVehicleSafetyAndCompliance.created_at && (
              <Typography variant="body2" color="text.secondary">
                {t("common.table-columns.created-at")}:{" "}
                {railwayVehicleSafetyAndCompliance.created_at}
              </Typography>
            )}
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          {railwayVehicleSafetyAndCompliance.id && (
            <FileDrawer
              id={railwayVehicleSafetyAndCompliance.id}
              type={otherSubMenu?.fileType || ""}
            />
          )}

          {railwayVehicleSafetyAndCompliance.id && (
            <ModelAction
              model="RailwayVehicleSafetyAndCompliance"
              model_id={railwayVehicleSafetyAndCompliance.id}
              refetchModel={refetch}
              resubmit={refetch}
              title=""
              postAction={refetch}
            />
          )}
          <RowOptions
            deletePermissionRule={{
              action: "delete",
              subject: "railwayvehiclesafetyandcompliance",
            }}
            editPermissionRule={{
              action: "update",
              subject: "railwayvehiclesafetyandcompliance",
            }}
            onEdit={() => onEdit(railwayVehicleSafetyAndCompliance)}
            onDelete={() =>
              onDelete(
                railwayVehicleSafetyAndCompliance.id as string,
              )
            }
            item={railwayVehicleSafetyAndCompliance}
            options={[]}
          />
        </CardActions>
      </Card>
    );
  };

export default RailwayVehicleSafetyAndComplianceCard;