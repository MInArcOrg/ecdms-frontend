import { Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

import type { RailwaySleeperEnvironmentalAndOtherFactor } from 'src/types/project/other';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface RailwaySleeperEnvironmentalAndOtherFactorFormProps {
  formik: FormikProps<RailwaySleeperEnvironmentalAndOtherFactor>;
  file: File | null; // For the primary upload
  onFileChange: (file: File | null) => void; // For the primary upload
  sleeperConditionPhotoFile: File | null; // For the secondary upload
  onSleeperConditionPhotoFileChange: (file: File | null) => void; // For the secondary upload
}

const RailwaySleeperEnvironmentalAndOtherFactorForm: React.FC<RailwaySleeperEnvironmentalAndOtherFactorFormProps> = ({
  formik,
  file,
  onFileChange,
  sleeperConditionPhotoFile,
  onSleeperConditionPhotoFileChange
}) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-sleeper-environmental-and-other-factor.details.railway_line_section_name')}
          placeholder={t('project.other.railway-sleeper-environmental-and-other-factor.details.railway_line_section_name')}
          name="railway_line_section_name"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-sleeper-environmental-and-other-factor.details.environmental_compliance_measures')}
          placeholder={t('project.other.railway-sleeper-environmental-and-other-factor.details.environmental_compliance_measures')}
          name="environmental_compliance_measures"
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={3}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-sleeper-environmental-and-other-factor.details.environmental_impact_assessment')}
          placeholder={t('project.other.railway-sleeper-environmental-and-other-factor.details.environmental_impact_assessment')}
          name="environmental_impact_assessment"
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={3}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-sleeper-environmental-and-other-factor.details.remark')}
          placeholder={t('project.other.railway-sleeper-environmental-and-other-factor.details.remark')}
          name="remark"
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={4}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomFileUpload label={t('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
      <Grid item xs={12}>
        <CustomFileUpload
          label={t('project.other.railway-sleeper-environmental-and-other-factor.details.sleeper_condition_photo')}
          file={sleeperConditionPhotoFile}
          onFileChange={onSleeperConditionPhotoFileChange}
        />
      </Grid>
    </Grid>
  );
};

export default RailwaySleeperEnvironmentalAndOtherFactorForm;
