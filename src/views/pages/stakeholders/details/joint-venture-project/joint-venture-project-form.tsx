import { Grid, Card, CardContent, Typography, Divider, Stack } from '@mui/material';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import masterTypeApiService from 'src/services/master-data/master-type-service';
import jointVentureCompanyApiService from 'src/services/stakeholder/joint-venture-company-service';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomSelect from 'src/views/shared/form/custom-select';
import ProjectForm from 'src/views/pages/projects/project-form';

interface JointVentureProjectFormProps {
    formik: FormikProps<any>;
    typeId?: string;
    stakeholderId?: string;
}

const JointVentureProjectForm: React.FC<JointVentureProjectFormProps> = ({ formik, stakeholderId }) => {
    const { t: transl } = useTranslation();

    const { data: projectTypes } = useQuery({
        queryKey: ['projectTypes'],
        queryFn: () => masterTypeApiService.getAll('project', {})
    });

    const { data: jointVentureCompanies } = useQuery({
        queryKey: ['jointVentureCompanies', stakeholderId],
        queryFn: () => jointVentureCompanyApiService.getAll({
            filter: {
                stakeholder_id: stakeholderId
            }
        }),
        enabled: !!stakeholderId
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
                                {transl('project.joint-venture.form.title', 'Joint Venture Assignment Details')}
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={12}>
                                    <CustomSelect
                                        fullWidth
                                        name="joint_venture_company_id"
                                        label={transl('project.joint-venture.form.company', 'Joint Venture Company')}
                                        size="small"
                                        options={
                                            jointVentureCompanies?.payload?.map((jv) => ({
                                                label: jv.company_name,
                                                value: jv.id
                                            })) || []
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <CustomTextBox
                                        fullWidth
                                        label={transl('project.joint-venture.form.assignment-title', 'Title')}
                                        placeholder={transl('project.joint-venture.form.assignment-title', 'Title')}
                                        name="joint_venture_title"
                                        size="small"
                                        value={formik.values.joint_venture_title}
                                        multiline
                                        rows={2}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <CustomTextBox
                                        fullWidth
                                        label={transl('project.joint-venture.form.description', 'Description')}
                                        placeholder={transl('project.joint-venture.form.description', 'Description')}
                                        name="joint_venture_description"
                                        multiline
                                        rows={2}
                                        value={formik.values.joint_venture_description}
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

export default JointVentureProjectForm;
