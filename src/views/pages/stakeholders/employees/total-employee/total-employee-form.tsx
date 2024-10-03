import { Grid } from '@mui/material';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import { TotalEmployee } from 'src/types/stakeholder/total-employee';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';
import DatePicker from 'react-datepicker';
import CustomTextField from 'src/@core/components/mui/text-field';
import moment from 'moment';
import CustomAutocomplete from 'src/views/shared/form/custom-autocomplete';
import countriesList from 'src/constants/countries';

interface TotalEmployeeFormProps {
  formik: FormikProps<TotalEmployee>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const TotalEmployeeForm: React.FC<TotalEmployeeFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();

  return (
    <Grid container spacing={3}>
      {/* Year Field (Date Picker) */}
      <Grid item xs={12}>
        <DatePickerWrapper>
          <DatePicker
            selected={moment(formik.values.year).toDate()}
            required
            showYearDropdown
            showYearPicker
            dateFormat="yyyy"
            id="form-layouts-tabs-date"
            placeholderText="Year"
            customInput={<CustomTextField fullWidth label={transl('stakeholder.total-employee.form.year')} />}
            onChange={(selectedDate) => {
              formik.setFieldValue('year', selectedDate);
            }}
          />
        </DatePickerWrapper>
      </Grid>
      {/* Department Name (Optional) */}
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('stakeholder.total-employee.form.department-name')}
          placeholder={transl('stakeholder.total-employee.form.department-name')}
          name="department_name"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>

      {/* Domain */}
      {/* <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl("stakeholder.total-employee.form.domain")}
          placeholder={transl("stakeholder.total-employee.form.domain")}
          name="domain"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid> */}

      {/* Nationality */}
      <Grid item xs={12}>
        <CustomAutocomplete
          label={transl('stakeholder.total-employee.form.nationality')}
          placeholder={transl('stakeholder.total-employee.form.nationality')}
          name="nationality"
          size="small"
          options={countriesList.map((country) => ({
            value: country.title,
            label: country.title
          }))}
          sx={{ mb: 2 }}
        />
      </Grid>

      {/* Male */}
      <Grid item xs={12} md={6}>
        <CustomTextBox
          fullWidth
          label={transl('stakeholder.total-employee.form.male')}
          placeholder={transl('stakeholder.total-employee.form.male')}
          name="male"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>

      {/* Female */}
      <Grid item xs={12} md={6}>
        <CustomTextBox
          fullWidth
          label={transl('stakeholder.total-employee.form.female')}
          placeholder={transl('stakeholder.total-employee.form.female')}
          name="female"
          type="number"
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

export default TotalEmployeeForm;
