import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { GeneralMasterResource } from 'src/types/general/general-master';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

// Extend GeneralMaster to include referenceFile for formik values

interface GeneralMasterResourceFormProps {
  formik: FormikProps<GeneralMasterResource>; // Use ExtendedGeneralMaster in FormikProps
  isLocaleEdit?: boolean;
  defaultLocaleData?: GeneralMasterResource;
  onFileChange: (file: File | null) => void;
  file: File | null;
  type: string;
}

const GeneralMasterResourceForm: React.FC<GeneralMasterResourceFormProps> = ({
  formik,
  isLocaleEdit = false,
  defaultLocaleData,
  file,
  onFileChange,
  type
}) => {
  const { t: transl } = useTranslation();

  return (
    <>
      <CustomTextBox
        fullWidth
        label={transl('master-data.form.service_type')}
        placeholder={transl('master-data.form.service_type')}
        name="service_type"
        size="small"
        sx={{ mb: 2 }}
      />

      <CustomTextBox
        fullWidth
        label={transl('master-data.form.specification_detail')}
        placeholder={transl('master-data.form.specification_detail')}
        name="specification_detail"
        multiline={true}
        rows="4"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomTextBox
        fullWidth
        label={transl('master-data.form.measurement_unit')}
        placeholder={transl('master-data.form.measurement_unit')}
        name="measurement_unit"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomFileUpload label={'File Upload'} file={file} onFileChange={onFileChange} />
    </>
  );
};

export default GeneralMasterResourceForm;
