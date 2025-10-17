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
import type { RailwayStationPlatformSafetyAndSecurity } from "src/types/project/other";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface RailwayStationPlatformSafetyAndSecurityCardProps {
  railwayStationPlatformSafetyAndSecurity: RailwayStationPlatformSafetyAndSecurity;
  refetch: () => void;
  onEdit: (
    specs: RailwayStationPlatformSafetyAndSecurity,
  ) => void;
  onDelete: (id: string) => void;
  onDetail: (
    specs: RailwayStationPlatformSafetyAndSecurity,
  ) => void;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayStationPlatformSafetyAndSecurityCard: React.FC<
  RailwayStationPlatformSafetyAndSecurityCardProps
> = ({
  railwayStationPlatformSafetyAndSecurity,
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
                    railwayStationPlatformSafetyAndSecurity,
                  )
                }
                sx={{
                  fontWeight: 500,
                  textDecoration: "none",
                  color: "text.secondary",
                  "&:hover": { color: "primary.main" },
                }}
              >
                {railwayStationPlatformSafetyAndSecurity?.id
                  ?.toString()
                  .slice(0, 5)}
                ... (Safety & Security)
              </Typography>
            </Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Box display="flex" flexDirection="column" gap={1} mt={2}>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.railway-station-platform-safety-and-security.details.railway_station_platform_layout_id",
              )}
              :{" "}
              {railwayStationPlatformSafetyAndSecurity.railwayStationPlatformLayout?.name ||
                railwayStationPlatformSafetyAndSecurity.railway_station_platform_layout_id ||
                "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.railway-station-platform-safety-and-security.details.platform_safety_and_security",
              )}
              :{" "}
              {railwayStationPlatformSafetyAndSecurity.platform_safety_and_security ||
                "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.railway-station-platform-safety-and-security.details.surveillance_systems",
              )}
              :{" "}
              {railwayStationPlatformSafetyAndSecurity.surveillance_systems ||
                "N/A"}
            </Typography>
            {railwayStationPlatformSafetyAndSecurity.created_at && (
              <Typography variant="body2" color="text.secondary">
                {t("common.table-columns.created-at")}:{" "}
                {railwayStationPlatformSafetyAndSecurity.created_at}
              </Typography>
            )}
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          {railwayStationPlatformSafetyAndSecurity.id && (
            <FileDrawer
              id={railwayStationPlatformSafetyAndSecurity.id}
              type={otherSubMenu?.fileType || "RAILWAY_STATION_PLATFORM_SAFETY_AND_SECURITY"}
            />
          )}

          {railwayStationPlatformSafetyAndSecurity.id && (
            <ModelAction
              model="RailwayStationPlatformSafetyAndSecurity"
              model_id={railwayStationPlatformSafetyAndSecurity.id}
              refetchModel={refetch}
              resubmit={refetch}
              title=""
              postAction={refetch}
            />
          )}
          <RowOptions
            deletePermissionRule={{
              action: "delete",
              subject: "railwaystationplatformsafetyandsecurity",
            }}
            editPermissionRule={{
              action: "update",
              subject: "railwaystationplatformsafetyandsecurity",
            }}
            onEdit={() => onEdit(railwayStationPlatformSafetyAndSecurity)}
            onDelete={() =>
              onDelete(
                railwayStationPlatformSafetyAndSecurity.id as string,
              )
            }
            item={railwayStationPlatformSafetyAndSecurity}
            options={[]}
          />
        </CardActions>
      </Card>
    );
  };

export default RailwayStationPlatformSafetyAndSecurityCard;