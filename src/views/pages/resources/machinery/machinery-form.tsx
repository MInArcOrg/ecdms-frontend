import type React from 'react';
import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import type { FormikProps } from 'formik';
import { gridSpacing } from 'src/configs/app-constants';
import type { MachineryInformation } from 'src/types/resource/index';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomDatePicker from 'src/views/shared/form/custom-date-box';
import CustomPhoneInput from 'src/views/shared/form/custom-phone-box';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import departmentApiService from 'src/services/department/department-service';
import { dropDownConfig } from 'src/configs/api-constants';

interface MachineryInformationFormProps {
  formik: FormikProps<MachineryInformation>;
}

const MachineryInformationForm: React.FC<MachineryInformationFormProps> = ({ formik }) => {
  const { t } = useTranslation();
  const { data: departments } = useQuery({
    queryKey: ['departments'],
    queryFn: () => departmentApiService.getAll(dropDownConfig({ pagination: { page: 1, pageSize: 100000 } }))
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} sm={6}>
        <CustomSelectBox
          size="small"
          required
          name="department_id"
          label={t('department.user.form.department')}
          options={
            departments?.payload?.map((department) => ({
              value: department.id,
              label: department.name
            })) || []
          }
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox fullWidth label={t('Type')} name="type" size="small" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox fullWidth label={t('Plate No')} name="plate_no" size="small" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox fullWidth label={t('Owner Name')} name="owner_name" size="small" />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox fullWidth label={t('Engine No')} name="engine_no" size="small" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox fullWidth label={t('Serial No')} name="serial_no" size="small" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox fullWidth label={t('Title Certificate No')} name="title_certificate_no" size="small" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomDatePicker fullWidth label={t('Registration Date')} name="registration_date" size="small" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox fullWidth label={t('Make')} name="make" size="small" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox fullWidth label={t('Model')} name="model" size="small" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox fullWidth type="number" label={t('Capacity')} name="capacity" size="small" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox fullWidth type="number" label={t('Engine Power (HP)')} name="engine_power_hp" size="small" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox fullWidth type="number" label={t('Manufacture Year')} name="manufacture_year" size="small" />
      </Grid>
      <Grid item xs={12} sm={12}>
        <CustomPhoneInput fullWidth label={t('Tel')} name="tell" size="small" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox fullWidth label={t('TS No')} name="ts_no" size="small" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomDatePicker fullWidth label={t('Date')} name="date" size="small" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox fullWidth label={t('Duty')} name="duty" size="small" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox fullWidth label={t('Data')} name="data" size="small" />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox fullWidth label={t('Remark')} name="remark" multiline
          rows={3} size="small" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox fullWidth label={t('Edesate')} name="edesate" size="small" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox fullWidth label={t('Eged')} name="eged" size="small" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomDatePicker fullWidth label={t('Eged Date')} name="eged_d" size="small" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox fullWidth label={t('Eged No')} name="eged_n" size="small" />
      </Grid>
    </Grid>
  );
};

export default MachineryInformationForm;
