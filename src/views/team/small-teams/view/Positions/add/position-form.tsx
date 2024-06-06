import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CustomSwitch from 'src/views/shared/form/custom-switch';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface PositionFormProps {
  formik: FormikProps<any>;
  isLocaleEdit?: boolean;
  defaultLocaleData?: any;
}

const PositionForm: React.FC<PositionFormProps> = ({ formik, isLocaleEdit = false, defaultLocaleData }) => {
  const { t: transl } = useTranslation();

  return (
    <>
      <CustomTextBox fullWidth label={transl('name')} placeholder={transl('name')} name="name" size="sm" sx={{ mb: 2 }} />

      <CustomTextBox
        fullWidth
        label={transl('description')}
        placeholder={transl('description')}
        name="description"
        multiline
        rows={3}
        size="sm"
      />

      <CustomSwitch label={transl('is-head')} placeholder={transl('is-head')} name="is_head" size="sm" sx={{ mb: 2 }} />
    </>
  );
};

export default PositionForm;
