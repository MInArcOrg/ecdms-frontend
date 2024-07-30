import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { FileWithId } from 'src/types/general/file';
import { DetailResourceType } from 'src/types/resource';
import CustomMultiFileUpload from 'src/views/shared/form/custom-multi-file-selector';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface DetailResourceTypeFormProps {
  formik: FormikProps<DetailResourceType>;
  isLocaleEdit?: boolean;
  defaultLocaleData?: DetailResourceType;
  files: FileWithId[];
  onFilesChange: (files: FileWithId[]) => void;
}

const DetailResourceTypeForm: React.FC<DetailResourceTypeFormProps> = ({
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
        label={transl('resource.detail-resource-type.form.title')}
        placeholder={transl('resource.detail-resource-type.form.title')}
        name="title"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl('resource.detail-resource-type.form.datasource')}
        placeholder={transl('resource.detail-resource-type.form.datasource')}
        name="datasource"
        size="small"
        sx={{ mb: 2 }}
      />

      <CustomTextBox
        fullWidth
        label={transl('resource.detail-resource-type.form.description')}
        placeholder={transl('resource.detail-resource-type.form.description')}
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
export default DetailResourceTypeForm;
