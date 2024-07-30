import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import generalMasterDataApiService from 'src/services/general/general-master-data-service';
import { ResourceWorkExperience } from 'src/types/resource';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface ResourceWorkExperienceFormProps {
  formik: FormikProps<ResourceWorkExperience>;
  isLocaleEdit?: boolean;
  defaultLocaleData?: ResourceWorkExperience;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const ResourceWorkExperienceForm: React.FC<ResourceWorkExperienceFormProps> = ({
  formik,
  isLocaleEdit = false,
  defaultLocaleData,
  file,
  onFileChange
}) => {
  console.log('Resource Values', formik.values);
  const { t: transl } = useTranslation();
  const { data: resourceCategories } = useQuery({
    queryKey: ['general-master', 'study-fields'],
    queryFn: () => generalMasterDataApiService.getAll('study-fields', {})
  });

  return (
    <>
      <Box mb={2}>
        <CustomSelect
          size="small"
          name="workexperience_id"
          label={transl('resource.resource-study-field.form.workexperience')}
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
        label={transl('resource.resource-study-field.form.description')}
        placeholder={transl('resource.resource-study-field.form.description')}
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
export default ResourceWorkExperienceForm;
