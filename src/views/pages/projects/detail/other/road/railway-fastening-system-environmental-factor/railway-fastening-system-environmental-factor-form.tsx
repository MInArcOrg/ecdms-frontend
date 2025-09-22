import { Grid } from "@mui/material";
import type { FormikProps } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { gridSpacing } from "src/configs/app-constants";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import type { RailwayFasteningSystemEnvironmentalFactor } from "src/types/project/other";
import CustomFileUpload from "src/views/shared/form/custome-file-selector"; // Updated import path

interface RailwayFasteningSystemEnvironmentalFactorFormProps {
  formik: FormikProps<RailwayFasteningSystemEnvironmentalFactor>;
  fasteningSystemConditionDocumentationFile: File | null;
  onFasteningSystemConditionDocumentationFileChange: (
    file: File | null,
  ) => void;
  defaultFile: File | null;
  onDefaultFileChange: (file: File | null) => void; // Renamed from 'onFileChange' for clarity
}

const RailwayFasteningSystemEnvironmentalFactorForm: React.FC<
  RailwayFasteningSystemEnvironmentalFactorFormProps
> = ({
  formik,
  fasteningSystemConditionDocumentationFile,
  onFasteningSystemConditionDocumentationFileChange,
  defaultFile, // Used renamed prop
  onDefaultFileChange, // Used renamed prop
}) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t(
            "project.other.railway-fastening-system-environmental-factor.details.railway_line_section_name",
          )}
          placeholder={t(
            "project.other.railway-fastening-system-environmental-factor.details.railway_line_section_name",
          )}
          name="railway_line_section_name"
          value={formik.values.railway_line_section_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.railway_line_section_name &&
            Boolean(formik.errors.railway_line_section_name)
          }
          helperText={
            formik.touched.railway_line_section_name &&
            formik.errors.railway_line_section_name
          }
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t(
            "project.other.railway-fastening-system-environmental-factor.details.environmental_compliance_measures",
          )}
          placeholder={t(
            "project.other.railway-fastening-system-environmental-factor.details.environmental_compliance_measures",
          )}
          name="environmental_compliance_measures"
          value={formik.values.environmental_compliance_measures}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.environmental_compliance_measures &&
            Boolean(formik.errors.environmental_compliance_measures)
          }
          helperText={
            formik.touched.environmental_compliance_measures &&
            formik.errors.environmental_compliance_measures
          }
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={2}
        />

        <CustomTextBox
          fullWidth
          label={t(
            "project.other.railway-fastening-system-environmental-factor.details.environmental_impact_assessment",
          )}
          placeholder={t(
            "project.other.railway-fastening-system-environmental-factor.details.environmental_impact_assessment",
          )}
          name="environmental_impact_assessment"
          value={formik.values.environmental_impact_assessment}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.environmental_impact_assessment &&
            Boolean(formik.errors.environmental_impact_assessment)
          }
          helperText={
            formik.touched.environmental_impact_assessment &&
            formik.errors.environmental_impact_assessment
          }
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={2}
        />

        <CustomTextBox
          fullWidth
          label={t(
            "project.other.railway-fastening-system-environmental-factor.details.remark",
          )}
          placeholder={t(
            "project.other.railway-fastening-system-environmental-factor.details.remark",
          )}
          name="remark"
          value={formik.values.remark}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.remark && Boolean(formik.errors.remark)}
          helperText={formik.touched.remark && formik.errors.remark}
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={4}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomFileUpload
          label={t(
            "project.other.railway-fastening-system-environmental-factor.details.fastening_system_condition_documentation",
          )}
          file={fasteningSystemConditionDocumentationFile}
          onFileChange={onFasteningSystemConditionDocumentationFileChange}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomFileUpload
          label={t("common.form.file-upload")}
          file={defaultFile}
          onFileChange={onDefaultFileChange}
        />
      </Grid>
    </Grid>
  );
};

export default RailwayFasteningSystemEnvironmentalFactorForm;
