// src/views/stakeholder/document/document-form.tsx

import { Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';
import type { FileTypeConfig } from './file-type-config';
import CustomDynamicDatePicker from 'src/views/shared/form/custom-dynamic-date-box';
import { StakeholderDocument } from 'src/types/stakeholder/other';


interface StakeholderDocumentFormProps {
    formik: FormikProps<StakeholderDocument>;
    fileTypesConfig: FileTypeConfig[];
    fileStates: Record<string, File | null>;
    onFileChange: (key: string, file: File | null) => void;
    isDocumentTypeReadOnly?: boolean; // NEW PROP
}

const StakeholderDocumentForm: React.FC<StakeholderDocumentFormProps> = ({
    formik,
    fileTypesConfig,
    fileStates,
    onFileChange,
    isDocumentTypeReadOnly = false // Default to false
}) => {
    const { t } = useTranslation();

    // Locale keys for fields - will be used for both label and placeholder
    const DOCUMENT_TYPE_KEY = 'stakeholder.document.details.document-type';
    const TITLE_KEY = 'stakeholder.document.details.title';
    const DESCRIPTION_KEY = 'stakeholder.document.details.description';
    const AUTHOR_KEY = 'stakeholder.document.details.author';
    const EDITION_KEY = 'stakeholder.document.details.edition';
    const PUBLICATION_DATE_KEY = 'stakeholder.document.details.publication-date';
    const ISBN_KEY = 'stakeholder.document.details.isbn';
    const COPYRIGHT_KEY = 'stakeholder.document.details.copy-right-notice';


    return (
        <Grid container spacing={gridSpacing}>

            <CustomTextBox
                fullWidth
                required
                label={t(TITLE_KEY)}
                placeholder={t(TITLE_KEY)}
                name="title"
                value={formik.values.title}
                size="small"
                sx={{ mb: 2 }}
            />

            <CustomTextBox
                fullWidth
                required
                label={t(AUTHOR_KEY)}
                placeholder={t(AUTHOR_KEY)}
                name="author"
                size="small"
                sx={{ mb: 2 }}
            />
            <CustomTextBox
                fullWidth
                label={t(EDITION_KEY)}
                placeholder={t(EDITION_KEY)}
                name="edition"
                size="small"
                sx={{ mb: 2 }}
            />

            <CustomDynamicDatePicker
                fullWidth
                label={t(PUBLICATION_DATE_KEY)}
                name="publication_date"
                required
                showYearDropdown
                showMonthDropdown
                customInput={<CustomTextBox sx={{ mb: 2 }} name="publication_date" />}


            />


            <CustomTextBox
                fullWidth
                label={t(ISBN_KEY)}
                placeholder={t(ISBN_KEY)}
                name="isbn"
                size="small"
                sx={{ mb: 2 }}
            />

            <CustomTextBox
                fullWidth
                required
                label={t(DESCRIPTION_KEY)}
                placeholder={t(DESCRIPTION_KEY)}
                name="description"
                size="small"
                sx={{ mb: 2 }}
                multiline
                rows={2}
            />

            <CustomTextBox
                fullWidth
                label={t(COPYRIGHT_KEY)}
                placeholder={t(COPYRIGHT_KEY)}
                name="copy_right_notice"
                value={formik.values.copy_right_notice}
                size="small"
                sx={{ mb: 2 }}
                multiline
                rows={1}
            />


            <Grid item xs={12}>
                {fileTypesConfig.map((fileConfig) => (
                    <CustomFileUpload
                        key={fileConfig.key}
                        label={t(fileConfig.titleTKey)}
                        file={fileStates[fileConfig.key]}
                        onFileChange={(file) => onFileChange(fileConfig.key, file)}
                    />
                ))}
            </Grid>
        </Grid>
    );
};

export default StakeholderDocumentForm;