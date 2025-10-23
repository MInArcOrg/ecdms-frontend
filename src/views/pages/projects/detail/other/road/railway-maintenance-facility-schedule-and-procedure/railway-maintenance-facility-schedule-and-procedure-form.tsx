// src/views/project/other/railway-maintenance-facility-schedule-and-procedure/railway-maintenance-facility-schedule-and-procedure-form.tsx

import { Grid, Typography } from '@mui/material';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import type { RailwayMaintenanceFacilityScheduleAndProcedure } from 'src/types/project/other';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';
import type { FileTypeConfig } from './file-type-config';
import CustomSwitch from 'src/views/shared/form/custom-switch';


interface RailwayMaintenanceFacilityScheduleAndProcedureFormProps {
  formik: FormikProps<RailwayMaintenanceFacilityScheduleAndProcedure>;
  fileTypesConfig: FileTypeConfig[];
  fileStates: Record<string, File | null>;
  onFileChange: (key: string, file: File | null) => void;
}

const RailwayMaintenanceFacilityScheduleAndProcedureForm: React.FC<RailwayMaintenanceFacilityScheduleAndProcedureFormProps> = ({
  formik,
  fileTypesConfig,
  fileStates,
  onFileChange
}) => {
  const { t } = useTranslation();

  // Locale keys for fields - will be used for both label and placeholder
  const FACILITY_NAME_KEY = 'project.other.railway-maintenance-facility-schedule-and-procedure.details.facility-name';
  const SCHEDULES_AVAIL_KEY = 'project.other.railway-maintenance-facility-schedule-and-procedure.details.maintenance-schedules-and-routines-availability';
  const PROCEDURES_AVAIL_KEY = 'project.other.railway-maintenance-facility-schedule-and-procedure.details.procedures-for-planned-and-preventive-maintenance-availability';
  const RECORD_KEEPING_AVAIL_KEY = 'project.other.railway-maintenance-facility-schedule-and-procedure.details.documentation-and-record-keeping-practices-availability';
  const REMARK_KEY = 'project.other.railway-maintenance-facility-schedule-and-procedure.details.remark';


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

        {/* 2. maintenance_schedules_and_routines_availability (Boolean Checkbox) */}
        <CustomSwitch
          label={t(SCHEDULES_AVAIL_KEY)}
          name="maintenance_schedules_and_routines_availability"
          sx={{ mb: 2 }}
        />

        {/* 3. procedures_for_planned_and_preventive_maintenance_availability (Boolean Checkbox) */}
        <CustomSwitch
          label={t(PROCEDURES_AVAIL_KEY)}
          name="procedures_for_planned_and_preventive_maintenance_availability"
          sx={{ mb: 2 }}
        />

        {/* 4. documentation_and_record_keeping_practices_availability (Boolean Checkbox) */}
        <CustomSwitch
          label={t(RECORD_KEEPING_AVAIL_KEY)}
          name="documentation_and_record_keeping_practices_availability"
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

export default RailwayMaintenanceFacilityScheduleAndProcedureForm;