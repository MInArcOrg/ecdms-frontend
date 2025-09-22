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
import type { ElectricSmartMetersPrivacyAndSecurityData } from "src/types/project/other";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";
import { formatCreatedAt } from "src/utils/formatter/date";

interface ElectricSmartMetersPrivacyAndSecurityDataCardProps {
  electricSmartMetersPrivacyAndSecurityData: ElectricSmartMetersPrivacyAndSecurityData;
  refetch: () => void;
  onEdit: (
    electricSmartMetersPrivacyAndSecurityData: ElectricSmartMetersPrivacyAndSecurityData,
  ) => void;
  onDelete: (id: string) => void;
  onDetail: (
    electricSmartMetersPrivacyAndSecurityData: ElectricSmartMetersPrivacyAndSecurityData,
  ) => void;
  electricSmartMetersDataMap: Map<string, string>;
  privacyMeasuresTypesMap: Map<string, string>;
  customerEngagementFrequenciesMap: Map<string, string>;
  customerEngagementProgramTypesMap: Map<string, string>;
}

const ElectricSmartMetersPrivacyAndSecurityDataCard: React.FC<
  ElectricSmartMetersPrivacyAndSecurityDataCardProps
> = ({
  electricSmartMetersPrivacyAndSecurityData,
  refetch,
  onEdit,
  onDelete,
  onDetail,
  electricSmartMetersDataMap,
  privacyMeasuresTypesMap,
  customerEngagementFrequenciesMap,
  customerEngagementProgramTypesMap,
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
                onDetail(electricSmartMetersPrivacyAndSecurityData)
              }
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {electricSmartMetersPrivacyAndSecurityData?.name ||
                electricSmartMetersPrivacyAndSecurityData?.id.slice(0, 8) +
                  "..."}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Typography variant="subtitle1" mt={2} fontWeight="bold">
          {t(
            "project.other.electric-smart-meters-privacy-and-security-data.general-information",
          )}
        </Typography>

        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.electric-smart-meters-privacy-and-security-data.details.electric-smart-meters-data-id",
              )}
              :{" "}
              {electricSmartMetersPrivacyAndSecurityData?.electric_smart_meters_data_id
                ? electricSmartMetersDataMap.get(
                    electricSmartMetersPrivacyAndSecurityData.electric_smart_meters_data_id,
                  ) ||
                  electricSmartMetersPrivacyAndSecurityData.electric_smart_meters_data_id
                : t("common.not-available")}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.electric-smart-meters-privacy-and-security-data.details.privacy-measures-implemented",
              )}
              :{" "}
              {electricSmartMetersPrivacyAndSecurityData?.privacy_measures_implemented !==
              undefined
                ? electricSmartMetersPrivacyAndSecurityData.privacy_measures_implemented
                  ? t("common.yes")
                  : t("common.no")
                : t("common.not-available")}
            </Typography>
          </Grid>
        </Grid>

        <Typography variant="subtitle1" mt={2} fontWeight="bold">
          {t(
            "project.other.electric-smart-meters-privacy-and-security-data.privacy-information",
          )}
        </Typography>

        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.electric-smart-meters-privacy-and-security-data.details.privacy-measures-type-id",
              )}
              :{" "}
              {electricSmartMetersPrivacyAndSecurityData?.privacy_measures_type_id
                ? privacyMeasuresTypesMap.get(
                    electricSmartMetersPrivacyAndSecurityData.privacy_measures_type_id,
                  ) ||
                  electricSmartMetersPrivacyAndSecurityData.privacy_measures_type_id
                : t("common.not-available")}
            </Typography>
          </Grid>
        </Grid>

        <Typography variant="subtitle1" mt={2} fontWeight="bold">
          {t(
            "project.other.electric-smart-meters-privacy-and-security-data.customer-engagement",
          )}
        </Typography>

        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.electric-smart-meters-privacy-and-security-data.details.customer-engagement-frequency-id",
              )}
              :{" "}
              {electricSmartMetersPrivacyAndSecurityData?.customer_engagement_frequency_id
                ? customerEngagementFrequenciesMap.get(
                    electricSmartMetersPrivacyAndSecurityData.customer_engagement_frequency_id,
                  ) ||
                  electricSmartMetersPrivacyAndSecurityData.customer_engagement_frequency_id
                : t("common.not-available")}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.electric-smart-meters-privacy-and-security-data.details.customer-engagement-programs-implemented",
              )}
              :{" "}
              {electricSmartMetersPrivacyAndSecurityData?.customer_engagement_programs_implemented !==
              undefined
                ? electricSmartMetersPrivacyAndSecurityData.customer_engagement_programs_implemented
                  ? t("common.yes")
                  : t("common.no")
                : t("common.not-available")}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.electric-smart-meters-privacy-and-security-data.details.customer-engagement-programs-type-id",
              )}
              :{" "}
              {electricSmartMetersPrivacyAndSecurityData?.customer_engagement_programs_type_id
                ? customerEngagementProgramTypesMap.get(
                    electricSmartMetersPrivacyAndSecurityData.customer_engagement_programs_type_id,
                  ) ||
                  electricSmartMetersPrivacyAndSecurityData.customer_engagement_programs_type_id
                : t("common.not-available")}
            </Typography>
          </Grid>
        </Grid>

        <Typography variant="subtitle1" mt={2} fontWeight="bold">
          {t(
            "project.other.electric-smart-meters-privacy-and-security-data.social-impact",
          )}
        </Typography>

        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.electric-smart-meters-privacy-and-security-data.details.social-impact-assessment-conducted",
              )}
              :{" "}
              {electricSmartMetersPrivacyAndSecurityData?.social_impact_assessment_conducted !==
              undefined
                ? electricSmartMetersPrivacyAndSecurityData.social_impact_assessment_conducted
                  ? t("common.yes")
                  : t("common.no")
                : t("common.not-available")}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t(
                "project.other.electric-smart-meters-privacy-and-security-data.details.resettlement-and-compensation-measures-implemented",
              )}
              :{" "}
              {electricSmartMetersPrivacyAndSecurityData?.resettlement_and_compensation_measures_implemented !==
              undefined
                ? electricSmartMetersPrivacyAndSecurityData.resettlement_and_compensation_measures_implemented
                  ? t("common.yes")
                  : t("common.no")
                : t("common.not-available")}
            </Typography>
          </Grid>
        </Grid>

        {electricSmartMetersPrivacyAndSecurityData?.created_at && (
          <Typography variant="body2" color="text.secondary" mt={2}>
            {t("common.table-columns.created-at")}:{" "}
            {formatCreatedAt(
              electricSmartMetersPrivacyAndSecurityData.created_at,
            )}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between" }}>
        <FileDrawer
          id={electricSmartMetersPrivacyAndSecurityData.id}
          type={
            uploadableProjectFileTypes.other
              .electric_smart_meters_privacy_and_security_data
          }
        />

        <Box display="flex">
          <ModelAction
            model="ElectricSmartMetersPrivacyAndSecurityData"
            model_id={electricSmartMetersPrivacyAndSecurityData.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: "delete",
              subject: "electricsmartmetersprivacyandsecuritydata",
            }}
            editPermissionRule={{
              action: "update",
              subject: "electricsmartmetersprivacyandsecuritydata",
            }}
            onEdit={() => onEdit(electricSmartMetersPrivacyAndSecurityData)}
            onDelete={() =>
              onDelete(electricSmartMetersPrivacyAndSecurityData.id)
            }
            item={electricSmartMetersPrivacyAndSecurityData}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  );
};

export default ElectricSmartMetersPrivacyAndSecurityDataCard;
