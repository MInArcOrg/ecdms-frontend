import { Grid } from '@mui/material';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import { ProjectAdditionalInfo } from 'src/types/project/project-additional-info-and-outcome';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface AdditionalInfoFormProps {
  formik: FormikProps<ProjectAdditionalInfo>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const AdditionalInfoForm: React.FC<AdditionalInfoFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}> 
      <CustomTextBox
          fullWidth
          label={transl('project.additional-info.status')}
          placeholder={transl('project.additional-info.status')}
          name="project_status"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.additional-info.accidents')}
          placeholder={transl('project.additional-info.accidents')}
          name="work_accident_number"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.additional-info.reason')}
          placeholder={transl('project.additional-info.reason')}
          name="reason"
          size="small"
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />
      </Grid>
      
    </Grid>
  );
};

export default AdditionalInfoForm;