import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { GeneralMaster } from 'src/types/general/general-master';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';
import StudyFieldMasterForm from './study-field-master-form';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import { masterDataFlagConstanct } from 'src/configs/app-constants';

// Extend GeneralMaster to include referenceFile for formik values

interface GeneralMasterFormProps {
  formik: FormikProps<GeneralMaster>; // Use ExtendedGeneralMaster in FormikProps

  defaultLocaleData?: GeneralMaster;
  onFileChange: (file: File | null) => void;
  file: File | null;
  type: string;
}

const GeneralMasterForm: React.FC<GeneralMasterFormProps> = ({
  formik,

  file,
  onFileChange,
  type
}) => {
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
      <CustomSelectBox
        fullWidth
        label={transl('master-data.form.flag')}
        placeholder={transl('master-data.form.flag')}
        name="flag"
        size="small"
        options={masterDataFlagConstanct(transl)}
        sx={{ mb: 2 }}
      />
      {type === 'study-fields' && <StudyFieldMasterForm />}
      <CustomFileUpload label={'File Upload'} file={file} onFileChange={onFileChange} />
    </>
  );
};

export default GeneralMasterForm;
