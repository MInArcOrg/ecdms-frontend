import { Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import type { EnvironmentalData } from 'src/types/project/other';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface EnvironmentalDataFormProps {
  formik: FormikProps<EnvironmentalData>;
  files: {
    environmentalImpactAssessment: File | null;
    communityFeedback: File | null;
    mitigationMeasures: File | null;
  };
  onFileChange: (fileType: string, file: File | null) => void;
}

const EnvironmentalDataForm: React.FC<EnvironmentalDataFormProps> = ({ formik, files, onFileChange }) => {
  const { t: transl } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('project.other.environmental-data.details.remark')}
          placeholder={transl('project.other.environmental-data.details.remark')}
          name="remark"
          size="small"
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload
          label={transl('project.other.environmental-data.file-types.impact-assessment')}
          file={files.environmentalImpactAssessment}
          onFileChange={(file) => onFileChange('environmentalImpactAssessment', file)}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload
          label={transl('project.other.environmental-data.file-types.community-feedback')}
          file={files.communityFeedback}
          onFileChange={(file) => onFileChange('communityFeedback', file)}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload
          label={transl('project.other.environmental-data.file-types.mitigation-measures')}
          file={files.mitigationMeasures}
          onFileChange={(file) => onFileChange('mitigationMeasures', file)}
        />
      </Grid>
    </Grid>
  );
};

export default EnvironmentalDataForm;
