import { Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import type { RailwayCommunicationSystemMaintenanceAndTesting } from 'src/types/project/other';
import CustomSwitch from 'src/views/shared/form/custom-switch';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface RailwayCommunicationSystemMaintenanceAndTestingFormProps {
  formik: FormikProps<RailwayCommunicationSystemMaintenanceAndTesting>;
  defaultFile: File | null;
  maintenanceContractsFile: File | null;
  onDefaultFileChange: (file: File | null) => void;
  onMaintenanceContractsFileChange: (file: File | null) => void;
}

const RailwayCommunicationSystemMaintenanceAndTestingForm: React.FC<RailwayCommunicationSystemMaintenanceAndTestingFormProps> = ({
  formik,
  defaultFile,
  maintenanceContractsFile,
  onDefaultFileChange,
  onMaintenanceContractsFileChange
}) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-communication-system-maintenance-and-testing.details.railway_line_section_name')}
          placeholder={t('project.other.railway-communication-system-maintenance-and-testing.details.railway_line_section_name')}
          name="railway_line_section_name"
          value={formik.values.railway_line_section_name}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-communication-system-maintenance-and-testing.details.scheduled_maintenance_activities')}
          placeholder={t('project.other.railway-communication-system-maintenance-and-testing.details.scheduled_maintenance_activities')}
          name="scheduled_maintenance_activities"
          value={formik.values.scheduled_maintenance_activities}
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomSwitch
          name="inspections"
          label={t('project.other.railway-communication-system-maintenance-and-testing.details.inspections')}
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-communication-system-maintenance-and-testing.details.recent_maintenance_records_and_dates')}
          placeholder={t('project.other.railway-communication-system-maintenance-and-testing.details.recent_maintenance_records_and_dates')}
          name="recent_maintenance_records_and_dates"
          value={formik.values.recent_maintenance_records_and_dates}
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={2}
        />

        <CustomSwitch
          name="testing_and_verification_procedures_prepared"
          label={t(
            'project.other.railway-communication-system-maintenance-and-testing.details.testing_and_verification_procedures_prepared'
          )}
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-communication-system-maintenance-and-testing.details.maintenance_contracts_or_agreements_made')}
          placeholder={t(
            'project.other.railway-communication-system-maintenance-and-testing.details.maintenance_contracts_or_agreements_made'
          )}
          name="maintenance_contracts_or_agreements_made"
          value={formik.values.maintenance_contracts_or_agreements_made}
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={2}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-communication-system-maintenance-and-testing.details.remark')}
          placeholder={t('project.other.railway-communication-system-maintenance-and-testing.details.remark')}
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
      <Grid item xs={12}>
        <CustomFileUpload
          label={t('project.other.railway-communication-system-maintenance-and-testing.details.maintenance-contracts-file-upload')}
          file={maintenanceContractsFile}
          onFileChange={onMaintenanceContractsFileChange}
        />
      </Grid>
    </Grid>
  );
};

export default RailwayCommunicationSystemMaintenanceAndTestingForm;
