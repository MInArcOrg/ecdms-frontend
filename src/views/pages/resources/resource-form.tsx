import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { Resource } from 'src/types/resource';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface ResourceFormProps {
  formik: FormikProps<Resource>;
  isLocaleEdit?: boolean;
}

const ResourceForm: React.FC<ResourceFormProps> = ({ formik, isLocaleEdit = false }) => {
  const { t: transl } = useTranslation();
  return (
    <>
      <CustomTextBox
        fullWidth
        label={transl('resource.form.title')}
        placeholder={transl('resource.form.title')}
        name="title"
        size="sm"
        sx={{ mb: 2 }}
      />

      <CustomTextBox
        fullWidth
        label={transl('resource.form.description')}
        placeholder={transl('resource.form.description')}
        name="description"
        multiline={true}
        rows="4"
        size="sm"
        sx={{ mb: 2 }}
      />
    </>
  );
};
export default ResourceForm;
