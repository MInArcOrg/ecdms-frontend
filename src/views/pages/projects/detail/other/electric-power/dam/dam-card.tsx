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
import type { Dam } from "src/types/project/other";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";
import { formatCreatedAt } from "src/utils/formatter/date";

interface DamCardProps {
  dam: Dam;
  refetch: () => void;
  onEdit: (dam: Dam) => void;
  onDelete: (id: string) => void;
  onDetail: (dam: Dam) => void;
  damTypeMap: Map<string, string>;
  spillwayTypeMap: Map<string, string>;
  turbineTypeMap: Map<string, string>;
  generatorTypeMap: Map<string, string>;
}

const DamCard: React.FC<DamCardProps> = ({
  dam,
  refetch,
  onEdit,
  onDelete,
  onDetail,
  damTypeMap,
  spillwayTypeMap,
  turbineTypeMap,
  generatorTypeMap,
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
              onClick={() => onDetail(dam)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {dam?.dam_type_id
                ? damTypeMap.get(dam.dam_type_id)
                : dam?.id.slice(0, 8) + "..."}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Grid container spacing={2} mt={1}>
          {dam?.dam_height !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.dam.details.dam-height")}: {dam.dam_height}{" "}
                {t("common.meters")}
              </Typography>
            </Grid>
          )}

          {dam?.spillway_type_id && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.dam.details.spillway-type")}:{" "}
                {spillwayTypeMap.get(dam.spillway_type_id) || "N/A"}
              </Typography>
            </Grid>
          )}

          {dam?.penstock_length !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.dam.details.penstock-length")}:{" "}
                {dam.penstock_length} {t("common.meters")}
              </Typography>
            </Grid>
          )}

          {dam?.turbine_type_id && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.dam.details.turbine-type")}:{" "}
                {turbineTypeMap.get(dam.turbine_type_id) || "N/A"}
              </Typography>
            </Grid>
          )}

          {dam?.turbine_number !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.dam.details.turbine-number")}:{" "}
                {dam.turbine_number}
              </Typography>
            </Grid>
          )}

          {dam?.generator_type_id && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t("project.other.dam.details.generator-type")}:{" "}
                {generatorTypeMap.get(dam.generator_type_id) || "N/A"}
              </Typography>
            </Grid>
          )}
        </Grid>

        {dam?.remark && (
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              {t("project.other.dam.details.remark")}: {dam.remark}
            </Typography>
          </Box>
        )}

        {dam?.created_at && (
          <Typography variant="body2" color="text.secondary" mt={2}>
            {t("common.table-columns.created-at")}:{" "}
            {formatCreatedAt(dam.created_at)}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between" }}>
        <FileDrawer id={dam.id} type={uploadableProjectFileTypes.other.dam} />

        <Box display="flex">
          <ModelAction
            model="Dam"
            model_id={dam.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: "delete",
              subject: "dam",
            }}
            editPermissionRule={{
              action: "update",
              subject: "dam",
            }}
            onEdit={() => onEdit(dam)}
            onDelete={() => onDelete(dam.id)}
            item={dam}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  );
};

export default DamCard;
