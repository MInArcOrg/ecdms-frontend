import { useQuery } from '@tanstack/react-query';
import { FormikProps } from 'formik';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import masterTypeApiService from 'src/services/master-data/master-type-service';
import { ResourceGeneralMaster } from 'src/types/general/general-master';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

// Extend GeneralMaster to include referenceFile for formik values

interface ResourceGeneralMasterFormProps {
  formik: FormikProps<ResourceGeneralMaster>; // Use ExtendedGeneralMaster in FormikProps

  defaultLocaleData?: ResourceGeneralMaster;
  onFileChange: (file: File | null) => void;
  file: File | null;
  flag: string;
}

const ResourceGeneralMasterForm: React.FC<ResourceGeneralMasterFormProps> = ({ formik, file, onFileChange, flag }) => {
  const { data: resourceTypes } = useQuery({
    queryKey: ['masterCategory', 'resource'],
    queryFn: () => masterTypeApiService.getAll('resource', {}),
  });

  const { t: transl } = useTranslation();
  useEffect(() => {
    formik.setFieldValue('resource_type_id', resourceTypes?.payload?.find((resourceType) => resourceType.flag === flag)?.id || '')
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

export default ResourceGeneralMasterForm;
