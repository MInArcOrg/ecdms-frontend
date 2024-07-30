import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { FileWithId } from 'src/types/general/file';
import { ResourceSpecification } from 'src/types/resource';
import CustomMultiFileUpload from 'src/views/shared/form/custom-multi-file-selector';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface ResourceSpecificationFormProps {
  formik: FormikProps<ResourceSpecification>;
  isLocaleEdit?: boolean;
  defaultLocaleData?: ResourceSpecification;
  files: FileWithId[];
  onFilesChange: (files: FileWithId[]) => void;
}

const ResourceSpecificationForm: React.FC<ResourceSpecificationFormProps> = ({
  formik,
  isLocaleEdit = false,
  defaultLocaleData,
  files,
  onFilesChange
}) => {
  const { t: transl } = useTranslation();
  return (
    <>
      <CustomTextBox
        fullWidth
        label={transl('resource.resource-specification.form.title')}
        placeholder={transl('resource.resource-specification.form.title')}
        name="title"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl('resource.resource-specification.form.datasource')}
        placeholder={transl('resource.resource-specification.form.datasource')}
        name="datasource"
        size="small"
        sx={{ mb: 2 }}
      />

      <CustomTextBox
        fullWidth
        label={transl('resource.resource-specification.form.description')}
        placeholder={transl('resource.resource-specification.form.description')}
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
export default ResourceSpecificationForm;
