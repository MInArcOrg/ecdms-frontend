// src/views/project/other/railway-power-supply-maintenance-and-testing/railway-power-supply-maintenance-and-testing-form.tsx

import { Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { dropDownConfig } from 'src/configs/api-constants';
import { gridSpacing } from 'src/configs/app-constants';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { RailwayPowerSupplyMaintenanceAndTesting, RailwayStationPlatformLayout } from 'src/types/project/other';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';
import type { FileTypeConfig } from './file-type-config';
import CustomSwitch from 'src/views/shared/form/custom-switch';
import CustomDynamicDatePicker from 'src/views/shared/form/custom-dynamic-date-box';


interface RailwayPowerSupplyMaintenanceAndTestingFormProps {
  formik: FormikProps<RailwayPowerSupplyMaintenanceAndTesting>;
  fileTypesConfig: FileTypeConfig[];
  fileStates: Record<string, File | null>;
  onFileChange: (key: string, file: File | null) => void;
}

const RailwayPowerSupplyMaintenanceAndTestingForm: React.FC<RailwayPowerSupplyMaintenanceAndTestingFormProps> = ({
  formik,
  fileTypesConfig,
  fileStates,
  onFileChange
}) => {
  const { t } = useTranslation();

  // Fetching platform layouts for the dropdown
  const { data: platformLayouts } = useQuery({
    queryKey: ['platform-layouts-for-power-supply-maintenance'],
    queryFn: () => projectOtherApiSecondService<RailwayStationPlatformLayout>().getAll('railway-station-platform-layouts', dropDownConfig())
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        {/* 1. railway_station_platform_layout_id (Required FK) */}
        <CustomSelectBox
          fullWidth
          required
          label={t('project.other.railway-power-supply-maintenance-and-testing.details.platform-layout')}
          name="railway_station_platform_layout_id"
          options={
            platformLayouts?.payload.map((item) => ({
              label: item.name,
              value: item.id
            })) || []
          }
          value={formik.values.railway_station_platform_layout_id}
          size="small"
          sx={{ mb: 2 }}
        />

        {/* 2. maintenance_schedules_and_activities (Boolean) */}
        <CustomSwitch
          label={t('project.other.railway-power-supply-maintenance-and-testing.details.maintenance-schedules-and-activities')}
          name="maintenance_schedules_and_activities"
          checked={formik.values.maintenance_schedules_and_activities || false}
          onChange={formik.handleChange}
          sx={{ mb: 2 }}
        />

        {/* 3. testing_and_commissioning_procedures (Boolean) */}
        <CustomSwitch
          label={t('project.other.railway-power-supply-maintenance-and-testing.details.testing-and-commissioning-procedures')}
          name="testing_and_commissioning_procedures"
          checked={formik.values.testing_and_commissioning_procedures || false}
          onChange={formik.handleChange}
          sx={{ mb: 2 }}
        />


        <CustomDynamicDatePicker
          fullWidth
          label={t('project.other.railway-power-supply-maintenance-and-testing.details.recent-maintenance-records-date')}
          name="recent_maintenance_records_date"
          value={formik.values.recent_maintenance_records_date || null}
          required
          showYearDropdown
          showMonthDropdown
          customInput={<CustomTextBox name="recent_maintenance_records_date" />}
        />

        {/* 5. remark (Optional Text) */}
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-power-supply-maintenance-and-testing.details.remark')}
          placeholder={t('common.form.remark-placeholder')}
          name="remark"
          value={formik.values.remark}
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={3}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>{t("common.form.attachment")}</Typography>

        {/* Dynamic File Uploads */}
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

export default RailwayPowerSupplyMaintenanceAndTestingForm;