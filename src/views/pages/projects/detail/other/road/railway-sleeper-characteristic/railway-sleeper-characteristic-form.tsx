import { Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

import type { RailwaySleeperCharacteristic } from 'src/types/project/other';

interface RailwaySleeperCharacteristicFormProps {
  formik: FormikProps<RailwaySleeperCharacteristic>;
}

const RailwaySleeperCharacteristicForm: React.FC<RailwaySleeperCharacteristicFormProps> = ({ formik }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-sleeper-characteristic.details.railway_line_section_name')}
          placeholder={t('project.other.railway-sleeper-characteristic.details.railway_line_section_name')}
          name="railway_line_section_name"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-sleeper-characteristic.details.sleeper_type')}
          placeholder={t('project.other.railway-sleeper-characteristic.details.sleeper_type')}
          name="sleeper_type"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-sleeper-characteristic.details.sleeper_size_and_dimensions')}
          placeholder={t('project.other.railway-sleeper-characteristic.details.sleeper_size_and_dimensions')}
          name="sleeper_size_and_dimensions"
          size="small"
          sx={{ mb: 2 }}
          type="number"
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-sleeper-characteristic.details.sleeper_distance_between_pairs')}
          placeholder={t('project.other.railway-sleeper-characteristic.details.sleeper_distance_between_pairs')}
          name="sleeper_distance_between_pairs"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-sleeper-characteristic.details.sleeper_material_specification')}
          placeholder={t('project.other.railway-sleeper-characteristic.details.sleeper_material_specification')}
          name="sleeper_material_specification"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-sleeper-characteristic.details.sleeper_spacing')}
          placeholder={t('project.other.railway-sleeper-characteristic.details.sleeper_spacing')}
          name="sleeper_spacing"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-sleeper-characteristic.details.spacing_between')}
          placeholder={t('project.other.railway-sleeper-characteristic.details.spacing_between')}
          name="spacing_between"
          size="small"
          sx={{ mb: 2 }}
          type="number"
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-sleeper-characteristic.details.sleeper_shape')}
          placeholder={t('project.other.railway-sleeper-characteristic.details.sleeper_shape')}
          name="sleeper_shape"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-sleeper-characteristic.details.remark')}
          placeholder={t('project.other.railway-sleeper-characteristic.details.remark')}
          name="remark"
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={4}
        />
      </Grid>
    </Grid>
  );
};

export default RailwaySleeperCharacteristicForm;
