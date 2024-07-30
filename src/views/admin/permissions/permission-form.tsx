import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import Permission, { appModules } from 'src/types/admin/role/permission';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface PermissionFormProps {
  formik: FormikProps<Permission>;
  isLocaleEdit?: boolean;
  defaultLocaleData?: Permission;
}

const PermissionForm: React.FC<PermissionFormProps> = ({ formik, isLocaleEdit = false, defaultLocaleData }) => {
  const { t: transl } = useTranslation();
  return (
    <>
      <CustomTextBox fullWidth label={transl('name')} placeholder={transl('name')} name="name" size="sm" sx={{ mb: 2 }} />
      <CustomTextBox fullWidth label={transl('model')} placeholder={transl('model')} name="model" size="sm" sx={{ mb: 2 }} />
      <CustomSelect
        size="small"
        name="module"
        label={transl('module')}
        options={appModules.map((type) => ({
          value: type,
          label: type.toUpperCase()
        }))}
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl('description')}
        placeholder={transl('description')}
        name="description"
        multiline
        rows={3}
        size="small"
        sx={{ mb: 2 }}
      />
    </>
  );
};
export default PermissionForm;
