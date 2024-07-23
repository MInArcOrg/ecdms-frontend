import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { MasterCategory } from 'src/types/master/master-types';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface MasterCategoryFormProps {
  formik: FormikProps<MasterCategory>;
  isLocaleEdit?: boolean;
  defaultLocaleData?: MasterCategory;
}

const MasterCategoryForm: React.FC<MasterCategoryFormProps> = ({ formik, isLocaleEdit = false, defaultLocaleData }) => {
  const { t: transl } = useTranslation();
  return (
    <>
      <CustomTextBox
        fullWidth
        label={transl('master-data.master-category.form.title')}
        placeholder={transl('master-data.master-category.form.title')}
        name="title"
        size="small"
        sx={{ mb: 2 }}
      />

      <CustomTextBox
        fullWidth
        label={transl('master-data.master-category.form.description')}
        placeholder={transl('master-data.master-category.form.description')}
        name="description"
        multiline={true}
        rows="4"
        size="small"
        sx={{ mb: 2 }}
      />
    </>
  );
};
export default MasterCategoryForm;
