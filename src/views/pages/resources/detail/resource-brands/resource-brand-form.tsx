import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { FileWithId } from 'src/types/general/file';
import { ResourceBrand } from 'src/types/resource';
import CustomMultiFileUpload from 'src/views/shared/form/custom-multi-file-selector';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface ResourceBrandFormProps {
  formik: FormikProps<ResourceBrand>;
  isLocaleEdit?: boolean;
  defaultLocaleData?: ResourceBrand;
  files: FileWithId[];
  onFilesChange: (files: FileWithId[]) => void;
}

const ResourceBrandForm: React.FC<ResourceBrandFormProps> = ({ formik, isLocaleEdit = false, defaultLocaleData, files, onFilesChange }) => {
  const { t: transl } = useTranslation();
  return (
    <>
      <CustomTextBox
        fullWidth
        label={transl('resource.resource-brand.form.title')}
        placeholder={transl('resource.resource-brand.form.title')}
        name="title"
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
