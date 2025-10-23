// src/views/project/other/railway-maintenance-workforce-and-facility-staff/railway-maintenance-workforce-and-facility-staff-form.tsx

import { Grid, Typography } from '@mui/material';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import type { RailwayMaintenanceWorkforceAndFacilityStaff } from 'src/types/project/other';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';
import type { FileTypeConfig } from './file-type-config';
import CustomSwitch from 'src/views/shared/form/custom-switch';


interface RailwayMaintenanceWorkforceAndFacilityStaffFormProps {
  formik: FormikProps<RailwayMaintenanceWorkforceAndFacilityStaff>;
  fileTypesConfig: FileTypeConfig[];
  fileStates: Record<string, File | null>;
  onFileChange: (key: string, file: File | null) => void;
}

const RailwayMaintenanceWorkforceAndFacilityStaffForm: React.FC<RailwayMaintenanceWorkforceAndFacilityStaffFormProps> = ({
  formik,
  fileTypesConfig,
  fileStates,
  onFileChange
}) => {
  const { t } = useTranslation();

  // Locale keys for fields - will be used for both label and placeholder
  const FACILITY_NAME_KEY = 'project.other.railway-maintenance-workforce-and-facility-staff.details.facility-name';
  const PERSONNEL_NUMBER_KEY = 'project.other.railway-maintenance-workforce-and-facility-staff.details.maintenance-personnel-number';
  const STAFF_FACILITIES_KEY = 'project.other.railway-maintenance-workforce-and-facility-staff.details.staff-facilities';
  const TRAINING_RESOURCES_KEY = 'project.other.railway-maintenance-workforce-and-facility-staff.details.training-facilities-and-resources';
  const INSTRUCTORS_NUMBER_KEY = 'project.other.railway-maintenance-workforce-and-facility-staff.details.trainers-instructors-number';
  const REMARK_KEY = 'project.other.railway-maintenance-workforce-and-facility-staff.details.remark';


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

        {/* 2. maintenance_personnel_number (Number Field) - Label=Placeholder=Key Convention */}
        <CustomTextBox
          fullWidth
          required
          label={t(PERSONNEL_NUMBER_KEY)}
          placeholder={t(PERSONNEL_NUMBER_KEY)}
          name="maintenance_personnel_number"
          type="number"
          value={formik.values.maintenance_personnel_number === null ? '' : formik.values.maintenance_personnel_number}
          size="small"
          sx={{ mb: 2 }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {/* 3. staff_facilities (Boolean Checkbox) */}
        <CustomSwitch
          label={t(STAFF_FACILITIES_KEY)}
          name="staff_facilities"
          sx={{ mb: 2 }}
        />

        {/* 4. training_facilities_and_resources (Boolean Checkbox) */}
        <CustomSwitch
          label={t(TRAINING_RESOURCES_KEY)}
          name="training_facilities_and_resources"
          sx={{ mb: 2 }}
        />

        {/* 5. trainers_instructors_number (Number Field) - Label=Placeholder=Key Convention */}
        <CustomTextBox
          fullWidth
          label={t(INSTRUCTORS_NUMBER_KEY)}
          placeholder={t(INSTRUCTORS_NUMBER_KEY)}
          name="trainers_instructors_number"
          type="number"
          value={formik.values.trainers_instructors_number === null ? '' : formik.values.trainers_instructors_number}
          size="small"
          sx={{ mb: 2 }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {/* 6. remark (Text Field) - Label=Placeholder=Key Convention */}
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

export default RailwayMaintenanceWorkforceAndFacilityStaffForm;