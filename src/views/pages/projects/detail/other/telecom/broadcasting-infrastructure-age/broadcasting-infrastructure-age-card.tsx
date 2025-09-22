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
import type { BroadcastingInfrastructureAge } from "src/types/project/other";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";
import { formatCreatedAt } from "src/utils/formatter/date";

interface BroadcastingInfrastructureAgeCardProps {
  broadcastingInfrastructureAge: BroadcastingInfrastructureAge;
  refetch: () => void;
  onEdit: (
    broadcastingInfrastructureAge: BroadcastingInfrastructureAge,
  ) => void;
  onDelete: (id: string) => void;
  onDetail: (
    broadcastingInfrastructureAge: BroadcastingInfrastructureAge,
  ) => void;
  broadcastingInfrastructureMap: Map<string, string>;
}

const BroadcastingInfrastructureAgeCard: React.FC<
  BroadcastingInfrastructureAgeCardProps
> = ({
  broadcastingInfrastructureAge,
  refetch,
  onEdit,
  onDelete,
  onDetail,
  broadcastingInfrastructureMap,
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
              onClick={() => onDetail(broadcastingInfrastructureAge)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {broadcastingInfrastructureMap.get(
                broadcastingInfrastructureAge?.broadcasting_infrastructure_id,
              ) || broadcastingInfrastructureAge?.id.slice(0, 8) + "..."}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Grid container spacing={2} mt={1}>
          {broadcastingInfrastructureAge?.name !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t(
                  "project.other.broadcasting-infrastructure-age.details.nmae",
                )}
                : {broadcastingInfrastructureAge.name}
              </Typography>
            </Grid>
          )}

          {broadcastingInfrastructureAge?.antennas !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t(
                  "project.other.broadcasting-infrastructure-age.details.antennas",
                )}
                : {broadcastingInfrastructureAge.antennas} {t("common.years")}
              </Typography>
            </Grid>
          )}

          {broadcastingInfrastructureAge?.transmitters !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t(
                  "project.other.broadcasting-infrastructure-age.details.transmitters",
                )}
                : {broadcastingInfrastructureAge.transmitters}{" "}
                {t("common.years")}
              </Typography>
            </Grid>
          )}

          {broadcastingInfrastructureAge?.towers !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t(
                  "project.other.broadcasting-infrastructure-age.details.towers",
                )}
                : {broadcastingInfrastructureAge.towers} {t("common.years")}
              </Typography>
            </Grid>
          )}

          {broadcastingInfrastructureAge?.cables !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t(
                  "project.other.broadcasting-infrastructure-age.details.cables",
                )}
                : {broadcastingInfrastructureAge.cables} {t("common.years")}
              </Typography>
            </Grid>
          )}
        </Grid>

        {broadcastingInfrastructureAge?.others && (
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.broadcasting-infrastructure-age.details.others",
              )}
              : {broadcastingInfrastructureAge.others}
            </Typography>
          </Box>
        )}

        {broadcastingInfrastructureAge?.created_at && (
          <Typography variant="body2" color="text.secondary" mt={2}>
            {t("common.table-columns.created-at")}:{" "}
            {formatCreatedAt(broadcastingInfrastructureAge.created_at)}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between" }}>
        <FileDrawer
          id={broadcastingInfrastructureAge.id}
          type={uploadableProjectFileTypes.other.broadcastingInfrastructureAge}
        />

        <Box display="flex">
          <ModelAction
            model="BroadcastingInfrastructureAge"
            model_id={broadcastingInfrastructureAge.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: "delete",
              subject: "broadcastinginfrastructureage",
            }}
            editPermissionRule={{
              action: "update",
              subject: "broadcastinginfrastructureage",
            }}
            onEdit={() => onEdit(broadcastingInfrastructureAge)}
            onDelete={() => onDelete(broadcastingInfrastructureAge.id)}
            item={broadcastingInfrastructureAge}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  );
};

export default BroadcastingInfrastructureAgeCard;
