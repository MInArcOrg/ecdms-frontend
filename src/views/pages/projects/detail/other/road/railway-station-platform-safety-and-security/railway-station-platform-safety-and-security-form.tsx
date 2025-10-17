import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import type { FormikProps } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { dropDownConfig } from "src/configs/api-constants";
import { gridSpacing } from "src/configs/app-constants";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import type { RailwayStationPlatformLayout, RailwayStationPlatformSafetyAndSecurity } from "src/types/project/other";
import CustomSelectBox from "src/views/shared/form/custom-select";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomFileUpload from "src/views/shared/form/custome-file-selector";
// Assuming there's a custom UUID/FK selector that would be used instead of CustomTextBox for actual use-case
// For CRUD generation, we stick to CustomTextBox for input fields.

interface RailwayStationPlatformSafetyAndSecurityFormProps {
  formik: FormikProps<RailwayStationPlatformSafetyAndSecurity>;
  defaultFile: File | null;
  onDefaultFileChange: (file: File | null) => void;
}

const RailwayStationPlatformSafetyAndSecurityForm: React.FC<
  RailwayStationPlatformSafetyAndSecurityFormProps
> = ({ formik, defaultFile, onDefaultFileChange }) => {
  const { t } = useTranslation();

  const { data: platformIdentifications } = useQuery({
    queryKey: ["platform-identifications"],
    queryFn: () =>
      projectOtherApiSecondService<RailwayStationPlatformLayout>().getAll('railway-station-platform-layouts', dropDownConfig()),
  });
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelectBox
          fullWidth
          required
          label={t(
            "project.other.railway-station-platform-safety-and-security.details.railway_station_platform_layout_id",
          )}
          name="railway_station_platform_layout_id"
          options={platformIdentifications?.payload.map(
            (item) => ({
              label: item.name,
              value: item.id,
            }),
          ) || []}
          value={formik.values.railway_station_platform_layout_id}
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t(
            "project.other.railway-station-platform-safety-and-security.details.platform_safety_and_security",
          )}
          placeholder="e.g. Platform edge doors, Emergency stop buttons"
          name="platform_safety_and_security"
          value={formik.values.platform_safety_and_security}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t(
            "project.other.railway-station-platform-safety-and-security.details.fire_safety_measures",
          )}
          placeholder="e.g. Fire extinguishers, Smoke detectors, Evacuation routes"
          name="fire_safety_measures"
          value={formik.values.fire_safety_measures}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t(
            "project.other.railway-station-platform-safety-and-security.details.surveillance_systems",
          )}
          placeholder="e.g. CCTV locations, Recording systems"
          name="surveillance_systems"
          value={formik.values.surveillance_systems}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t(
            "project.other.railway-station-platform-safety-and-security.details.remark"
          )}
          placeholder={t(
            "project.other.railway-station-platform-safety-and-security.details.remark"
          )}
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

export default RailwayStationPlatformSafetyAndSecurityForm;