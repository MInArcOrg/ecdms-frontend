// src/views/project/other/railway-maintenance-facility-and-security/railway-maintenance-facility-and-security-form.tsx

import { Grid, Typography } from '@mui/material';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import type { RailwayMaintenanceFacilityAndSecurity } from 'src/types/project/other';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';
import type { FileTypeConfig } from './file-type-config';
import CustomSwitch from 'src/views/shared/form/custom-switch';


interface RailwayMaintenanceFacilityAndSecurityFormProps {
  formik: FormikProps<RailwayMaintenanceFacilityAndSecurity>;
  fileTypesConfig: FileTypeConfig[];
  fileStates: Record<string, File | null>;
  onFileChange: (key: string, file: File | null) => void;
}

const RailwayMaintenanceFacilityAndSecurityForm: React.FC<RailwayMaintenanceFacilityAndSecurityFormProps> = ({
  formik,
  fileTypesConfig,
  fileStates,
  onFileChange
}) => {
  const { t } = useTranslation();

  // Locale keys for fields - will be used for both label and placeholder
  const FACILITY_NAME_KEY = 'project.other.railway-maintenance-facility-and-security.details.facility-name';
  const FIRE_SAFETY_KEY = 'project.other.railway-maintenance-facility-and-security.details.fire-safety-measures';
  const VENTILATION_AVAIL_KEY = 'project.other.railway-maintenance-facility-and-security.details.ventilations-and-exhaust-system-availability';
  const SECURITY_MEASURES_KEY = 'project.other.railway-maintenance-facility-and-security.details.security-measures';
  const REMARK_KEY = 'project.other.railway-maintenance-facility-and-security.details.remark';


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

        {/* 2. fire_safety_measures (String Field) - Label=Placeholder=Key Convention */}
        <CustomTextBox
          fullWidth
          required
          label={t(FIRE_SAFETY_KEY)}
          placeholder={t(FIRE_SAFETY_KEY)}
          name="fire_safety_measures"
          value={formik.values.fire_safety_measures}
          size="small"
          multiline
          rows={2}
          sx={{ mb: 2 }}
        />

        {/* 3. ventilation_and_exhaust_system_availability (Boolean Checkbox) */}
        <CustomSwitch
          label={t(VENTILATION_AVAIL_KEY)}
          name="ventilation_and_exhaust_system_availability"
          size="small"
          sx={{ mb: 2 }}
        />

        {/* 4. security_measures (String Field) - Label=Placeholder=Key Convention */}
        <CustomTextBox
          fullWidth
          required
          label={t(SECURITY_MEASURES_KEY)}
          placeholder={t(SECURITY_MEASURES_KEY)}
          name="security_measures"
          value={formik.values.security_measures}
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

export default RailwayMaintenanceFacilityAndSecurityForm;