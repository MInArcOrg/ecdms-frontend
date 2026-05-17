import { Grid, Card, CardContent, Typography, Divider, Stack } from '@mui/material';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import masterTypeApiService from 'src/services/master-data/master-type-service';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomSelect from 'src/views/shared/form/custom-select';
import ProjectForm from 'src/views/pages/projects/project-form';

interface StakeholderProjectFormProps {
  formik: FormikProps<any>;
  typeId?: string; // Kept for signature, but we'll use the formik value
}

const StakeholderProjectForm: React.FC<StakeholderProjectFormProps> = ({ formik }) => {
  const { t: transl } = useTranslation();

  const { data: projectTypes } = useQuery({
    queryKey: ['projectTypes'],
    queryFn: () => masterTypeApiService.getAll('project', {})
  });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack spacing={3}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Project Type
              </Typography>
              <Divider sx={{ my: 2 }} />
              <CustomSelect
                fullWidth
                name="projecttype_id"
                label={transl('project.form.type', 'Project Type')}
                size="small"
                options={
                  projectTypes?.payload?.map((type) => ({
                    label: type.title,
                    value: type.id
                  })) || []
                }
              />
            </CardContent>
          </Card>
        </Stack>
      </Grid>
      
      {formik.values.projecttype_id && (
        <Grid item xs={12}>
          <ProjectForm typeId={formik.values.projecttype_id} formik={formik as any} module="project" />
        </Grid>
      )}

      <Grid item xs={12}>
        <Stack spacing={3}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {transl('project.stakeholder.form.title', 'Stakeholder Assignment Details')}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <CustomTextBox
                    fullWidth
                    label={transl('project.stakeholder.form.title', 'Title')}
                    placeholder={transl('project.stakeholder.form.title', 'Title')}
                    name="stakeholder_title"
                    size="small"
                    value={formik.values.stakeholder_title}
                    multiline
                    rows={2}
                    onChange={formik.handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomTextBox
                    fullWidth
                    label={transl('project.stakeholder.form.description', 'Description')}
                    placeholder={transl('project.stakeholder.form.description', 'Description')}
                    name="stakeholder_description"
                    multiline
                    rows={2}
                    value={formik.values.stakeholder_description}
                    onChange={formik.handleChange}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default StakeholderProjectForm;
