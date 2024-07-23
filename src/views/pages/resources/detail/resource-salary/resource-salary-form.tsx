import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { ResourceSalary } from 'src/types/resource';
import CustomDateSelector from 'src/views/shared/form/custom-date-box';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface ResourceSalaryFormProps {
  formik: FormikProps<ResourceSalary>;
  isLocaleEdit?: boolean;
  defaultLocaleData?: ResourceSalary;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const ResourceSalaryForm: React.FC<ResourceSalaryFormProps> = ({ formik, isLocaleEdit = false, defaultLocaleData, file, onFileChange }) => {
  console.log('Resource Values', formik.values);
  const { t: transl } = useTranslation();

  return (
    <>
      <CustomTextBox
        fullWidth
        type="number"
        label={transl('resource.resource-salary.form.max_pay')}
        placeholder={transl('resource.resource-salary.form.max_pay')}
        name="max_pay"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        type="number"
        label={transl('resource.resource-salary.form.min_pay')}
        placeholder={transl('resource.resource-salary.form.min_pay')}
        name="min_pay"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl('resource.resource-salary.form.salary_type')}
        placeholder={transl('resource.resource-salary.form.salary_type')}
        name="salary_type"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomDateSelector
        fullWidth
        label={transl('resource.resource-salary.form.year')}
        placeholder={transl('resource.resource-salary.form.year')}
        name="year"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomFileUpload label={transl('common.form.file-upload')} file={file} onFileChange={onFileChange} />
    </>
  );
};
export default ResourceSalaryForm;
