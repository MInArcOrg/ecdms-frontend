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
import type { RailwayStationPlatformEnvironmentalAndOtherFactor } from "src/types/project/other";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface RailwayStationPlatformEnvironmentalAndOtherFactorCardProps {
  railwayStationPlatformEnvironmentalAndOtherFactor: RailwayStationPlatformEnvironmentalAndOtherFactor;
  refetch: () => void;
  onEdit: (
    specs: RailwayStationPlatformEnvironmentalAndOtherFactor,
  ) => void;
  onDelete: (id: string) => void;
  onDetail: (
    specs: RailwayStationPlatformEnvironmentalAndOtherFactor,
  ) => void;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayStationPlatformEnvironmentalAndOtherFactorCard: React.FC<
  RailwayStationPlatformEnvironmentalAndOtherFactorCardProps
> = ({
  railwayStationPlatformEnvironmentalAndOtherFactor,
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
                    railwayStationPlatformEnvironmentalAndOtherFactor,
                  )
                }
                sx={{
                  fontWeight: 500,
                  textDecoration: "none",
                  color: "text.secondary",
                  "&:hover": { color: "primary.main" },
                }}
              >
                {railwayStationPlatformEnvironmentalAndOtherFactor?.id
                  ?.toString()
                  .slice(0, 5)}
                ... (Environmental Factor)
              </Typography>
            </Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Box display="flex" flexDirection="column" gap={1} mt={2}>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.railway-station-platform-environmental-and-other-factor.details.railway_station_platform_layout_id",
              )}
              :{" "}
              {railwayStationPlatformEnvironmentalAndOtherFactor.railwayStationPlatformLayout?.name ||
                railwayStationPlatformEnvironmentalAndOtherFactor.railway_station_platform_layout_id ||
                "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.railway-station-platform-environmental-and-other-factor.details.environmental_compliance_measures",
              )}
              :{" "}
              {railwayStationPlatformEnvironmentalAndOtherFactor.environmental_compliance_measures ||
                "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.railway-station-platform-environmental-and-other-factor.details.noise_and_vibration_control_measures",
              )}
              :{" "}
              {railwayStationPlatformEnvironmentalAndOtherFactor.noise_and_vibration_control_measures ||
                "N/A"}
            </Typography>
            {railwayStationPlatformEnvironmentalAndOtherFactor.created_at && (
              <Typography variant="body2" color="text.secondary">
                {t("common.table-columns.created-at")}:{" "}
                {railwayStationPlatformEnvironmentalAndOtherFactor.created_at}
              </Typography>
            )}
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          {railwayStationPlatformEnvironmentalAndOtherFactor.id && (
            <FileDrawer
              id={railwayStationPlatformEnvironmentalAndOtherFactor.id}
              type={otherSubMenu?.fileType || "RAILWAY_STATION_PLATFORM_ENVIRONMENTAL_AND_OTHER_FACTOR"}
            />
          )}

          {railwayStationPlatformEnvironmentalAndOtherFactor.id && (
            <ModelAction
              model="RailwayStationPlatformEnvironmentalAndOtherFactor"
              model_id={railwayStationPlatformEnvironmentalAndOtherFactor.id}
              refetchModel={refetch}
              resubmit={refetch}
              title=""
              postAction={refetch}
            />
          )}
          <RowOptions
            deletePermissionRule={{
              action: "delete",
              subject: "railwaystationplatformenvironmentalandotherfactor",
            }}
            editPermissionRule={{
              action: "update",
              subject: "railwaystationplatformenvironmentalandotherfactor",
            }}
            onEdit={() => onEdit(railwayStationPlatformEnvironmentalAndOtherFactor)}
            onDelete={() =>
              onDelete(
                railwayStationPlatformEnvironmentalAndOtherFactor.id as string,
              )
            }
            item={railwayStationPlatformEnvironmentalAndOtherFactor}
            options={[]}
          />
        </CardActions>
      </Card>
    );
  };

export default RailwayStationPlatformEnvironmentalAndOtherFactorCard;