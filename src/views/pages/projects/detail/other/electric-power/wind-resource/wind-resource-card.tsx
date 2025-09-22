"use client";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  Grid,
} from "@mui/material";
import type React from "react";
import { useTranslation } from "react-i18next";
import { uploadableProjectFileTypes } from "src/services/utils/file-constants";
import type { WindResource } from "src/types/project/other";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";
import { formatCreatedAt } from "src/utils/formatter/date";

interface WindResourceCardProps {
  windResource: WindResource;
  refetch: () => void;
  onEdit: (windResource: WindResource) => void;
  onDelete: (id: string) => void;
  onDetail: (windResource: WindResource) => void;
}

const WindResourceCard: React.FC<WindResourceCardProps> = ({
  windResource,
  refetch,
  onEdit,
  onDelete,
  onDetail,
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
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(windResource)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {t("project.other.wind-resource.wind-resource-details")}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Grid container spacing={2} mt={1}>
          {windResource?.wind_speed_at_hub_height !== undefined && (
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                {t(
                  "project.other.wind-resource.details.wind-speed-at-hub-height",
                )}
                : {windResource.wind_speed_at_hub_height}{" "}
                {t("common.meters-per-second")}
              </Typography>
            </Grid>
          )}

          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              {t("project.other.wind-resource.details.weibull-shape-factor")}:{" "}
              {windResource.weibull_shape_factor
                ? t("common.yes")
                : t("common.no")}
            </Typography>
          </Grid>
        </Grid>

        {windResource?.remark && (
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              {t("project.other.wind-resource.details.remark")}:{" "}
              {windResource.remark}
            </Typography>
          </Box>
        )}

        {windResource?.created_at && (
          <Typography variant="body2" color="text.secondary" mt={2}>
            {t("common.table-columns.created-at")}:{" "}
            {formatCreatedAt(windResource.created_at)}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between" }}>
        <FileDrawer
          id={windResource.id}
          type={uploadableProjectFileTypes.other.windResource}
        />

        <Box display="flex">
          <ModelAction
            model="WindResource"
            model_id={windResource.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: "delete",
              subject: "windresource",
            }}
            editPermissionRule={{
              action: "update",
              subject: "windresource",
            }}
            onEdit={() => onEdit(windResource)}
            onDelete={() => onDelete(windResource.id)}
            item={windResource}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  );
};

export default WindResourceCard;
