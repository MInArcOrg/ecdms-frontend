// src/views/project/other/railway-power-distribution/railway-power-distribution-form.tsx

import { Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { dropDownConfig } from 'src/configs/api-constants';
import { gridSpacing } from 'src/configs/app-constants';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { RailwayPowerDistribution, RailwayStationPlatformLayout } from 'src/types/project/other';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';
import type { FileTypeConfig } from './filet-type-config';


interface RailwayPowerDistributionFormProps {
  formik: FormikProps<RailwayPowerDistribution>;
  fileTypesConfig: FileTypeConfig[]; // Array of 4 file configs
  fileStates: Record<string, File | null>; // Current state of the 4 files
  onFileChange: (key: string, file: File | null) => void; // Generic change handler
}

const RailwayPowerDistributionForm: React.FC<RailwayPowerDistributionFormProps> = ({
  formik,
  fileTypesConfig,
  fileStates,
  onFileChange
}) => {
  const { t } = useTranslation();

  // Fetching platform layouts for the dropdown (assuming this is needed for the FK)
  const { data: platformLayouts } = useQuery({
    queryKey: ['platform-layouts-for-power-distribution'],
    queryFn: () => projectOtherApiSecondService<RailwayStationPlatformLayout>().getAll('railway-station-platform-layouts', dropDownConfig())
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        {/* 1. railway_station_platform_layout_id (Required FK) */}
        <CustomSelectBox
          fullWidth
          required
          label={t('project.other.railway-power-distribution.details.railway_station_platform_layout_id')}
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

        {/* 2. remark (Optional Text) */}
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-power-distribution.details.remark')}
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

        {/* Dynamic File Uploads: Renders all four CustomFileUpload components */}
        {fileTypesConfig.map((fileConfig) => (
          <CustomFileUpload
            key={fileConfig.key}
            // Uses the file description key from the config for the label
            label={t(fileConfig.titleTKey)}
            // Retrieves the current file state using the file key
            file={fileStates[fileConfig.key]}
            // Updates the correct state key when a file is selected
            onFileChange={(file) => onFileChange(fileConfig.key, file)}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default RailwayPowerDistributionForm;