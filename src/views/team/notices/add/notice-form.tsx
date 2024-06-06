import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface SmallTeamFormProps {
  formik: FormikProps<any>;
  isLocaleEdit?: boolean;
  defaultLocaleData?: any;
}

const SmallTeamForm: React.FC<SmallTeamFormProps> = ({ formik, isLocaleEdit = false, defaultLocaleData }) => {
  const { t: transl } = useTranslation();
  return (
    <>
      <CustomTextBox fullWidth label={transl('title')} placeholder={transl('title')} name="title" size="sm" sx={{ mb: 2 }} />
      <CustomTextBox
        fullWidth
        label={transl('content')}
        placeholder={transl('content')}
        name="content"
        multiline
        rows={3}
        size="sm"
        sx={{ mb: 2 }}
      />
    </>
  );
};

export default SmallTeamForm;
