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
import type { RailwayStationPlatformStructuralElement } from "src/types/project/other";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface RailwayStationPlatformStructuralElementCardProps {
  railwayStationPlatformStructuralElement: RailwayStationPlatformStructuralElement;
  refetch: () => void;
  onEdit: (
    specs: RailwayStationPlatformStructuralElement,
  ) => void;
  onDelete: (id: string) => void;
  onDetail: (
    specs: RailwayStationPlatformStructuralElement,
  ) => void;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayStationPlatformStructuralElementCard: React.FC<
  RailwayStationPlatformStructuralElementCardProps
> = ({
  railwayStationPlatformStructuralElement,
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
                  onDetail(railwayStationPlatformStructuralElement)
                }
                sx={{
                  fontWeight: 500,
                  textDecoration: "none",
                  color: "text.secondary",
                  "&:hover": { color: "primary.main" },
                }}
              >
                {railwayStationPlatformStructuralElement?.id
                  ?.toString()
                  .slice(0, 5)}
                ... (Structural Element)
              </Typography>
            </Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Box display="flex" flexDirection="column" gap={1} mt={2}>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.railway-station-platform-structural-element.details.railway_station_platform_layout_id",
              )}
              :{" "}
              {railwayStationPlatformStructuralElement.railway_station_platform_layout_id ||
                "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.railway-station-platform-structural-element.details.materials_used",
              )}
              :{" "}
              {railwayStationPlatformStructuralElement.materials_used ||
                "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.railway-station-platform-structural-element.details.roofing_type_and_design",
              )}
              :{" "}
              {railwayStationPlatformStructuralElement.roofing_type_and_design ||
                "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.railway-station-platform-structural-element.details.lighting_fixtures",
              )}
              :{" "}
              {railwayStationPlatformStructuralElement.lighting_fixtures
                ? t("common.yes")
                : t("common.no")}
            </Typography>
            {railwayStationPlatformStructuralElement.created_at && (
              <Typography variant="body2" color="text.secondary">
                {t("common.table-columns.created-at")}:{" "}
                {railwayStationPlatformStructuralElement.created_at}
              </Typography>
            )}
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          {railwayStationPlatformStructuralElement.id && (
            <FileDrawer
              id={railwayStationPlatformStructuralElement.id}
              type={otherSubMenu?.fileType || "RAILWAY_STATION_PLATFORM_STRUCTURAL_ELEMENT"}
            />
          )}

          {railwayStationPlatformStructuralElement.id && (
            <ModelAction
              model="RailwayStationPlatformStructuralElement"
              model_id={railwayStationPlatformStructuralElement.id}
              refetchModel={refetch}
              resubmit={refetch}
              title=""
              postAction={refetch}
            />
          )}
          <RowOptions
            deletePermissionRule={{
              action: "delete",
              subject: "railwaystationplatformstructuralelement",
            }}
            editPermissionRule={{
              action: "update",
              subject: "railwaystationplatformstructuralelement",
            }}
            onEdit={() => onEdit(railwayStationPlatformStructuralElement)}
            onDelete={() =>
              onDelete(
                railwayStationPlatformStructuralElement.id as string,
              )
            }
            item={railwayStationPlatformStructuralElement}
            options={[]}
          />
        </CardActions>
      </Card>
    );
  };

export default RailwayStationPlatformStructuralElementCard;