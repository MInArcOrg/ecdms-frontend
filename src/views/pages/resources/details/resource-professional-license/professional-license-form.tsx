import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import resourceGeneralMasterDataApiService from 'src/services/general/resource-general-master-data-service';
import type { ProfessionalLicense } from 'src/types/resource';
import CustomDynamicDatePicker from 'src/views/shared/form/custom-dynamic-date-box';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface ProfessionalLicenseFormProps {
    formik: FormikProps<ProfessionalLicense>;
}

const ProfessionalLicenseForm: React.FC<ProfessionalLicenseFormProps> = ({ formik }) => {
    const { t } = useTranslation();

    const { data: licenseTypes } = useQuery({
        queryKey: ['resource-license-types'],
        queryFn: () => resourceGeneralMasterDataApiService.getAll({ filter: { model: 'licensetype' } })
    });

    const { data: licenseCategories } = useQuery({
        queryKey: ['resource-license-categories'],
        queryFn: () => resourceGeneralMasterDataApiService.getAll({ filter: { model: 'licensecategory' } })
    });

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <CustomSelectBox
                    size="small"
                    name="license_type_id"
                    label={t('resources.professional.license.license-type')}
                    options={licenseTypes?.payload?.map((m) => ({ value: m.id, label: m.title || '' })) || []}
                />
                <CustomSelectBox
                    size="small"
                    name="license_category_id"
                    label={t('resources.professional.license.license-category')}
                    options={licenseCategories?.payload?.map((m) => ({ value: m.id, label: m.title || '' })) || []}
                />
                <CustomTextBox
                    fullWidth
                    label={t('resources.professional.license.license-number')}
                    placeholder={t('resources.professional.license.license-number')}
                    name="license_number"
                    size="small"
                    sx={{ mb: 2 }}
                />
                <CustomTextBox
                    fullWidth
                    label={t('resources.professional.license.license-name')}
                    placeholder={t('resources.professional.license.license-name')}
                    name="license_name"
                    size="small"
                    sx={{ mb: 2 }}
                />
                <CustomTextBox
                    fullWidth
                    label={t('resources.professional.license.license-scope')}
                    placeholder={t('resources.professional.license.license-scope')}
                    name="license_scope"
                    size="small"
                    sx={{ mb: 2 }}
                />
                <CustomTextBox
                    fullWidth
                    label={t('resources.professional.license.licensing-body')}
                    placeholder={t('resources.professional.license.licensing-body')}
                    name="licensing_body"
                    size="small"
                    sx={{ mb: 2 }}
                />
                <CustomDynamicDatePicker
                    fullWidth
                    label={t('resources.professional.license.issue-date')}
                    placeholder={t('resources.professional.license.issue-date')}
                    name="issue_date"
                    size="small"
                    sx={{ mb: 2 }}
                />
                <CustomDynamicDatePicker
                    fullWidth
                    label={t('resources.professional.license.expire-date')}
                    placeholder={t('resources.professional.license.expire-date')}
                    name="expire_date"
                    size="small"
                    sx={{ mb: 2 }}
                />
                <CustomTextBox
                    fullWidth
                    label={t('resources.professional.license.remark')}
                    placeholder={t('resources.professional.license.remark')}
                    name="remark"
                    size="small"
                    multiline
                    rows={3}
                    sx={{ mb: 2 }}
                />
            </Grid>
        </Grid>
    );
};

export default ProfessionalLicenseForm;
