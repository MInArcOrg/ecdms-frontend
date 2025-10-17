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
import type { RailwayStationPlatformSurfaceAndFinish } from "src/types/project/other";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface RailwayStationPlatformSurfaceAndFinishCardProps {
  railwayStationPlatformSurfaceAndFinish: RailwayStationPlatformSurfaceAndFinish;
  refetch: () => void;
  onEdit: (
    specs: RailwayStationPlatformSurfaceAndFinish,
  ) => void;
  onDelete: (id: string) => void;
  onDetail: (
    specs: RailwayStationPlatformSurfaceAndFinish,
  ) => void;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayStationPlatformSurfaceAndFinishCard: React.FC<
  RailwayStationPlatformSurfaceAndFinishCardProps
> = ({
  railwayStationPlatformSurfaceAndFinish,
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
                    railwayStationPlatformSurfaceAndFinish,
                  )
                }
                sx={{
                  fontWeight: 500,
                  textDecoration: "none",
                  color: "text.secondary",
                  "&:hover": { color: "primary.main" },
                }}
              >
                {railwayStationPlatformSurfaceAndFinish?.id
                  ?.toString()
                  .slice(0, 5)}
                ... (Surface & Finish)
              </Typography>
            </Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Box display="flex" flexDirection="column" gap={1} mt={2}>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.railway-station-platform-surface-and-finish.details.railway_station_platform_layout_id",
              )}
              :{" "}
              {railwayStationPlatformSurfaceAndFinish.railwayStationPlatformLayout?.name ||
                railwayStationPlatformSurfaceAndFinish.railway_station_platform_layout_id ||
                "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.railway-station-platform-surface-and-finish.details.flooring_materials",
              )}
              :{" "}
              {railwayStationPlatformSurfaceAndFinish.flooring_materials ||
                "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.railway-station-platform-surface-and-finish.details.surface_treatment",
              )}
              :{" "}
              {railwayStationPlatformSurfaceAndFinish.surface_treatment ||
                "N/A"}
            </Typography>
            {railwayStationPlatformSurfaceAndFinish.created_at && (
              <Typography variant="body2" color="text.secondary">
                {t("common.table-columns.created-at")}:{" "}
                {railwayStationPlatformSurfaceAndFinish.created_at}
              </Typography>
            )}
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          {railwayStationPlatformSurfaceAndFinish.id && (
            <FileDrawer
              id={railwayStationPlatformSurfaceAndFinish.id}
              type={otherSubMenu?.fileType || "RAILWAY_STATION_PLATFORM_SURFACE_AND_FINISH"}
            />
          )}

          {railwayStationPlatformSurfaceAndFinish.id && (
            <ModelAction
              model="RailwayStationPlatformSurfaceAndFinish"
              model_id={railwayStationPlatformSurfaceAndFinish.id}
              refetchModel={refetch}
              resubmit={refetch}
              title=""
              postAction={refetch}
            />
          )}
          <RowOptions
            deletePermissionRule={{
              action: "delete",
              subject: "railwaystationplatformsurfaceandfinish",
            }}
            editPermissionRule={{
              action: "update",
              subject: "railwaystationplatformsurfaceandfinish",
            }}
            onEdit={() => onEdit(railwayStationPlatformSurfaceAndFinish)}
            onDelete={() =>
              onDelete(
                railwayStationPlatformSurfaceAndFinish.id as string,
              )
            }
            item={railwayStationPlatformSurfaceAndFinish}
            options={[]}
          />
        </CardActions>
      </Card>
    );
  };

export default RailwayStationPlatformSurfaceAndFinishCard;