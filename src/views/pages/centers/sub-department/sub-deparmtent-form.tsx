import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import SubDepartment from 'src/types/department/department';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface SubDepartmentFormProps {
  formik: FormikProps<SubDepartment>;
  isLocaleEdit?: boolean;
  defaultLocaleData?: SubDepartment;
}

const SubDepartmentForm: React.FC<SubDepartmentFormProps> = ({ formik, isLocaleEdit = false, defaultLocaleData }) => {
  const { t: transl } = useTranslation();
  return (
    <>
      <CustomTextBox
        fullWidth
        label={transl('department.department.form.name')}
        placeholder={transl('department.department.form.name')}
        name="name"
        size="sm"
        sx={{ mb: 2 }}
      />

      <CustomTextBox
        fullWidth
        label={transl('department.department.form.name')}
        placeholder={transl('department.department.form.name')}
        name="name"
        multiline={true}
        row="4"
        size="sm"
        sx={{ mb: 2 }}
      />
    </>
  );
};
export default SubDepartmentForm;
