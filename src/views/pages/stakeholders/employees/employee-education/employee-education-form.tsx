import { Grid } from '@mui/material';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import countriesList from 'src/constants/countries';
import { EmployeeEducation } from 'src/types/stakeholder/employee-education';
import { TotalEmployee } from 'src/types/stakeholder/total-employee';
import CustomAutocomplete from 'src/views/shared/form/custom-autocomplete';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface EmployeeEducationFormProps {
  formik: FormikProps<EmployeeEducation>;
  file: File | null;
  onFileChange: (file: File | null) => void;
  totalEmployees: TotalEmployee[];
}

const EmployeeEducationForm: React.FC<EmployeeEducationFormProps> = ({ totalEmployees, formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();

  return (
    <Grid container spacing={3}>
      {/* Year Field (Date Picker) */}
      <Grid item xs={12}>
        <CustomAutocomplete
          label={transl('stakeholder.employee-education.form.year')}
          placeholder={transl('stakeholder.employee-education.form.year')}
          name="year"
          size="small"
          options={totalEmployees.map((totalEmployee) => ({
            value: totalEmployee.year.toString(),
            label: totalEmployee.year.toString()
          }))}
          sx={{ mb: 2 }}
        />
      </Grid>
      {/* Department Name (Optional) */}
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('stakeholder.employee-education.form.department-name')}
          placeholder={transl('stakeholder.employee-education.form.department-name')}
          name="department_name"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>

      {/* Domain */}
      {/* <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl("stakeholder.employee-education.form.domain")}
          placeholder={transl("stakeholder.employee-education.form.domain")}
          name="domain"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid> */}

      {/* Nationality */}
      <Grid item xs={12}>
        <CustomAutocomplete
          label={transl('stakeholder.employee-education.form.nationality')}
          placeholder={transl('stakeholder.employee-education.form.nationality')}
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
          label={transl('stakeholder.employee-education.form.male')}
          placeholder={transl('stakeholder.employee-education.form.male')}
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
          label={transl('stakeholder.employee-education.form.female')}
          placeholder={transl('stakeholder.employee-education.form.female')}
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

export default EmployeeEducationForm;
