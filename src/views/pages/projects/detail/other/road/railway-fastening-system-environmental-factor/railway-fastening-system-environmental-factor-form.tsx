import { Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import type { RailwayFasteningSystemEnvironmentalFactor } from 'src/types/project/other';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector'; // Updated import path
import {
  RAILWAY_FASTENING_SYSTEM_ENVIRONMENTAL_FACTOR_FILE_TYPES,
  RailwayFasteningSystemEnvironmentalFactorFileKey
} from './filet-type-config';

interface RailwayFasteningSystemEnvironmentalFactorFormProps {
  formik: FormikProps<RailwayFasteningSystemEnvironmentalFactor>;
  files: Record<RailwayFasteningSystemEnvironmentalFactorFileKey, File | null>;
  onFileChange: (fileType: RailwayFasteningSystemEnvironmentalFactorFileKey, file: File | null) => void;
}

const RailwayFasteningSystemEnvironmentalFactorForm: React.FC<RailwayFasteningSystemEnvironmentalFactorFormProps> = ({
  formik,
  files,
  onFileChange
}) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-fastening-system-environmental-factor.details.railway_line_section_name')}
          placeholder={t('project.other.railway-fastening-system-environmental-factor.details.railway_line_section_name')}
          name="railway_line_section_name"
          value={formik.values.railway_line_section_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.railway_line_section_name && Boolean(formik.errors.railway_line_section_name)}
          helperText={formik.touched.railway_line_section_name && formik.errors.railway_line_section_name}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-fastening-system-environmental-factor.details.environmental_compliance_measures')}
          placeholder={t('project.other.railway-fastening-system-environmental-factor.details.environmental_compliance_measures')}
          name="environmental_compliance_measures"
          value={formik.values.environmental_compliance_measures}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.environmental_compliance_measures && Boolean(formik.errors.environmental_compliance_measures)}
          helperText={formik.touched.environmental_compliance_measures && formik.errors.environmental_compliance_measures}
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={2}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-fastening-system-environmental-factor.details.environmental_impact_assessment')}
          placeholder={t('project.other.railway-fastening-system-environmental-factor.details.environmental_impact_assessment')}
          name="environmental_impact_assessment"
          value={formik.values.environmental_impact_assessment}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.environmental_impact_assessment && Boolean(formik.errors.environmental_impact_assessment)}
          helperText={formik.touched.environmental_impact_assessment && formik.errors.environmental_impact_assessment}
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={2}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-fastening-system-environmental-factor.details.remark')}
          placeholder={t('project.other.railway-fastening-system-environmental-factor.details.remark')}
          name="remark"
          value={formik.values.remark}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.remark && Boolean(formik.errors.remark)}
          helperText={formik.touched.remark && formik.errors.remark}
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={4}
        />
      </Grid>
      <Grid item xs={12}>
        {RAILWAY_FASTENING_SYSTEM_ENVIRONMENTAL_FACTOR_FILE_TYPES.map((fileType) => (
          <CustomFileUpload
            key={fileType.key}
            label={t(fileType.titleTKey)}
            file={files[fileType.key]}
            onFileChange={(file) => onFileChange(fileType.key, file)}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default RailwayFasteningSystemEnvironmentalFactorForm;
