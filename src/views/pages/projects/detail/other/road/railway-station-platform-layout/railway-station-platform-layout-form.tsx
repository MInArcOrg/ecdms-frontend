import { Grid } from "@mui/material";
import type { FormikProps } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { gridSpacing } from "src/configs/app-constants";
import type { RailwayStationPlatformLayout } from "src/types/project/other";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomFileUpload from "src/views/shared/form/custome-file-selector";

interface RailwayStationPlatformLayoutFormProps {
  formik: FormikProps<RailwayStationPlatformLayout>;
  defaultFile: File | null;
  onDefaultFileChange: (file: File | null) => void;
}

const RailwayStationPlatformLayoutForm: React.FC<
  RailwayStationPlatformLayoutFormProps
> = ({ formik, defaultFile, onDefaultFileChange }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          required
          label={t(
            "project.other.railway-station-platform-layout.details.name",
          )}
          placeholder="e.g. Central Station, Platform Layout A"
          name="name"
          value={formik.values.name}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t(
            "project.other.railway-station-platform-layout.details.platforms_number",
          )}
          placeholder="e.g. 5"
          name="platforms_number"
          value={formik.values.platforms_number}
          size="small"
          sx={{ mb: 2 }}
          type="number"
        />

        <CustomTextBox
          fullWidth
          label={t(
            "project.other.railway-station-platform-layout.details.platform_configuration",
          )}
          placeholder="e.g. Island platform, Side platform"
          name="platform_configuration"
          value={formik.values.platform_configuration}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t(
            "project.other.railway-station-platform-layout.details.platform_length",
          )}
          placeholder="e.g. 150.5 (meters)"
          name="platform_length"
          value={formik.values.platform_length}
          size="small"
          sx={{ mb: 2 }}
          type="number"
        />

        <CustomTextBox
          fullWidth
          label={t(
            "project.other.railway-station-platform-layout.details.platform_width",
          )}
          placeholder="e.g. 3.5 (meters)"
          name="platform_width"
          value={formik.values.platform_width}
          size="small"
          sx={{ mb: 2 }}
          type="number"
        />

        <CustomTextBox
          fullWidth
          label={t(
            "project.other.railway-station-platform-layout.details.accessibility_features",
          )}
          placeholder="e.g. Ramps, Tactile paving, Elevators"
          name="accessibility_features"
          value={formik.values.accessibility_features}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t(
            "project.other.railway-station-platform-layout.details.remark",
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
          label={t("common.form.station-layout-document-upload")}
          file={defaultFile}
          onFileChange={onDefaultFileChange}
        />
      </Grid>
    </Grid>
  );
};

export default RailwayStationPlatformLayoutForm;