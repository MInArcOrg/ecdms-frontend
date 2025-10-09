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
import type { RailwayEnvironmentalAndOtherFactor } from "src/types/project/other";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";
import { formatDate } from "src/utils/formatter/date";

interface RailwayEnvironmentalAndOtherFactorCardProps {
  railwayEnvironmentalAndOtherFactor: RailwayEnvironmentalAndOtherFactor;
  refetch: () => void;
  onEdit: (
    environmentalFactor: RailwayEnvironmentalAndOtherFactor,
  ) => void;
  onDelete: (id: string) => void;
  onDetail: (
    environmentalFactor: RailwayEnvironmentalAndOtherFactor,
  ) => void;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayEnvironmentalAndOtherFactorCard: React.FC<
  RailwayEnvironmentalAndOtherFactorCardProps
> = ({
  railwayEnvironmentalAndOtherFactor,
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
                  onDetail(railwayEnvironmentalAndOtherFactor)
                }
                sx={{
                  fontWeight: 500,
                  textDecoration: "none",
                  color: "text.secondary",
                  "&:hover": { color: "primary.main" },
                }}
              >
                {railwayEnvironmentalAndOtherFactor?.id
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
                "project.other.railway-environmental-and-other-factor.details.railway_line_section_name",
              )}
              :{" "}
              {railwayEnvironmentalAndOtherFactor.railway_line_section_name ||
                "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.railway-environmental-and-other-factor.details.environmental_compliance_measures",
              )}
              :{" "}
              {railwayEnvironmentalAndOtherFactor.environmental_compliance_measures ? 'Yes' : 'No'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.railway-environmental-and-other-factor.details.environmental_impact_assessment",
              )}
              :{" "}
              {railwayEnvironmentalAndOtherFactor.environmental_impact_assessment ? 'Yes' : 'No'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.railway-environmental-and-other-factor.details.data_recording_date",
              )}
              :{" "}
              {railwayEnvironmentalAndOtherFactor.data_recording_date
                ? formatDate(railwayEnvironmentalAndOtherFactor.data_recording_date)
                : "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.railway-environmental-and-other-factor.details.remark",
              )}
              : {railwayEnvironmentalAndOtherFactor.remark || "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.railway-environmental-and-other-factor.details.compliance-document-file-upload",
              )}
              :{" "}
              {(
                <FileDrawer
                  id={railwayEnvironmentalAndOtherFactor.id}
                  type={otherSubMenu?.fileType || ""}
                />
              ) || "N/A"}
            </Typography>
            {railwayEnvironmentalAndOtherFactor.created_at && (
              <Typography variant="body2" color="text.secondary">
                {t("common.table-columns.created-at")}:{" "}
                {railwayEnvironmentalAndOtherFactor.created_at}
              </Typography>
            )}

          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          {railwayEnvironmentalAndOtherFactor.id && (
            <FileDrawer
              id={railwayEnvironmentalAndOtherFactor.id}
              type={otherSubMenu?.fileType || ""}
            />
          )}

          {railwayEnvironmentalAndOtherFactor.id && (
            <ModelAction
              model="RailwayEnvironmentalAndOtherFactor"
              model_id={railwayEnvironmentalAndOtherFactor.id}
              refetchModel={refetch}
              resubmit={refetch}
              title=""
              postAction={refetch}
            />
          )}
          <RowOptions
            deletePermissionRule={{
              action: "delete",
              subject: "railwayenvironmentalandotherfactor",
            }}
            editPermissionRule={{
              action: "update",
              subject: "railwayenvironmentalandotherfactor",
            }}
            onEdit={() => onEdit(railwayEnvironmentalAndOtherFactor)}
            onDelete={() =>
              onDelete(
                railwayEnvironmentalAndOtherFactor.id as string,
              )
            }
            item={railwayEnvironmentalAndOtherFactor}
            options={[]}
          />
        </CardActions>
      </Card>
    );
  };

export default RailwayEnvironmentalAndOtherFactorCard;