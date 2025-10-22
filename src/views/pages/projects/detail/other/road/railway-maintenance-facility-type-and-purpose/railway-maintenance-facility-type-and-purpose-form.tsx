// src/views/project/other/railway-maintenance-facility-type-and-purpose/railway-maintenance-facility-type-and-purpose-form.tsx

import { Grid, Typography } from '@mui/material';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import type { RailwayMaintenanceFacilityTypeAndPurpose } from 'src/types/project/other';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';
import type { FileTypeConfig } from './file-type-config';


interface RailwayMaintenanceFacilityTypeAndPurposeFormProps {
  formik: FormikProps<RailwayMaintenanceFacilityTypeAndPurpose>;
  fileTypesConfig: FileTypeConfig[];
  fileStates: Record<string, File | null>;
  onFileChange: (key: string, file: File | null) => void;
}

const RailwayMaintenanceFacilityTypeAndPurposeForm: React.FC<RailwayMaintenanceFacilityTypeAndPurposeFormProps> = ({
  formik,
  fileTypesConfig,
  fileStates,
  onFileChange
}) => {
  const { t } = useTranslation();

  // Note: No foreign key to fetch for this model.

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        {/* 1. facility_name (String Field) */}
        <CustomTextBox
          fullWidth
          required
          label={t('project.other.railway-maintenance-facility-type-and-purpose.details.facility-name')}
          placeholder={t('common.form.facility-name-placeholder')}
          name="facility_name"
          value={formik.values.facility_name}
          size="small"
          sx={{ mb: 2 }}
        />

        {/* 2. maintenance_facility_type (String Field) */}
        <CustomTextBox
          fullWidth
          required
          label={t('project.other.railway-maintenance-facility-type-and-purpose.details.maintenance-facility-type')}
          placeholder={t('common.form.facility-type-placeholder')}
          name="maintenance_facility_type"
          value={formik.values.maintenance_facility_type}
          size="small"
          sx={{ mb: 2 }}
        />

        {/* 3. maintenance_activities_conducted (Text Field) */}
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-maintenance-facility-type-and-purpose.details.maintenance-activities-conducted')}
          placeholder={t('project.other.railway-maintenance-facility-type-and-purpose.details.maintenance-activities-conducted')}
          name="maintenance_activities_conducted"
          value={formik.values.maintenance_activities_conducted}
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={4}
        />

        {/* 4. remark (Text Field) */}
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-maintenance-facility-type-and-purpose.details.remark')}
          placeholder={t('project.other.railway-maintenance-facility-type-and-purpose.details.remark')}
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

export default RailwayMaintenanceFacilityTypeAndPurposeForm;