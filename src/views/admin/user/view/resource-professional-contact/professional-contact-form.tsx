import { Grid } from '@mui/material';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import { ProfessionalContact } from 'src/types/resource';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface ContactFormProps {
  formik: FormikProps<ProfessionalContact>;
}

const ContactForm: React.FC<ContactFormProps> = ({ formik }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox fullWidth label={t('resources.professional.contact.phone')} name="phone_no" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox fullWidth label={t('resources.professional.contact.email')} name="email" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox fullWidth label={t('resources.professional.contact.website')} name="website" size="small" sx={{ mb: 2 }} />
      </Grid>
    </Grid>
  );
};

export default ContactForm;
