import React, { useEffect, useState } from 'react';
import { Box, Grid, FormControl, FormLabel, FormHelperText, Autocomplete, TextField } from '@mui/material';
import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import countriesList from 'src/constants/countries';
import { ProjectStatus } from 'src/types/project';

interface ProjectStatusFormProps {
  formik: FormikProps<ProjectStatus>;
}

const ProjectStatusForm: React.FC<ProjectStatusFormProps> = ({ formik }) => {
  const { t: transl } = useTranslation();


  return (
    <>
      
          <CustomTextBox
            fullWidth
            label={transl('project.project-status.description')}
            placeholder={transl('project.project-status.description')}
            name="block_number"
            multiline={true}
            row={3}
            size="small"
            sx={{ mb: 2 }}
          />

    </>
  );
};

export default ProjectStatusForm;
