import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { MasterType } from 'src/types/master/master-types';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface MasterTypeFormProps {
  formik: FormikProps<MasterType>;
  isLocaleEdit?: boolean;
  defaultLocaleData?: MasterType;
}

const MasterTypeForm: React.FC<MasterTypeFormProps> = ({ formik, isLocaleEdit = false, defaultLocaleData }) => {
  const { t: transl } = useTranslation();
  return (
    <>
      <CustomTextBox
        fullWidth
        label={transl('master-data.form.title')}
        placeholder={transl('master-data.form.title')}
        name="title"
        size="sm"
        sx={{ mb: 2 }}
      />

      <CustomTextBox
        fullWidth
        label={transl('master-data.form.description')}
        placeholder={transl('master-data.form.description')}
        name="description"
        multiline={true}
        rows="4"
        size="sm"
        sx={{ mb: 2 }}
      />
    </>
  );
};
export default MasterTypeForm;
