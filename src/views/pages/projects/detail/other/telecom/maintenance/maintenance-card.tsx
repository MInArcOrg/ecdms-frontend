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
  Chip,
} from "@mui/material";
import type React from "react";
import { useTranslation } from "react-i18next";
import { uploadableProjectFileTypes } from "src/services/utils/file-constants";
import type { Maintenance } from "src/types/project/other";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";
import { formatCreatedAt } from "src/utils/formatter/date";

interface MaintenanceCardProps {
  maintenance: Maintenance;
  refetch: () => void;
  onEdit: (maintenance: Maintenance) => void;
  onDelete: (id: string) => void;
  onDetail: (maintenance: Maintenance) => void;
}

const MaintenanceCard: React.FC<MaintenanceCardProps> = ({
  maintenance,
  refetch,
  onEdit,
  onDelete,
  onDetail,
}) => {
  const { t } = useTranslation();

  const renderStatusChip = (value: boolean | undefined) => (
    <Chip
      size="small"
      label={value ? t("common.yes") : t("common.no")}
      color={value ? "success" : "default"}
      sx={{ minWidth: 70 }}
    />
  );

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
              onClick={() => onDetail(maintenance)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {t("project.other.maintenance.maintenance-record")} -{" "}
              {maintenance?.id.slice(0, 8) + "..."}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Grid container spacing={2} mt={1}>
          <Grid item xs={12}>
            <Typography
              variant="body2"
              color="text.secondary"
              display="flex"
              alignItems="center"
              gap={1}
            >
              {t("project.other.maintenance.details.maintenance-frequency")}:{" "}
              {renderStatusChip(maintenance?.maintenance_frequency)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="body2"
              color="text.secondary"
              display="flex"
              alignItems="center"
              gap={1}
            >
              {t("project.other.maintenance.details.service-level-agreement")}:{" "}
              {renderStatusChip(maintenance?.service_level_agreement)}
            </Typography>
          </Grid>
        </Grid>

        {maintenance?.remark && (
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              {t("project.other.maintenance.details.remark")}:{" "}
              {maintenance.remark}
            </Typography>
          </Box>
        )}

        {maintenance?.created_at && (
          <Typography variant="body2" color="text.secondary" mt={2}>
            {t("common.table-columns.created-at")}:{" "}
            {formatCreatedAt(maintenance.created_at)}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ flexDirection: "column", alignItems: "flex-start" }}>
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography variant="subtitle2" fontWeight="medium">
            {t("project.other.maintenance.file-types.maintenance-document")}:
          </Typography>
          <FileDrawer
            id={maintenance.id}
            type={uploadableProjectFileTypes.other.maintenance}
          />
        </Box>

        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography variant="subtitle2" fontWeight="medium">
            {t("project.other.maintenance.file-types.infrastructure-image")}:
          </Typography>
          <FileDrawer
            id={maintenance.id}
            type={uploadableProjectFileTypes.other.infrastructureImage}
          />
        </Box>

        <Box width="100%" display="flex" justifyContent="flex-end" mt={1}>
          <ModelAction
            model="Maintenance"
            model_id={maintenance.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: "delete",
              subject: "maintenance",
            }}
            editPermissionRule={{
              action: "update",
              subject: "maintenance",
            }}
            onEdit={() => onEdit(maintenance)}
            onDelete={() => onDelete(maintenance.id)}
            item={maintenance}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  );
};

export default MaintenanceCard;
