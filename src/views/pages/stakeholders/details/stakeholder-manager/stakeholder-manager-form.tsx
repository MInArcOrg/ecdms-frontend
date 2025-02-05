import React, { useEffect, useState } from 'react';
import { Box, Grid, FormControl, FormLabel, FormHelperText, Autocomplete, TextField } from '@mui/material';
import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import type { StakeholderManager } from 'src/types/stakeholder/stakeholder-manager';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomDatePicker from 'src/views/shared/form/custom-date-box';
import CustomSelect from 'src/views/shared/form/custom-select';
import countriesList from 'src/constants/countries';

interface ManagerFormProps {
    formik: FormikProps<StakeholderManager>;
}


const ManagerForm: React.FC<ManagerFormProps> = ({ formik }) => {
    const { t } = useTranslation();

    const [country, setCountry] = useState<{ value: string; label: string } | null>(null);

    useEffect(() => {
        const selectedCountry = countriesList.find((c) => c.title === formik.values.nationality);
        if (selectedCountry) {
            setCountry({ value: selectedCountry.title, label: selectedCountry.title });
        } else {
            setCountry(null);
        }
    }, [formik.values.nationality]);


    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={6}>
                <CustomTextBox fullWidth label={t('stakeholderManager.firstName')} name="first_name" size="small" sx={{ mb: 2 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomTextBox fullWidth label={t('stakeholderManager.middleName')} name="middle_name" size="small" sx={{ mb: 2 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomTextBox fullWidth label={t('stakeholderManager.lastName')} name="last_name" size="small" sx={{ mb: 2 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomTextBox fullWidth label={t('stakeholderManager.department')} name="department" size="small" sx={{ mb: 2 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomTextBox fullWidth label={t('stakeholderManager.position')} name="position" size="small" sx={{ mb: 2 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormLabel>{t('address.form.country')}</FormLabel>
                <Autocomplete
                    options={countriesList.map((country) => ({ value: country.title, label: country.title }))}
                    size="small"
                    disableClearable
                    id="autocomplete-outlined"
                    value={country || { value: '', label: '' }}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                    onChange={(event, newValue) => {
                        setCountry(newValue);
                        formik.setFieldValue('country', newValue?.value || '');
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    onBlur={formik.handleBlur}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomTextBox fullWidth label={t('stakeholderManager.nationalIdNo')} name="national_id_no" size="small" sx={{ mb: 2 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomDatePicker fullWidth label={t('stakeholderManager.birthDate')} name="birth_date" sx={{ mb: 2 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomSelect
                    fullWidth
                    label={t('stakeholderManager.gender')}
                    name="gender"
                    options={[
                        { value: 'male', label: 'Male' },
                        { value: 'female', label: 'Female' },
                        { value: 'other', label: 'Other' }
                    ]}
                    size="small"
                    sx={{ mb: 2 }}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomTextBox fullWidth label={t('stakeholderManager.phoneNo')} name="phone_no" size="small" sx={{ mb: 2 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomTextBox fullWidth label={t('stakeholderManager.email')} name="email" type="email" size="small" sx={{ mb: 2 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomTextBox fullWidth label={t('stakeholderManager.type')} name="type" size="small" sx={{ mb: 2 }} />
            </Grid>
        </Grid>
    );
};

export default ManagerForm;