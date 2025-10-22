// src/views/project/other/railway-power-supply-safety-and-compliance/railway-power-supply-safety-and-compliance-form.tsx

import { Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { dropDownConfig } from 'src/configs/api-constants';
import { gridSpacing } from 'src/configs/app-constants';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { RailwayPowerSupplySafetyAndCompliance, RailwayStationPlatformLayout } from 'src/types/project/other';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';
import type { FileTypeConfig } from './file-type-config';
import CustomSwitch from 'src/views/shared/form/custom-switch';


interface RailwayPowerSupplySafetyAndComplianceFormProps {
  formik: FormikProps<RailwayPowerSupplySafetyAndCompliance>;
  fileTypesConfig: FileTypeConfig[];
  fileStates: Record<string, File | null>;
  onFileChange: (key: string, file: File | null) => void;
}

const RailwayPowerSupplySafetyAndComplianceForm: React.FC<RailwayPowerSupplySafetyAndComplianceFormProps> = ({
  formik,
  fileTypesConfig,
  fileStates,
  onFileChange
}) => {
  const { t } = useTranslation();

  // Fetching platform layouts for the dropdown
  const { data: platformLayouts } = useQuery({
    queryKey: ['platform-layouts-for-safety-compliance'],
    queryFn: () => projectOtherApiSecondService<RailwayStationPlatformLayout>().getAll('railway-station-platform-layouts', dropDownConfig())
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        {/* 1. railway_station_platform_layout_id (Required FK) */}
        <CustomSelectBox
          fullWidth
          required
          label={t('project.other.railway-power-supply-safety-and-compliance.details.platform-layout')}
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

        {/* 2. safety_measures_and_protocols (Boolean Checkbox) */}
        <CustomSwitch
          label={t('project.other.railway-power-supply-safety-and-compliance.details.safety-measures-and-protocols')}
          name="safety_measures_and_protocols"
          size="small"
          sx={{ mb: 2 }}
        />

        {/* 3. compliance_with_electrical_safety_standards_and_regulations (Boolean Checkbox) */}
        <CustomSwitch
          label={t('project.other.railway-power-supply-safety-and-compliance.details.compliance-with-electrical-safety-standards-and-regulations')}
          name="compliance_with_electrical_safety_standards_and_regulations"
          size="small"
          sx={{ mb: 2 }}
        />

        {/* 4. remark (Text Field) */}
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-power-supply-safety-and-compliance.details.remark')}
          placeholder={t('common.form.remark')}
          name="remark"
          value={formik.values.remark}
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={4}
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

export default RailwayPowerSupplySafetyAndComplianceForm;