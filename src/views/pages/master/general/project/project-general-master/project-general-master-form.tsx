import { useQuery } from '@tanstack/react-query';
import { FormikProps } from 'formik';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import masterTypeApiService from 'src/services/master-data/master-type-service';
import { ProjectGeneralMaster } from 'src/types/general/general-master';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

// Extend GeneralMaster to include referenceFile for formik values

interface ProjectGeneralMasterFormProps {
  formik: FormikProps<ProjectGeneralMaster>; // Use ExtendedGeneralMaster in FormikProps

  defaultLocaleData?: ProjectGeneralMaster;
  onFileChange: (file: File | null) => void;
  file: File | null;
  flag: string;
}

const ProjectGeneralMasterForm: React.FC<ProjectGeneralMasterFormProps> = ({ formik, file, onFileChange, flag }) => {
  const { data: projectTypes } = useQuery({
    queryKey: ['masterCategory', 'project'],
    queryFn: () => masterTypeApiService.getAll('project', {})
  });
  const { t: transl } = useTranslation();
  useEffect(() => {
    formik.setFieldValue('project_type_id', projectTypes?.payload?.find((projectType) => projectType.flag === flag)?.id || '')
  }, [flag,projectTypes])
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

export default ProjectGeneralMasterForm;
