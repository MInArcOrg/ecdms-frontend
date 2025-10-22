// src/views/project/other/railway-power-supply-environmental-and-other-factor/railway-power-supply-environmental-and-other-factor-form.tsx

import { Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { dropDownConfig } from 'src/configs/api-constants';
import { gridSpacing } from 'src/configs/app-constants';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { RailwayPowerSupplyEnvironmentalAndOtherFactor, RailwayStationPlatformLayout } from 'src/types/project/other';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';
import type { FileTypeConfig } from './file-type-config';


interface RailwayPowerSupplyEnvironmentalAndOtherFactorFormProps {
  formik: FormikProps<RailwayPowerSupplyEnvironmentalAndOtherFactor>;
  fileTypesConfig: FileTypeConfig[];
  fileStates: Record<string, File | null>;
  onFileChange: (key: string, file: File | null) => void;
}

const RailwayPowerSupplyEnvironmentalAndOtherFactorForm: React.FC<RailwayPowerSupplyEnvironmentalAndOtherFactorFormProps> = ({
  formik,
  fileTypesConfig,
  fileStates,
  onFileChange
}) => {
  const { t } = useTranslation();

  // Fetching platform layouts for the dropdown
  const { data: platformLayouts } = useQuery({
    queryKey: ['platform-layouts-for-environmental-factor'],
    queryFn: () => projectOtherApiSecondService<RailwayStationPlatformLayout>().getAll('railway-station-platform-layouts', dropDownConfig())
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        {/* 1. railway_station_platform_layout_id (Required FK) */}
        <CustomSelectBox
          fullWidth
          required
          label={t('project.other.railway-power-supply-environmental-and-other-factor.details.platform-layout')}
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

        {/* 2. environmental_compliance_measures (Text Field) */}
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-power-supply-environmental-and-other-factor.details.environmental-compliance-measures')}
          placeholder={t('common.form.compliance-measures-placeholder')}
          name="environmental_compliance_measures"
          value={formik.values.environmental_compliance_measures}
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

export default RailwayPowerSupplyEnvironmentalAndOtherFactorForm;