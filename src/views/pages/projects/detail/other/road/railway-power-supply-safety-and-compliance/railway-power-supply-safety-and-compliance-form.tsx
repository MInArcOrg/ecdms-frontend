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
import CustomSwitch from 'src/views/shared/form/custom-switch';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';
import { FileTypeConfig } from './file-type-config';



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
  const formPath = 'project.other.railway-power-supply-safety-and-compliance.details';

  const { data: platformLayouts } = useQuery({
    queryKey: ['platform-layouts-for-power-supply-safety'],
    queryFn: () => projectOtherApiSecondService<RailwayStationPlatformLayout>().getAll('railway-station-platform-layouts', dropDownConfig())
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelectBox
          required
          label={t(`${formPath}.platform-layout`)}
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

        <CustomSwitch
          label={t(`${formPath}.safety-measures-and-protocols`)}
          name="safety_measures_and_protocols"
          checked={formik.values.safety_measures_and_protocols || false}
          onChange={formik.handleChange}
          sx={{ mb: 2 }}
        />

        <CustomSwitch
          label={t(`${formPath}.compliance-with-electrical-safety-standards-and-regulations`)}
          name="compliance_with_electrical_safety_standards_and_regulations"
          checked={formik.values.compliance_with_electrical_safety_standards_and_regulations || false}
          onChange={formik.handleChange}
          sx={{ mb: 2 }}
        />

        <CustomSwitch
          label={t(`${formPath}.remark`)}
          placeholder={t('common.form.remark-placeholder')}
          name="remark"
          value={formik.values.remark || ''}
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

export default RailwayPowerSupplySafetyAndComplianceForm;
