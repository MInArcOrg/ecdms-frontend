import { Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import type { ProfessionalRecommendation } from 'src/types/resource';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface RecommendationFormProps {
    formik: FormikProps<ProfessionalRecommendation>;
    file: File | null;
    onFileChange: (file: File | null) => void;
}

const RecommendationForm: React.FC<RecommendationFormProps> = ({ formik, file, onFileChange }) => {
    const { t } = useTranslation();

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <CustomTextBox fullWidth label={t('resources.professional.recommendation.title')} name="title" size="small" sx={{ mb: 2 }} />
            </Grid>
            <Grid item xs={12}>
                <CustomTextBox
                    fullWidth
                    multiline
                    rows={3}
                    label={t('resources.professional.recommendation.description')}
                    name="description"
                    size="small"
                    sx={{ mb: 2 }}
                />
            </Grid>
            <Grid item xs={12}>
                <CustomFileUpload label={t('common.form.file-upload')} file={file} onFileChange={onFileChange} />
            </Grid>
        </Grid>
    );
};

export default RecommendationForm;
