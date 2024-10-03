import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import generalMasterDataApiService from 'src/services/general/general-master-data-service';
import { StakeholderStudyField } from 'src/types/stakeholder/other';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface StakeholderStudyFieldFormProps {
  formik: FormikProps<StakeholderStudyField>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const StakeholderStudyFieldForm: React.FC<StakeholderStudyFieldFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();
  const { data: StakeholderStudyFields } = useQuery({
    queryKey: ['general-master', 'study-fields'],
    queryFn: () => generalMasterDataApiService.getAll('study-fields', {})
  });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <CustomSelect
          size="small"
          sx={{ mb: 2 }}
          name="studyfield_id"
          label={transl('stakeholder.other.stakeholder-study-field.details.study-field')}
          placeholder={transl('stakeholder.other.stakeholder-study-field.details.study-field')}
          options={
            StakeholderStudyFields?.payload?.map((StakeholderStudyField) => ({
              value: StakeholderStudyField.id,
              label: StakeholderStudyField.title
            })) || []
          }
        />

        <CustomTextBox
          fullWidth
          label={transl('stakeholder.other.stakeholder-study-field.details.description')}
          placeholder={transl('stakeholder.other.stakeholder-study-field.details.description')}
          name="description"
          size="small"
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload label={transl('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default StakeholderStudyFieldForm;
