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
import type { ElectricGridControlCenterCyberSecurityData } from "src/types/project/other";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";
import { formatCreatedAt } from "src/utils/formatter/date";

interface ElectricGridControlCenterCyberSecurityDataCardProps {
  electricGridControlCenterCyberSecurityData: ElectricGridControlCenterCyberSecurityData;
  refetch: () => void;
  onEdit: (
    electricGridControlCenterCyberSecurityData: ElectricGridControlCenterCyberSecurityData,
  ) => void;
  onDelete: (id: string) => void;
  onDetail: (
    electricGridControlCenterCyberSecurityData: ElectricGridControlCenterCyberSecurityData,
  ) => void;
  electricGridControlCenterDataMap: Map<string, string>;
  cyberSecurityMeasuresTypesMap: Map<string, string>;
  cyberSecurityAuditsFrequenciesMap: Map<string, string>;
}

const ElectricGridControlCenterCyberSecurityDataCard: React.FC<
  ElectricGridControlCenterCyberSecurityDataCardProps
> = ({
  electricGridControlCenterCyberSecurityData,
  refetch,
  onEdit,
  onDelete,
  onDetail,
  electricGridControlCenterDataMap,
  cyberSecurityMeasuresTypesMap,
  cyberSecurityAuditsFrequenciesMap,
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
              onClick={() =>
                onDetail(electricGridControlCenterCyberSecurityData)
              }
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {electricGridControlCenterCyberSecurityData?.name ||
                electricGridControlCenterCyberSecurityData?.id.slice(0, 8) +
                  "..."}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Typography variant="subtitle1" mt={2} fontWeight="bold">
          {t(
            "project.other.electric-grid-control-center-cyber-security-data.general-information",
          )}
        </Typography>

        <Grid container spacing={2} mt={1}>
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.electric-grid-control-center-cyber-security-data.details.electric-grid-control-center-data-id",
              )}
              :{" "}
              {electricGridControlCenterCyberSecurityData?.electric_grid_control_center_data_id
                ? electricGridControlCenterDataMap.get(
                    electricGridControlCenterCyberSecurityData.electric_grid_control_center_data_id,
                  ) ||
                  electricGridControlCenterCyberSecurityData.electric_grid_control_center_data_id
                : t("common.not-available")}
            </Typography>
          </Grid>
        </Grid>

        <Typography variant="subtitle1" mt={2} fontWeight="bold">
          {t(
            "project.other.electric-grid-control-center-cyber-security-data.cyber-security",
          )}
        </Typography>

        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.electric-grid-control-center-cyber-security-data.details.cyber-security-measures-implemented",
              )}
              :{" "}
              {electricGridControlCenterCyberSecurityData?.cyber_security_measures_implemented !==
              undefined
                ? electricGridControlCenterCyberSecurityData.cyber_security_measures_implemented
                  ? t("common.yes")
                  : t("common.no")
                : t("common.not-available")}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.electric-grid-control-center-cyber-security-data.details.cyber-security-measures-type",
              )}
              :{" "}
              {electricGridControlCenterCyberSecurityData?.cyber_security_measures_type
                ? cyberSecurityMeasuresTypesMap.get(
                    electricGridControlCenterCyberSecurityData.cyber_security_measures_type,
                  ) ||
                  electricGridControlCenterCyberSecurityData.cyber_security_measures_type
                : t("common.not-available")}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={1}>
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.electric-grid-control-center-cyber-security-data.details.cyber-security-audits-frequency",
              )}
              :{" "}
              {electricGridControlCenterCyberSecurityData?.cyber_security_audits_frequency
                ? cyberSecurityAuditsFrequenciesMap.get(
                    electricGridControlCenterCyberSecurityData.cyber_security_audits_frequency,
                  ) ||
                  electricGridControlCenterCyberSecurityData.cyber_security_audits_frequency
                : t("common.not-available")}
            </Typography>
          </Grid>
        </Grid>

        {electricGridControlCenterCyberSecurityData?.created_at && (
          <Typography variant="body2" color="text.secondary" mt={2}>
            {t("common.table-columns.created-at")}:{" "}
            {formatCreatedAt(
              electricGridControlCenterCyberSecurityData.created_at,
            )}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between" }}>
        <FileDrawer
          id={electricGridControlCenterCyberSecurityData.id}
          type={
            uploadableProjectFileTypes.other
              .electric_grid_control_center_cyber_security_data
          }
        />

        <Box display="flex">
          <ModelAction
            model="ElectricGridControlCenterCyberSecurityData"
            model_id={electricGridControlCenterCyberSecurityData.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: "delete",
              subject: "electricgridcontrolcentercybersecuritydata",
            }}
            editPermissionRule={{
              action: "update",
              subject: "electricgridcontrolcentercybersecuritydata",
            }}
            onEdit={() => onEdit(electricGridControlCenterCyberSecurityData)}
            onDelete={() =>
              onDelete(electricGridControlCenterCyberSecurityData.id)
            }
            item={electricGridControlCenterCyberSecurityData}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  );
};

export default ElectricGridControlCenterCyberSecurityDataCard;
