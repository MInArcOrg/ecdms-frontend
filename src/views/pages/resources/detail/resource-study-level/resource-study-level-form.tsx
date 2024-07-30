import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import generalMasterDataApiService from 'src/services/general/general-master-data-service';
import { ResourceStudyLevel } from 'src/types/resource';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface ResourceStudyLevelFormProps {
  formik: FormikProps<ResourceStudyLevel>;
  isLocaleEdit?: boolean;
  defaultLocaleData?: ResourceStudyLevel;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const ResourceStudyLevelForm: React.FC<ResourceStudyLevelFormProps> = ({
  formik,
  isLocaleEdit = false,
  defaultLocaleData,
  file,
  onFileChange
}) => {
  console.log('Resource Values', formik.values);
  const { t: transl } = useTranslation();
  const { data: resourceCategories } = useQuery({
    queryKey: ['general-master', 'study-levels'],
    queryFn: () => generalMasterDataApiService.getAll('study-levels', {})
  });

  return (
    <>
      <Box mb={2}>
        <CustomSelect
          size="small"
          name="studylevel_id"
          label={transl('resource.resource-study-level.form.studylevel')}
          options={
            resourceCategories?.payload?.map((resourceCategory) => ({
              value: resourceCategory.id,
              label: resourceCategory.title
            })) || []
          }
        />
      </Box>

      <CustomTextBox
        fullWidth
        label={transl('resource.resource-study-level.form.description')}
        placeholder={transl('resource.resource-study-level.form.description')}
        name="description"
        multiline={true}
        rows="4"
        size="small"
        sx={{ mb: 2 }}
      />
      <CustomFileUpload label={transl('common.form.file-upload')} file={file} onFileChange={onFileChange} />
    </>
  );
};
export default ResourceStudyLevelForm;
