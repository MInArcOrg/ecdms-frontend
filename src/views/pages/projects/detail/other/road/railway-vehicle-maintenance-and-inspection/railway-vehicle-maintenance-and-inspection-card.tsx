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
import type { RailwayVehicleMaintenanceAndInspection } from "src/types/project/other";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface RailwayVehicleMaintenanceAndInspectionCardProps {
  railwayVehicleMaintenanceAndInspection: RailwayVehicleMaintenanceAndInspection;
  refetch: () => void;
  onEdit: (
    specs: RailwayVehicleMaintenanceAndInspection,
  ) => void;
  onDelete: (id: string) => void;
  onDetail: (
    specs: RailwayVehicleMaintenanceAndInspection,
  ) => void;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayVehicleMaintenanceAndInspectionCard: React.FC<
  RailwayVehicleMaintenanceAndInspectionCardProps
> = ({
  railwayVehicleMaintenanceAndInspection,
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
                  onDetail(railwayVehicleMaintenanceAndInspection)
                }
                sx={{
                  fontWeight: 500,
                  textDecoration: "none",
                  color: "text.secondary",
                  "&:hover": { color: "primary.main" },
                }}
              >
                {railwayVehicleMaintenanceAndInspection?.id
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
                "project.other.railway-vehicle-maintenance-and-inspection.details.railway_vehicle_identification_id",
              )}
              :{" "}
              {railwayVehicleMaintenanceAndInspection.railway_vehicle_identification_id ||
                "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.railway-vehicle-maintenance-and-inspection.details.maintenance_history_records",
              )}
              :{" "}
              {railwayVehicleMaintenanceAndInspection.maintenance_history_records ||
                "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.railway-vehicle-maintenance-and-inspection.details.vehicle_weight_and_load_capacity",
              )}
              :{" "}
              {railwayVehicleMaintenanceAndInspection.vehicle_weight_and_load_capacity ||
                "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.railway-vehicle-maintenance-and-inspection.details.maximum_speed",
              )}
              :{" "}
              {railwayVehicleMaintenanceAndInspection.maximum_speed ||
                "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.railway-vehicle-maintenance-and-inspection.details.braking_system_type",
              )}
              :{" "}
              {railwayVehicleMaintenanceAndInspection.braking_system_type ||
                "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.railway-vehicle-maintenance-and-inspection.details.remark",
              )}
              : {railwayVehicleMaintenanceAndInspection.remark || "N/A"}
            </Typography>
            {railwayVehicleMaintenanceAndInspection.created_at && (
              <Typography variant="body2" color="text.secondary">
                {t("common.table-columns.created-at")}:{" "}
                {railwayVehicleMaintenanceAndInspection.created_at}
              </Typography>
            )}
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          {railwayVehicleMaintenanceAndInspection.id && (
            <FileDrawer
              id={railwayVehicleMaintenanceAndInspection.id}
              type={otherSubMenu?.fileType || ""}
            />
          )}

          {railwayVehicleMaintenanceAndInspection.id && (
            <ModelAction
              model="RailwayVehicleMaintenanceAndInspection"
              model_id={railwayVehicleMaintenanceAndInspection.id}
              refetchModel={refetch}
              resubmit={refetch}
              title=""
              postAction={refetch}
            />
          )}
          <RowOptions
            deletePermissionRule={{
              action: "delete",
              subject: "railwayvehiclemaintenanceandinspection",
            }}
            editPermissionRule={{
              action: "update",
              subject: "railwayvehiclemaintenanceandinspection",
            }}
            onEdit={() => onEdit(railwayVehicleMaintenanceAndInspection)}
            onDelete={() =>
              onDelete(
                railwayVehicleMaintenanceAndInspection.id as string,
              )
            }
            item={railwayVehicleMaintenanceAndInspection}
            options={[]}
          />
        </CardActions>
      </Card>
    );
  };

export default RailwayVehicleMaintenanceAndInspectionCard;