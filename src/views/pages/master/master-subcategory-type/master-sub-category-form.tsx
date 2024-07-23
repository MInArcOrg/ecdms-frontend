import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { MasterSubCategory } from 'src/types/master/master-types';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface MasterSubCategoryFormProps {
  formik: FormikProps<MasterSubCategory>;
  isLocaleEdit?: boolean;
  defaultLocaleData?: MasterSubCategory;
  onFileChange: (file: File | null) => void;
  file: File | null;
}

const MasterSubCategoryForm: React.FC<MasterSubCategoryFormProps> = ({ formik, isLocaleEdit = false, defaultLocaleData }) => {
  const { t: transl } = useTranslation();
  return (
    <>
      <CustomTextBox
        fullWidth
        label={transl('master-data.master-sub-category.form.title')}
        placeholder={transl('master-data.master-sub-category.form.title')}
        name="title"
        size="small"
        sx={{ mb: 2 }}
      />

      <CustomTextBox
        fullWidth
        label={transl('master-data.master-sub-category.form.description')}
        placeholder={transl('master-data.master-sub-category.form.description')}
        name="description"
        multiline={true}
        rows="4"
        size="small"
        sx={{ mb: 2 }}
      />
    </>
  );
};
export default MasterSubCategoryForm;
