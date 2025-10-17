import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import stakeholderApiService from 'src/services/stakeholder/stakeholder-service';
import { ProjectStakeholder } from 'src/types/project/project-stakeholder';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface ProjectStakeholderFormProps {
  formik: FormikProps<ProjectStakeholder>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const ProjectStakeholderForm: React.FC<ProjectStakeholderFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();
  console.log('formik error', formik.errors);
  const { data: stakeholders } = useQuery({
    queryKey: ['stakeholders'],
    queryFn: () => stakeholderApiService.getAll({})
  });
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12} lg={12}>
        <CustomSelect
          size="small"
          name="stakeholder_id"
          label={transl('project.stakeholder.form.stakeholder')}
          options={
            stakeholders?.payload?.map((stakeholder) => ({
              value: stakeholder.id,
              label: stakeholder.trade_name
            })) || []
          }
        />
      </Grid>

      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('project.stakeholder.form.title')}
          placeholder={transl('project.stakeholder.form.title')}
          name="title"
          size="small"
          value={formik.values.title}
          onChange={formik.handleChange}
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('project.stakeholder.form.description')}
          placeholder={transl('project.stakeholder.form.description')}
          name="description"
          multiline
          rows={4}
          value={formik.values.description}
          onChange={formik.handleChange}
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('project.stakeholder.form.remark')}
          placeholder={transl('project.stakeholder.form.remark')}
          name="remark"
          multiline
          rows={2}
          value={formik.values.remark}
          onChange={formik.handleChange}
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomFileUpload label={transl('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default ProjectStakeholderForm;
