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
import type { RailwayPowerSubstationAndEquipment } from "src/types/project/other";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface RailwayPowerSubstationAndEquipmentCardProps {
  railwayPowerSubstationAndEquipment: RailwayPowerSubstationAndEquipment;
  refetch: () => void;
  onEdit: (
    specs: RailwayPowerSubstationAndEquipment,
  ) => void;
  onDelete: (id: string) => void;
  onDetail: (
    specs: RailwayPowerSubstationAndEquipment,
  ) => void;
  otherSubMenu?: DetailSubMenuItemChild;
  fileTypes: string[];
}

const RailwayPowerSubstationAndEquipmentCard: React.FC<
  RailwayPowerSubstationAndEquipmentCardProps
> = ({
  railwayPowerSubstationAndEquipment,
  refetch,
  onEdit,
  onDelete,
  onDetail,
  otherSubMenu,
  fileTypes,
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
                  onDetail(
                    railwayPowerSubstationAndEquipment,
                  )
                }
                sx={{
                  fontWeight: 500,
                  textDecoration: "none",
                  color: "text.secondary",
                  "&:hover": { color: "primary.main" },
                }}
              >
                {railwayPowerSubstationAndEquipment?.id
                  ?.toString()
                  .slice(0, 5)}
                ... (Substation Equipment)
              </Typography>
            </Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Box display="flex" flexDirection="column" gap={1} mt={2}>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.railway-power-substations-and-equipment.details.railway_station_platform_layout_id",
              )}
              :{" "}
              {railwayPowerSubstationAndEquipment.railwayStationPlatformLayout?.name ||
                railwayPowerSubstationAndEquipment.railway_station_platform_layout_id ||
                "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.railway-power-substations-and-equipment.details.substation_capacity_and_equipment_specifications",
              )}
              :{" "}
              {railwayPowerSubstationAndEquipment.substation_capacity_and_equipment_specifications ||
                "N/A"}
            </Typography>
            {railwayPowerSubstationAndEquipment.created_at && (
              <Typography variant="body2" color="text.secondary">
                {t("common.table-columns.created-at")}:{" "}
                {railwayPowerSubstationAndEquipment.created_at}
              </Typography>
            )}
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          {railwayPowerSubstationAndEquipment.id && (
            <FileDrawer
              id={railwayPowerSubstationAndEquipment.id}
              type={fileTypes.join(',')}
            />
          )}

          {railwayPowerSubstationAndEquipment.id && (
            <ModelAction
              model="RailwayPowerSubstationAndEquipment"
              model_id={railwayPowerSubstationAndEquipment.id}
              refetchModel={refetch}
              resubmit={refetch}
              title=""
              postAction={refetch}
            />
          )}
          <RowOptions
            deletePermissionRule={{
              action: "delete",
              subject: "railwaypowersubstationandequipment",
            }}
            editPermissionRule={{
              action: "update",
              subject: "railwaypowersubstationandequipment",
            }}
            onEdit={() => onEdit(railwayPowerSubstationAndEquipment)}
            onDelete={() =>
              onDelete(
                railwayPowerSubstationAndEquipment.id as string,
              )
            }
            item={railwayPowerSubstationAndEquipment}
            options={[]}
          />
        </CardActions>
      </Card>
    );
  };

export default RailwayPowerSubstationAndEquipmentCard;