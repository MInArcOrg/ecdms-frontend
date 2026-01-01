import { Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import type { JointVenture } from 'src/types/stakeholder/joint-venture';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface JointVentureFormProps {
  formik: FormikProps<JointVenture>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const JointVentureForm: React.FC<JointVentureFormProps> = ({ formik, file, onFileChange }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox fullWidth label={t('stakeholder.joint-venture.name')} name="name" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('stakeholder.joint-venture.memberCompaniesNo')}
          name="member_companies_no"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('stakeholder.joint-venture.description')}
          name="description"
          multiline
          rows={4}
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox fullWidth label={t('stakeholder.joint-venture.reference')} name="reference" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12}>
        <CustomFileUpload
          file={file}
          onFileChange={onFileChange}
          label={t('common.form.file-upload')}
        />
      </Grid>
    </Grid>
  );
};

export default JointVentureForm;
