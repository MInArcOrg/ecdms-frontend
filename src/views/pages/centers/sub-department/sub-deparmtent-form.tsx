import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import Department from 'src/types/department/department';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface SubDepartmentFormProps {
  formik: FormikProps<Department>;
  isLocaleEdit?: boolean;
  defaultLocaleData?: Department;
}

const SubDepartmentForm: React.FC<SubDepartmentFormProps> = ({ formik, isLocaleEdit = false, defaultLocaleData }) => {
  const { t: transl } = useTranslation();
  return (
    <>
      <CustomTextBox
        fullWidth
        label={transl('department.sub-department.form.name')}
        placeholder={transl('department.sub-department.form.name')}
        name="name"
        size="small"
        sx={{ mb: 2 }}
      />

      <CustomTextBox
        fullWidth
        label={transl('department.sub-department.form.description')}
        placeholder={transl('department.sub-department.form.description')}
        name="description"
        multiline
        rows={3}
        size="small"
        sx={{ mb: 2 }}
      />
    </>
  );
};
export default SubDepartmentForm;
