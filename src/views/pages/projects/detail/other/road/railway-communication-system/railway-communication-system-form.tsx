import { Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import type { RailwayCommunicationSystem } from 'src/types/project/other';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface RailwayCommunicationSystemFormProps {
  formik: FormikProps<RailwayCommunicationSystem>;

  defaultFile: File | null;
  onDefaultFileChange: (file: File | null) => void;
}

const RailwayCommunicationSystemForm: React.FC<RailwayCommunicationSystemFormProps> = ({
  formik,

  defaultFile,
  onDefaultFileChange
}) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-communication-system.details.railway_line_section_name')}
          placeholder={t('project.other.railway-communication-system.details.railway_line_section_name')}
          name="railway_line_section_name"
          value={formik.values.railway_line_section_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-communication-system.details.communication_system_type')}
          placeholder={t('project.other.railway-communication-system.details.communication_system_type')}
          name="communication_system_type"
          value={formik.values.communication_system_type}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-communication-system.details.communication_system_protocols_or_standards')}
          placeholder={t('project.other.railway-communication-system.details.communication_system_protocols_or_standards')}
          name="communication_system_protocols_or_standards"
          value={formik.values.communication_system_protocols_or_standards}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-communication-system.details.communication_system_components')}
          placeholder={t('project.other.railway-communication-system.details.communication_system_components')}
          name="communication_system_components"
          value={formik.values.communication_system_components}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={2}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-communication-system.details.signaling_system_components')}
          placeholder={t('project.other.railway-communication-system.details.signaling_system_components')}
          name="signaling_system_components"
          value={formik.values.signaling_system_components}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={2}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-communication-system.details.remark')}
          placeholder={t('project.other.railway-communication-system.details.remark')}
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

export default RailwayCommunicationSystemForm;
