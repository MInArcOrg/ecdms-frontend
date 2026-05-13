import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { FileWithId } from 'src/types/general/file';
import { ResourceBrand } from 'src/types/resource';
import CustomMultiFileUpload from 'src/views/shared/form/custom-multi-file-selector';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface ResourceBrandFormProps {
  formik: FormikProps<ResourceBrand>;

  defaultLocaleData?: ResourceBrand;
  files: FileWithId[];
  onFilesChange: (files: FileWithId[]) => void;
}

const ResourceBrandForm: React.FC<ResourceBrandFormProps> = ({ formik, files, onFilesChange }) => {
  const { t: transl } = useTranslation();
  console.log('errors', formik.errors)
  return (
    <>
      <CustomTextBox
        fullWidth
        label={transl('resource.resource-brand.form.name')}
        placeholder={transl('resource.resource-brand.form.name')}
        name="name"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl('resource.resource-brand.form.datasource')}
        placeholder={transl('resource.resource-brand.form.datasource')}
        name="datasource"
        size="small"
        sx={{ mb: 2 }}
        />
         <CustomTextBox
        fullWidth
        label={transl('resource.resource-brand.form.manufacturer')}
        placeholder={transl('resource.resource-brand.form.manufacturer')}
        name="manufacturer"
        size="small"
        sx={{ mb: 2 }}
        />
      <CustomTextBox
        fullWidth
        label={transl('resource.resource-brand.form.description')}
        placeholder={transl('resource.resource-brand.form.description')}
        name="description"
        multiline={true}
        rows="4"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomMultiFileUpload label={transl('common.form.image-upload')} files={files} onFilesChange={onFilesChange} />
    </>
  );
};
export default ResourceBrandForm;
