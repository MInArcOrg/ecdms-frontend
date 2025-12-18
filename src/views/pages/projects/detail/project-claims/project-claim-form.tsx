import { Box } from '@mui/material';
import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { ProjectClaim } from 'src/types/project/project-claim';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface ProjectClaimFormProps {
    formik: FormikProps<ProjectClaim>;
    projectId: string;
}

const ProjectClaimForm: React.FC<ProjectClaimFormProps> = ({ formik }) => {
    const { t } = useTranslation();

    return (
        <>
            <Box mb={2}>
                <CustomTextBox
                    fullWidth
                    label={t('project.navigation.submenu.reporting.report.claim-title')}
                    name="title"
                    size="small"
                    sx={{ mb: 2 }}
                />
            </Box>
            <Box mb={2}>
                <CustomTextBox
                    fullWidth
                    label={t('project.navigation.submenu.reporting.report.claim-description')}
                    name="description"
                    size="small"
                    multiline
                    rows={3}
                    sx={{ mb: 2 }}
                />
            </Box>
            <Box mb={2}>
                <CustomTextBox
                    fullWidth
                    label={t('project.navigation.submenu.reporting.report.claim-measures-taken')}
                    name="measures_taken"
                    size="small"
                    multiline
                    rows={3}
                    sx={{ mb: 2 }}
                />
            </Box>
        </>
    );
};

export default ProjectClaimForm;
