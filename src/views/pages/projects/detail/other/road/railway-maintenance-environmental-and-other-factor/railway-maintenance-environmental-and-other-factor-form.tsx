// src/views/project/other/railway-maintenance-environmental-and-other-factor/railway-maintenance-environmental-and-other-factor-form.tsx

import { Grid, Typography } from '@mui/material';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import type { RailwayMaintenanceEnvironmentalAndOtherFactor } from 'src/types/project/other';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';
import type { FileTypeConfig } from './file-type-config';


interface RailwayMaintenanceEnvironmentalAndOtherFactorFormProps {
  formik: FormikProps<RailwayMaintenanceEnvironmentalAndOtherFactor>;
  fileTypesConfig: FileTypeConfig[];
  fileStates: Record<string, File | null>;
  onFileChange: (key: string, file: File | null) => void;
}

const RailwayMaintenanceEnvironmentalAndOtherFactorForm: React.FC<RailwayMaintenanceEnvironmentalAndOtherFactorFormProps> = ({
  formik,
  fileTypesConfig,
  fileStates,
  onFileChange
}) => {
  const { t } = useTranslation();

  // Locale keys for fields - will be used for both label and placeholder
  const FACILITY_NAME_KEY = 'project.other.railway-maintenance-environmental-and-other-factor.details.facility-name';
  const ENVIRONMENTAL_COMPLIANCE_KEY = 'project.other.railway-maintenance-environmental-and-other-factor.details.environmental-compliance-measures';
  const NOISE_REDUCTION_KEY = 'project.other.railway-maintenance-environmental-and-other-factor.details.noise-reduction-measures';
  const SUSTAINABLE_DESIGN_KEY = 'project.other.railway-maintenance-environmental-and-other-factor.details.sustainable-design-features';
  const REMARK_KEY = 'project.other.railway-maintenance-environmental-and-other-factor.details.remark';


  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        {/* 1. facility_name (String Field) - Label=Placeholder=Key Convention */}
        <CustomTextBox
          fullWidth
          required
          label={t(FACILITY_NAME_KEY)}
          placeholder={t(FACILITY_NAME_KEY)}
          name="facility_name"
          value={formik.values.facility_name}
          size="small"
          sx={{ mb: 2 }}
        />

        {/* 2. environmental_compliance_measures (String Field) - Label=Placeholder=Key Convention */}
        <CustomTextBox
          fullWidth
          required
          label={t(ENVIRONMENTAL_COMPLIANCE_KEY)}
          placeholder={t(ENVIRONMENTAL_COMPLIANCE_KEY)}
          name="environmental_compliance_measures"
          value={formik.values.environmental_compliance_measures}
          size="small"
          multiline
          rows={2}
          sx={{ mb: 2 }}
        />

        {/* 3. noise_reduction_measures (String Field) - Label=Placeholder=Key Convention */}
        <CustomTextBox
          fullWidth
          required
          label={t(NOISE_REDUCTION_KEY)}
          placeholder={t(NOISE_REDUCTION_KEY)}
          name="noise_reduction_measures"
          value={formik.values.noise_reduction_measures}
          size="small"
          multiline
          rows={2}
          sx={{ mb: 2 }}
        />

        {/* 4. sustainable_design_features (String Field) - Label=Placeholder=Key Convention */}
        <CustomTextBox
          fullWidth
          required
          label={t(SUSTAINABLE_DESIGN_KEY)}
          placeholder={t(SUSTAINABLE_DESIGN_KEY)}
          name="sustainable_design_features"
          value={formik.values.sustainable_design_features}
          size="small"
          multiline
          rows={2}
          sx={{ mb: 2 }}
        />


        {/* 5. remark (Text Field) - Label=Placeholder=Key Convention */}
        <CustomTextBox
          fullWidth
          label={t(REMARK_KEY)}
          placeholder={t(REMARK_KEY)}
          name="remark"
          value={formik.values.remark}
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={2}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>{t("common.form.attachment")}</Typography>

        {/* Dynamic File Uploads (Only one in this case) */}
        {fileTypesConfig.map((fileConfig) => (
          <CustomFileUpload
            key={fileConfig.key}
            label={t(fileConfig.titleTKey)}
            file={fileStates[fileConfig.key]}
            onFileChange={(file) => onFileChange(fileConfig.key, file)}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default RailwayMaintenanceEnvironmentalAndOtherFactorForm;