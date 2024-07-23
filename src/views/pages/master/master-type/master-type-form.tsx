import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { MasterType } from 'src/types/master/master-types';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

// Extend MasterType to include referenceFile for formik values

interface MasterTypeFormProps {
  formik: FormikProps<MasterType>; // Use ExtendedMasterType in FormikProps
  isLocaleEdit?: boolean;
  defaultLocaleData?: MasterType;
  onFileChange: (file: File | null) => void;
  file: File | null;
}

const MasterTypeForm: React.FC<MasterTypeFormProps> = ({ formik, isLocaleEdit = false, defaultLocaleData, file, onFileChange }) => {
  const { t: transl } = useTranslation();

  return (
    <>
      <CustomTextBox
        fullWidth
        label={transl('master-data.form.title')}
        placeholder={transl('master-data.form.title')}
        name="title"
        size="small"
        sx={{ mb: 2 }}
      />

      <CustomTextBox
        fullWidth
        label={transl('master-data.form.description')}
        placeholder={transl('master-data.form.description')}
        name="description"
        multiline={true}
        rows="4"
        size="small"
        sx={{ mb: 2 }}
      />

      <CustomFileUpload label={'File Upload'} file={file} onFileChange={onFileChange} />
    </>
  );
};

export default MasterTypeForm;
