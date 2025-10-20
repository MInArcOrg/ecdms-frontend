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
import type { RailwayStationPlatformPassengerFlowAndCapacity } from "src/types/project/other";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface RailwayStationPlatformPassengerFlowAndCapacityCardProps {
  railwayStationPlatformPassengerFlowAndCapacity: RailwayStationPlatformPassengerFlowAndCapacity;
  refetch: () => void;
  onEdit: (
    specs: RailwayStationPlatformPassengerFlowAndCapacity,
  ) => void;
  onDelete: (id: string) => void;
  onDetail: (
    specs: RailwayStationPlatformPassengerFlowAndCapacity,
  ) => void;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayStationPlatformPassengerFlowAndCapacityCard: React.FC<
  RailwayStationPlatformPassengerFlowAndCapacityCardProps
> = ({
  railwayStationPlatformPassengerFlowAndCapacity,
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
                  onDetail(
                    railwayStationPlatformPassengerFlowAndCapacity,
                  )
                }
                sx={{
                  fontWeight: 500,
                  textDecoration: "none",
                  color: "text.secondary",
                  "&:hover": { color: "primary.main" },
                }}
              >
                {railwayStationPlatformPassengerFlowAndCapacity?.id
                  ?.toString()
                  .slice(0, 5)}
                ... (Passenger Flow & Capacity)
              </Typography>
            </Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Box display="flex" flexDirection="column" gap={1} mt={2}>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.railway-station-platform-passenger-flow-and-capacity.details.railway_station_platform_layout_id",
              )}
              :{" "}
              {railwayStationPlatformPassengerFlowAndCapacity.railwayStationPlatformLayout?.name ||
                railwayStationPlatformPassengerFlowAndCapacity.railway_station_platform_layout_id ||
                "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.railway-station-platform-passenger-flow-and-capacity.details.passenger_flow_during_peak_hour",
              )}
              :{" "}
              {railwayStationPlatformPassengerFlowAndCapacity.passenger_flow_during_peak_hour ||
                "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.railway-station-platform-passenger-flow-and-capacity.details.capacity_assessment",
              )}
              :{" "}
              {railwayStationPlatformPassengerFlowAndCapacity.capacity_assessment ||
                "N/A"}
            </Typography>
            {railwayStationPlatformPassengerFlowAndCapacity.created_at && (
              <Typography variant="body2" color="text.secondary">
                {t("common.table-columns.created-at")}:{" "}
                {railwayStationPlatformPassengerFlowAndCapacity.created_at}
              </Typography>
            )}
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          {railwayStationPlatformPassengerFlowAndCapacity.id && (
            <FileDrawer
              id={railwayStationPlatformPassengerFlowAndCapacity.id}
              type={otherSubMenu?.fileType || "RAILWAY_STATION_PLATFORM_PASSENGER_FLOW_AND_CAPACITY"}
            />
          )}

          {railwayStationPlatformPassengerFlowAndCapacity.id && (
            <ModelAction
              model="RailwayStationPlatformPassengerFlowAndCapacity"
              model_id={railwayStationPlatformPassengerFlowAndCapacity.id}
              refetchModel={refetch}
              resubmit={refetch}
              title=""
              postAction={refetch}
            />
          )}
          <RowOptions
            deletePermissionRule={{
              action: "delete",
              subject: "railwaystationplatformpassengerflowandcapacity",
            }}
            editPermissionRule={{
              action: "update",
              subject: "railwaystationplatformpassengerflowandcapacity",
            }}
            onEdit={() => onEdit(railwayStationPlatformPassengerFlowAndCapacity)}
            onDelete={() =>
              onDelete(
                railwayStationPlatformPassengerFlowAndCapacity.id as string,
              )
            }
            item={railwayStationPlatformPassengerFlowAndCapacity}
            options={[]}
          />
        </CardActions>
      </Card>
    );
  };

export default RailwayStationPlatformPassengerFlowAndCapacityCard;