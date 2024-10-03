import { Grid } from '@mui/material';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import { GeneratingCapacity } from 'src/types/project/other';
import CustomDynamicDatePicker from 'src/views/shared/form/custom-dynamic-date-box';

import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface GeneratingCapacityFormProps {
  formik: FormikProps<GeneratingCapacity>;
  file: File | null;
  onFileChange: (file: File | null) => void;
  projectId: string;
}

const GeneratingCapacityForm: React.FC<GeneratingCapacityFormProps> = ({ formik, file, onFileChange }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('project.other.generating-capacity.details.operator')}
          placeholder={t('project.other.generating-capacity.details.operator')}
          name="operator"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomDynamicDatePicker
          fullWidth
          label={t('project.other.generating-capacity.details.commission-date')}
          name="commission_date"
          required
          showYearDropdown
          showMonthDropdown
          customInput={<CustomTextBox name="commission_date" />}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.generating-capacity.details.turbine-type-number')}
          placeholder={t('project.other.generating-capacity.details.turbine-type-number')}
          name="turbine_type_number"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.generating-capacity.details.designed-capacity')}
          placeholder={t('project.other.generating-capacity.details.designed-capacity')}
          name="designed_capacity"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.generating-capacity.details.generating-capacity')}
          placeholder={t('project.other.generating-capacity.details.generating-capacity')}
          name="generating_capacity"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.generating-capacity.details.installed-capacity')}
          placeholder={t('project.other.generating-capacity.details.installed-capacity')}
          name="installed_capacity"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.generating-capacity.details.capacity-factor')}
          placeholder={t('project.other.generating-capacity.details.capacity-factor')}
          name="capacity_factor"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.generating-capacity.details.annual-generation')}
          placeholder={t('project.other.generating-capacity.details.annual-generation')}
          name="annual_generation"
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

export default GeneratingCapacityForm;
