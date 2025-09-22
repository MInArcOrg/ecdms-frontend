"use client";

import { Grid, Typography, Divider } from "@mui/material";
import type { FormikProps } from "formik";
import type React from "react";
import { useTranslation } from "react-i18next";
import { gridSpacing } from "src/configs/app-constants";
import type {
  ElectricSmartMetersData,
  ElectricSmartMetersRatingsData,
} from "src/types/project/other";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomFileUpload from "src/views/shared/form/custome-file-selector";
import CustomSelect from "src/views/shared/form/custom-select";

interface ElectricSmartMetersRatingsDataFormProps {
  formik: FormikProps<ElectricSmartMetersRatingsData>;
  file: File | null;
  onFileChange: (file: File | null) => void;
  electricSmartMetersData: ElectricSmartMetersData[];
}

const ElectricSmartMetersRatingsDataForm: React.FC<
  ElectricSmartMetersRatingsDataFormProps
> = ({ formik, file, onFileChange, electricSmartMetersData }) => {
  const { t: transl } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          {transl(
            "project.other.electric-smart-meters-ratings-data.general-information",
          )}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomSelect
              fullWidth
              required
              label={transl(
                "project.other.electric-smart-meters-ratings-data.details.electric-smart-meters-data-id",
              )}
              name="electric_smart_meters_data_id"
              size="small"
              sx={{ mb: 2 }}
              options={
                electricSmartMetersData?.map(
                  (data: ElectricSmartMetersData) => ({
                    label: data.name,
                    value: data.id,
                  }),
                ) || []
              }
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextBox
              fullWidth
              required
              label={transl(
                "project.other.electric-smart-meters-ratings-data.details.name",
              )}
              placeholder={transl(
                "project.other.electric-smart-meters-ratings-data.details.name",
              )}
              name="name"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl(
            "project.other.electric-smart-meters-ratings-data.technical-specifications",
          )}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomSelect
              fullWidth
              required
              label={transl(
                "project.other.electric-smart-meters-ratings-data.details.active-reactive",
              )}
              name="active_reactive"
              size="small"
              sx={{ mb: 2 }}
              options={[
                { label: "Active", value: "Active" },
                { label: "Reactive", value: "Reactive" },
              ]}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.electric-smart-meters-ratings-data.details.kwh-kvarh-rating",
              )}
              placeholder={transl(
                "project.other.electric-smart-meters-ratings-data.details.kwh-kvarh-rating",
              )}
              name="kwh_kvarh_rating"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomSelect
              fullWidth
              required
              label={transl(
                "project.other.electric-smart-meters-ratings-data.details.phase",
              )}
              name="phase"
              size="small"
              sx={{ mb: 2 }}
              options={[
                { label: "Single Phase", value: "Single Phase" },
                { label: "Three Phase", value: "Three Phase" },
              ]}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl(
                "project.other.electric-smart-meters-ratings-data.details.maximum-current-rating",
              )}
              placeholder={transl(
                "project.other.electric-smart-meters-ratings-data.details.maximum-current-rating",
              )}
              name="maximum_current_rating"
              type="number"
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
                "project.other.electric-smart-meters-ratings-data.details.other",
              )}
              placeholder={transl(
                "project.other.electric-smart-meters-ratings-data.details.other",
              )}
              name="other"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl(
            "project.other.electric-smart-meters-ratings-data.additional-information",
          )}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <CustomTextBox
          fullWidth
          label={transl(
            "project.other.electric-smart-meters-ratings-data.details.remark",
          )}
          placeholder={transl(
            "project.other.electric-smart-meters-ratings-data.details.remark",
          )}
          name="remark"
          size="small"
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />
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

export default ElectricSmartMetersRatingsDataForm;
