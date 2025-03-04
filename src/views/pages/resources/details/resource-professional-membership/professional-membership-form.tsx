import { Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import type { ProfessionalMembership } from 'src/types/resource';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomDatePicker from 'src/views/shared/form/custom-date-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface MembershipFormProps {
  formik: FormikProps<ProfessionalMembership>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const MembershipForm: React.FC<MembershipFormProps> = ({ formik, file, onFileChange }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('resources.professional.association-membership.association-name')}
          name="association_name"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox
          fullWidth
          label={t('resources.professional.association-membership.membership-type')}
          name="membership_type"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox fullWidth label={t('resources.professional.association-membership.position')} name="position" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          multiline
          rows={3}
          label={t('resources.professional.association-membership.description')}
          name="description"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomDatePicker
          fullWidth
          label={t('resources.professional.association-membership.registration-date')}
          name="registration_date"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomDatePicker fullWidth label={t('resources.professional.association-membership.end-date')} name="end_date" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12}>
        <CustomFileUpload label={t('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default MembershipForm;
