import { Grid } from '@mui/material';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StakeholderAccreditation } from 'src/types/stakeholder/stakeholder-accreditation';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface StakeholderAccreditationFormProps {
    formik: FormikProps<StakeholderAccreditation>;
    file: File | null;
    onFileChange: (file: File | null) => void;
}

const StakeholderAccreditationForm: React.FC<StakeholderAccreditationFormProps> = ({ formik, file, onFileChange }) => {
    const { t: transl } = useTranslation();

    return (
        <Grid container spacing={3}>
            {/* Title Field */}
            <Grid item xs={12}>
                <CustomTextBox
                    fullWidth
                    label={transl('stakeholder.stakeholder-accreditation.form.title')}
                    placeholder={transl('stakeholder.stakeholder-accreditation.form.title')}
                    name="title"
                    size="small"
                    sx={{ mb: 2 }}
                />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
                <CustomTextBox
                    fullWidth
                    multiline
                    rows={3}
                    label={transl('stakeholder.stakeholder-accreditation.form.description')}
                    placeholder={transl('stakeholder.stakeholder-accreditation.form.description')}
                    name="description"
                    size="small"
                    sx={{ mb: 2 }}
                />
            </Grid>

            {/* File Upload */}
            <Grid item xs={12}>
                <CustomFileUpload label={transl('common.form.file-upload')} file={file} onFileChange={onFileChange} />
            </Grid>
        </Grid>
    );
};

export default StakeholderAccreditationForm;
