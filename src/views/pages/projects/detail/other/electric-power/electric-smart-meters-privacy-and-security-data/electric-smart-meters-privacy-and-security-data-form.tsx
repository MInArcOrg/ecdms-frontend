"use client";

import {
  Grid,
  Typography,
  Divider,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import type { FormikProps } from "formik";
import type React from "react";
import { useTranslation } from "react-i18next";
import { gridSpacing } from "src/configs/app-constants";
import type {
  ElectricSmartMetersData,
  ElectricSmartMetersPrivacyAndSecurityData,
} from "src/types/project/other";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomFileUpload from "src/views/shared/form/custome-file-selector";
import CustomSelect from "src/views/shared/form/custom-select";

interface ElectricSmartMetersPrivacyAndSecurityDataFormProps {
  formik: FormikProps<ElectricSmartMetersPrivacyAndSecurityData>;
  file: File | null;
  onFileChange: (file: File | null) => void;
  electricSmartMetersData: ElectricSmartMetersData[];
  privacyMeasuresTypes: any[];
  customerEngagementFrequencies: any[];
  customerEngagementProgramTypes: any[];
}

const ElectricSmartMetersPrivacyAndSecurityDataForm: React.FC<
  ElectricSmartMetersPrivacyAndSecurityDataFormProps
> = ({
  formik,
  file,
  onFileChange,
  electricSmartMetersData,
  privacyMeasuresTypes,
  customerEngagementFrequencies,
  customerEngagementProgramTypes,
}) => {
  const { t: transl } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          {transl(
            "project.other.electric-smart-meters-privacy-and-security-data.general-information",
          )}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomSelect
              fullWidth
              required
              label={transl(
                "project.other.electric-smart-meters-privacy-and-security-data.details.electric-smart-meters-data-id",
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
                "project.other.electric-smart-meters-privacy-and-security-data.details.name",
              )}
              placeholder={transl(
                "project.other.electric-smart-meters-privacy-and-security-data.details.name",
              )}
              name="name"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl(
            "project.other.electric-smart-meters-privacy-and-security-data.privacy-information",
          )}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.privacy_measures_implemented || false}
                  onChange={(e) => {
                    formik.setFieldValue(
                      "privacy_measures_implemented",
                      e.target.checked,
                    );
                  }}
                  name="privacy_measures_implemented"
                />
              }
              label={transl(
                "project.other.electric-smart-meters-privacy-and-security-data.details.privacy-measures-implemented",
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomSelect
              fullWidth
              required
              label={transl(
                "project.other.electric-smart-meters-privacy-and-security-data.details.privacy-measures-type-id",
              )}
              name="privacy_measures_type_id"
              size="small"
              sx={{ mb: 2 }}
              options={
                privacyMeasuresTypes?.map((type: any) => ({
                  label: type.title,
                  value: type.id,
                })) || []
              }
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl(
            "project.other.electric-smart-meters-privacy-and-security-data.customer-engagement",
          )}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomSelect
              fullWidth
              required
              label={transl(
                "project.other.electric-smart-meters-privacy-and-security-data.details.customer-engagement-frequency-id",
              )}
              name="customer_engagement_frequency_id"
              size="small"
              sx={{ mb: 2 }}
              options={
                customerEngagementFrequencies?.map((frequency: any) => ({
                  label: frequency.title,
                  value: frequency.id,
                })) || []
              }
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    formik.values.customer_engagement_programs_implemented ||
                    false
                  }
                  onChange={(e) => {
                    formik.setFieldValue(
                      "customer_engagement_programs_implemented",
                      e.target.checked,
                    );
                  }}
                  name="customer_engagement_programs_implemented"
                />
              }
              label={transl(
                "project.other.electric-smart-meters-privacy-and-security-data.details.customer-engagement-programs-implemented",
              )}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomSelect
              fullWidth
              required
              label={transl(
                "project.other.electric-smart-meters-privacy-and-security-data.details.customer-engagement-programs-type-id",
              )}
              name="customer_engagement_programs_type_id"
              size="small"
              sx={{ mb: 2 }}
              options={
                customerEngagementProgramTypes?.map((type: any) => ({
                  label: type.title,
                  value: type.id,
                })) || []
              }
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl(
            "project.other.electric-smart-meters-privacy-and-security-data.social-impact",
          )}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    formik.values.social_impact_assessment_conducted || false
                  }
                  onChange={(e) => {
                    formik.setFieldValue(
                      "social_impact_assessment_conducted",
                      e.target.checked,
                    );
                  }}
                  name="social_impact_assessment_conducted"
                />
              }
              label={transl(
                "project.other.electric-smart-meters-privacy-and-security-data.details.social-impact-assessment-conducted",
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    formik.values
                      .resettlement_and_compensation_measures_implemented ||
                    false
                  }
                  onChange={(e) => {
                    formik.setFieldValue(
                      "resettlement_and_compensation_measures_implemented",
                      e.target.checked,
                    );
                  }}
                  name="resettlement_and_compensation_measures_implemented"
                />
              }
              label={transl(
                "project.other.electric-smart-meters-privacy-and-security-data.details.resettlement-and-compensation-measures-implemented",
              )}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl(
            "project.other.electric-smart-meters-privacy-and-security-data.additional-information",
          )}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <CustomTextBox
          fullWidth
          label={transl(
            "project.other.electric-smart-meters-privacy-and-security-data.details.remark",
          )}
          placeholder={transl(
            "project.other.electric-smart-meters-privacy-and-security-data.details.remark",
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

export default ElectricSmartMetersPrivacyAndSecurityDataForm;
