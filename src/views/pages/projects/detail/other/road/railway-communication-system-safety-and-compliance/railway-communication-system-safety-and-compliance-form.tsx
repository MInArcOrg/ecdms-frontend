import { Grid, Checkbox, FormControlLabel } from '@mui/material';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import type { RailwayCommunicationSystemSafetyAndCompliance } from 'src/types/project/other';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';
import CustomDynamicDatePicker from 'src/views/shared/form/custom-dynamic-date-box';
import CustomSwitch from 'src/views/shared/form/custom-switch';

interface RailwayCommunicationSystemSafetyAndComplianceFormProps {
  formik: FormikProps<RailwayCommunicationSystemSafetyAndCompliance>;
  defaultFile: File | null;
  complianceFile: File | null;
  onDefaultFileChange: (file: File | null) => void;
  onComplianceFileChange: (file: File | null) => void;
}

const RailwayCommunicationSystemSafetyAndComplianceForm: React.FC<RailwayCommunicationSystemSafetyAndComplianceFormProps> = ({
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
          label={t(
            'project.other.railway-communication-system-safety-and-compliance.details.railway_line_section_name'
          )}
          placeholder={t(
            'project.other.railway-communication-system-safety-and-compliance.details.railway_line_section_name'
          )}
          name="railway_line_section_name"
          value={formik.values.railway_line_section_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.railway_line_section_name && Boolean(formik.errors.railway_line_section_name)}
          helperText={formik.touched.railway_line_section_name && formik.errors.railway_line_section_name}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomSwitch

          name="safety_measures_and_protocols_done"

          label={t('project.other.railway-communication-system-safety-and-compliance.details.safety_measures_and_protocols_done')}
          sx={{ mb: 2 }}
        />

        <CustomSwitch
          name="compliance_with_signaling_and_communication_standards"
          label={t('project.other.railway-communication-system-safety-and-compliance.details.compliance_with_signaling_and_communication_standards')}
          sx={{ mb: 2 }}
        />

        <CustomSwitch
          name="incident_or_accident_records"
          label={t('project.other.railway-communication-system-safety-and-compliance.details.incident_or_accident_records')}
          sx={{ mb: 2 }}
        />


        <CustomDynamicDatePicker
          fullWidth
          label={t('project.other.railway-communication-system-safety-and-compliance.details.incident_date')}
          name="incident_date"
          required
          showYearDropdown
          showMonthDropdown
          customInput={<CustomTextBox name="incident_date" />}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-communication-system-safety-and-compliance.details.remark')}
          placeholder={t('project.other.railway-communication-system-safety-and-compliance.details.remark')}
          name="remark"
          value={formik.values.remark}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.remark && Boolean(formik.errors.remark)}
          helperText={formik.touched.remark && formik.errors.remark}
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

export default RailwayCommunicationSystemSafetyAndComplianceForm;