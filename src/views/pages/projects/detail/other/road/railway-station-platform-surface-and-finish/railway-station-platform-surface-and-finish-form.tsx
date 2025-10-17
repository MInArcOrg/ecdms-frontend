import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import type { FormikProps } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { dropDownConfig } from "src/configs/api-constants";
import { gridSpacing } from "src/configs/app-constants";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import type { RailwayStationPlatformLayout, RailwayStationPlatformSurfaceAndFinish } from "src/types/project/other";
import CustomSelectBox from "src/views/shared/form/custom-select";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomFileUpload from "src/views/shared/form/custome-file-selector";

interface RailwayStationPlatformSurfaceAndFinishFormProps {
  formik: FormikProps<RailwayStationPlatformSurfaceAndFinish>;
  defaultFile: File | null;
  onDefaultFileChange: (file: File | null) => void;
}

const RailwayStationPlatformSurfaceAndFinishForm: React.FC<
  RailwayStationPlatformSurfaceAndFinishFormProps
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
            "project.other.railway-station-platform-surface-and-finish.details.railway_station_platform_layout_id",
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
            "project.other.railway-station-platform-surface-and-finish.details.flooring_materials",
          )}
          placeholder="e.g. Concrete, Pavers, Tiles"
          name="flooring_materials"
          value={formik.values.flooring_materials}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t(
            "project.other.railway-station-platform-surface-and-finish.details.surface_treatment",
          )}
          placeholder="e.g. Anti-slip coating, Waterproofing"
          name="surface_treatment"
          value={formik.values.surface_treatment}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t(
            "project.other.railway-station-platform-surface-and-finish.details.paint_or_color_schemes",
          )}
          placeholder="e.g. Yellow boundary lines, visual cues"
          name="paint_or_color_schemes"
          value={formik.values.paint_or_color_schemes}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t(
            "project.other.railway-station-platform-surface-and-finish.details.remark",
          )}
          placeholder={t(
            "project.other.railway-station-platform-surface-and-finish.details.remark",

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

export default RailwayStationPlatformSurfaceAndFinishForm;