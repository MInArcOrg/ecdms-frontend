import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import type { FormikProps } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { dropDownConfig } from "src/configs/api-constants";
import { gridSpacing } from "src/configs/app-constants";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import type { RailwayStationPlatformEnvironmentalAndOtherFactor, RailwayStationPlatformLayout } from "src/types/project/other";
import CustomSelectBox from "src/views/shared/form/custom-select";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomFileUpload from "src/views/shared/form/custome-file-selector";

interface RailwayStationPlatformEnvironmentalAndOtherFactorFormProps {
  formik: FormikProps<RailwayStationPlatformEnvironmentalAndOtherFactor>;
  defaultFile: File | null;
  onDefaultFileChange: (file: File | null) => void;
}

const RailwayStationPlatformEnvironmentalAndOtherFactorForm: React.FC<
  RailwayStationPlatformEnvironmentalAndOtherFactorFormProps
> = ({ formik, defaultFile, onDefaultFileChange }) => {
  const { t } = useTranslation();

  const { data: platformIdentifications } = useQuery({
    queryKey: ['platform-identifications'],
    queryFn: () => projectOtherApiSecondService<RailwayStationPlatformLayout>().getAll('railway-station-platform-layouts', dropDownConfig())
  });
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelectBox
          fullWidth
          required
          label={t('project.other.railway-station-platform-structural-element.details.railway_station_platform_layout_id')}
          name="railway_station_platform_layout_id"
          options={
            platformIdentifications?.payload.map((item) => ({
              label: item.name,
              value: item.id
            })) || []
          }
          value={formik.values.railway_station_platform_layout_id}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t(
            "project.other.railway-station-platform-environmental-and-other-factor.details.environmental_compliance_measures",
          )}
          placeholder="e.g. Compliance certificate or specific measures"
          name="environmental_compliance_measures"
          value={formik.values.environmental_compliance_measures}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t(
            "project.other.railway-station-platform-environmental-and-other-factor.details.noise_and_vibration_control_measures",
          )}
          placeholder="e.g. Sound barriers, vibration dampeners"
          name="noise_and_vibration_control_measures"
          value={formik.values.noise_and_vibration_control_measures}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t(
            "project.other.railway-station-platform-environmental-and-other-factor.details.sustainable_design_features",
          )}
          placeholder="e.g. Solar panels, rainwater harvesting"
          name="sustainable_design_features"
          value={formik.values.sustainable_design_features}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t(
            "project.other.railway-station-platform-environmental-and-other-factor.details.remark",
          )}
          placeholder={t("common.form.remark-placeholder")}
          name="remark"
          value={formik.values.remark}
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={4}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomFileUpload
          label={t(
            "common.form.file-upload",
          )}
          file={defaultFile}
          onFileChange={onDefaultFileChange}
        />
      </Grid>
    </Grid>
  );
};

export default RailwayStationPlatformEnvironmentalAndOtherFactorForm;