import { Grid } from "@mui/material";
import type { FormikProps } from "formik";
import type React from "react";
import { useTranslation } from "react-i18next";
import { gridSpacing } from "src/configs/app-constants";
import type { RailwayTracksGeometryData } from "src/types/project/other";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomFileUpload from "src/views/shared/form/custome-file-selector";

interface RailwayTracksGeometryDataFormProps {
  formik: FormikProps<RailwayTracksGeometryData>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const RailwayTracksGeometryDataForm: React.FC<
  RailwayTracksGeometryDataFormProps
> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.railway-tracks-geometry-data.details.alignment",
              )}
              name="alignment"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.railway-tracks-geometry-data.details.gradient",
              )}
              name="gradient"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.railway-tracks-geometry-data.details.curvature-radius",
              )}
              name="curvature_radius"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.railway-tracks-geometry-data.details.cant",
              )}
              name="cant"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.railway-tracks-geometry-data.details.track-gauge",
              )}
              name="track_gauge"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.railway-tracks-geometry-data.details.cross-level",
              )}
              name="cross_level"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.railway-tracks-geometry-data.details.track-surface-profile",
              )}
              name="track_surface_profile"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.railway-tracks-geometry-data.details.twist",
              )}
              name="twist"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.railway-tracks-geometry-data.details.remark",
              )}
              name="remark"
              size="small"
              multiline
              rows={3}
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <CustomFileUpload
          label={transl("common.form.file-upload")}
          file={file}
          onFileChange={onFileChange}
        />
      </Grid>
    </Grid>
  );
};

export default RailwayTracksGeometryDataForm;
