import { Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import type { RailwayEnvironmentalAndOtherFactor } from 'src/types/project/other';
import CustomDynamicDatePicker from 'src/views/shared/form/custom-dynamic-date-box';
import CustomSwitch from 'src/views/shared/form/custom-switch';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface RailwayEnvironmentalAndOtherFactorFormProps {
  formik: FormikProps<RailwayEnvironmentalAndOtherFactor>;
  defaultFile: File | null;
  complianceFile: File | null;
  onDefaultFileChange: (file: File | null) => void;
  onComplianceFileChange: (file: File | null) => void;
}

const RailwayEnvironmentalAndOtherFactorForm: React.FC<RailwayEnvironmentalAndOtherFactorFormProps> = ({
  formik,
  defaultFile,
  complianceFile,
  onDefaultFileChange,
  onComplianceFileChange
}) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-environmental-and-other-factor.details.railway_line_section_name')}
          placeholder={t('project.other.railway-environmental-and-other-factor.details.railway_line_section_name')}
          name="railway_line_section_name"
          value={formik.values.railway_line_section_name}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomSwitch
          label={t('project.other.railway-environmental-and-other-factor.details.environmental_compliance_measures')}
          name="environmental_compliance_measures"
          sx={{ mb: 2 }}
        />
        <CustomSwitch
          label={t('project.other.railway-environmental-and-other-factor.details.environmental_impact_assessment')}
          name="environmental_impact_assessment"
          sx={{ mb: 2 }}
        />

        <CustomDynamicDatePicker
          fullWidth
          label={t('project.other.railway-environmental-and-other-factor.details.data_recording_date')}
          name="data_recording_date"
          required
          showYearDropdown
          showMonthDropdown
          customInput={<CustomTextBox name="incident_date" />}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-environmental-and-other-factor.details.remark')}
          placeholder={t('project.other.railway-environmental-and-other-factor.details.remark')}
          name="remark"
          value={formik.values.remark}
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={4}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomFileUpload label={t('common.form.file-upload')} file={defaultFile} onFileChange={onDefaultFileChange} />
      </Grid>
    </Grid>
  );
};

export default RailwayEnvironmentalAndOtherFactorForm;
