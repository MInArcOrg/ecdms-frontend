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
import type { RailwayStationPlatformSignageAndWayFinding } from "src/types/project/other";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface RailwayStationPlatformSignageAndWayFindingCardProps {
  railwayStationPlatformSignageAndWayFinding: RailwayStationPlatformSignageAndWayFinding;
  refetch: () => void;
  onEdit: (
    specs: RailwayStationPlatformSignageAndWayFinding,
  ) => void;
  onDelete: (id: string) => void;
  onDetail: (
    specs: RailwayStationPlatformSignageAndWayFinding,
  ) => void;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayStationPlatformSignageAndWayFindingCard: React.FC<
  RailwayStationPlatformSignageAndWayFindingCardProps
> = ({
  railwayStationPlatformSignageAndWayFinding,
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
                    railwayStationPlatformSignageAndWayFinding,
                  )
                }
                sx={{
                  fontWeight: 500,
                  textDecoration: "none",
                  color: "text.secondary",
                  "&:hover": { color: "primary.main" },
                }}
              >
                {railwayStationPlatformSignageAndWayFinding?.id
                  ?.toString()
                  .slice(0, 5)}
                ... (Signage)
              </Typography>
            </Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Box display="flex" flexDirection="column" gap={1} mt={2}>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.railway-station-platform-signage-and-way-finding.details.railway_station_platform_layout_id",
              )}
              :{" "}
              {railwayStationPlatformSignageAndWayFinding?.railwayStationPlatformLayout ? railwayStationPlatformSignageAndWayFinding?.railwayStationPlatformLayout.name || railwayStationPlatformSignageAndWayFinding.railway_station_platform_layout_id : "N/A"}

            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.railway-station-platform-signage-and-way-finding.details.signage_type_and_placement",
              )}
              :{" "}
              {railwayStationPlatformSignageAndWayFinding.signage_type_and_placement ||
                "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.railway-station-platform-signage-and-way-finding.details.accessibility_signage",
              )}
              :{" "}
              {railwayStationPlatformSignageAndWayFinding.accessibility_signage ||
                "N/A"}
            </Typography>
            {railwayStationPlatformSignageAndWayFinding.created_at && (
              <Typography variant="body2" color="text.secondary">
                {t("common.table-columns.created-at")}:{" "}
                {railwayStationPlatformSignageAndWayFinding.created_at}
              </Typography>
            )}
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          {railwayStationPlatformSignageAndWayFinding.id && (
            <FileDrawer
              id={railwayStationPlatformSignageAndWayFinding.id}
              type={otherSubMenu?.fileType || "RAILWAY_STATION_PLATFORM_SIGNAGE_AND_WAY_FINDING"}
            />
          )}
          {railwayStationPlatformSignageAndWayFinding.id && (
            <FileDrawer
              id={railwayStationPlatformSignageAndWayFinding.id}
              type={"WAY_FINDING_AID"}
            />
          )}
          {railwayStationPlatformSignageAndWayFinding.id && (
            <ModelAction
              model="RailwayStationPlatformSignageAndWayFinding"
              model_id={railwayStationPlatformSignageAndWayFinding.id}
              refetchModel={refetch}
              resubmit={refetch}
              title=""
              postAction={refetch}
            />
          )}
          <RowOptions
            deletePermissionRule={{
              action: "delete",
              subject: "railwaystationplatformsignageandwayfinding",
            }}
            editPermissionRule={{
              action: "update",
              subject: "railwaystationplatformsignageandwayfinding",
            }}
            onEdit={() =>
              onEdit(railwayStationPlatformSignageAndWayFinding)
            }
            onDelete={() =>
              onDelete(
                railwayStationPlatformSignageAndWayFinding.id as string,
              )
            }
            item={railwayStationPlatformSignageAndWayFinding}
            options={[]}
          />
        </CardActions>
      </Card>
    );
  };

export default RailwayStationPlatformSignageAndWayFindingCard;