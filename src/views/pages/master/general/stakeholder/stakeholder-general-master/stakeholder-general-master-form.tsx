import { useQuery } from '@tanstack/react-query';
import { FormikProps } from 'formik';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import masterTypeApiService from 'src/services/master-data/master-type-service';
import { StakeholderGeneralMaster } from 'src/types/general/general-master';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

// Extend GeneralMaster to include referenceFile for formik values

interface StakeholderGeneralMasterFormProps {
  formik: FormikProps<StakeholderGeneralMaster>; // Use ExtendedGeneralMaster in FormikProps

  defaultLocaleData?: StakeholderGeneralMaster;
  onFileChange: (file: File | null) => void;
  file: File | null;
  flag?: string;
}

const StakeholderGeneralMasterForm: React.FC<StakeholderGeneralMasterFormProps> = ({ formik, file, onFileChange, flag }) => {
  const { data: stakeholderTypes } = useQuery({
    queryKey: ['masterData', 'stakeholder'],
    queryFn: () => masterTypeApiService.getAll('stakeholder', {})
  });
  const { t: transl } = useTranslation();
  useEffect(() => {
    formik.setFieldValue('stakeholder_type_id', stakeholderTypes?.payload?.find((stakeholderType) => stakeholderType.flag === flag)?.id || '')
  }, [flag])

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

export default StakeholderGeneralMasterForm;
